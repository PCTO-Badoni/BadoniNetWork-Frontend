import styled from "styled-components";
import batmanLogo from "../../assets/logo.png";

export const Container = styled.div`
  background-color: #fff;
  padding: 30px 65px;
  border-radius: 12px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  height: 20em;
  width: 30em;
`;

export const h4 = styled.h4`
  font-size: 1.25rem;
  color: #333;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
`;

export const otpInput = styled.input.attrs((props) => ({
  maxLength: 1,
  type: "text",
  onInput: (e) => {
    if (e.target.value) {
      const next = e.target.nextElementSibling;
      if (next) {
        next.focus();
      }
    }
  },
  onKeyDown: (e) => {
    if (e.key === "Backspace" && e.target.value === "") {
      const back = e.target;
      if (back.previousElementSibling) {
        back.previousElementSibling.focus();
      }
    }
  },
}))`
  width: 42px;
  height: 50px;
  padding: 10px;
  margin: 5px 5px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
`;

export const form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const verifyButton = styled.button`
  border-radius: 20px;
  border: 1px solid #5865f2;
  background-color: ${(props) => (props.isCodeVerified ? "green" : "#5865f2")};
  color: #ffffff;
  margin: 8px 0;
  font-size: 14px;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;
