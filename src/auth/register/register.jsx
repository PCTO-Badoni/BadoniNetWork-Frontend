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

    return (
            <>
                <Components.Container>
                <Components.SignUpContainer signingIn={signIn} isRegisterClicked={isRegisterClicked}>
                    {isSending ? (
                        <Components.sendingEmail> invio richiesta in corso ... </Components.sendingEmail>
                    ) : (
                            <Components.Form onSubmit={handleSubmitAzienda}>
                                <Components.Title>Azienda</Components.Title>
                                <Components.Input type="ragione_sociale" placeholder="Ragione Sociale" value={ragionesociale} onChange={e => setRagione(e.target.value)} required/>
                                <Components.Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
                                <Components.Input type="telefono" placeholder="Telefono" value={telefono} onChange={e => setTelefono(e.target.value)} required/>
                                <Components.Input type="indirizzo" placeholder="Indirizzo" value={indirizzo} onChange={e => setIndirizzo(e.target.value)} required/>
                                <Components.Button type="submit">Richiedi Accesso</Components.Button>
                                <Components.AlreadyRegistered to="/login"> Hai già un account? Accedi</Components.AlreadyRegistered>
                            </Components.Form>
                    )
                    }

                </Components.SignUpContainer>
                <Components.SignInContainer signingIn={signIn} isRegisterClicked={isRegisterClicked}>                    <Components.Form onSubmit={handleSubmitStudente}>
                        <Components.Title>Studente</Components.Title>
                        <Components.Input type="name" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required/>
                        <Components.Input type="surname" placeholder="Cognome" value={cognome} onChange={e => setCognome(e.target.value)} required/>
                        <Components.Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
                        <Components.Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
                        <Components.Input type="password" placeholder="Conferma Password" required/>
                        <Components.Button onClick={() => setRegisterClicked(true)}>Registrati</Components.Button>                        <Components.AlreadyRegistered to="/login"> Hai già un account? Accedi</Components.AlreadyRegistered>
                    </Components.Form>
                </Components.SignInContainer>
                <Components.OverlayContainer signingIn={signIn}>
                    <Components.Overlay signingIn={signIn}>
                        <Components.LeftOverlayPanel signingIn={signIn}>
                            <Components.Title>Benvenuto!</Components.Title>
                            <Components.Paragraph>
                                Sei uno studente? Clicca qui sotto!
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

