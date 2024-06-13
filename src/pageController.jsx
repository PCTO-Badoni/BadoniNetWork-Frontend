import React, {useEffect, useState} from "react";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInbox} from "@fortawesome/free-solid-svg-icons";
import {students} from "./main/Components/students";
import {ToastContainer} from "react-toastify";

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
    const [isPopupOpen, setPopupOpen] = useState(false);
    const bellIcon = <FontAwesomeIcon icon={faInbox} />

    const handleNotificationClick = () => {
        setPopupOpen(!isPopupOpen);
    };

    return (<>
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
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: '1%',
            }}>
                <Components.NotificationButton onClick={handleNotificationClick}>
                    {bellIcon}
                </Components.NotificationButton>
                {isPopupOpen && (
                    <div className="popup">
                        ciao
                    </div>
                )}
                <Components.HeaderProfilePic dotColor={students[0].dotColor} style={{scale: '0.8'}}/>
            </div>
        </Components.Header>
    <ToastContainer newestOnTop={true} />
        </>
);
}

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Router>
        <PageController/>

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 6em)', // sottrai l'altezza dell'header
        }}>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="/homepage" element={<HomePage/>}/>
                <Route path="/OTP" element={<OTP/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                <Route path="/homepage/studentProfile/:id" element={<StudentProfile />} />
            </Routes>
        </div>
    </Router>,
    rootElement

);
