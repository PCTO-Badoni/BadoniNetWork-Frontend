import React, { useState } from "react";
import * as Components from "./RegisterComponents";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "react-tooltip/dist/react-tooltip.css";
import "flatpickr/dist/themes/material_blue.css";
import { PhotoProvider } from "./steps/profilePicture/PhotoContext";
import Step1 from "./steps/emailPassword/Step1";
import Step2 from "./steps/personalInfo/Step2";
import Step3 from "./steps/profilePicture/Step3";
import Step4 from "./steps/skills/Step4";
import Step5 from "./steps/addressSelector/Step5";
import Step6 from "./steps/recap/Step6";

const arrowLeft = <FontAwesomeIcon icon={faChevronLeft} />;
const arrowRight = <FontAwesomeIcon icon={faChevronRight} />;
const save = <FontAwesomeIcon icon={faSave} />;
const errore = "";
const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

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

const emailSent = () =>
  toast.success("Richiesta inviata!", {
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

function Register() {
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [signIn, toggle] = useState(true);
  const [ragionesociale, setRagione] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [password, setPassword] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);
  const [isRegisterClicked, setRegisterClicked] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [erroreNome, setErroreNome] = useState(false);
  const [erroreCognome, setErroreCognome] = useState(false);
  const [erroreData, setErroreData] = useState(false);
  const [erroreTelefono, setErroreTelefono] = useState(false);
  const [minSelectedChips, setMinSelectedChips] = useState(4);
  const [articolazione, setArticolazione] = useState("");
  const [pronomi, setPronomi] = useState("");

  let navigate = useNavigate();

  async function handleSubmitAzienda(event) {
    setIsSending(true);
    event.preventDefault();

    const data = { ragionesociale, email, telefono, indirizzo };
    const formBody = Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]),
      )
      .join("&");

    try {
      const response = await fetch("http://localhost:8080/register/azienda", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });

      if (!response.ok) {
        const errorData = await response.json();
        error(errorData.message || "Errore durante la richiesta");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.log("Response is not JSON. It is:", contentType);
      }

      setIsSending(false);
      emailSent();
    } catch (error) {
      console.log("Error:", error);
      setIsSending(false);
    }
  }

  async function handleSubmitStudente(event, isValid) {
    event.preventDefault();

    // Check if email ends with "@iisbadoni.edu.it"
    if (!email.endsWith("@iisbadoni.edu.it")) {
      error("Email non valida");
      return;
    }

    const data = {
      email: email,
    };

    try {
      const response = await fetch("http://localhost:8080/api/verify-email", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        error(errorData.message || "Errore durante la richiesta");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.message !== "Email valida") {
        responseView(responseData.message);
      }

      handleNext(isValid);
      /*
                  const contentType = response.headers.get("content-type");
                  if (contentType && contentType.indexOf("application/json") !== -1) {
                      const responseData = await response.json();
                      console.log(responseData);
                  } else {
                      console.log("Response is not JSON. It is:", contentType);
                  } */
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const handleNext = (isValid) => {
    if (activeStep === 0) {
      if (password === confirmPassword && isValid) {
        setRegisterClicked(true);
        setPassword("");
        setConfirmPassword("");
      } else if (password !== confirmPassword) {
        toast.error("Le password non corrispondono");
        setPasswordsMatch(false);
        return;
      } else {
        toast.error("Password non sicura");
        return;
      }
    } else if (activeStep === 1) {
      // check if nome and cognome are not empty
      if (nome.split(" ").join("") === "") {
        error("Nome non può essere vuoto");
        setErroreNome(true);
        return;
      } else {
        setErroreNome(false);
      }
      if (cognome.split(" ").join("") === "") {
        error("Cognome non può essere vuoto");
        setErroreCognome(true);
        return;
      } else {
        setErroreCognome(false);
      }
      // check if deadlineDate is not less 16 years old
      if (Date.now() - deadlineDate < 16 * 365 * 24 * 60 * 60 * 1000) {
        error("Devi avere almeno 16 anni");
        setErroreData(true);
        return;
      } else {
        setErroreData(false);
      }
      const regex = /^(?:(?:\+39)?\s?)(0\d{1,4}\s?\d{5,8}|3\d{2}\s?\d{6,7})$/;
      if (!regex.test(telefono)) {
        error("Numero non valido");
        setErroreTelefono(true);
        return;
      } else {
        setErroreTelefono(false);
      }
    } else if (activeStep === 3) {
      console.log(articolazione);
      if (articolazione === "") {
        error("Selezione l'articolazione");
        return;
      }
      if (minSelectedChips > 0) {
        error("Seleziona almeno 3 competenze");
        return;
      }
    }
    setMinSelectedChips(4);
    if (activeStep < 5) {
      setArticolazione("");
      setPronomi("");
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 1) setRegisterClicked(false);
  };

  const stepTitles = [
    <Components.Title style={{ paddingTop: "55px" }}>
      Informazioni Personali
    </Components.Title>,
    <Components.Title>Immagine Profilo</Components.Title>,
    <Components.Title>Competenze</Components.Title>,
    <Components.Title>Indirizzo</Components.Title>,
    <Components.Title>Titolo 5</Components.Title>,
  ];

  const stepComponents = [
    <Step1
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      passwordsMatch={passwordsMatch}
      handleSubmitStudente={handleSubmitStudente}
      setPasswordStrength={setPasswordStrength}
      isRegisterClicked={isRegisterClicked}
      handleNext={handleNext}
      erroreNome={erroreNome}
      erroreCognome={erroreCognome}
    />,
    <Step2
      deadlineDate={deadlineDate}
      setDeadlineDate={setDeadlineDate}
      nome={nome}
      setNome={setNome}
      cognome={cognome}
      setCognome={setCognome}
      telefono={telefono}
      setTelefono={setTelefono}
      indirizzo={indirizzo}
      setIndirizzo={setIndirizzo}
      erroreNome={erroreNome}
      erroreCognome={erroreCognome}
      erroreData={erroreData}
      erroreTelefono={erroreTelefono}
      setPronomi={setPronomi}
    />,
    <Step3 stepTitles={stepTitles} />,
    <Step4
      minSelectedChips={minSelectedChips}
      setMinSelectedChips={setMinSelectedChips}
      setArticolazione={setArticolazione}
      selectedChips={selectedChips}
      setSelectedChips={setSelectedChips}
    />,
    <Step5 />,
    <Step6 />,
  ];

  return (
    <>
      <PhotoProvider>
        <Components.Container>
          <Components.AziendaContainer signingIn={signIn}>
            {isSending ? (
              <Components.sendingEmail>
                invio richiesta in corso...
              </Components.sendingEmail>
            ) : (
              <Components.Form
                onSubmit={handleSubmitAzienda}
                style={{ padding: "200px 50px" }}
              >
                <Components.Title>Azienda</Components.Title>
                <label htmlFor="name">Ragione sociale</label>
                <Components.Input
                  type="ragione_sociale"
                  placeholder="es. Azienda S.p.A."
                  value={ragionesociale}
                  onChange={(e) => setRagione(e.target.value)}
                  required
                />
                <label htmlFor="name">Email</label>
                <Components.Input
                  type="email"
                  placeholder="es. azienda@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="name">Telefono</label>
                <Components.Input
                  type="telefono"
                  placeholder="es. 123 456 7890"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
                <label htmlFor="name">Indirizzo</label>
                <Components.Input
                  type="indirizzo"
                  placeholder="es. Via Rivolta 10"
                  value={indirizzo}
                  onChange={(e) => setIndirizzo(e.target.value)}
                  required
                />
                <Components.Button type="submit">
                  Richiedi Accesso
                </Components.Button>
                <Components.AlreadyRegistered to="/login">
                  Hai già un account? Accedi
                </Components.AlreadyRegistered>
              </Components.Form>
            )}
          </Components.AziendaContainer>
          <Components.StudenteContainer
            className={isRegisterClicked ? "shrinking" : ""}
            isRegisterClicked={isRegisterClicked}
            signingIn={signIn}
          >
            {isRegisterClicked && (
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${(activeStep / steps.length) * 100}%`,
                  }}
                ></div>
                <div className="progress-step">
                  <span
                    className={
                      activeStep >= 1
                        ? "progress-step-text-completed"
                        : "progress-step-text"
                    }
                  >
                    1
                  </span>
                </div>
                <div className="progress-step">
                  <span
                    className={
                      activeStep >= 2
                        ? "progress-step-text-completed"
                        : "progress-step-text"
                    }
                  >
                    2
                  </span>
                </div>
                <div className="progress-step">
                  <span
                    className={
                      activeStep >= 3
                        ? "progress-step-text-completed"
                        : "progress-step-text"
                    }
                  >
                    3
                  </span>
                </div>
                <div className="progress-step">
                  <span
                    className={
                      activeStep >= 4
                        ? "progress-step-text-completed"
                        : "progress-step-text"
                    }
                  >
                    4
                  </span>
                </div>
                <div className="progress-step">
                  <span
                    className={
                      activeStep >= 5
                        ? "progress-step-text-completed"
                        : "progress-step-text"
                    }
                  >
                    5
                  </span>
                </div>
              </div>
            )}
            {activeStep >= 1 ? stepTitles[activeStep - 1] : null}
            {stepComponents[activeStep]}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "10px",
                paddingRight: "50px",
                paddingLeft: "50px",
              }}
            >
              <Components.StepsNavButton
                isRegisterClicked={isRegisterClicked}
                onClick={() => {
                  activeStep === 0 ? setRegisterClicked(false) : handleBack();
                }}
                disabled={!isRegisterClicked}
              >
                {arrowLeft}
              </Components.StepsNavButton>
              <Components.StepsNavButton
                isRegisterClicked={isRegisterClicked}
                onClick={() => {
                  !isRegisterClicked ? setRegisterClicked(true) : handleNext();
                }}
                disabled={!isRegisterClicked}
              >
                {activeStep === steps.length - 1 ? save : arrowRight}
              </Components.StepsNavButton>
            </div>
          </Components.StudenteContainer>
          <Components.OverlayContainer
            className={isRegisterClicked ? "shrinking" : ""}
            isRegisterClicked={isRegisterClicked}
            signingIn={signIn}
          >
            <Components.Overlay signingIn={signIn}>
              <Components.LeftOverlayPanel signingIn={signIn}>
                <Components.Title>Benvenuto!</Components.Title>
                <Components.Paragraph>
                  Sei uno studente? Clicca qui sotto!
                </Components.Paragraph>
                <Components.GhostButton
                  onClick={() => {
                    isSending
                      ? toast.error("Attendi l'invio della richiesta")
                      : toggle(true);
                  }}
                >
                  Studente
                </Components.GhostButton>
              </Components.LeftOverlayPanel>
              <Components.RightOverlayPanel signingIn={signIn}>
                <Components.Title>Benvenuto!</Components.Title>
                <Components.Paragraph>
                  Sei un'azienda? Clicca qui sotto!
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Azienda
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
        <ToastContainer newestOnTop={true} />
      </PhotoProvider>
    </>
  );
}

export default Register;
