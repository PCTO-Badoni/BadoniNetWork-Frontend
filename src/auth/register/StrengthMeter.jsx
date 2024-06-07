import React from "react";
import "./StrengthMeter.css";

const StrengthMeter = (props) => {
    const pwdValidate = props.password;
    const initPwdChecker = () => {
        let pwdCheck = 0;
        const validateRegex = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];

        // Check for each criteria and increase the pwdCheck count
        if (pwdValidate.length >= 8) pwdCheck += 1; // Length check

        validateRegex.forEach((regex) => {
            if (new RegExp(regex).test(pwdValidate)) {
                pwdCheck += 1;
            }
        });

        switch (pwdCheck) {
            case 0:
                return {
                    strength: 0,
                    val: "",
                };
            case 1:
                return {
                    strength: 1,
                    val: "weak",
                };
            case 2:
                return {
                    strength: 2,
                    val: "fair",
                };
            case 3:
                return {
                    strength: 3,
                    val: "good",
                };
            case 4:
                return {
                    strength: 4,
                    val: "strong",
                };
            case 5:
                return {
                    strength: 5,
                    val: "very-strong",
                };
        }
    };

    // Invoke the password checker function and pass its result to actions
    const pwdResult = initPwdChecker();
    props.actions(pwdResult.val);

    return (
        <>
            <div className="wrapper">
                <progress
                    className={`pwd-checker-bar strength-${pwdResult.val}`}
                    value={pwdResult.strength}
                    max="5"
                />
                <p className="pwd-label">
                    {props.password && (
                        <div>
                        </div>
                    )}
                </p>
            </div>
        </>
    );
};

export default StrengthMeter;
