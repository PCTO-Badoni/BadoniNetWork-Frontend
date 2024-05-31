import * as OTPComponents from "./homeComponents.js";
import ReactDOM from "react-dom";
import React from "react";
import "../styles.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"; // Modifica qui
import App from '../auth';

function HomePage() {
    return (
        <OTPComponents.Container>
            {/* Aggiungi qui il contenuto della tua homepage */}
        </OTPComponents.Container>
    );
}
export default HomePage;