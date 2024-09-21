import * as ForgotPasswordComponents from "../../auth/security/ForgotPasswordComponents";
import React from "react";
import {Bounce, toast, ToastContainer} from "react-toastify";

const prefix = import.meta.env.VITE_DEFAULT_HOST_DOMAIN

const responseView = (body) =>
    toast.success(body, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

const error = (message) =>
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

function ForgotPassword() {

    const [email, setEmail] = React.useState("");

    async function passwordRecovery(event) {
        event.preventDefault();

        const data = {
            email
        };

        try {
            const response = await fetch(prefix+"/password-recovery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                error(errorData.message || "Errore durante la connessione");
                throw new Error("HTTP error! status: " + response.status);
            }

            const responseData = await response.json();
            console.log(responseData.message)
            responseView(responseData.message);
        } catch (error) {
            console.error("There was an error!", error);
        }
    }

    return (
        <>
            <ForgotPasswordComponents.Container>
                <ForgotPasswordComponents.Form onSubmit={passwordRecovery}>
                    <ForgotPasswordComponents.Title>Recupero Password</ForgotPasswordComponents.Title>
                    <ForgotPasswordComponents.Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    <ForgotPasswordComponents.Button>Invia mail</ForgotPasswordComponents.Button>
                    <ForgotPasswordComponents.clickableText to="/login">Ricordi la password?<br />Effettua ora il login</ForgotPasswordComponents.clickableText>
                </ForgotPasswordComponents.Form>
            </ForgotPasswordComponents.Container>
            <ToastContainer newestOnTop={true}/>
        </>
    );
}

export default ForgotPassword; // Aggiungi questa riga per esportare App come esportazione predefinita