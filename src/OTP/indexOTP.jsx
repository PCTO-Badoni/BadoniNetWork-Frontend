import * as OTPComponents from "./OTPComponents";
import React from "react";
import "../styles.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
function OTP() {
    let navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/homepage');
    }

    return (
        <OTPComponents.Container>
            <OTPComponents.form>
                <OTPComponents.Logo />
                <OTPComponents.h4>Inserisci il codice ricevuto</OTPComponents.h4>
                <div>
                    <OTPComponents.otpInput type="text" placeholder=""/>
                    <OTPComponents.otpInput type="text" placeholder=""/>
                    <OTPComponents.otpInput type="text" placeholder=""/>
                    <OTPComponents.otpInput type="text" placeholder=""/>
                    <OTPComponents.otpInput type="text" placeholder=""/>
                    <OTPComponents.otpInput type="text" placeholder=""/>
                </div>
                <OTPComponents.verifyButton id="verifyButton" onClick={handleOnClick}>Verifica</OTPComponents.verifyButton>
            </OTPComponents.form>
        </OTPComponents.Container>
    );
}

export default OTP; // Aggiungi questa riga per esportare App come esportazione predefinita