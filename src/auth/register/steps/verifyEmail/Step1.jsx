import React, { useLayoutEffect, useState } from "react";
import * as OTPComponents from "../../../../OTP/OTPComponents";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Step1 = React.memo(({ email, setCodeVerified, isCodeVerified }) => {
  const [num1, setNum1] = React.useState("");
  const [num2, setNum2] = React.useState("");
  const [num3, setNum3] = React.useState("");
  const [num4, setNum4] = React.useState("");
  const [num5, setNum5] = React.useState("");
  const [num6, setNum6] = React.useState("");

  const [isSent, setIsSent] = React.useState(false);

  let navigate = useNavigate();

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

  useLayoutEffect(() => {
    sendOTPCode();
  }, []);

  async function sendOTPCode() {
    const data = {
      email,
    };

    if (!isCodeVerified) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/send-student-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          error(errorData.message || "Errore durante la richiesta");
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        if (responseData.message === "Verifica inviata") {
          setIsSent(true);
          responseView(responseData.message);
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
    }
  }

  async function verifyOTPCode(event) {
    event.preventDefault(); // Add this line to prevent form submission

    const codice = num1 + num2 + num3 + num4 + num5 + num6;

    const data = {
      email,
      codice,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/verify-student-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        error(errorData.message || "Errore durante la richiesta");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.message === "Codice valido") {
        setCodeVerified(true);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "10em",
      }}
    >
      <OTPComponents.form>
        <OTPComponents.h4>Inserisci il codice ricevuto</OTPComponents.h4>
        <div>
          <OTPComponents.otpInput
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            type="text"
            placeholder=""
          />
          <OTPComponents.otpInput
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            type="text"
            placeholder=""
          />
          <OTPComponents.otpInput
            value={num3}
            onChange={(e) => setNum3(e.target.value)}
            type="text"
            placeholder=""
          />
          <OTPComponents.otpInput
            value={num4}
            onChange={(e) => setNum4(e.target.value)}
            type="text"
            placeholder=""
          />
          <OTPComponents.otpInput
            value={num5}
            onChange={(e) => setNum5(e.target.value)}
            type="text"
            placeholder=""
          />
          <OTPComponents.otpInput
            value={num6}
            onChange={(e) => setNum6(e.target.value)}
            type="text"
            placeholder=""
          />
        </div>
        <OTPComponents.verifyButton
          id="verifyButton"
          isCodeVerified={isCodeVerified}
          onClick={(e) => verifyOTPCode(e)}
        >
          {isSent ? (!isCodeVerified ? "Verifica" : "Verificato") : "Invio..."}
        </OTPComponents.verifyButton>
      </OTPComponents.form>
    </div>
  );
});

export default Step1;
