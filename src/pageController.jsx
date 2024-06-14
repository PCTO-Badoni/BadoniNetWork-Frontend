import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./auth/register/register";
import MainPage from "./main/mainPage";
import OTP from "./OTP/indexOTP";
import Login from "./auth/login/login";
import ReactDOM from "react-dom";
import EmailSent from "./auth/register/email/emailSent";
import ForgotPassword from "./auth/security/forgotPassword";
import { PhotoProvider } from "./auth/register/steps/profilePicture/PhotoContext";
import StudentProfile from "./main/Pages/studentProfile/studentProfile";
import * as Components from './ControllerComponents';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInbox} from "@fortawesome/free-solid-svg-icons";
import {students} from "./main/Components/students";
import {ToastContainer} from "react-toastify";

async function fetchNotifications() {
    // Qui dovresti fare la chiamata alla tua API o al tuo servizio per ottenere le notifiche
    // Per ora, restituisco un array di notifiche fittizio
    return [
        { id: 1, text: 'Notifica 1' },
        { id: 2, text: 'Notifica 2' },
        { id: 3, text: 'Notifica 3' },
        { id: 4, text: 'Notifica 1' },
        { id: 5, text: 'Notifica 2' },
        { id: 6, text: 'Notifica 3' },
        { id: 7, text: 'Notifica 1' },
        { id: 8, text: 'Notifica 2' },
        { id: 9, text: 'Notifica 3' },
    ];
}

async function deleteNotification(id) {
    // Qui dovresti fare la chiamata alla tua API o al tuo servizio per eliminare la notifica
    console.log(`Notifica ${id} eliminata`);
}

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

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications().then(setNotifications);
    }, []);

    const handleDeleteClick = (id) => {
        deleteNotification(id).then(() => {
            setNotifications(notifications.filter(notification => notification.id !== id));
        });
    };

    useBodyScroll();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const bellIcon = <FontAwesomeIcon icon={faInbox} />

    const handleNotificationClick = () => {
        setPopupOpen(!isPopupOpen);
    };

    return (
        <>
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
                    <Components.NotificationButton onClick={handleNotificationClick} notificationNumber={notifications.length}>
                        {bellIcon}
                    </Components.NotificationButton>
                    {isPopupOpen && (
                        notifications.length > 0 ? (
                        <Components.NotificationsContainer>
                            notifiche non lette: {notifications.length}
                            {notifications.map(notification => (
                                <Components.NotificationItem key={notification.id}>
                                    <p>{notification.text}</p>
                                    <button onClick={() => handleDeleteClick(notification.id)}>Elimina</button>
                                </Components.NotificationItem>
                            ))}
                        </Components.NotificationsContainer>
                        ) : null)}
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
                <Route path="/register" element={<Register/>}/>
                <Route path="/homepage" element={<MainPage/>}/>
                <Route path="/OTP" element={<OTP/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                <Route path="/homepage/studentProfile/:id" element={<StudentProfile />} />
            </Routes>
        </div>
    </Router>,
    rootElement

);
