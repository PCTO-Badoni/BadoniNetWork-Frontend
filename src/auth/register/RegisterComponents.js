import styled from "styled-components";
import { Link } from "react-router-dom";

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
  width: 70dvw;
  max-width: 100%;
  height: 80dvh;
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
  padding: 0 50px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 20px;
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
  padding: 0 200px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  padding-top: 20px;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  ${(props) => props.visible === false && `display: none;`}
`;

export const Input = styled.input`
  background-color: #ffffff;
  border: 3px solid #eee;
  padding: 12px 15px;
  width: 100%;
  border-radius: 15px;
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #5865f2;
  background-color: #5865f2;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin: 8px 0 0;

  z-index: 50;

  &:focus {
    outline: none;
  }
`;

export const StepsNavButton = styled.button`
  border-radius: 20px;
  color: BLACK;
  background: none;
  font-size: 30px;
  padding: 6px 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.5s ease-in-out;
  margin: 8px 20px 20px 20px;
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
  padding: 0 40px;
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
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

export const Header = styled.div`
  background-color: white;
  color: #ffffff;
  padding: 10px;
  text-align: center;
  border-radius: 10px 10px 0 0;
`;

export const AlreadyRegistered = styled(Link)`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: inherit; // Add this to keep the inherited color
  text-decoration: none; // Add this to remove the underline
  margin: 10px 0 30px;
`;

export const UploadForm = styled.form`
  display: flex;
  margin-top: 55px;
  flex-direction: column;
  justify-content: center; /* Distribuisce equamente gli elementi verticalmente */
  align-items: center; /* Centra gli elementi orizzontalmente */
  border: 2px dashed #1475cf;
  height: 370px;
  width: 650px;
  cursor: pointer;
  border-radius: 5px;

  /* Centra il form nella pagina */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
