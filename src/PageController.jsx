import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./auth";
import HomePage from "./main/HomePage";
import OTP from "./OTP/indexOTP";

function PageController() {
    return (
        <>
        <div>
            <h1>Page Controller</h1>
        </div>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/OTP" element={<OTP />} />
            </Routes>
        </Router>
        </>
    );
}

export default PageController;