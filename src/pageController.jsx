import React, {useEffect, useRef, useState} from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./auth/register/register";
import MainPage from "./main/mainPage";
import OTP from "./OTP/indexOTP";
import Login from "./auth/login/login";
import ReactDOM from "react-dom";
import EmailSent from "./auth/register/email/emailSent";
import ForgotPassword from "./auth/security/forgotPassword";
import ChangePassword from "./auth/security/changePassword";
import { PhotoProvider } from "./auth/register/steps/profilePicture/PhotoContext";
import StudentProfile from "./main/Pages/studentProfile/studentProfile";
import * as Components from './ControllerComponents';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInbox} from "@fortawesome/free-solid-svg-icons";
import {students} from "./main/Components/students";
import {ToastContainer} from "react-toastify";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import {Badge} from "primereact/badge";   //Optional for grouping
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import {Menu} from "primereact/menu";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";



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

    let menuRight = useRef(null);

    const items = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Refresh',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Export',
                    icon: 'pi pi-upload'
                }
            ]
        }
    ];

    return (
        <PrimeReactProvider>
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
                    <Avatar className="p-overlay-badge" icon="pi pi-user" size="large"  onClick={(event) => menuRight.current.toggle(event)}>
                        <Badge value=" " style={{scale: '80%'}}/>
                        <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />

                    </Avatar>
                </div>
            </Components.Header>
            <ToastContainer newestOnTop={true} />
        </>

        </PrimeReactProvider>
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
                <Route path="/changePassword" element={<ChangePassword/>} />
                <Route path="/homepage/studentProfile/:id" element={<StudentProfile />} />
            </Routes>
        </div>
    </Router>,
    rootElement

);
