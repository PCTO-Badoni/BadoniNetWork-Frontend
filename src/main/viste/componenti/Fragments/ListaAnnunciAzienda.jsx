import React, { useState, useEffect } from "react";
import * as Components from "../AnnunciComponents";
import "primeicons/primeicons.css";
import { FooterIcon } from "../../../../FooterComponents";
import ReactDOM from "react-dom";

// Componente checkbox personalizzato per garantire allineamento perfetto
const CustomCheckbox = ({ id, label, checked, onChange }) => {
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
          borderRadius: "4px",
          backgroundColor: checked ? "#4a90e2" : "white",
          marginRight: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          flexShrink: 0
        }}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <span
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ✓
          </span>
        )}
      </div>
      <div  // Cambiato da label a div
        style={{
          cursor: "pointer",
          userSelect: "none",
          fontSize: "16px",
          position: "static",  // Neutralizza position: relative
          left: "auto",        // Neutralizza left: 10px
          top: "auto",         // Neutralizza top: 15px
          padding: "0",        // Neutralizza padding: 5px
          textShadow: "none",  // Neutralizza text-shadow
          display: "block",    // Neutralizza display: flex
          margin: "0"          // Neutralizza eventuali margini
        }}
        onClick={() => onChange(!checked)}
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
  
  // Stato per gestire i checkbox
  const [contratto, setContratto] = useState({
    indeterminato: false,
    determinato: false,
    stage: false,
    freelance: false,
    daDefinire: false
  });
  
  const [modalita, setModalita] = useState({
    inSede: false,
    ibrida: false,
    remoto: false
  });

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
    // Verifica che ci sia una descrizione prima di procedere
    if (!nuovoAnnuncio.descrizione || nuovoAnnuncio.descrizione.trim() === "") {
      alert("Per favore, inserisci una descrizione per l'annuncio");
      return;
    }
    
    setFormStep(2);
  }
  
  const handlePrevStep = () => {
    setFormStep(1);
  }
  
  // Gestione dell'invio del form
  const handleSubmit = () => {
    // Validazione base dei dati
    if (!nuovoAnnuncio.ruolo || nuovoAnnuncio.ruolo.trim() === "") {
      alert("Per favore, inserisci un ruolo per l'annuncio");
      return;
    }
    
    // Controllo che ci sia almeno un tipo di contratto selezionato
    const contrattiSelezionati = Object.values(contratto).filter(Boolean);
    if (contrattiSelezionati.length === 0) {
      alert("Per favore, seleziona almeno un tipo di contratto");
      return;
    }
    
    // Controllo che ci sia almeno una modalità di lavoro selezionata
    const modalitaSelezionate = Object.values(modalita).filter(Boolean);
    if (modalitaSelezionate.length === 0) {
      alert("Per favore, seleziona almeno una modalità di lavoro");
      return;
    }
    
    // Assicurati che ci sia una retribuzione indicata
    if (!nuovoAnnuncio.retribuzione || nuovoAnnuncio.retribuzione.trim() === "") {
      alert("Per favore, indica la retribuzione per l'annuncio");
      return;
    }
    
    // Crea un nuovo annuncio con ID unico
    const newId = annunci.length > 0 ? Math.max(...annunci.map(a => a.id)) + 1 : 1;
    
    // Genera un oggetto completo per il nuovo annuncio
    const nuovoAnnuncioCompleto = {
      id: newId,
      titolo: nuovoAnnuncio.ruolo,
      descrizione: nuovoAnnuncio.descrizione,
      contratto: Object.keys(contratto).filter(key => contratto[key]),
      modalitaLavoro: Object.keys(modalita).filter(key => modalita[key]),
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
      indeterminato: false,
      determinato: false,
      stage: false,
      freelance: false,
      daDefinire: false
    });
    setModalita({
      inSede: false,
      ibrida: false,
      remoto: false
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
                <CustomCheckbox 
                  id="indeterminato"
                  label="TEMPO INDETERMINATO"
                  checked={contratto.indeterminato}
                  onChange={(checked) => setContratto({...contratto, indeterminato: checked})}
                />
                <CustomCheckbox 
                  id="determinato"
                  label="TEMPO DETERMINATO"
                  checked={contratto.determinato}
                  onChange={(checked) => setContratto({...contratto, determinato: checked})}
                />
                <CustomCheckbox 
                  id="stage"
                  label="STAGE"
                  checked={contratto.stage}
                  onChange={(checked) => setContratto({...contratto, stage: checked})}
                />
                <CustomCheckbox 
                  id="freelance"
                  label="FREELANCE"
                  checked={contratto.freelance}
                  onChange={(checked) => setContratto({...contratto, freelance: checked})}
                />
                <CustomCheckbox 
                  id="daDefinire"
                  label="CONTRATTO DA DEFINIRE"
                  checked={contratto.daDefinire}
                  onChange={(checked) => setContratto({...contratto, daDefinire: checked})}
                />
              </div>
            </div>
            
            <div>
              <h3 style={labelStyle}>MODALITÀ DI LAVORO:</h3>
              <div style={checkboxContainerStyle}>
                <CustomCheckbox 
                  id="inSede"
                  label="IN SEDE"
                  checked={modalita.inSede}
                  onChange={(checked) => setModalita({...modalita, inSede: checked})}
                />
                <CustomCheckbox 
                  id="ibrida"
                  label="IBRIDA"
                  checked={modalita.ibrida}
                  onChange={(checked) => setModalita({...modalita, ibrida: checked})}
                />
                <CustomCheckbox 
                  id="remoto"
                  label="DA REMOTO"
                  checked={modalita.remoto}
                  onChange={(checked) => setModalita({...modalita, remoto: checked})}
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
        height: "95vh",
      }}>
        <Components.ListaAnnunci style={{flex: 2}}>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              width: "100%",
              gap: "15px",
              maxHeight: "95vh",
              borderRadius: "12px",
              overflow: "scroll",
              padding: "10px",
              position: "relative",
            }}
          >
            {annunci.map((annuncio) => (
              <Components.Annuncio
                key={annuncio.id}
                onClick={() => handleAnnuncioClick(annuncio.id)}
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
          </div>
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