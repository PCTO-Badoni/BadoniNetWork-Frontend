import React, { useState, useEffect } from "react";
import * as Components from "../componenti/ProfileComponents";
import StudentCard from "../../Components/cards/StudentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsFillGridFill } from "react-icons/bs";
import Chip from "@mui/material/Chip";
import { students } from "../../Components/students";
import { faHouse, faList } from "@fortawesome/free-solid-svg-icons";
import {
  faRightFromBracket,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import UserInfo from "../componenti/Fragments/UserInfo";
import { Row } from "primereact/row";
import { RecapImage } from "../../../auth/register/RegisterComponents";
import { FooterIcon } from "../../../FooterComponents";
import { LabelContainer, RecapIcon } from "../componenti/ProfileComponents";

const prefix = import.meta.env.VITE_DEFAULT_HOST_DOMAIN;
const listIcon = <FontAwesomeIcon icon={faList} />;

const Profilo = ({
  searchTerm,
  selectedChips,
  selectedCompetenze,
  selectedLingue,
  chips,
  competenze,
  lingue,
}) => {
  const selectedFilteredChips = selectedChips.filter((chip) =>
    chip.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredChips = chips.filter((chip) =>
    chip.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const unselectedFilteredChips = filteredChips.filter(
    (chip) => !selectedChips.includes(chip),
  );

  const selectedFilteredCompetenze = selectedCompetenze.filter((competenza) =>
    competenza.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredCompetenze = competenze.filter((competenza) =>
    competenza.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const unselectedFilteredCompetenze = filteredCompetenze.filter(
    (competenza) => !selectedCompetenze.includes(competenza),
  );

  const selectedFilteredLingue = selectedLingue.filter((lingua) =>
    lingua.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredLingue = lingue.filter((lingua) =>
    lingua.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const unselectedFilteredLingue = filteredLingue.filter(
    (lingua) => !selectedLingue.includes(lingua),
  );

  const [activeButtons, setActiveButtons] = useState([]);
  const [buttonText, setButtonText] = useState("Modifica");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [ragioneSociale, setRagioneSociale] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [settore, setSettore] = useState("");
  const [dimensioni, setDimensioni] = useState("");
  const [sitoWeb, setSitoWeb] = useState("");
  
  // Stati per loading e errori
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Carica i dati del profilo dalla sessione
  useEffect(() => {
    caricaDatiDallaSessione();
  }, []);

  const caricaDatiDallaSessione = () => {
    try {
      console.log('Caricamento dati profilo dalla sessione...');
      
      // Ottieni tutti i dati dalla sessione
      const emailAzienda = sessionStorage.getItem('email') || 
                          sessionStorage.getItem('userEmail') || 
                          localStorage.getItem('email') || 
                          "";
      
      const telefonoSessione = sessionStorage.getItem('telefono') || 
                              sessionStorage.getItem('phone') || 
                              localStorage.getItem('telefono') || 
                              "";
      
      const indirizzoSessione = sessionStorage.getItem('indirizzo') || 
                               sessionStorage.getItem('address') || 
                               localStorage.getItem('indirizzo') || 
                               "";
      
      const ragioneSocialeSessione = sessionStorage.getItem('ragioneSociale') || 
                                    sessionStorage.getItem('ragione_sociale') || 
                                    sessionStorage.getItem('nomeAzienda') || 
                                    localStorage.getItem('ragioneSociale') || 
                                    "";
      
      const descrizioneSessione = sessionStorage.getItem('descrizione') || 
                                 sessionStorage.getItem('description') || 
                                 localStorage.getItem('descrizione') || 
                                 "";
      
      const settoreSessione = sessionStorage.getItem('settore') || 
                             sessionStorage.getItem('sector') || 
                             localStorage.getItem('settore') || 
                             "";
      
      const dimensioniSessione = sessionStorage.getItem('dimensioni') || 
                                sessionStorage.getItem('size') || 
                                localStorage.getItem('dimensioni') || 
                                "";
      
      const sitoWebSessione = sessionStorage.getItem('sitoWeb') || 
                             sessionStorage.getItem('sito_web') || 
                             sessionStorage.getItem('website') || 
                             localStorage.getItem('sitoWeb') || 
                             "";

      // Popola i campi con i dati dalla sessione
      setEmail(emailAzienda);
      setTelefono(telefonoSessione);
      setIndirizzo(indirizzoSessione);
      setRagioneSociale(ragioneSocialeSessione);
      setDescrizione(descrizioneSessione);
      setSettore(settoreSessione);
      setDimensioni(dimensioniSessione);
      setSitoWeb(sitoWebSessione);

      console.log('Dati profilo caricati dalla sessione:', {
        email: emailAzienda,
        telefono: telefonoSessione,
        indirizzo: indirizzoSessione,
        ragioneSociale: ragioneSocialeSessione,
        descrizione: descrizioneSessione,
        settore: settoreSessione,
        dimensioni: dimensioniSessione,
        sitoWeb: sitoWebSessione
      });

      if (!emailAzienda) {
        setError("Email dell'azienda non trovata nella sessione. Effettua nuovamente il login.");
      }

    } catch (error) {
      console.error('Errore nel caricamento dei dati dalla sessione:', error);
      setError('Errore nel caricamento dei dati del profilo dalla sessione.');
    }
  };

  const handleButtonClick = (buttonName) => {
    if (activeButtons.includes(buttonName)) {
      setActiveButtons(activeButtons.filter((button) => button !== buttonName));
    } else {
      setActiveButtons([...activeButtons, buttonName]);
    }
  };

  const handleSaveButtonClick = async () => {
    if (buttonText === "Modifica") {
      setButtonText("Salva");
      setError(null);
      setSuccess(false);
    } else {
      // Salva i dati tramite API e aggiorna la sessione
      await salvaProfiloAzienda();
    }
  };

  const salvaProfiloAzienda = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      // Validazione base solo per i campi modificabili
      if (!email.trim()) {
        setError("L'email è obbligatoria");
        return;
      }

      // Ottieni l'email originale dalla sessione per identificare l'utente
      const emailOriginale = sessionStorage.getItem('email') || 
                            sessionStorage.getItem('userEmail') || 
                            localStorage.getItem('email') || 
                            "";

      // MODIFICATO: Prepara i dati per l'API - invia solo email e telefono
      const datiPerAPI = {
        email: email.trim(),
        telefono: telefono.trim(),
        email_originale: emailOriginale // Per identificare quale profilo aggiornare
      };

      console.log("Invio dati profilo aggiornati (solo email e telefono):", datiPerAPI);

      // Chiamata all'API di aggiornamento profilo
      const response = await fetch(`${prefix}/api/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(datiPerAPI)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Errore server:", errorText);
        throw new Error(`Errore dal server: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Risposta aggiornamento profilo:", responseData);

      // MODIFICATO: Aggiorna solo email e telefono nella sessione
      sessionStorage.setItem('email', email.trim());
      sessionStorage.setItem('userEmail', email.trim());
      sessionStorage.setItem('telefono', telefono.trim());

      // Aggiorna anche localStorage come backup
      localStorage.setItem('email', email.trim());
      localStorage.setItem('telefono', telefono.trim());

      console.log('Email e telefono aggiornati nella sessione dopo il salvataggio');

      setSuccess(true);
      setButtonText("Modifica");
      
    } catch (error) {
      console.error("Errore nell'aggiornamento del profilo:", error);
      setError(`Errore nell'aggiornamento del profilo: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Components.contentContainer>
      <Components.TopBar>
        <UserInfo />
        <Components.Button
          style={{ height: "50px", width: "200px", margin: "auto" }}
          onClick={handleSaveButtonClick}
          disabled={isLoading}
        >
          {isLoading ? "Salvataggio..." : buttonText}
        </Components.Button>
      </Components.TopBar>

      {/* Messaggi di errore e successo */}
      {error && (
        <div style={{ 
          color: '#dc3545', 
          backgroundColor: '#f8d7da', 
          border: '1px solid #f5c6cb', 
          borderRadius: '4px', 
          padding: '12px', 
          margin: '0 20px 20px 20px' 
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ 
          color: '#155724', 
          backgroundColor: '#d4edda', 
          border: '1px solid #c3e6cb', 
          borderRadius: '4px', 
          padding: '12px', 
          margin: '0 20px 20px 20px' 
        }}>
          Profilo aggiornato con successo!
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {/* CAMPO MODIFICABILE: Email */}
        <Components.RecapInput>
          <label htmlFor="email">Email</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="email"
              value={email}
              disabled={buttonText !== "Salva"}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingRight: "30px" }}
            />
            {buttonText === "Salva" && (
              <RecapIcon
                className="pi pi-pen-to-square"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              ></RecapIcon>
            )}
          </div>
        </Components.RecapInput>

        {/* CAMPO MODIFICABILE: Telefono */}
        <Components.RecapInput>
          <label htmlFor="telefono">Telefono</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="telefono"
              value={telefono}
              disabled={buttonText !== "Salva"}
              onChange={(e) => setTelefono(e.target.value)}
              style={{ paddingRight: "30px" }}
            />
            {buttonText === "Salva" && (
              <RecapIcon
                className="pi pi-pen-to-square"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              ></RecapIcon>
            )}
          </div>
        </Components.RecapInput>

        {/* CAMPI NON MODIFICABILI: Solo visualizzazione */}
        <Components.RecapInput>
          <label htmlFor="ragioneSociale">Ragione Sociale</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="ragioneSociale"
              value={ragioneSociale}
              disabled={true} // SEMPRE DISABILITATO
              style={{ 
                paddingRight: "30px",
                backgroundColor: "#f8f9fa", // Colore di sfondo per indicare che non è modificabile
                cursor: "not-allowed"
              }}
            />
          </div>
        </Components.RecapInput>

        <Components.RecapInput>
          <label htmlFor="indirizzo">Indirizzo</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="indirizzo"
              value={indirizzo}
              disabled={true} // SEMPRE DISABILITATO
              style={{ 
                paddingRight: "30px",
                backgroundColor: "#f8f9fa",
                cursor: "not-allowed"
              }}
            />
          </div>
        </Components.RecapInput>

        <Components.RecapInput>
          <label htmlFor="descrizione">Descrizione Azienda</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="descrizione"
              value={descrizione}
              disabled={true} // SEMPRE DISABILITATO
              style={{ 
                paddingRight: "30px",
                backgroundColor: "#f8f9fa",
                cursor: "not-allowed"
              }}
            />
          </div>
        </Components.RecapInput>

        <Components.RecapInput>
          <label htmlFor="settore">Settore</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="settore"
              value={settore}
              disabled={true} // SEMPRE DISABILITATO
              style={{ 
                paddingRight: "30px",
                backgroundColor: "#f8f9fa",
                cursor: "not-allowed"
              }}
            />
          </div>
        </Components.RecapInput>

        <Components.RecapInput>
          <label htmlFor="dimensioni">Dimensioni Azienda</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="dimensioni"
              value={dimensioni}
              disabled={true} // SEMPRE DISABILITATO
              style={{ 
                paddingRight: "30px",
                backgroundColor: "#f8f9fa",
                cursor: "not-allowed"
              }}
            />
          </div>
        </Components.RecapInput>

        <Components.RecapInput>
          <label htmlFor="sitoWeb">Sito Web</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="sitoWeb"
              value={sitoWeb}
              disabled={true} // SEMPRE DISABILITATO
              style={{ 
                paddingRight: "30px",
                backgroundColor: "#f8f9fa",
                cursor: "not-allowed"
              }}
            />
          </div>
        </Components.RecapInput>
      </div>
    </Components.contentContainer>
  );
};

export default Profilo;
