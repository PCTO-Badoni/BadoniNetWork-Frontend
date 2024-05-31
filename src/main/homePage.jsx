import * as HomeComponents from "./HomeComponents.js";
import ReactDOM from "react-dom";
import React from "react";
import "../styles.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"; // Modifica qui
import Register from '../auth/register/register';

function HomePage() {
    return (
        <HomeComponents.Container>
            {/* Aggiungi qui il contenuto della tua homepage */}
        </HomeComponents.Container>
    );
}
export default HomePage;