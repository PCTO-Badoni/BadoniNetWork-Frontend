import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./auth/register/register";
import HomePage from "./main/homePage";
import OTP from "./OTP/indexOTP";
import Login from "./auth/login/login";
import ReactDOM from "react-dom";
import EmailSent from "./auth/register/email/emailSent";
import ForgotPassword from "./auth/security/forgotPassword";
import { PhotoProvider } from "./auth/register/steps/profilePicture/PhotoContext";
import StudentProfile from "./main/Pages/studentProfile/studentProfile";
import * as Components from './MainComponents';

function useBodyScroll() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/' || location.pathname.includes('/otp') || location.pathname.includes('/forgotPassword')) {
            document.body.style.overflow = 'clip';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [location]);
}

function PageController() {
    useBodyScroll();
    return null;
}

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Router>
        <PageController />
        <Components.Header>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: '1%',
                width: '5%'
            }}>
                <Components.Logo/>
                <h3>Badoni NetWork</h3>
            </div>
        </Components.Header>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 6em)', // sottrai l'altezza dell'header
        }}>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/OTP" element={<OTP />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/homepage/studentProfile/:id" element={<StudentProfile />} />
            </Routes>
        </div>
    </Router>,
    rootElement
);
