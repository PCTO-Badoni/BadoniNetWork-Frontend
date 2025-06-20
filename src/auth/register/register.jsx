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
import Step0 from "./steps/emailPassword/Step0";
import Step2 from "./steps/personalInfo/Step2";
import Step3 from "./steps/profilePicture/Step3";
import Step4 from "./steps/skills/Step4";
import Step5 from "./steps/addressSelector/Step5";
import Step6 from "./steps/recap/Step6";
import Step1 from "./steps/verifyEmail/Step1";

const arrowLeft = <FontAwesomeIcon icon={faChevronLeft} />;
const arrowRight = <FontAwesomeIcon icon={faChevronRight} />;
const save = <FontAwesomeIcon icon={faSave} />;
const steps = ["Step0", "Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
const prefix = import.meta.env.VITE_DEFAULT_HOST_DOMAIN;

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
  const [signIn, toggle] = useState(true);
  const [isRegisterClicked, setRegisterClicked] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isSending, setIsSending] = useState(false);
  let navigate = useNavigate();

  // variabili registrazione generale
  const [email, setEmail] = useState("");

  // variabili studente
  // step 0
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  // step 1
  const [isCodeVerified, setCodeVerified] = useState(false);
  // step 2
  const [nome, setNome] = useState("");
  const [erroreNome, setErroreNome] = useState(false);
  const [cognome, setCognome] = useState("");
  const [erroreCognome, setErroreCognome] = useState(false);
  const [pronomi, setPronomi] = useState("");
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [erroreData, setErroreData] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [erroreTelefono, setErroreTelefono] = useState(false);
  // step 3
  const [articolazione, setArticolazione] = useState(null);
  const [selectedChips, setSelectedChips] = useState([]);
  const [minSelectedChips, setMinSelectedChips] = useState(4);
  // step 4
  const [indirizzo, setIndirizzo] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null); // Add this state

  // variabili azienda
  const [ragionesociale, setRagione] = useState("");

  async function handleSubmitAzienda(event) {
    setIsSending(true);
    event.preventDefault();

  // Controllo lunghezza minima
  if (!telefono || telefono.trim().length < 5) {
    error("Inserire un numero di telefono valido");
    setIsSending(false);
    return;
  }

  // Controllo caratteri validi: solo numeri e caratteri di formattazione (+, spazi, trattini, parentesi)
  const formatoValidoRegex = /^[0-9\s\+\-\(\)]+$/;
  if (!formatoValidoRegex.test(telefono)) {
    error("Il numero di telefono può contenere solo cifre e simboli di formattazione");
    setIsSending(false);
    return;
  }

  // Controllo presenza di almeno 5 cifre numeriche (indipendentemente dai separatori)
  const soloNumeri = telefono.replace(/[^0-9]/g, "");
  if (soloNumeri.length < 5) {
    error("Il numero deve contenere almeno 5 cifre");
    setIsSending(false);
    return;
  }

    const data = {
      ragionesociale: ragionesociale,
      email: email,
      telefono: telefono,
      indirizzo: indirizzo,
    };

    console.log(data);

    try {
      const response = await fetch(prefix + "/register/azienda", {
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

      // Salva i dati temporaneamente nella sessione per il completamento
      sessionStorage.setItem('temp_email', email);
      sessionStorage.setItem('temp_ragionesociale', ragionesociale);
      sessionStorage.setItem('temp_telefono', telefono);
      sessionStorage.setItem('temp_indirizzo', indirizzo);

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
      const response = await fetch(prefix + "/api/verify-email", {
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
    } catch (error) {
      console.log("Error:", error);
    }
  }

  function toLocalISOString(date) {
    const tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? "+" : "-",
      pad = function (num) {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? "0" : "") + norm;
      };
    const localTimeStamp =
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds());

    return localTimeStamp;
  }

  async function sendStudentToDB() {
    const data = {
      email: email,
      telefono: telefono,
      nome: nome,
      cognome: cognome,
      pronomi: pronomi.toString(),
      password: password,
      idarticolazione: articolazione.idarticolazione,
      dataregistrazione: toLocalISOString(new Date()),
      ultimoaccesso: toLocalISOString(new Date()),
      datanascita:
        deadlineDate.getFullYear() +
        "-" +
        (deadlineDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        deadlineDate.getDate().toString().padStart(2, "0"),
      indirizzo: selectedAddress.label,
    };

    console.log(data.datanascita);
    console.log(articolazione.idarticolazione);
    console.log(password);

    try {
      const response = await fetch(prefix + "/register/utente", {
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
        navigate("/homepage");
        responseView(responseData.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function sendCompetenzeToDB() {
    // Create an array of objects with email and idcompetenza
    const competenze = selectedChips.map((chip) => ({
      email: email,
      idcompetenza: chip.id,
    }));

    try {
      const response = await fetch(prefix + "/api/set-user-competences", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(competenze),
      });

      if (!response.ok) {
        const errorData = await response.json();
        error(errorData.message || "Errore durante la richiesta");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function getCompetenzeFromDB() {
    try {
      const response = await fetch(prefix + "/api/get-all-competenze", {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        error(errorData.message || "Errore durante la richiesta");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const handleNext = (isValid) => {
    if (activeStep === 0) {
      if (password === confirmPassword && isValid) {
        setRegisterClicked(true);
        setConfirmPassword("");
        setCodeVerified(false); // Reset del codice verificato
      } else if (password !== confirmPassword) {
        toast.error("Le password non corrispondono");
        setPasswordsMatch(false);
        return;
      } else if (!passwordStrength) {
        toast.error("Password non sicura");
        return;
      }
    } else if (activeStep === 1) {
      // Rimuovi questo controllo perché viene gestito automaticamente da Step1
      // if (!isCodeVerified) {
      //   error("Prima di continuare verifica la tua email");
      //   return;
      // }
    } else if (activeStep === 2) {
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
      // check if deadlineDate is not less than 18 years old
      if (Date.now() - deadlineDate < 18 * 365 * 24 * 60 * 60 * 1000) {
        error("Devi avere almeno 18 anni");
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
    } else if (activeStep === 4) {
      console.log(articolazione);
      if (articolazione === "") {
        error("Seleziona l'articolazione");
        return;
      }
      if (minSelectedChips !== 0) {
        error("Seleziona almeno 3 competenze");
        return;
      }
    } else if (activeStep === 5) {
      if (selectedAddress === null) {
        error("Inserisci il tuo indirizzo di residenza");
        return;
      }
    } else if (activeStep === 6) {
      sendStudentToDB();
      sendCompetenzeToDB();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 1) setRegisterClicked(false);
  };

  const stepTitles = [
    <Components.Title>Verifica Email</Components.Title>,
    <Components.Title>Informazioni Personali</Components.Title>,
    <Components.Title>Immagine Profilo</Components.Title>,
    <Components.Title>Competenze</Components.Title>,
    <Components.Title>Indirizzo</Components.Title>,
    <Components.Title>Recap</Components.Title>,
  ];

  const stepComponents = [
    <Step0
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
    <Step1
      email={email}
      setCodeVerified={setCodeVerified}
      isCodeVerified={isCodeVerified}
      handleNext={handleNext} // Aggiungi questa prop
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
      pronomi={pronomi}
      setPronomi={setPronomi}
    />,
    <Step3 stepTitles={stepTitles} />,
    <Step4
      minSelectedChips={minSelectedChips}
      setMinSelectedChips={setMinSelectedChips}
      articolazione={articolazione}
      setArticolazione={setArticolazione}
      selectedChips={selectedChips}
      setSelectedChips={setSelectedChips}
    />,
    <Step5
      selectedAddress={selectedAddress}
      setSelectedAddress={setSelectedAddress}
    />,
    <Step6
      nome={nome}
      cognome={cognome}
      pronomi={pronomi}
      dataDiNascita={deadlineDate}
      email={email}
      telefono={telefono}
      indirizzo={selectedAddress ? selectedAddress.label : ""}
      articolazione={articolazione}
      competenze={selectedChips}
    />,
  ];

  return (
    <>
      <div style={{ scale: "0.9", marginTop: "-10em" }}>
        <PhotoProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Components.StepsNavButton
              isRegisterClicked={isRegisterClicked}
              onClick={() => {
                activeStep === 0 ? setRegisterClicked(false) : handleBack();
              }}
              disabled={!isRegisterClicked}
              style={{ marginTop: "6em" }}
            >
              {arrowLeft}
            </Components.StepsNavButton>
            
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
                  <div className="progress-bar" style={{ paddingTop: "2em" }}>
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
                    <div className="progress-step">
                      <span
                        className={
                          activeStep >= 6
                            ? "progress-step-text-completed"
                            : "progress-step-text"
                        }
                      >
                        6
                      </span>
                    </div>
                  </div>
                )}
                <Components.Heading>
                  {activeStep >= 1 ? stepTitles[activeStep - 1] : null}
                </Components.Heading>
                {stepComponents[activeStep]}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "10px",
                    paddingRight: "50px",
                    paddingLeft: "50px",
                  }}
                ></div>
              </Components.StudenteContainer>
              <Components.OverlayContainer
                className={isRegisterClicked ? "shrinking" : ""}
                isRegisterClicked={isRegisterClicked}
                signingIn={signIn}
              >
                <Components.Overlay signingIn={signIn}>
                  <Components.LeftOverlayPanel signingIn={signIn}>
                    <Components.Title style={{ color: "#f2f2f2" }}>
                      Benvenuto!
                    </Components.Title>
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
                    <Components.Title style={{ color: "#f2f2f2" }}>
                      Benvenuto!
                    </Components.Title>
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
            
            <Components.StepsNavButton
              isRegisterClicked={isRegisterClicked}
              onClick={() => {
                !isRegisterClicked ? setRegisterClicked(true) : handleNext();
              }}
              disabled={
                !isRegisterClicked || 
                (activeStep === 1 && !isCodeVerified) // Disabilita se siamo nello step 1 e il codice non è verificato
              }
              style={{ 
                marginTop: "6em",
                opacity: (!isRegisterClicked || (activeStep === 1 && !isCodeVerified)) ? 0.5 : 1,
                cursor: (!isRegisterClicked || (activeStep === 1 && !isCodeVerified)) ? 'not-allowed' : 'pointer'
              }}
            >
              {activeStep === steps.length ? save : arrowRight}
            </Components.StepsNavButton>
          </div>
        </PhotoProvider>
      </div>
      
      {/* Assicurati che ci sia il ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default Register;
