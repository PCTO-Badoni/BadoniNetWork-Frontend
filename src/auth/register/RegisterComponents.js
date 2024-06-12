import styled from "styled-components";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";

// const show = keyframes`
//   0%, 49.99% {
// 		opacity: 0;
// 		z-index: 1;
// 	}

// 	50%, 100% {
// 		opacity: 1;
// 		z-index: 5;
// 	}
// `;

// const hide = keyframes`
//   0%, 49.99% {
//     opacity: 1;
//     z-index: 5;
//   }

//   50%, 100% {
//     opacity: 0;
//     z-index: 1;
//   }
// `

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 70vw;
  max-width: 100%;
  height: 80vh;
  margin-top: 13em;
`;

export const sendingEmail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 1.25rem;
  color: #333;
`;

export const AziendaContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  width: 50%;
  left: 0;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signingIn !== true
      ? `transform: translateX(100%); opacity: 1; z-index: 5;`
      : null}
`;

export const StudenteContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => (!props.isRegisterClicked ? "50%" : "100%")};
  z-index: 1;
  ${(props) =>
    props.signingIn !== true
      ? `transform: translateX(100%);`
      : `transform: translateX(0%)`}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 12.5rem;
  margin: auto 0;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  padding-top: 1.25rem;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  ${(props) => props.visible === false && `display: none;`}
`;

export const Input = styled.input`
  background-color: #ffffff;
  border: 3px solid #eee;
  padding: 0.75rem;
  width: 100%;
  border-radius: 15px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  outline: ${(props) => (props.error ? "solid red 2px" : null)};
`;

export const DataDiNascita = styled(Flatpickr)`
  outline: ${(props) => (props.error ? "solid red 2px" : null)};
  font-size: 1rem;
`;

export const Select = styled.select`
  background-color: #ffffff;
  border: 3px solid #eee;
  padding: 0.75rem;
  width: 100%;
  border-radius: 15px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  text-align: left;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #5865f2;
  background-color: #5865f2;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.75rem 2.8125rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin: 0.5rem 0 0;

  z-index: 50;

  &:focus {
    outline: none;
  }
`;

export const StepsNavButton = styled.button`
  border-radius: 20px;
  color: BLACK;
  background: none;
  font-size: 1.875rem;
  padding: 0.375rem 0.9375rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.5s ease-in-out;
  margin: 0.5rem 1.25rem 1.25rem 1.25rem;
  z-index: 50;
  border: none;
  ${(props) => (props.isRegisterClicked === true ? `opacity: 1` : `opacity: 0`)}

  &:focus {
    outline: none;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  z-index: 200;
  transform-origin: right;
  ${(props) =>
    props.signingIn !== true
      ? `transform: translateX(-100%);`
      : `transform: translateX(0%);`}
  ${(props) =>
    props.isRegisterClicked === true ? `transform: translateX(100%);` : null}
`;

export const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #5865f2, #b258f2);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transition: all 0.6s ease-in-out;
  ${(props) =>
    props.signingIn !== true
      ? `transform: translateX(50%);`
      : `transform: translateX(0%);`}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 2.5rem;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
  font-size: 0.875rem;
  font-weight: 100;
  line-height: 1.25rem;
  letter-spacing: 0.5px;
  margin: 1.25rem 0 1.875rem;
`;

export const Header = styled.div`
  background-color: white;
  color: #ffffff;
  padding: 0.625rem;
  text-align: center;
  border-radius: 10px 10px 0 0;
`;

export const AlreadyRegistered = styled(Link)`
  font-size: 0.875rem;
  font-weight: 100;
  line-height: 1.25rem;
  letter-spacing: 0.5px;
  color: inherit; // Add this to keep the inherited color
  text-decoration: none; // Add this to remove the underline
  margin: 0.625rem 0 1.875rem;
`;

export const UploadForm = styled.form`
  display: flex;
  margin-top: 3.4375rem;
  flex-direction: column;
  justify-content: center; /* Distribuisce equamente gli elementi verticalmente */
  align-items: center; /* Centra gli elementi orizzontalmente */
  border: 2px dashed #1475cf;
  height: 16.875rem;
  width: 31.25rem;
  cursor: pointer;
  border-radius: 5px;

  /* Centra il form nella pagina */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const chipsBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: -4rem;
  padding-bottom: 1.25rem;
  padding-left: 4rem;
  padding-right: 4rem;
`;

export const AddressSelector = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 10em;
  padding-right: 10em;
  height: 50%;
`;

export const MapButton = styled.button`
  border-radius: 20px;
  border: 1px solid #5865f2;
  background-color: #5865f2;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  margin-left: 1rem;
  width: 60px;

  z-index: 50;

  &:focus {
    outline: none;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
`;


export const FooterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1.25rem;

  background-color: #f0f0f0;  
  width: 30px;
  border: none;
  
  &:hover {
    cursor: pointer;
    background-color: #f9f9f9;
  }
`;
