import React, { useState, useEffect } from "react";
import * as Components from "../componenti/ProfileComponents";
import StudentCard from "../../Components/cards/StudentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsFillGridFill } from "react-icons/bs";
import Chip from "@mui/material/Chip";
import { students } from "../../Components/students";
import { faHouse, faList, faEdit, faCheck, faTimes, faBuilding, faEnvelope, faPhone, faMapMarkerAlt, faInfoCircle, faIndustry, faUsers, faGlobe, faSave } from "@fortawesome/free-solid-svg-icons";
import {
  faRightFromBracket,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import UserInfo from "../componenti/Fragments/UserInfo";
import { Row } from "primereact/row";
import { RecapImage } from "../../../auth/register/RegisterComponents";
import { FooterIcon } from "../../../FooterComponents";
import { LabelContainer, RecapIcon } from "../componenti/ProfileComponents";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const showSuccessToast = (message) => {
    toast.success(message, {
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
  };

  const showErrorToast = (message) => {
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
  };

  const handleSaveButtonClick = async () => {
    if (buttonText === "Modifica") {
      setButtonText("Salva");
      setError("");
      setSuccess(false);
    } else {
      // Salva i dati tramite API e aggiorna la sessione
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

        showSuccessToast("Profilo aggiornato con successo!");
        setButtonText("Modifica");
        
      } catch (error) {
        console.error("Errore nell'aggiornamento del profilo:", error);
        showErrorToast(`Errore nell'aggiornamento del profilo: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Components.contentContainer>
      {/* Header migliorato */}
      <Components.TopBar>
        <Components.ProfileHeader>
          <Components.ProfileHeaderContent>
            <FontAwesomeIcon icon={faBuilding} size="2x" style={{ color: 'var(--contrastColor)', marginRight: '15px' }} />
            <div>
              <Components.CompanyTitle>Profilo Aziendale</Components.CompanyTitle>
              <Components.CompanySubtitle>Gestisci le informazioni della tua azienda</Components.CompanySubtitle>
            </div>
          </Components.ProfileHeaderContent>
          <Components.ActionButton
            onClick={handleSaveButtonClick}
            disabled={isLoading}
            $isEditing={buttonText === "Salva"}
          >
            <FontAwesomeIcon 
              icon={buttonText === "Salva" ? faSave : faEdit} 
              style={{ marginRight: '8px' }} 
            />
            {isLoading ? "Salvataggio..." : buttonText}
          </Components.ActionButton>
        </Components.ProfileHeader>
      </Components.TopBar>

      {/* Form container migliorato */}
      <Components.FormContainer>
        {/* Sezione campi modificabili */}
        <Components.FormSection>
          <Components.SectionHeader>
            <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
            Informazioni Modificabili
          </Components.SectionHeader>
          
          <Components.FieldsGrid>
            <Components.FieldContainer>
              <Components.FieldLabel>
                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px' }} />
                Email Aziendale
              </Components.FieldLabel>
              <Components.InputContainer $editable={buttonText === "Salva"}>
                <Components.StyledInput
                  type="email"
                  value={email}
                  disabled={buttonText !== "Salva"}
                  onChange={(e) => setEmail(e.target.value)}
                  $editable={buttonText === "Salva"}
                  placeholder="email@azienda.com"
                />
                {buttonText === "Salva" && (
                  <Components.EditIcon>
                    <FontAwesomeIcon icon={faEdit} />
                  </Components.EditIcon>
                )}
              </Components.InputContainer>
            </Components.FieldContainer>

            <Components.FieldContainer>
              <Components.FieldLabel>
                <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px' }} />
                Telefono
              </Components.FieldLabel>
              <Components.InputContainer $editable={buttonText === "Salva"}>
                <Components.StyledInput
                  type="tel"
                  value={telefono}
                  disabled={buttonText !== "Salva"}
                  onChange={(e) => setTelefono(e.target.value)}
                  $editable={buttonText === "Salva"}
                  placeholder="+39 000 000 0000"
                />
                {buttonText === "Salva" && (
                  <Components.EditIcon>
                    <FontAwesomeIcon icon={faEdit} />
                  </Components.EditIcon>
                )}
              </Components.InputContainer>
            </Components.FieldContainer>
          </Components.FieldsGrid>
        </Components.FormSection>

        {/* Sezione informazioni aziendali */}
        <Components.FormSection>
          <Components.SectionHeader>
            <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '10px' }} />
            Informazioni Aziendali
            <Components.ReadOnlyBadge>Solo lettura</Components.ReadOnlyBadge>
          </Components.SectionHeader>
          {/* Info footer */}
          <Components.InfoFooter>
            <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
            Le informazioni aziendali in sola lettura possono essere modificate contattando l'amministratore del sistema.
          </Components.InfoFooter>

          <Components.FieldsGrid>
            <Components.FieldContainer>
              <Components.FieldLabel>
                <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '8px' }} />
                Ragione Sociale
              </Components.FieldLabel>
              <Components.InputContainer $readOnly>
                <Components.StyledInput
                  value={ragioneSociale}
                  disabled
                  $readOnly
                  placeholder="Nome dell'azienda"
                />
              </Components.InputContainer>
            </Components.FieldContainer>

            <Components.FieldContainer>
              <Components.FieldLabel>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '8px' }} />
                Indirizzo
              </Components.FieldLabel>
              <Components.InputContainer $readOnly>
                <Components.StyledInput
                  value={indirizzo}
                  disabled
                  $readOnly
                  placeholder="Indirizzo completo"
                />
              </Components.InputContainer>
            </Components.FieldContainer>

            <Components.FieldContainer $fullWidth>
              <Components.FieldLabel>
                <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                Descrizione Azienda
              </Components.FieldLabel>
              <Components.InputContainer $readOnly>
                <Components.StyledTextarea
                  value={descrizione}
                  disabled
                  $readOnly
                  placeholder="Descrizione dell'azienda e delle sue attività"
                  rows={3}
                />
              </Components.InputContainer>
            </Components.FieldContainer>

            <Components.FieldContainer>
              <Components.FieldLabel>
                <FontAwesomeIcon icon={faIndustry} style={{ marginRight: '8px' }} />
                Settore
              </Components.FieldLabel>
              <Components.InputContainer $readOnly>
                <Components.StyledInput
                  value={settore}
                  disabled
                  $readOnly
                  placeholder="Settore di attività"
                />
              </Components.InputContainer>
            </Components.FieldContainer>

            <Components.FieldContainer>
              <Components.FieldLabel>
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
                Dimensioni Azienda
              </Components.FieldLabel>
              <Components.InputContainer $readOnly>
                <Components.StyledInput
                  value={dimensioni}
                  disabled
                  $readOnly
                  placeholder="Numero di dipendenti"
                />
              </Components.InputContainer>
            </Components.FieldContainer>

            <Components.FieldContainer>
              <Components.FieldLabel>
                <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '8px' }} />
                Sito Web
              </Components.FieldLabel>
              <Components.InputContainer $readOnly>
                <Components.StyledInput
                  value={sitoWeb}
                  disabled
                  $readOnly
                  placeholder="www.azienda.com"
                />
              </Components.InputContainer>
            </Components.FieldContainer>
          </Components.FieldsGrid>
        </Components.FormSection>
      </Components.FormContainer>
    </Components.contentContainer>
  );
};

export default Profilo;
