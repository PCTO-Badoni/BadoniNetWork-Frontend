import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const prefix = import.meta.env.VITE_DEFAULT_HOST_DOMAIN;

// Stili per il componente (invariati)
const AnnunciContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
`;

const AnnunciListaContainer = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const FormSideContainer = styled.div`
  width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 20px;
  align-self: flex-start;
  margin-left: 20px;
  min-height: 400px;
`;

const AnnuncioCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
`;

const AnnuncioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TitoloAnnuncio = styled.h3`
  margin: 0;
  color: var(--contrastColor);
`;

const DettagliAnnuncio = styled.div`
  margin-top: 10px;
`;

const Tag = styled.span`
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
  font-size: 12px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: var(--contrastColor);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    opacity: 0.9;
  }
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  color: var(--contrastColor);
`;

const FormLabel = styled.h3`
  margin-top: 15px;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const RadioOptionContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const RadioButton = styled.div`
  width: 22px;
  height: 22px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: white;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
`;

const RadioIndicator = styled.div`
  background-color: #4a90e2;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  position: absolute;
`;

const RadioLabel = styled.div`
  cursor: pointer;
  user-select: none;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Componente radio button semplificato
const RadioOption = ({ id, label, checked, onChange }) => {
  return (
    <RadioOptionContainer onClick={() => onChange(id)}>
      <RadioButton>
        {checked && <RadioIndicator />}
      </RadioButton>
      <RadioLabel>{label}</RadioLabel>
    </RadioOptionContainer>
  );
};

const ListaAnnunciAzienda = ({ onAnnuncioAggiunto, onAnnuncioRimosso, onAnnunciCountUpdate }) => {
  // Stato base
  const [listaAnnunci, setListaAnnunci] = useState([]);
  const [formData, setFormData] = useState({
    ruolo: "",
    descrizione: "",
    retribuzione: "",
    contratto: null,
    modalita: null
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logMessage, setLogMessage] = useState("");
  
  // Funzione per il logging
  const logAction = (message) => {
    console.log(message);
    setLogMessage(message);
  };
  
  // Carica gli annunci esistenti all'avvio
  useEffect(() => {
    const caricaAnnunci = async () => {
      try {
        setIsLoading(true);
        logAction('Caricamento annunci dal server...');
        
        const emailAzienda = sessionStorage.getItem('email') || 
                            sessionStorage.getItem('userEmail') || 
                            sessionStorage.getItem('azienda_email') || 
                            localStorage.getItem('email') || 
                            "";
        
        if (!emailAzienda) {
          setError("Email dell'azienda non trovata nella sessione. Effettua nuovamente il login.");
          setIsLoading(false);
          return;
        }
        
        const url = new URL(`${prefix}/api/get-annuncio`);
        url.searchParams.append('email', emailAzienda);
        
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
          url.searchParams.append('token', token);
        }
        
        console.log('URL chiamata API:', url.toString());
        console.log('Email azienda per filtro:', emailAzienda);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Errore nel caricamento annunci: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Annunci ricevuti per azienda:', data);
        
        if (Array.isArray(data)) {
          const annunciFormattati = data.map(annuncio => ({
            id: annuncio.id || uuidv4(),
            titolo: annuncio.ruolo,
            descrizione: annuncio.descrizione || "",
            contratto: [mapContrattoFromAPI(annuncio.contratto)],
            modalitaLavoro: [mapModalitaFromAPI(annuncio.modalita)],
            retribuzione: annuncio.retribuzione ? `€${annuncio.retribuzione}` : ""
          }));
          
          setListaAnnunci(annunciFormattati);
          
          if (onAnnunciCountUpdate) {
            onAnnunciCountUpdate(annunciFormattati.length);
          }
          
          logAction(`Caricati ${annunciFormattati.length} annunci per l'azienda ${emailAzienda}`);
        } else {
          setListaAnnunci([]);
          if (onAnnunciCountUpdate) {
            onAnnunciCountUpdate(0);
          }
          logAction('Nessun annuncio trovato per questa azienda');
        }
      } catch (error) {
        console.error('Errore nel caricamento annunci:', error);
        setError('Impossibile caricare gli annunci. Riprova più tardi.');
      } finally {
        setIsLoading(false);
      }
    };
    
    caricaAnnunci();
  }, [onAnnunciCountUpdate]);
  
  // Mappature
  const mapContrattoFromAPI = (codice) => {
    const mappa = {
      'I': 'indeterminato',
      'D': 'determinato',
      'S': 'stage',
      'F': 'freelance',
      'X': 'daDefinire'
    };
    return mappa[codice] || 'daDefinire';
  };
  
  const mapModalitaFromAPI = (codice) => {
    const mappa = {
      'S': 'inSede',
      'I': 'ibrida',
      'R': 'remoto'
    };
    return mappa[codice] || 'inSede';
  };
  
  // Effetto per notificare il genitore
  useEffect(() => {
    if (onAnnunciCountUpdate) {
      logAction(`Notifica genitore: ${listaAnnunci.length} annunci`);
      onAnnunciCountUpdate(listaAnnunci.length);
    }
  }, [listaAnnunci.length, onAnnunciCountUpdate]);
  
  // Funzioni per gestire il form
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const resetForm = () => {
    setFormData({
      ruolo: "",
      descrizione: "",
      retribuzione: "",
      contratto: null,
      modalita: null
    });
    setError(null);
  };
  
  const handleContrattoChange = useCallback((tipo) => {
    updateField("contratto", tipo);
  }, []);
  
  const handleModalitaChange = useCallback((tipo) => {
    updateField("modalita", tipo);
  }, []);
  
  const addAnnuncio = useCallback(() => {
    if (!formData.ruolo?.trim()) {
      setError("Per favore, inserisci il ruolo");
      return;
    }
    
    if (!formData.contratto) {
      setError("Per favore, seleziona un tipo di contratto");
      return;
    }
    
    if (!formData.modalita) {
      setError("Per favore, seleziona una modalità di lavoro");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const contrattoMap = {
        "indeterminato": "TI", 
        "determinato": "TD",
        "stage": "S",
        "freelance": "F",
        "daDefinire": "CDD"
      };
      
      const modalitaMap = {
        "inSede": "S",
        "ibrida": "I",
        "remoto": "R"
      };
      
      const retribuzione = formData.retribuzione ? 
        parseInt(formData.retribuzione.replace(/[^0-9]/g, '')) || 0 : 
        0;
      
      const emailAzienda = sessionStorage.getItem('email') || 
                          sessionStorage.getItem('userEmail') || 
                          sessionStorage.getItem('azienda_email') || 
                          localStorage.getItem('email') || 
                          "";
      
      if (!emailAzienda) {
        setError("Email dell'azienda non trovata nella sessione. Effettua nuovamente il login.");
        setIsLoading(false);
        return;
      }
      
      const datiPerAPI = {
        ruolo: formData.ruolo.trim(),
        contratto: contrattoMap[formData.contratto] || "CDD",
        modalita: modalitaMap[formData.modalita] || "S",
        retribuzione: retribuzione,
        descrizione: formData.descrizione || "",
        email_azienda: emailAzienda
      };
      
      console.log("Invio dati all'API:", datiPerAPI);
      console.log("Email azienda dalla sessione:", emailAzienda);
      
      fetch(`${prefix}/api/add-annuncio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(datiPerAPI)
      })
      .then(response => {
        if (!response.ok) {
          console.error(`Errore HTTP: ${response.status}`);
          return response.text().then(text => {
            console.error("Risposta server:", text);
            throw new Error(`Errore dal server: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("Risposta API:", data);
        
        if (data && (data.message || data.id)) {
          const nuovoAnnuncio = {
            id: data.id || uuidv4(),
            titolo: formData.ruolo.trim(),
            descrizione: formData.descrizione || "",
            contratto: [formData.contratto],
            modalitaLavoro: [formData.modalita],
            retribuzione: formData.retribuzione || ""
          };
          
          setListaAnnunci(prevList => [nuovoAnnuncio, ...prevList]);
          
          if (onAnnuncioAggiunto) {
            onAnnuncioAggiunto();
          }
          
          resetForm();
        }
      })
      .catch(error => {
        console.error("Errore nella chiamata API:", error);
        setError(`Errore nell'invio dell'annuncio: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
    } catch (error) {
      setError(`Errore: ${error.message}`);
      console.error("Errore nell'aggiunta:", error);
      setIsLoading(false);
    }
  }, [formData, onAnnuncioAggiunto]);

  // Funzione per eliminare un singolo annuncio
  const removeAnnuncio = useCallback(async (id) => {
    if (window.confirm("Sicuro di voler eliminare questo annuncio?")) {
      try {
        setIsLoading(true);
        logAction(`Eliminazione annuncio: ${id}`);
        
        const response = await fetch(`${prefix}/api/remove-annuncio?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        
        if (!response.ok) {
          console.error(`Errore HTTP: ${response.status}`);
          const errorText = await response.text();
          console.error("Risposta server:", errorText);
          throw new Error(`Errore dal server: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Risposta eliminazione:", data);
        
        if (data && (data.message || data.success !== false)) {
          setListaAnnunci(prev => prev.filter(item => item.id !== id));
          
          if (onAnnuncioRimosso) {
            onAnnuncioRimosso();
          }
          
          logAction(`Annuncio ${id} eliminato con successo`);
        } else {
          throw new Error("Il server ha restituito un errore nell'eliminazione");
        }
        
      } catch (error) {
        console.error("Errore nell'eliminazione annuncio:", error);
        setError(`Errore nell'eliminazione dell'annuncio: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  }, [onAnnuncioRimosso]);
  
  // RIMOSSA: funzione removeAllAnnunci
  
  // Funzioni ausiliarie per i label
  const getContrattoLabel = (tipo) => {
    const labels = {
      indeterminato: "Tempo indeterminato",
      determinato: "Tempo determinato",
      stage: "Stage",
      freelance: "Freelance", 
      daDefinire: "Contratto da definire"
    };
    return labels[tipo] || tipo;
  };
  
  const getModalitaLabel = (tipo) => {
    const labels = {
      inSede: "In sede",
      ibrida: "Ibrida",
      remoto: "Da remoto"
    };
    return labels[tipo] || tipo;
  };

  return (
    <AnnunciContainer>
      <AnnunciListaContainer>
        <h2 style={{ margin: '0 0 20px 0' }}>
          I tuoi annunci {listaAnnunci.length > 0 && `(${listaAnnunci.length})`}
        </h2>
        
        {listaAnnunci.length === 0 ? (
          <p>Nessun annuncio pubblicato. Crea il tuo primo annuncio!</p>
        ) : (
          listaAnnunci.map(annuncio => (
            <AnnuncioCard key={annuncio.id}>
              <AnnuncioHeader>
                <TitoloAnnuncio>{annuncio.titolo}</TitoloAnnuncio>
                <div 
                  className="delete-button"
                  onClick={() => removeAnnuncio(annuncio.id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </AnnuncioHeader>
              
              <DettagliAnnuncio>
                {annuncio.descrizione && <p>{annuncio.descrizione}</p>}
                
                <TagContainer>
                  {annuncio.contratto && annuncio.contratto.map((c, i) => (
                    <Tag key={`${annuncio.id}-contratto-${i}`}>{getContrattoLabel(c)}</Tag>
                  ))}
                  
                  {annuncio.modalitaLavoro && annuncio.modalitaLavoro.map((m, i) => (
                    <Tag key={`${annuncio.id}-modalita-${i}`}>{getModalitaLabel(m)}</Tag>
                  ))}
                  
                  {annuncio.retribuzione && <Tag>{annuncio.retribuzione}</Tag>}
                </TagContainer>
              </DettagliAnnuncio>
            </AnnuncioCard>
          ))
        )}
      </AnnunciListaContainer>
      
      <FormSideContainer>
        <FormTitle>CREA NUOVO ANNUNCIO</FormTitle>
        
        {error && (
          <div style={{ color: 'red', marginBottom: '15px', padding: '8px', backgroundColor: '#ffeeee', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        
        <div>
          <FormLabel>RUOLO:</FormLabel>
          <FormInput 
            type="text"
            placeholder='Es. "Frontend Developer"'
            value={formData.ruolo}
            onChange={(e) => updateField("ruolo", e.target.value)}
          />
        </div>
        
        <div>
          <FormLabel>CONTRATTO:</FormLabel>
          <OptionsContainer>
            <RadioOption
              id="indeterminato"
              label="TEMPO INDETERMINATO"
              checked={formData.contratto === "indeterminato"}
              onChange={handleContrattoChange}
            />
            <RadioOption 
              id="determinato"
              label="TEMPO DETERMINATO"
              checked={formData.contratto === "determinato"}
              onChange={handleContrattoChange}
            />
            <RadioOption 
              id="stage"
              label="STAGE"
              checked={formData.contratto === "stage"}
              onChange={handleContrattoChange}
            />
            <RadioOption 
              id="freelance"
              label="FREELANCE"
              checked={formData.contratto === "freelance"}
              onChange={handleContrattoChange}
            />
            <RadioOption 
              id="daDefinire"
              label="CONTRATTO DA DEFINIRE"
              checked={formData.contratto === "daDefinire"}
              onChange={handleContrattoChange}
            />
          </OptionsContainer>
        </div>
        
        <div>
          <FormLabel>MODALITÀ DI LAVORO:</FormLabel>
          <OptionsContainer>
            <RadioOption 
              id="inSede"
              label="IN SEDE"
              checked={formData.modalita === "inSede"}
              onChange={handleModalitaChange}
            />
            <RadioOption 
              id="ibrida"
              label="IBRIDA"
              checked={formData.modalita === "ibrida"}
              onChange={handleModalitaChange}
            />
            <RadioOption 
              id="remoto"
              label="DA REMOTO"
              checked={formData.modalita === "remoto"}
              onChange={handleModalitaChange}
            />
          </OptionsContainer>
        </div>
        
        <div>
          <FormLabel>DESCRIZIONE:</FormLabel>
          <FormTextArea
            placeholder="Descrivi le responsabilità e i requisiti per questo ruolo"
            value={formData.descrizione || ""}
            onChange={(e) => updateField("descrizione", e.target.value)}
          />
        </div>
        
        <div>
          <FormLabel>RETRIBUZIONE (opzionale):</FormLabel>
          <FormInput
            type="text"
            placeholder='Es. "30,000-40,000€"'
            value={formData.retribuzione || ""}
            onChange={(e) => updateField("retribuzione", e.target.value)}
          />
        </div>
        
        <ButtonGroup>
          <Button 
            type="button" 
            onClick={addAnnuncio}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "PUBBLICAZIONE..." : "PUBBLICA ANNUNCIO"}
          </Button>
          <Button 
            type="button"
            style={{ backgroundColor: '#999' }}
            onClick={resetForm}
          >
            RESET
          </Button>
        </ButtonGroup>
      </FormSideContainer>
    </AnnunciContainer>
  );
};

export default ListaAnnunciAzienda;