import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import * as Components from "./RegisterComponents";
import HomePage from "../../main/homePage";
import OTP from "../../OTP/indexOTP";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import Login from "../login/login";
import {ToastContainer, toast, Bounce} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import StrengthMeter from "./StrengthMeter";

// import the progress bar

const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} />
const arrowRight = <FontAwesomeIcon icon={faArrowRight} />
const errore = ""
const steps = ['Step 1', 'Step 2', 'Step 3']; // Add or remove steps as needed

const sendingEmail = () => toast.info('Invio richiesta in corso...', {
    position: "top-right",
    autoClose: 30000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const emailSent = () => toast.success('Richiesta inviata!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const error = () => toast.error(errore, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const Step1 = ({ nome, setNome, cognome, setCognome, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, passwordsMatch, setRegisterClicked, setPasswordStrength, handleSubmitStudente, setPasswordMatch, isRegisterClicked}) => {
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    const [pwdInput, initValue] = useState({
        password: "",
    });

    const [isError, setError] = useState(null);
    const onChange = (e) => {
        let password = e.target.value;
        initValue({
            ...pwdInput,
            password: e.target.value,
        });
        setError(null);
        let caps, small, num, specialSymbol;
        if (password.length < 4) {
            setError(
                "Password should contain minimum 4 characters, with one UPPERCASE, lowercase, number and special character: @$! % * ? &"
            );
            return;
        } else {
            caps = (password.match(/[A-Z]/g) || []).length;
            small = (password.match(/[a-z]/g) || []).length;
            num = (password.match(/[0-9]/g) || []).length;
            specialSymbol = (password.match(/\W/g) || []).length;
            if (caps < 1) {
                setError("Must add one UPPERCASE letter");
                return;
            } else if (small < 1) {
                setError("Must add one lowercase letter");
                return;
            } else if (num < 1) {
                setError("Must add one number");
                return;
            } else if (specialSymbol < 1) {
                setError("Must add one special symbol: @$! % * ? &");
                return;
            }
        }
    };

    const [isStrong, initRobustPassword] = useState(null);

    const initPwdInput = async (childData) => {
        initRobustPassword(childData);
    };

    return (
        <Components.Form onSubmit={handleSubmitStudente}>
            <Components.Title visible={false}>Studente</Components.Title>
            <label htmlFor="email">Email</label>
            <Components.Input type="email" placeholder="es. rssmra04t18d416e@iisbadoni.edu.it" value={email}
                              onChange={e => setEmail(e.target.value)}/>
            <label htmlFor="Password">Password</label>
            <Components.Input type="password" placeholder="es: password" value={password} onChange={e => {
                setPassword(e.target.value);
                onChange(e)
                }
            } />
            <label htmlFor="Conferma password">Conferma Password</label>
            <Components.Input type="password" placeholder="es: password" value={confirmPassword} onChange={e => {
                setConfirmPassword(e.target.value);
                setPasswordsMatch(true);
            }} required style={passwordsMatch ? {} : {border: '1px solid red'}}/>
            <StrengthMeter password={pwdInput.password} actions={initPwdInput} />
            <Components.Button type={"submit"} onClick={() => setRegisterClicked(true)}>Registrati</Components.Button>
            <Components.AlreadyRegistered to="/login"> Hai già un account? Accedi</Components.AlreadyRegistered>
        </Components.Form>
    );
};

const Step2 = () => (
    <Components.Title>:3</Components.Title>);
const Step3 = () => (
    <Components.Title>8===D</Components.Title>
);


function Register() {
    const [signIn, toggle] = React.useState(true);
    const [ragionesociale, setRagione] = useState("")
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [indirizzo, setIndirizzo] = useState("");
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [password, setPassword] = useState("");
    const [isRegisterClicked, setRegisterClicked] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    let navigate = useNavigate();
    const [isSending, setIsSending] = useState(false);



    async function handleSubmitAzienda(event) {
        setIsSending(true);

        event.preventDefault();

        const data = {
            ragionesociale,
            email,
            telefono,
            indirizzo,
        };

        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

        try {
            const response = await fetch('http://localhost:8080/register/azienda', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check if the content type is JSON before parsing
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const responseData = await response.json();
                console.log(responseData);
            } else {
                console.log('Response is not JSON. It is:', contentType);
            }

            // Navigate after successful fetch
            //navigate('/emailSent');
            setIsSending(false);
            emailSent();
        } catch (error) {
            console.log('Error:', error);
        }
    };


    async function handleSubmitStudente(event) {

        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Le password non corrispondono');
            setPasswordsMatch(false);
            return;
        }

        if (!isStrongPassword(password)) {
            toast.error('La password non è abbastanza sicura');
            return;
        }

        setPasswordsMatch(true);

        const data = {
            nome,
            cognome,
            email,
            password,
        };

        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

        try {
            const response = await fetch('http://localhost:8080/register/utente', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check if the content type is JSON before parsing
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const responseData = await response.json();
                console.log(responseData);
            } else {
                console.log('Response is not JSON. It is:', contentType);
            }

            // Navigate after successful fetch
            //navigate('/emailSent');

            navigate('/login');

        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const stepComponents = [
        <Step1 nome={nome} setNome={setNome} cognome={cognome} setCognome={setCognome} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} passwordsMatch={passwordsMatch} setRegisterClicked={setRegisterClicked} setPasswordStrength={setPasswordStrength} handleSubmitStudente={handleSubmitStudente} setPasswordMatch={setPasswordsMatch} isRegisterClicked={isRegisterClicked}/>,
        <Step2 />,
        <Step3 />
    ];

    return (
        <>
            <Components.Container>
                <Components.AziendaContainer signingIn={signIn}>
                    {isSending ? (
                        <Components.sendingEmail> invio richiesta in corso ... </Components.sendingEmail>
                    ) : (
                        <Components.Form onSubmit={handleSubmitAzienda}>
                            <Components.Title>Azienda</Components.Title>
                            <label htmlFor="name">Ragione sociale</label>
                            <Components.Input type="ragione_sociale" placeholder="es. Azienda S.p.A."
                                              value={ragionesociale} onChange={e => setRagione(e.target.value)}
                                              required/>
                            <label htmlFor="name">Email</label>
                            <Components.Input type="email" placeholder="es. azienda@gmail.com" value={email}
                                              onChange={e => setEmail(e.target.value)} required/>
                            <label htmlFor="name">Telefono</label>
                            <Components.Input type="telefono" placeholder="es. 123 456 7890" value={telefono}
                                              onChange={e => setTelefono(e.target.value)} required/>
                            <label htmlFor="name">Indirizzo</label>
                            <Components.Input type="indirizzo" placeholder="es. Via Rivolta 10" value={indirizzo}
                                              onChange={e => setIndirizzo(e.target.value)} required/>
                            <Components.Button type="submit">Richiedi Accesso</Components.Button>
                            <Components.AlreadyRegistered to="/login"> Hai già un account?
                                Accedi</Components.AlreadyRegistered>
                        </Components.Form>
                        )
                    }

                </Components.AziendaContainer>
                <Components.StudenteContainer signingIn={signIn} isRegisterClicked={isRegisterClicked}>
                    {stepComponents[activeStep]}
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Components.StepsNavButton isRegisterClicked={isRegisterClicked} onClick={() => { activeStep === 0 ? setRegisterClicked(false) : handleBack() }}>
                            Indietro
                        </Components.StepsNavButton>
                        <Components.StepsNavButton isRegisterClicked={isRegisterClicked} onClick={() => { !isRegisterClicked ? setRegisterClicked(true) : handleNext() }} disabled={activeStep === steps.length - 1}>
                            {activeStep === steps.length - 1 ? 'Salva' : "Avanti"}
                        </Components.StepsNavButton>
                    </div>

                </Components.StudenteContainer>
                <Components.OverlayContainer signingIn={signIn} isRegisterClicked={isRegisterClicked}>
                    <Components.Overlay signingIn={signIn}>
                        <Components.LeftOverlayPanel signingIn={signIn}>
                            <Components.Title>Benvenutæ!</Components.Title>
                            <Components.Paragraph>
                                Sei unæ student? Clicca qui sotto!
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => {isSending ? toast.error('Attendi l\'invio della richiesta') : toggle(true);}}>
                                Studente
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>
                        <Components.RightOverlayPanel signingIn={signIn}>
                            <Components.Title>Benvenuto!</Components.Title>
                            <Components.Paragraph>
                                Sei un'azienda? Clicca qui sotto!
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Azienda
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
            <ToastContainer newestOnTop={true}/>
        </>
    );
}

export default Register; // Add this line to export Register as a default export

