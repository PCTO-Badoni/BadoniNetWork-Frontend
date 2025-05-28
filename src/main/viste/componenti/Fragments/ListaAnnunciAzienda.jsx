import React, { useState, useEffect } from "react";
import * as Components from "../AnnunciComponents";
import "primeicons/primeicons.css";
import { FooterIcon } from "../../../../FooterComponents";
import ReactDOM from "react-dom";

// Componente checkbox personalizzato per garantire allineamento perfetto
const CustomRadio = ({ id, label, checked, onChange, name }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      margin: "10px 0"
    }}>
      <div 
        style={{
          width: "22px",
          height: "22px",
          border: "1px solid #ccc",
          borderRadius: "50%", // Cambiato da 4px a 50% per renderlo circolare
          backgroundColor: "white",
          marginRight: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          flexShrink: 0,
          position: "relative"
        }}
        onClick={() => onChange(id, name)}
      >
        {checked && (
          <div
            style={{
              backgroundColor: "#4a90e2",
              borderRadius: "50%",
              width: "12px",
              height: "12px",
              position: "absolute"
            }}
          />
        )}
      </div>
      <div
        style={{
          cursor: "pointer",
          userSelect: "none",
          fontSize: "16px",
          position: "static",
          left: "auto",
          top: "auto",
          padding: "0",
          textShadow: "none",
          display: "block",
          margin: "0"
        }}
        onClick={() => onChange(id, name)}
      >
        {label}
      </div>
    </div>
  );
};

const ListaAnnunciAzienda = ({}) => {
  // Stato per tenere traccia dell'annuncio espanso (null se nessuno è espanso)
  const [expandedAnnuncioId, setExpandedAnnuncioId] = useState(null);
  
  // Stato per gestire il form di creazione annuncio
  const [formStep, setFormStep] = useState(1); // Step 1 o 2 del form
  const [nuovoAnnuncio, setNuovoAnnuncio] = useState({
    descrizione: "",
    ruolo: "",
    contratto: "",
    modalitaLavoro: "",
    retribuzione: ""
  });
  
  const [contratto, setContratto] = useState({
    tipo: null 
  });
  
  const [modalita, setModalita] = useState({
    tipo: null 
  });

  const handleContrattoChange = (value) => {
    setContratto({ tipo: value });
  };
  
  const handleModalitaChange = (value) => {
    setModalita({ tipo: value });
  };

  // Stato per gestire la lista degli annunci
  const [annunci, setAnnunci] = useState([
    { id: 1, titolo: "Ingegnere" },
    { id: 2, titolo: "Sviluppatore" },
    { id: 3, titolo: "Designer" },
    { id: 4, titolo: "Marketing" },
    { id: 5, titolo: "HR" },
    { id: 6, titolo: "Finanza" },
    { id: 7, titolo: "Amministratore" }
  ]);

  // Quando un annuncio è espanso, blocca lo scrolling del body
  useEffect(() => {
    if (expandedAnnuncioId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [expandedAnnuncioId]);

  const handleAnnuncioClick = (id) => {
    // Toggle: se l'annuncio è già espanso, lo chiude, altrimenti lo espande
    setExpandedAnnuncioId(expandedAnnuncioId === id ? null : id);
    console.log(`Annuncio ${id} ${expandedAnnuncioId === id ? "chiuso" : "espanso"}`);
  }

  const handleDeleteAnnuncio = (id, e) => {
    // Previeni la propagazione dell'evento
    e.stopPropagation();
    
    const conferma = window.confirm("Sei sicuro di voler eliminare questo annuncio?");
    
    if (conferma) {
      // Filtra l'array di annunci per rimuovere quello selezionato
      const nuoviAnnunci = annunci.filter(annuncio => annuncio.id !== id);
      setAnnunci(nuoviAnnunci);
      
      // Se l'annuncio eliminato è quello espanso, chiudi il popup
      if (expandedAnnuncioId === id) {
        setExpandedAnnuncioId(null);
      }
      
      console.log(`Eliminato annuncio con ID: ${id}`);
    }
  }
  
  // Gestione del cambio di step nel form
  const handleNextStep = () => {
    // Validazione base dei dati
    if (!nuovoAnnuncio.ruolo || nuovoAnnuncio.ruolo.trim() === "") {
      alert("Per favore, inserisci un ruolo per l'annuncio");
      return;
    }
    
    // Controllo che ci sia un tipo di contratto selezionato
    if (!contratto.tipo) {
      alert("Per favore, seleziona un tipo di contratto");
      return;
    }
    
    // Controllo che ci sia una modalità di lavoro selezionata
    if (!modalita.tipo) {
      alert("Per favore, seleziona una modalità di lavoro");
      return;
    }
    
    // Assicurati che ci sia una retribuzione indicata
    if (!nuovoAnnuncio.retribuzione || nuovoAnnuncio.retribuzione.trim() === "") {
      alert("Per favore, indica la retribuzione per l'annuncio");
      return;
    }
    
    setFormStep(2);
  }
  
  const handlePrevStep = () => {
    setFormStep(1);
  }
  
  // Gestione dell'invio del form
  const handleSubmit = () => {
    // Verifica che ci sia una descrizione prima di procedere
    if (!nuovoAnnuncio.descrizione || nuovoAnnuncio.descrizione.trim() === "") {
      alert("Per favore, inserisci una descrizione per l'annuncio");
      return;
    }

    // Crea un nuovo annuncio con ID unico
    const newId = annunci.length > 0 ? Math.max(...annunci.map(a => a.id)) + 1 : 1;
    
    // Genera un oggetto completo per il nuovo annuncio
    const nuovoAnnuncioCompleto = {
      id: newId,
      titolo: nuovoAnnuncio.ruolo,
      descrizione: nuovoAnnuncio.descrizione,
      contratto: [contratto.tipo], // passa come array con un singolo valore
      modalitaLavoro: [modalita.tipo], // passa come array con un singolo valore
      retribuzione: nuovoAnnuncio.retribuzione
    };
    
    // Aggiungi il nuovo annuncio alla lista
    const nuoviAnnunci = [...annunci, nuovoAnnuncioCompleto];
    setAnnunci(nuoviAnnunci);
    console.log("Nuovo annuncio aggiunto:", nuovoAnnuncioCompleto);
    
    // Reset del form
    setNuovoAnnuncio({
      descrizione: "",
      ruolo: "",
      contratto: "",
      modalitaLavoro: "",
      retribuzione: ""
    });
    setContratto({
      tipo: null
    });
    setModalita({
      tipo: null
    });
    setFormStep(1);
    
    // Feedback visivo per l'utente
    alert("Annuncio creato con successo!");
  }

  // Renderizza l'overlay e il popup direttamente nel body usando portali
  const renderOverlay = () => {
    if (!expandedAnnuncioId) return null;
    
    return ReactDOM.createPortal(
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 99998, // z-index estremamente alto
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setExpandedAnnuncioId(null)}
      />,
      document.body
    );
  };

  // Renderizza il contenuto del popup
  const renderPopup = () => {
    if (!expandedAnnuncioId) return null;
    
    // Trova l'annuncio selezionato
    const annuncioSelezionato = annunci.find(a => a.id === expandedAnnuncioId);
    
    if (!annuncioSelezionato) return null;
    
    return ReactDOM.createPortal(
      <div 
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 99999, // z-index più alto dell'overlay
          width: "70%",
          maxWidth: "800px",
          maxHeight: "80vh",
          backgroundColor: "var(--lightFirstColor)",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          padding: "20px",
          animation: "popIn 0.3s ease",
          overflowY: "auto",
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes popIn {
              0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
              100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
          `
        }} />
        
        <div key={annuncioSelezionato.id} style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <Components.AnnuncioTitolo>{annuncioSelezionato.titolo}</Components.AnnuncioTitolo>
            <FooterIcon 
              className="pi pi-times" 
              style={{ cursor: "pointer", color: "red" }} 
              onClick={(e) => {
                e.stopPropagation();
                setExpandedAnnuncioId(null);
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <Components.AnnuncioImage style={{ width: "100px", height: "100px", flexShrink: 0 }} />
            <div style={{ flex: 1, overflow: "auto" }}>
              <h3>Dettagli Annuncio</h3>
              <p>{annuncioSelezionato.descrizione || "Nessuna descrizione disponibile."}</p>
              
              {annuncioSelezionato.contratto && annuncioSelezionato.contratto.length > 0 && (
                <div>
                  <h4 style={{ marginTop: "15px", marginBottom: "5px" }}>Tipo di contratto:</h4>
                  <ul style={{ margin: "0", paddingLeft: "20px" }}>
                    {annuncioSelezionato.contratto.map((tipo, index) => (
                      <li key={index}>{tipo === "indeterminato" ? "TEMPO INDETERMINATO" : 
                                      tipo === "determinato" ? "TEMPO DETERMINATO" : 
                                      tipo === "stage" ? "STAGE" :
                                      tipo === "freelance" ? "FREELANCE" : 
                                      "CONTRATTO DA DEFINIRE"}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {annuncioSelezionato.modalitaLavoro && annuncioSelezionato.modalitaLavoro.length > 0 && (
                <div>
                  <h4 style={{ marginTop: "15px", marginBottom: "5px" }}>Modalità di lavoro:</h4>
                  <ul style={{ margin: "0", paddingLeft: "20px" }}>
                    {annuncioSelezionato.modalitaLavoro.map((modo, index) => (
                      <li key={index}>{modo === "inSede" ? "IN SEDE" : 
                                      modo === "ibrida" ? "IBRIDA" : 
                                      "DA REMOTO"}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {annuncioSelezionato.retribuzione && (
                <div style={{ marginTop: "15px" }}>
                  <h4 style={{ marginBottom: "5px" }}>Retribuzione:</h4>
                  <p>{annuncioSelezionato.retribuzione} EURO/MESE</p>
                </div>
              )}
              
              <div style={{ marginTop: "20px" }}>
                <button 
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "var(--firstColor)",
                    color: "black",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  Candidati
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };
  
  // Form per la creazione di un nuovo annuncio
  const renderFormNuovoAnnuncio = () => {
    const formStyle = {
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "12px",
      height: "100%",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      overflow: "auto",
      flex: 1
    };
    
    const inputStyle = {
      padding: "15px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      margin: "10px 0",
      width: "100%",
      boxSizing: "border-box"
    };
    
    const textareaStyle = {
      ...inputStyle,
      minHeight: "200px",
      resize: "none"
    };
    
    const buttonStyle = {
      padding: "12px 24px",
      backgroundColor: "#8AE270",
      color: "black",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      margin: "10px 0"
    };
    
    const titleStyle = {
      textAlign: "center",
      marginBottom: "20px",
      borderBottom: "1px solid #ddd",
      paddingBottom: "15px",
      fontSize: "24px"
    };
    
    const checkboxContainerStyle = {
      margin: "15px 0 20px 0"
    };
    
    const labelStyle = {
      fontWeight: "bold",
      marginTop: "15px",
      fontSize: "18px"
    };

    return (
      <div style={formStyle}>
        {formStep === 1 ? (
          // Step 1: Titolo e descrizione
          <>
            <h2 style={titleStyle}>CREA NUOVO ANNUNCIO</h2>
            <div>
              <h3 style={labelStyle}>RUOLO:</h3>
              <input 
                type="text" 
                style={inputStyle} 
                placeholder='Es. "Frontend Developer"' 
                value={nuovoAnnuncio.ruolo}
                onChange={(e) => setNuovoAnnuncio({...nuovoAnnuncio, ruolo: e.target.value})}
              />
            </div>
            
            <div>
              <h3 style={labelStyle}>CONTRATTO:</h3>
             <div style={checkboxContainerStyle}>
                <CustomRadio 
                  id="indeterminato"
                  name="contratto"
                  label="TEMPO INDETERMINATO"
                  checked={contratto.tipo === "indeterminato"}
                  onChange={handleContrattoChange}
                />
                <CustomRadio 
                  id="determinato"
                  name="contratto"
                  label="TEMPO DETERMINATO"
                  checked={contratto.tipo === "determinato"}
                  onChange={handleContrattoChange}
                />
                <CustomRadio 
                  id="stage"
                  name="contratto"
                  label="STAGE"
                  checked={contratto.tipo === "stage"}
                  onChange={handleContrattoChange}
                />
                <CustomRadio 
                  id="freelance"
                  name="contratto"
                  label="FREELANCE"
                  checked={contratto.tipo === "freelance"}
                  onChange={handleContrattoChange}
                />
                <CustomRadio 
                  id="daDefinire"
                  name="contratto"
                  label="CONTRATTO DA DEFINIRE"
                  checked={contratto.tipo === "daDefinire"}
                  onChange={handleContrattoChange}
                />
              </div>
            </div>
            
            <div>
              <h3 style={labelStyle}>MODALITÀ DI LAVORO:</h3>
              <div style={checkboxContainerStyle}>
                <CustomRadio 
                  id="inSede"
                  name="modalita"
                  label="IN SEDE"
                  checked={modalita.tipo === "inSede"}
                  onChange={handleModalitaChange}
                />
                <CustomRadio 
                  id="ibrida"
                  name="modalita"
                  label="IBRIDA"
                  checked={modalita.tipo === "ibrida"}
                  onChange={handleModalitaChange}
                />
                <CustomRadio 
                  id="remoto"
                  name="modalita"
                  label="DA REMOTO"
                  checked={modalita.tipo === "remoto"}
                  onChange={handleModalitaChange}
                />
              </div>
            </div>
            
            <div>
              <h3 style={labelStyle}>RETRIBUITO:</h3>
              <input 
                type="text" 
                style={inputStyle} 
                placeholder="EURO/MESE"
                value={nuovoAnnuncio.retribuzione}
                onChange={(e) => setNuovoAnnuncio({...nuovoAnnuncio, retribuzione: e.target.value})}
              />
            </div>
            
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
              <button 
                style={{...buttonStyle, width: "100px"}}
                onClick={handlePrevStep}
              >
                ←
              </button>
              <div style={{width: "20px"}}></div>
              <button 
                style={{...buttonStyle, width: "100px"}} 
                onClick={handleNextStep}
              >
                Avanti →
              </button>
            </div>
          </>
        ) : (
          // Step 2: Dettagli aggiuntivi
          <>
            <h2 style={titleStyle}>CREA UN NUOVO ANNUNCIO</h2>
            <div>
              <h3 style={labelStyle}>DESCRIZIONE:</h3>
              <textarea 
                style={textareaStyle} 
                placeholder="Aggiungi una descrizione..." 
                value={nuovoAnnuncio.descrizione}
                onChange={(e) => setNuovoAnnuncio({...nuovoAnnuncio, descrizione: e.target.value})}
              />
            </div>
            <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
              <button style={buttonStyle}>←</button>
              <button 
                style={buttonStyle} 
                onClick={handleSubmit}
              >
                Crea +
              </button>
            </div>
            
          </>
        )}
      </div>
    );
  };

  
return (
  <>
    {renderOverlay()}
    {renderPopup()}
    
    <div style={{
      display: "flex", 
      width: "100%", 
      gap: "20px", 
      height: "95vh"
      // Rimosso "scroll: overflow" che non è una proprietà CSS valida
    }}>
      <Components.ListaAnnunci 
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #ccc",
            paddingBottom: "15px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <Components.SearchBar></Components.SearchBar>
        </div>
        
        {/* Sposta gli stili direttamente nel ListaAnnunci e rimuovi il div extra */}
        {annunci.map((annuncio) => (
          <Components.Annuncio
            key={annuncio.id}
            onClick={() => handleAnnuncioClick(annuncio.id)}
            style={{
              margin: "10px",
              flexBasis: "calc(33.333% - 20px)",  // Per mantenere il layout a griglia
            }}
          >
            <Components.AnnuncioImage />
            <Components.AnnuncioInfo>
              <Components.AnnuncioTitolo>{annuncio.titolo}</Components.AnnuncioTitolo>
            </Components.AnnuncioInfo>
            <Components.AnnuncioButtons>
              <FooterIcon
                className="pi pi-trash"
                style={{ color: "red", margin: "auto" }}
                onClick={(e) => handleDeleteAnnuncio(annuncio.id, e)}
              ></FooterIcon>
            </Components.AnnuncioButtons>
          </Components.Annuncio>
        ))}
      </Components.ListaAnnunci>

      {/* Form per la creazione di un nuovo annuncio */}
      <div style={{flex: 1, height: "100%"}}>
        {renderFormNuovoAnnuncio()}
      </div>
    </div>
  </>
);
};

export default ListaAnnunciAzienda;