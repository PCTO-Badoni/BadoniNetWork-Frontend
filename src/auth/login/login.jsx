import * as LoginComponents from "./LoginComponents";
import ReactDOM from "react-dom";
import React from "react";
import "../../styles.css";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

const prefix = import.meta.env.VITE_DEFAULT_HOST_DOMAIN

const error = (message) => toast.error( message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
});

const success = (message) => toast.success( message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
});

function Login() {
    const navigate = useNavigate(); // Hook per la navigazione
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false); // Stato per il loading

    async function handleLogin(event) {
        event.preventDefault();
        setIsLoading(true);

        const data = {
            email,
            password
        };

        try {
            const response = await fetch(prefix+"/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                error(errorData.message || "Errore durante il login");
                throw new Error("HTTP error! status: " + response.status);
            }

            const responseData = await response.json();
            console.log("Risposta login:", responseData);
            
            // Salva i dati dell'utente nella sessione
            if (responseData) {
                // Salva l'email nella sessione per uso nei componenti dell'azienda
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('userEmail', email);
                
                // Salva altri dati se presenti nella risposta
                if (responseData.token) {
                    sessionStorage.setItem('token', responseData.token);
                }
                
                if (responseData.id) {
                    sessionStorage.setItem('userId', responseData.id);
                }
                
                if (responseData.nomeAzienda) {
                    sessionStorage.setItem('nomeAzienda', responseData.nomeAzienda);
                }
                
                // Log per debug
                console.log("Dati salvati nella sessione:", {
                    email: sessionStorage.getItem('email'),
                    userEmail: sessionStorage.getItem('userEmail'),
                    token: sessionStorage.getItem('token')
                });
                
                // Mostra messaggio di successo
                success("Login effettuato con successo!");
                
                // Redirect alla vista dell'azienda dopo un breve delay
                setTimeout(() => {
                    navigate('/azienda/home'); // Cambia questo path con quello corretto per la vista dell'azienda
                }, 1500);
            }
            
        } catch (error) {
            console.error("Errore durante il login:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <LoginComponents.Container>
            <LoginComponents.Form onSubmit={handleLogin}>
                <LoginComponents.Title>Bentornato</LoginComponents.Title>
                <LoginComponents.Input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required
                    disabled={isLoading}
                />
                <LoginComponents.Input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required
                    disabled={isLoading}
                />
                <LoginComponents.Button disabled={isLoading}>
                    {isLoading ? "Accesso in corso..." : "Accedi"}
                </LoginComponents.Button>
                <LoginComponents.clickableText to="/forgotPassword">Password dimenticata?</LoginComponents.clickableText>
                <LoginComponents.clickableText to="/register">Non hai un account? Registrati</LoginComponents.clickableText>
            </LoginComponents.Form>
        </LoginComponents.Container>
        <ToastContainer newestOnTop={true}/>
        </>
    );
}

export default Login;