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
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import StrengthMeter from "./StrengthMeter";
import ProfilePicUploader from "./ProfilePicUploader";
import 'react-tooltip/dist/react-tooltip.css'// import the progress bar
import PasswordChecklist from "react-password-checklist"

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

const Step1 = ({email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleSubmitStudente, isRegisterClicked, handleNext, passwordsMatch, setPasswordStrength}) => {

    const [pwdInput, initValue] = useState({
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const [isStrong, initRobustPassword] = useState(null);
    const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const initPwdInput = async (childData) => {
        initRobustPassword(childData);
        setPasswordStrength(childData); // set passwordStrength based on the strength of the password
    };

    const onChange = (e) => {
        let password = e.target.value;
        initValue({
            ...pwdInput,
            password: e.target.value,
        });
    }

    return (
        <Components.Form onSubmit={handleSubmitStudente}>
            <Components.Title visible={!isRegisterClicked}>Studente</Components.Title>
            <label htmlFor="email">Email</label>
            <Components.Input type="email" placeholder="es. rssmra04t18d416e@iisbadoni.edu.it" value={email}
                              onChange={e => setEmail(e.target.value)}/>
            <label htmlFor="Password">Password</label>
            <div style={{position: 'relative', display: 'inline-block'}}>
                <Components.Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                        onChange(e);
                        setShowPasswordChecklist(e.target.value !== ""); // Show the checklist when the input is not empty
                    }}
                    onBlur={() => setShowPasswordChecklist(false)} // Hide the checklist when the input loses focus
                    onInput={e => setShowPasswordChecklist(e.target.value !== "")} // Show the checklist when the input is not empty
                    style={{paddingRight: '30px'}} // Make room for the icon
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        border: 'none',
                        background: 'transparent',
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        cursor: 'pointer',
                        zIndex: 200,
                        transform: 'translateY(-50%)' // This is to vertically center the button
                    }}
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                </button>
            </div>
            <StrengthMeter password={pwdInput.password} actions={initPwdInput}/>
            {showPasswordChecklist && (
                <PasswordChecklist
                    rules={["minLength", "lowercase", "capital","number", "specialChar"]}
                    minLength={8}
                    value={password}
                    valueAgain={confirmPassword}
                    onChange={setIsValid} // Set isValid to the validity of the password
                    style={{textAlign: "left", fontSize: "14px"}}
                />
            )}
            <label htmlFor="Conferma password">Conferma Password</label>
            <Components.Input type={showPassword ? "text" : "password"} passwordsMatch={passwordsMatch} value={confirmPassword} onChange={e => {
                setConfirmPassword(e.target.value);
            }} required style={passwordsMatch ? {} : {outline: '2px solid red'}}/>
            <Components.Button type={"submit"} onClick={() => handleNext(isValid)}>Continua</Components.Button>
            <Components.AlreadyRegistered to="/login"> Hai già un account? Accedi</Components.AlreadyRegistered>
        </Components.Form>
    );
};

const Step2 = () => (
    <>
        <Components.Form>
        <ProfilePicUploader />
        <label htmlFor="name">Nome</label>
        <Components.Input type="name" placeholder="es. Mario" required/>
        <label htmlFor="name">Cognome</label>
        <Components.Input type="name" placeholder="es. Rossi" required/>
        <label htmlFor="name">Data di nascita</label>
        <Components.Input type="date" required/>
        <label htmlFor="name">Indirizzo</label>
        <Components.Input type="name" placeholder="es. Via Rivolta 10" required/>

        </Components.Form>
    </>
)
const Step3 = () => (
    <>
        <Components.Form>
            :D
        </Components.Form>
    </>);

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

    const handleNext = (isValid) => {
        if ((password === confirmPassword) && isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setRegisterClicked(true);
        } else if (password !== confirmPassword) {
            toast.error('Le password non corrispondono');
            setPasswordsMatch(false);
        } else {
            toast.error('Password non sicura');
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if(activeStep === 1) {
            setRegisterClicked(false);
        }

    };

    const stepComponents = [
        <Step1
            nome={nome}
            setNome={setNome}
            cognome={cognome}
            setCognome={setCognome}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            passwordsMatch={passwordsMatch} // Add this line
            setRegisterClicked={setRegisterClicked}
            setPasswordStrength={setPasswordStrength}
            handleSubmitStudente={handleSubmitStudente}
            setPasswordMatch={setPasswordsMatch}
            isRegisterClicked={isRegisterClicked}
            handleNext={handleNext}
            passwordStrength={passwordStrength} // pass passwordStrength as a prop
        />,
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
                <Components.StudenteContainer className={isRegisterClicked? "shrinking" : ""}
                                              isRegisterClicked={isRegisterClicked}
                                              signingIn={signIn}>

                    {isRegisterClicked && (
                        <div className="progress-bar">
                            <div className="progress-bar-fill"
                                 style={{width: `${(activeStep / (steps.length - 1)) * 100}%`}}>
                            </div>
                            <div className="progress-step" style={{opacity: activeStep >= 0 ? 1 : 0.5}}>
                                <span className="progress-step-text">1</span>
                            </div>
                            <div className="progress-step" style={{opacity: activeStep >= 1 ? 1 : 0.5}}>
                                <span className="progress-step-text">2</span>
                            </div>
                            <div className="progress-step" style={{opacity: activeStep >= 2 ? 1 : 0.5}}>
                                <span className="progress-step-text">3</span>
                            </div>
                        </div>
                    )}

                    {stepComponents[activeStep]}
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Components.StepsNavButton isRegisterClicked={isRegisterClicked} onClick={() => {
                            activeStep === 0 ? setRegisterClicked(false) : handleBack()
                        }} disabled={!isRegisterClicked}>
                            Indietro
                        </Components.StepsNavButton>
                        <Components.StepsNavButton isRegisterClicked={isRegisterClicked} onClick={() => {
                            !isRegisterClicked ? setRegisterClicked(true) : handleNext()
                        }} disabled={!isRegisterClicked}>
                        {activeStep === steps.length - 1 ? 'Salva' : "Avanti"}
                        </Components.StepsNavButton>
                    </div>

                </Components.StudenteContainer>
                <Components.OverlayContainer className={isRegisterClicked? "shrinking" : ""}
                                             isRegisterClicked={isRegisterClicked}
                                             signingIn={signIn}>
                    <Components.Overlay signingIn={signIn}>
                        <Components.LeftOverlayPanel signingIn={signIn}>
                            <Components.Title>Benvenutæ!</Components.Title>
                            <Components.Paragraph>
                                Sei unæ student? Clicca qui sotto!
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => {
                                isSending ? toast.error('Attendi l\'invio della richiesta') : toggle(true);
                            }}>
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

