import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./auth/register/register";
import HomePage from "./main/homePage";
import OTP from "./OTP/indexOTP";
import Login from "./auth/login/login";
import ReactDOM from "react-dom";
import EmailSent from "./auth/register/email/emailSent";
import ForgotPassword from "./auth/security/forgotPassword";
import {PhotoProvider} from "./auth/register/steps/profilePicture/PhotoContext";
import StudentProfile from "./main/Pages/studentProfile/studentProfile";

function PageController() {
    return (
        <div>
            page controller
        </div>

    );
}

export default PageController;

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/OTP" element={<OTP />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/homepage/studentProfile/:id" element={<StudentProfile />} />
        </Routes>
    </Router>,
    rootElement
);