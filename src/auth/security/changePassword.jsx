import * as ChangePasswordComponents from "../../auth/security/ChangePasswordComponents";
import React, { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import * as ForgotPasswordComponents from "./ForgotPasswordComponents";
import * as Components from "../register/RegisterComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import StrengthMeter from "../register/StrengthMeter";
import PasswordChecklist from "react-password-checklist";
import { useParams } from 'react-router-dom';

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

function ChangePassword() {
  const { email } = useParams();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [pwdInput, initValue] = useState({
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isStrong, initRobustPassword] = useState(null);
  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const initPwdInput = async (childData) => {
    initRobustPassword(childData);
  };

  const onChange = (e) => {
    let password = e.target.value;
    initValue({
      ...pwdInput,
      password: e.target.value,
    });
  };

  async function submitPassword(event) {
    event.preventDefault();
    
    if (password === confirmPassword && isValid) {

      const data = {
        email,
        password,
        confirmPassword
      };

      try {
          const response = await fetch(prefix+"/change-password-recovery", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
          });

          if (!response.ok) {
              const errorData = await response.json();
              error(errorData.message || "Errore durante il login");
              throw new Error("HTTP error! status: " + response.status);
          }

          const responseData = await response.json();
          console.log(responseData)
          responseView("Password modificata correttamente!");
        } catch {

      }
    } else if (password !== confirmPassword) {
      error("Le password non corrispondono");
      return;
    } else {
      error("Password non sicura");
      return;
    }

    const data = {
      password,
      confirmPassword,
    };
  }

  return (
    <>
      <ChangePasswordComponents.Container>
        <ChangePasswordComponents.Form onSubmit={submitPassword}>
          <ChangePasswordComponents.Title>
            Modifica Password
          </ChangePasswordComponents.Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              width: "100%",
            }}
          >
            <label htmlFor="Password">Password</label>
            <div style={{ position: "relative", display: "inline-block" }}>
              <Components.Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  onChange(e);
                  setShowPasswordChecklist(e.target.value !== "");
                }}
                onBlur={() => setShowPasswordChecklist(false)}
                onInput={(e) => setShowPasswordChecklist(e.target.value !== "")}
                style={{ paddingRight: "30px" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  border: "none",
                  background: "transparent",
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  cursor: "pointer",
                  zIndex: 200,
                  transform: "translateY(-50%)",
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <StrengthMeter password={pwdInput.password} actions={initPwdInput} />
          {showPasswordChecklist && (
            <PasswordChecklist
              rules={[
                "minLength",
                "lowercase",
                "capital",
                "number",
                "specialChar",
              ]}
              minLength={8}
              value={password}
              valueAgain={confirmPassword}
              onChange={setIsValid}
              style={{ textAlign: "left", fontSize: "14px" }}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              width: "100%",
            }}
          >
            <label htmlFor="Conferma password">Conferma Password</label>
            <Components.Input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
          </div>
          <ChangePasswordComponents.Button>
            Conferma
          </ChangePasswordComponents.Button>
        </ChangePasswordComponents.Form>
      </ChangePasswordComponents.Container>
      <ToastContainer newestOnTop={true} />
    </>
  );
}

export default ChangePassword;
