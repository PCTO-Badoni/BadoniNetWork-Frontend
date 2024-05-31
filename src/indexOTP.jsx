import * as OTPComponents from "./OTPComponents";
import ReactDOM from "react-dom";
import React from "react";
import "./styles.css";

function App() {

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
                <OTPComponents.verifyButton>Verifica</OTPComponents.verifyButton>
            </OTPComponents.form>
        </OTPComponents.Container>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
