import * as OTPComponents from "./OTPComponents";
import React from "react";
import "../styles.css";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Footer from "../footer";

const prefix = import.meta.env.VITE_DEFAULT_HOST_DOMAIN

const error = (message) => toast.error( message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
});

const responseView = (body) => toast.success(body, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
});


function OTP() {
    const [num1, setNum1] = React.useState("");
    const [num2, setNum2] = React.useState("");
    const [num3, setNum3] = React.useState("");
    const [num4, setNum4] = React.useState("");
    const [num5, setNum5] = React.useState("");
    const [num6, setNum6] = React.useState("");

    let navigate = useNavigate();

    async function handleOnClick(event){
       event.preventDefault();

       const codice = num1 + num2 + num3 + num4 + num5 + num6;

       const data = {
           codice
       };

       try {
           const response = await fetch(prefix+"/register/validate-otp", {
               method: "POST",
                headers: {
                     "Content-Type": "application/json"
                },
               body: JSON.stringify(data)
           });

           if (!response.ok) {
               const errorData = await response.json();
               error(errorData.message || "Errore durante la verifica del codice OTP");
               throw new Error("HTTP error! status: " + response.status);
           }

           const responseData = await response.json();
           responseView(responseData.message);
       } catch (error) {
           console.error("There was an error!", error);
       }
    }

    return (
        <>
            <OTPComponents.Container>
                <OTPComponents.form>
                    <OTPComponents.h4>Inserisci il codice ricevuto</OTPComponents.h4>
                    <div>
                        <OTPComponents.otpInput value={num1} onChange={e => setNum1(e.target.value)} type="text"
                                                placeholder=""/>
                        <OTPComponents.otpInput value={num2} onChange={e => setNum2(e.target.value)} type="text"
                                                placeholder=""/>
                        <OTPComponents.otpInput value={num3} onChange={e => setNum3(e.target.value)} type="text"
                                                placeholder=""/>
                        <OTPComponents.otpInput value={num4} onChange={e => setNum4(e.target.value)} type="text"
                                                placeholder=""/>
                        <OTPComponents.otpInput value={num5} onChange={e => setNum5(e.target.value)} type="text"
                                                placeholder=""/>
                        <OTPComponents.otpInput value={num6} onChange={e => setNum6(e.target.value)} type="text"
                                                placeholder=""/>
                    </div>
                    <OTPComponents.verifyButton id="verifyButton" onClick={handleOnClick}>Verifica</OTPComponents.verifyButton>
                </OTPComponents.form>
            </OTPComponents.Container>
            <ToastContainer newestOnTop={true}/>
        </>
    );
}

export default OTP;