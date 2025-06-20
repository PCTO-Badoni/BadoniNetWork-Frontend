import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Register from "./auth/register/register";
import MainPage from "./main/mainPage";
import OTP from "./OTP/indexOTP";
import Login from "./auth/login/login";
import CompletaRegistrazioneAzienda from './auth/register/azienda/CompletaRegistrazioneAzienda';
import ReactDOM from "react-dom";
import EmailSent from "./auth/register/email/emailSent";
import ForgotPassword from "./auth/security/forgotPassword";
import ChangePassword from "./auth/security/changePassword";
import { PhotoProvider } from "./auth/register/steps/profilePicture/PhotoContext";
import StudentProfile from "./main/Pages/studentProfile/studentProfile";
import * as Components from "./ControllerComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { students } from "./main/Components/students";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { useParams } from "react-router-dom";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Menu } from "primereact/menu";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";

import setCssVariables from "./setCssVariables";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { setCSSVariables, switchTheme } from "./constants/colors";

document.addEventListener("DOMContentLoaded", () => {
  setCSSVariables();

  setCssVariables();
});

async function fetchNotifications() {
  return [
    { id: 1, text: "Notifica 1" },
    { id: 2, text: "Notifica 2" },
    { id: 3, text: "Notifica 3" },
    { id: 4, text: "Notifica 4" },
    { id: 5, text: "Notifica 5" },
    { id: 6, text: "Notifica 6" },
    { id: 7, text: "Notifica 7" },
    { id: 8, text: "Notifica 8" },
    { id: 9, text: "Notifica 9" },
  ];
}

async function deleteNotification(id) {
  console.log(`Notifica ${id} eliminata`);
}

function useBodyScroll() {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname.includes("/otp") ||
      location.pathname.includes("/forgotPassword")
    ) {
      document.body.style.overflow = "clip";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [location]);
}

function PageController() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Aggiungi questo hook

  const [_, setForceUpdate] = useState(false); // Forza il re-render quando cambia il tema

  const handleThemeSwitch = () => {
    switchTheme(); // Cambia il tema nel file colors.js
  };

  useEffect(() => {
    fetchNotifications().then(setNotifications);
  }, []);

  const handleDeleteClick = (id) => {
    deleteNotification(id).then(() => {
      setNotifications(
        notifications.filter((notification) => notification.id !== id),
      );
    });
  };

  useBodyScroll();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const bellIcon = <FontAwesomeIcon icon={faInbox} />;

  const handleNotificationClick = () => {
    setPopupOpen(!isPopupOpen);
  };

  let menuRight = useRef(null);

  const itemRenderer = (item) => (
    <div className="p-menuitem-content" onClick={item.command}>
      <a className="flex align-items-center p-menuitem-link">
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
        {item.badge && <Badge className="ml-auto" value={item.badge} />}
        {item.shortcut && (
          <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
            {item.shortcut}
          </span>
        )}
      </a>
    </div>
  );

  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const toast = useRef(null);
  let notificationMenu = useRef(null);

  let items = [
    {
      label: "Profilo",
      color: "var(--contrastColor)",
      backgroundColor: "var(--firstColor)",
      style: {
        backgroundColor: "var(--firstColor)",
        color: "var(--contrastColor)",
      },
      items: [
        {
          backgroundColor: "var(--firstColor)",
          label: "Modifica Profilo",
          icon: "pi pi-user-edit",
          color: "var(--contrastColor)",
          template: itemRenderer,
          style: {
            backgroundColor: "var(--firstColor)",
            color: "var(--contrastColor)",
          },
          command: () => {
            navigate("/student/edit-profile");
          },
        },
        {
          backgroundColor: "var(--firstColor)",
          label: "Notifiche",
          icon: "pi pi-inbox",
          color: "var(--contrastColor)",
          badge: notifications.length > 0 ? notifications.length : null,
          template: itemRenderer,
          style: {
            backgroundColor: "var(--firstColor)",
            color: "var(--contrastColor)",
          },
          command: (event) => {
            event.stopPropagation();
            setNotificationOpen(!isNotificationOpen);
          },
        },
        {
          label: "Impostazioni",
          icon: "pi pi-cog",
          shortcut: "⌘+O",
          template: itemRenderer,
          style: {
            backgroundColor: "var(--firstColor)",
            color: "var(--contrastColor)",
          },
          command: () => {
            navigate("/homepage#profilo");
          },
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          shortcut: "⌘+Q",
          template: itemRenderer,
          style: {
            backgroundColor: "var(--firstColor)",
            color: "var(--contrastColor)",
          },
          command: () => {
            navigate("/login");
          },
        },
      ],
    },
  ];

  let notificationItems = [
    {
      label: "Indietro",
      icon: "pi pi-arrow-left",
      template: itemRenderer,
      style: {
        backgroundColor: "var(--firstColor)",
        color: "var(--contrastColor)",
      },
      command: (event) => {
        event.stopPropagation();
        setNotificationOpen(false);
      },
    },
    {
      label: "Notifiche",
      items: notifications.map((notification) => ({
        label: notification.text,
        icon: "pi pi-bell",
        template: itemRenderer,
        style: {
          backgroundColor: "var(--firstColor)",
          color: "var(--contrastColor)",
        },
        command: (event) => {
          event.stopPropagation();
          handleDeleteClick(notification.id);
        },
      })),
    },
  ];

  // Determina se nascondere l'Avatar basandoti sul percorso
  const shouldHideAvatar = ['/login', '/register', '/forgotPassword', '/OTP', '/changePassword'].some(route => 
    location.pathname.includes(route)
  );

  return (
    <PrimeReactProvider>
      <>
        <Components.Header>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: "1%",
              width: "5%",
            }}
          >
            <Components.Logo />
            <h3
              style={{ color: `var(--contrastColor)` }}
            >
              Badoni NetWork
            </h3>
          </div>
          {!shouldHideAvatar && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
                paddingRight: "1%",
                backgroundColor: "var(--firstColor)",
              }}
            >
              <Avatar
                className="p-overlay-badge"
                icon="pi pi-user"
                size="large"
                style={{
                  borderRadius: "100px",
                  backgroundColor: "var(--secondColor)",
                  color: "var(--contrastColor)",
                }}
                onClick={(event) => menuRight.current.toggle(event)}
              >
                {notifications.length > 0 && (
                  <Badge
                    value=" "
                    style={{
                      scale: "70%",
                      marginTop: "6px",
                      marginRight: "6px",
                      backgroundColor: "var(--thirdColor)",
                    }}
                  />
                )}
                <div className="card flex justify-content-center">
                  <Menu
                    model={isNotificationOpen ? notificationItems : items}
                    popup
                    ref={menuRight}
                    className="w-full md:w-15rem"
                    style={{
                      maxHeight: "25em",
                      transition: "max-height 0.5s ease-in-out",
                      overflowY: "scroll",
                      backgroundColor: "var(--firstColor)",
                      color: "var(--contrastColor)",
                    }}
                  />
                </div>
              </Avatar>
            </div>
          )}
        </Components.Header>
        <ToastContainer newestOnTop={true} />
        <Toast ref={toast} />
      </>
    </PrimeReactProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <PageController />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 6em)", // sottrai l'altezza dell'header
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/azienda/home" />} />
        <Route path="/azienda/:parametro" element={<MainPage />} />{" "}
        <Route path="/register" element={<Register />} />
        <Route path="/OTP" element={<OTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/changePassword/:email" element={<ChangePassword />} />
        <Route path="/register/completa-azienda" element={<CompletaRegistrazioneAzienda />} />
        <Route
          path="/homepage/studentProfile/:id"
          element={<StudentProfile />}
        />
      </Routes>
    </div>
  </Router>,
  root,
);
