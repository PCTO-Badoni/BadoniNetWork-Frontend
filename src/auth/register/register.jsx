import React, {useState} from "react";
import ReactDOM from "react-dom";
import * as Components from "./RegisterComponents";
import "../../styles.css";
import HomePage from "../../main/homePage";
import OTP from "../../OTP/indexOTP";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import Login from "../login/login";

function Register() {
    const [signIn, toggle] = React.useState(true);
    const [ragione_sociale, setRagione] = useState("")
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [indirizzo, setIndirizzo] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            ragione_sociale,
            email,
            telefono,
            indirizzo,
        };

        // Convert data object to x-www-form-urlencoded format
        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

        try {
            const response = await fetch('http://localhost:8080/register/send-email', {
                method: 'POST',
                mode: 'cors', // change this to 'cors' or 'same-origin'
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            });

            const responseText = await response.text();
            console.log(responseText);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
            <Components.Form onSubmit={handleSubmit}>
                <Components.Title>Azienda</Components.Title>
                <Components.Input type="ragione_sociale" placeholder="Ragione Sociale" value={ragione_sociale} onChange={e => setRagione(e.target.value)} required/>
                <Components.Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
                <Components.Input type="telefono" placeholder="Telefono" value={telefono} onChange={e => setTelefono(e.target.value)} required/>
                <Components.Input type="indirizzo" placeholder="Indirizzo" value={indirizzo} onChange={e => setIndirizzo(e.target.value)} required/>
                <Components.Button onClick ={() => navigate('/emailSent')} >Richiedi Accesso</Components.Button>
                <Components.AlreadyRegistered to="/login"> Hai già un account? </Components.AlreadyRegistered>

            </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
            <Components.Form>
                <Components.Title>Studente</Components.Title>
                <Components.Input type="name" placeholder="Nome" required/>
                <Components.Input type="surname" placeholder="Cognome" required/>
                <Components.Input type="email" placeholder="Email" required/>
                <Components.Input type="password" placeholder="Password" required/>
                <Components.Input type="password" placeholder="Conferma Password" required/>
                <Components.Button>Registrati</Components.Button>
                <Components.AlreadyRegistered to="/login"> Hai già un account? </Components.AlreadyRegistered>
            </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
            <Components.Overlay signingIn={signIn}>
                <Components.LeftOverlayPanel signingIn={signIn}>
                    <Components.Title>Benvenuto!</Components.Title>
                    <Components.Paragraph>
                        Sei uno studente? Clicca qui sotto!
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(true)}>
                        Studente
                    </Components.GhostButton>
                </Components.LeftOverlayPanel>
                <Components.RightOverlayPanel signingIn={signIn}>
                    <Components.Title>Benvenuti!</Components.Title>
                    <Components.Paragraph>
                        Siete un'azienda? Cliccate qui sotto!
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(false)}>
                        Azienda
                    </Components.GhostButton>
                </Components.RightOverlayPanel>
            </Components.Overlay>
        </Components.OverlayContainer>
    </Components.Container>
    );
}

export default Register; // Add this line to export Register as a default export

