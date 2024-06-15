import * as LoginComponents from "./LoginComponents";
import ReactDOM from "react-dom";
import React from "react";
import "../../styles.css";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"; // Modifica qui

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

function Login() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleLogin(event) {
        event.preventDefault();

        const data = {
            email,
            password
        };

        try {
            const response = await fetch("http://localhost:8080/login", {
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
            console.log(responseData)
        } catch (error) {
            console.error("There was an error!", error);
        }
    }

    return (
        <>
        <LoginComponents.Container>
            <LoginComponents.Form onSubmit={handleLogin}>
                <LoginComponents.Title>Bentornato</LoginComponents.Title>
                <LoginComponents.Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
                <LoginComponents.Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
                <LoginComponents.Button>Accedi</LoginComponents.Button>
                <LoginComponents.clickableText to="/forgotPassword">Password dimenticata?</LoginComponents.clickableText>
                <LoginComponents.clickableText to="/">Non hai un account? Registrati</LoginComponents.clickableText>
            </LoginComponents.Form>
        </LoginComponents.Container>
        <ToastContainer newestOnTop={true}/>
        </>
    );
}
export default Login;