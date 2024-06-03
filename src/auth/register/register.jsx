import React, {useState} from "react";
import ReactDOM from "react-dom";
import * as Components from "./RegisterComponents";
import "../../styles.css";
import HomePage from "../../main/homePage";
import OTP from "../../OTP/indexOTP";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import Login from "../login/login";
import {ToastContainer, toast, Bounce} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} />
const errore = ""

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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

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
                    <Components.Form onSubmit={handleSubmitStudente}>
                        <Components.Title>Studente</Components.Title>
                        <label htmlFor="name">Nome</label>
                        <Components.Input type="name" placeholder="es. Mario" value={nome} onChange={e => setNome(e.target.value)} />
                        <label htmlFor="surname">Cognome</label>
                        <Components.Input type="surname" placeholder="es. Rossi" value={cognome} onChange={e => setCognome(e.target.value)} />
                        <label htmlFor="email">Email</label>
                        <Components.Input type="email" placeholder="es. rssmra04t18d416e@iisbadoni.edu.it" value={email} onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="Password">Password</label>
                        <Components.Input type="password" placeholder="es: password" value={password} onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="Conferma password">Conferma Password</label>
                        <Components.Input type="password" placeholder="es: password" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value);setPasswordsMatch(true);}} required style={passwordsMatch ? {} : {border: '1px solid red'}}/>
                        <Components.Button onClick={() => setRegisterClicked(true)}>Registrati</Components.Button>
                        <Components.Button onClick={() => setRegisterClicked(false)}>{arrowLeft}</Components.Button>
                        <Components.AlreadyRegistered to="/login"> Hai già un account? Accedi</Components.AlreadyRegistered>
                    </Components.Form>
                </Components.StudenteContainer>
                <Components.OverlayContainer signingIn={signIn} isRegisterClicked={isRegisterClicked}>
                    <Components.Overlay signingIn={signIn}>
                        <Components.LeftOverlayPanel signingIn={signIn}>
                            <Components.Title>Benvenuto!</Components.Title>
                            <Components.Paragraph>
                                Sei uno studente? Clicca qui sotto!
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

