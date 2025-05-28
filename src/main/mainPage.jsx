import * as Components from "./MainPageComponents";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import "../styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import {
  faRightFromBracket,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Footer from "../footer";
import { BiSolidMegaphone } from "react-icons/bi";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";
import ListaStudenti from "./viste/azienda/listaStudenti";
import Profilo from "./viste/azienda/profilo";
import Chat from "./viste/azienda/chat";
import HomePage from "./viste/azienda/home";
import Annunci from "./viste/azienda/annunci";

const prefix = import.meta.env.VITE_DEFAULT_HOST_DOMAIN;
const logoutIcon = <FontAwesomeIcon icon={faRightFromBracket} />;

// Per test e sviluppo quando le API non sono disponibili
const MOCK_ANNUNCI = [
  { id: 1, titolo: "Frontend Developer", descrizione: "Sviluppo interfacce utente" },
  { id: 2, titolo: "Backend Developer", descrizione: "Sviluppo API e database" },
  { id: 3, titolo: "UX Designer", descrizione: "Design di interfacce utente" }
];

function MainPage() {
  const { parametro } = useParams(); // Ottieni il parametro dalla rotta

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);
  const [selectedCompetenze, setSelectedCompetenze] = useState([]);
  const [selectedLingue, setSelectedLingue] = useState([]);
  const [chips, setChips] = useState([]);
  const [competenze, setCompetenze] = useState([]);
  const [lingue, setLingue] = useState([]);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [activeButton, setActiveButton] = useState(parametro || "annunci");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Stato per il conteggio degli annunci e stato di caricamento
  const [annunciCount, setAnnunciCount] = useState(0);
  const [annunciLoaded, setAnnunciLoaded] = useState(false);

  // Carica i dati iniziali per filtri e competenze
  useEffect(() => {
    Promise.all([
      fetch(prefix + '/api/get-all-articolazioni').then(response => response.json()),
      fetch(prefix + '/api/get-all-competenze').then(response => response.json()),
      fetch(prefix + '/api/get-all-lingue').then(response => response.json())
    ])
      .then(([chipsData, competenzeData, lingueData]) => {
        setChips(chipsData);
        setCompetenze(competenzeData);
        setLingue(lingueData);
      })
      .catch(error => console.error('Errore in una delle chiamate:', error));
  }, []);

  // Funzione per caricare il conteggio degli annunci
  const fetchAnnunciCount = () => {
    fetch(`${prefix}/api/get-annunci-count`)
      .then(response => response.json())
      .then(data => {
        console.log("Risposta API count:", data);
        
        if (data && typeof data.count === 'number') {
          console.log("Conteggio annunci (da count):", data.count);
          setAnnunciCount(data.count);
          setAnnunciLoaded(true);
        } 
        else if (data && Array.isArray(data)) {
          console.log("Conteggio annunci (da array):", data.length);
          setAnnunciCount(data.length);
          setAnnunciLoaded(true);
        } 
        else {
          fetchAnnunciFromMainAPI();
        }
      })
      .catch(error => {
        console.error("Errore nel caricamento del conteggio annunci:", error);
        fetchAnnunciFromMainAPI();
      });
  };

  // Funzione di fallback per caricare gli annunci dall'API principale
  const fetchAnnunciFromMainAPI = () => {
    fetch(`${prefix}/api/get-annunci`)
      .then(response => response.json())
      .then(data => {
        console.log("Risposta API annunci:", data);
        
        if (Array.isArray(data)) {
          console.log("Conteggio annunci (da API principale):", data.length);
          setAnnunciCount(data.length);
        } 
        else if (data && Array.isArray(data.annunci)) {
          console.log("Conteggio annunci (da API principale - formato annunci):", data.annunci.length);
          setAnnunciCount(data.annunci.length);
        } 
        else {
          console.log("Usando dati mock per gli annunci");
          setAnnunciCount(MOCK_ANNUNCI.length);
        }
        setAnnunciLoaded(true);
      })
      .catch(error => {
        console.error("Errore nel caricamento degli annunci:", error);
        console.log("Usando dati mock come fallback");
        setAnnunciCount(MOCK_ANNUNCI.length);
        setAnnunciLoaded(true);
      });
  };
  
  // Carica il conteggio degli annunci all'avvio
  useEffect(() => {
    fetchAnnunciCount();
  }, []);

  // Gestione hash URL per navigazione
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setActiveButton(hash);
      } else {
        setActiveButton("annunci");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleButtonClick = (buttonName, event) => {
    if (event) {
      event.preventDefault();
    }
    
    console.log("Sidebar click:", buttonName);
    
    // Gestione speciale per il logout
    if (buttonName === "logout") {
      navigate("/login");
      return;
    }

    // Per tutte le altre opzioni del menu
    setActiveButton(buttonName);
    
    // Aggiorna l'hash nell'URL per mantenere la navigazione sincronizzata
    window.location.hash = buttonName;
  };

  // Funzioni per aggiornare il conteggio degli annunci
  const handleAnnuncioAggiunto = () => {
    console.log("Annuncio aggiunto, nuovo conteggio:", annunciCount + 1);
    setAnnunciCount(prev => prev + 1);
  };

  const handleAnnuncioRimosso = (reset = false) => {
    if (reset) {
      console.log("Reset del contatore annunci");
      setAnnunciCount(0);
    } else {
      console.log("Annuncio rimosso, nuovo conteggio:", Math.max(0, annunciCount - 1));
      setAnnunciCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleAnnunciCountUpdate = (newCount) => {
    console.log("Aggiornamento diretto del conteggio annunci:", newCount);
    setAnnunciCount(newCount);
  };

  const handleChipClick = (chip) => {
    if (!selectedChips.includes(chip)) {
      const newSelectedChips = [...selectedChips, chip];
      setSelectedChips(newSelectedChips);
    }
  };

  const handleChipDelete = (chipToDelete) => {
    setSelectedChips(selectedChips.filter((chip) => chip !== chipToDelete));
  };

  const handleCompetenzaClick = (competenza) => {
    if (!selectedCompetenze.includes(competenza)) {
      const newSelectedCompetenze = [...selectedCompetenze, competenza];
      setSelectedCompetenze(newSelectedCompetenze);
    }
  };

  const handleCompetenzaDelete = (competenzaToDelete) => {
    setSelectedCompetenze(
      selectedCompetenze.filter(
        (competenza) => competenza !== competenzaToDelete,
      ),
    );
  };

  const handleLinguaClick = (lingua) => {
    if (!selectedLingue.includes(lingua)) {
      const newSelectedLingue = [...selectedLingue, lingua];
      setSelectedLingue(newSelectedLingue);
    }
  };

  const handleLinguaDelete = (linguaToDelete) => {
    setSelectedLingue(
      selectedLingue.filter((lingua) => lingua !== linguaToDelete),
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          marginTop: "auto",
        }}
      >
        <Components.Container style={{ scale: "0.9" }}>
          <Components.Sidebar>
            <Components.MenuContainer>
              <Components.MenuItem
                onClick={(e) => handleButtonClick("annunci", e)}
                style={{
                  backgroundColor:
                    activeButton === "annunci"
                      ? `var(--secondColor)`
                      : "transparent",
                  borderLeft:
                    activeButton === "annunci"
                      ? `2px solid var(--contrastColor)`
                      : null,
                  cursor: "pointer"
                }}
              >
                <BiSolidMegaphone /> Annunci 
                {annunciCount > 0 && (
                  <span style={{ 
                    marginLeft: '8px', 
                    backgroundColor: 'var(--contrastColor)', 
                    color: 'white', 
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}>
                    {annunciCount}
                  </span>
                )}
              </Components.MenuItem>
              <Components.MenuItem
                onClick={(e) => handleButtonClick("lista", e)}
                style={{
                  backgroundColor:
                    activeButton === "lista"
                      ? `var(--secondColor)`
                      : "transparent",
                  borderLeft:
                    activeButton === "lista"
                      ? `2px solid var(--contrastColor)`
                      : null,
                  cursor: "pointer"
                }}
              >
                <FaIdCard /> Lista Studenti
              </Components.MenuItem>
              <Components.MenuItem
                onClick={(e) => handleButtonClick("chat", e)}
                style={{
                  backgroundColor:
                    activeButton === "chat"
                      ? `var(--secondColor)`
                      : "transparent",
                  borderLeft:
                    activeButton === "chat"
                      ? `2px solid var(--contrastColor)`
                      : null,
                  cursor: "pointer"
                }}
              >
                <IoChatboxEllipses /> Chat
              </Components.MenuItem>
              <Components.MenuItem
                onClick={(e) => handleButtonClick("profilo", e)}
                style={{
                  backgroundColor:
                    activeButton === "profilo"
                      ? `var(--secondColor)`
                      : "transparent",
                  borderLeft:
                    activeButton === "profilo"
                      ? `2px solid var(--contrastColor)`
                      : null,
                  cursor: "pointer"
                }}
              >
                <RiSettings3Fill /> Profilo
              </Components.MenuItem>
            </Components.MenuContainer>
            <div style={{ width: "100%", marginTop: "auto" }}>
              <Components.MenuItem
                onClick={(e) => handleButtonClick("logout", e)}
                style={{
                  borderRadius: "8px",
                  backgroundColor:
                    activeButton === "logout"
                      ? `var(--secondColor)`
                      : "transparent",
                  cursor: "pointer"
                }}
              >
                {logoutIcon} Logout
              </Components.MenuItem>
            </div>
          </Components.Sidebar>
          <div
            style={{
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {activeButton === "lista" && (
              <ListaStudenti
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedChips={selectedChips}
                setSelectedChips={setSelectedChips}
                selectedCompetenze={selectedCompetenze}
                setSelectedCompetenze={setSelectedCompetenze}
                selectedLingue={selectedLingue}
                setSelectedLingue={setSelectedLingue}
                chips={chips}
                competenze={competenze}
                lingue={lingue}
                isFilterOpen={isFilterOpen}
                setFilterOpen={setFilterOpen}
                viewMode={viewMode}
                setViewMode={setViewMode}
                handleChipClick={handleChipClick}
                handleChipDelete={handleChipDelete}
                handleCompetenzaClick={handleCompetenzaClick}
                handleCompetenzaDelete={handleCompetenzaDelete}
                handleLinguaClick={handleLinguaClick}
                handleLinguaDelete={handleLinguaDelete}
              />
            )}
            {activeButton === "profilo" && (
              <Profilo
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedChips={selectedChips}
                setSelectedChips={setSelectedChips}
                selectedCompetenze={selectedCompetenze}
                setSelectedCompetenze={setSelectedCompetenze}
                selectedLingue={selectedLingue}
                setSelectedLingue={setSelectedLingue}
                chips={chips}
                competenze={competenze}
                lingue={lingue}
                isFilterOpen={isFilterOpen}
                setFilterOpen={setFilterOpen}
                viewMode={viewMode}
                setViewMode={setViewMode}
                handleChipClick={handleChipClick}
                handleChipDelete={handleChipDelete}
                handleCompetenzaClick={handleCompetenzaClick}
                handleCompetenzaDelete={handleCompetenzaDelete}
                handleLinguaClick={handleLinguaClick}
                handleLinguaDelete={handleLinguaDelete}
              />
            )}
            {activeButton === "chat" && (
              <Chat
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedChips={selectedChips}
                setSelectedChips={setSelectedChips}
                selectedCompetenze={selectedCompetenze}
                setSelectedCompetenze={setSelectedCompetenze}
                selectedLingue={selectedLingue}
                setSelectedLingue={setSelectedLingue}
                chips={chips}
                competenze={competenze}
                lingue={lingue}
                isFilterOpen={isFilterOpen}
                setFilterOpen={setFilterOpen}
                viewMode={viewMode}
                setViewMode={setViewMode}
                handleChipClick={handleChipClick}
                handleChipDelete={handleChipDelete}
                handleCompetenzaClick={handleCompetenzaClick}
                handleCompetenzaDelete={handleCompetenzaDelete}
                handleLinguaClick={handleLinguaClick}
                handleLinguaDelete={handleLinguaDelete}
              />
            )}
            {activeButton === "home" && (
              <HomePage
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedChips={selectedChips}
                setSelectedChips={setSelectedChips}
                selectedCompetenze={selectedCompetenze}
                setSelectedCompetenze={setSelectedCompetenze}
                selectedLingue={selectedLingue}
                setSelectedLingue={setSelectedLingue}
                chips={chips}
                competenze={competenze}
                lingue={lingue}
                isFilterOpen={isFilterOpen}
                setFilterOpen={setFilterOpen}
                viewMode={viewMode}
                setViewMode={setViewMode}
                handleChipClick={handleChipClick}
                handleChipDelete={handleChipDelete}
                handleCompetenzaClick={handleCompetenzaClick}
                handleCompetenzaDelete={handleCompetenzaDelete}
                handleLinguaClick={handleLinguaClick}
                handleLinguaDelete={handleLinguaDelete}
              />
            )}
            {activeButton === "annunci" && (
              <Annunci 
                onAnnuncioAggiunto={handleAnnuncioAggiunto} 
                onAnnuncioRimosso={handleAnnuncioRimosso}
                onAnnunciCountUpdate={handleAnnunciCountUpdate}
                annunciCount={annunciCount}
                loaded={annunciLoaded}
              />
            )}
          </div>
        </Components.Container>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;