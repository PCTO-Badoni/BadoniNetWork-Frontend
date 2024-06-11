import React, { useState } from "react";
import * as Components from "../../RegisterComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import StrengthMeter from "../../StrengthMeter";
import PasswordChecklist from "react-password-checklist";

const Step1 = React.memo(
  ({
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmitStudente,
    isRegisterClicked,
    handleNext,
    passwordsMatch,
    setPasswordStrength,
  }) => {
    const [pwdInput, initValue] = useState({
      password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isStrong, initRobustPassword] = useState(null);
    const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const initPwdInput = async (childData) => {
      initRobustPassword(childData);
      setPasswordStrength(childData);
    };

    const onChange = (e) => {
      let password = e.target.value;
      initValue({
        ...pwdInput,
        password: e.target.value,
      });
    };

    return (
      <Components.Form
        onSubmit={(event) => handleSubmitStudente(event, isValid)}
        style={{ padding: "200px 50px" }}
      >
        <Components.Title visible={!isRegisterClicked}>
          Studente
        </Components.Title>
        <label htmlFor="email">Email</label>
        <Components.Input
          type="email"
          placeholder="es. rssmra04t18d416e@iisbadoni.edu.it"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <label htmlFor="Conferma password">Conferma Password</label>
        <Components.Input
          type={showPassword ? "text" : "password"}
          passwordsMatch={passwordsMatch}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          required
          style={passwordsMatch ? {} : { outline: "2px solid red" }}
        />
        <Components.Button type={"submit"}>Continua</Components.Button>
        <Components.AlreadyRegistered to="/login">
          Hai già un account? Accedi
        </Components.AlreadyRegistered>
      </Components.Form>
    );
  },
);

export default Step1;
