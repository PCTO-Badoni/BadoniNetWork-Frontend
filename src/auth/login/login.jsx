import * as LoginComponents from "./LoginComponents";
import ReactDOM from "react-dom";
import React from "react";
import "../../styles.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"; // Modifica qui

function Login() {
    return (
        <LoginComponents.Container>
            <LoginComponents.Form>
                <LoginComponents.Title>Bentornato</LoginComponents.Title>
                <LoginComponents.Input type="email" placeholder="Email" required/>
                <LoginComponents.Input type="password" placeholder="Password" required/>
                <LoginComponents.Button>Accedi</LoginComponents.Button>
                <LoginComponents.clickableText to="/forgotPassword">Password Dimenticata</LoginComponents.clickableText>
                <LoginComponents.clickableText to="/">Non hai un account? Registrati</LoginComponents.clickableText>
            </LoginComponents.Form>
        </LoginComponents.Container>
    );
}
export default Login;