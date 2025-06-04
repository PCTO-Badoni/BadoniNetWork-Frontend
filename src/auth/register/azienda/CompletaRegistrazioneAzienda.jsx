import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser, faPhone, faEnvelope, faIndustry, faLock } from '@fortawesome/free-solid-svg-icons';
import { RecapContainer } from '../RegisterComponents';

const prefix = import.meta.env.VITE_DEFAULT_HOST_DOMAIN;

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

const success = (message) =>
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

function CompletaRegistrazioneAzienda() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [aree, setAree] = useState([]);

  // Form fields based on database structure
  const [formData, setFormData] = useState({
    cognomereferente: '',
    nomereferente: '',
    telreferente: '',
    emailreferente: '',
    idarea: '',
    password: '',
    confirmPassword: ''
  });

  // Carica le aree dal database
  useEffect(() => {
    const fetchAree = async () => {
      try {
        const response = await fetch(`${prefix}/api/get-all-aree`);
        if (response.ok) {
          const data = await response.json();
          setAree(data);
        } else {
          error('Errore nel caricamento delle aree');
        }
      } catch (error) {
        console.error('Errore nel caricamento delle aree:', error);
        error('Errore nel caricamento delle aree');
      }
    };

    fetchAree();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.cognomereferente.trim()) {
      error('Il cognome del referente è obbligatorio');
      return false;
    }
    if (!formData.nomereferente.trim()) {
      error('Il nome del referente è obbligatorio');
      return false;
    }
    if (!formData.telreferente.trim()) {
      error('Il telefono del referente è obbligatorio');
      return false;
    }
    if (!formData.emailreferente.trim()) {
      error('L\'email del referente è obbligatoria');
      return false;
    }
    if (!formData.idarea) {
      error('Seleziona un\'area di competenza');
      return false;
    }
    if (!formData.password) {
      error('La password è obbligatoria');
      return false;
    }
    if (formData.password.length < 6) {
      error('La password deve essere di almeno 6 caratteri');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      error('Le password non coincidono');
      return false;
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailreferente)) {
      error('Inserisci un\'email valida per il referente');
      return false;
    }

    // Validazione telefono
    const phoneRegex = /^[0-9\s\+\-\(\)]{8,}$/;
    if (!phoneRegex.test(formData.telreferente)) {
      error('Inserisci un numero di telefono valido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Recupera i dati azienda dalla location state o dalla sessione
      const datiAzienda = location.state?.datiAzienda || {
        email: sessionStorage.getItem('temp_email'),
        ragionesociale: sessionStorage.getItem('temp_ragionesociale'),
        telefono: sessionStorage.getItem('temp_telefono'),
        indirizzo: sessionStorage.getItem('temp_indirizzo')
      };

      if (!datiAzienda.email) {
        error('Dati azienda non trovati. Riprova la registrazione.');
        setIsLoading(false);
        return;
      }

      // Formattazione dei dati come mostrato nell'immagine
      const dataCompleta = {
        email: datiAzienda.email,
        ragionesociale: datiAzienda.ragionesociale,
        telefono: datiAzienda.telefono,
        indirizzo: datiAzienda.indirizzo,
        password: formData.password,
        cognomereferente: formData.cognomereferente,
        nomereferente: formData.nomereferente,
        telreferente: formData.telreferente,
        emailreferente: formData.emailreferente,
        ruolo: "AZIENDA",
        idarea: parseInt(formData.idarea)
      };

      console.log('Invio dati completi azienda:', dataCompleta);

      const response = await fetch(`${prefix}/register/confirm-azienda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataCompleta),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Errore durante il completamento della registrazione');
      }

      const responseData = await response.json();
      console.log('Registrazione completata:', responseData);

      // SALVA I DATI NELLA SESSIONE DOPO LA REGISTRAZIONE COMPLETATA
      // Dati azienda principali
      sessionStorage.setItem('email', dataCompleta.email);
      sessionStorage.setItem('userEmail', dataCompleta.email);
      sessionStorage.setItem('ragioneSociale', dataCompleta.ragionesociale);
      sessionStorage.setItem('ragione_sociale', dataCompleta.ragionesociale);
      sessionStorage.setItem('nomeAzienda', dataCompleta.ragionesociale);
      sessionStorage.setItem('telefono', dataCompleta.telefono);
      sessionStorage.setItem('indirizzo', dataCompleta.indirizzo);
      
      // Dati referente
      sessionStorage.setItem('cognomereferente', dataCompleta.cognomereferente);
      sessionStorage.setItem('nomereferente', dataCompleta.nomereferente);
      sessionStorage.setItem('telreferente', dataCompleta.telreferente);
      sessionStorage.setItem('emailreferente', dataCompleta.emailreferente);
      
      // Altri dati utili
      sessionStorage.setItem('ruolo', dataCompleta.ruolo);
      sessionStorage.setItem('idarea', dataCompleta.idarea.toString());
      
      // Trova e salva anche la descrizione dell'area
      const areaSelezionata = aree.find(area => area.idarea === dataCompleta.idarea);
      if (areaSelezionata) {
        sessionStorage.setItem('descrizioneArea', areaSelezionata.descrizione);
      }
      
      // Salva anche token o ID se vengono restituiti dal server
      if (responseData.token) {
        sessionStorage.setItem('token', responseData.token);
      }
      if (responseData.id) {
        sessionStorage.setItem('userId', responseData.id);
        sessionStorage.setItem('aziendaId', responseData.id);
      }
      
      // Salva la data di registrazione
      sessionStorage.setItem('dataRegistrazione', new Date().toISOString());
      
      console.log('Dati salvati nella sessione:', {
        email: sessionStorage.getItem('email'),
        ragioneSociale: sessionStorage.getItem('ragioneSociale'),
        telefono: sessionStorage.getItem('telefono'),
        indirizzo: sessionStorage.getItem('indirizzo'),
        cognomereferente: sessionStorage.getItem('cognomereferente'),
        nomereferente: sessionStorage.getItem('nomereferente'),
        ruolo: sessionStorage.getItem('ruolo'),
        idarea: sessionStorage.getItem('idarea')
      });

      success('Registrazione completata con successo! Verrai reindirizzato al login...');
      
      // Pulisci SOLO i dati temporanei dalla sessione
      sessionStorage.removeItem('temp_email');
      sessionStorage.removeItem('temp_ragionesociale');
      sessionStorage.removeItem('temp_telefono');
      sessionStorage.removeItem('temp_indirizzo');

      // Reindirizza al login dopo 3 secondi
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error('Errore:', error);
      error(error.message || 'Errore durante il completamento della registrazione');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RecapContainer>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <FontAwesomeIcon 
          icon={faBuilding} 
          size="3x" 
          style={{ 
            color: 'var(--thirdColor)', 
            marginBottom: '20px' 
          }} 
        />
        <h1>Completa Registrazione Azienda</h1>
        <p style={{
          color: 'var(--fifthColor)',
          fontSize: '1rem',
          margin: '0',
          textAlign: 'center'
        }}>
          Inserisci i dettagli del referente aziendale
        </p>
      </div>

      {/* Form sections usando lo stesso stile del recap */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        width: '100%',
        maxWidth: '600px'
      }}>
        {/* Sezione Dati Referente */}
        <div>
          <h3 style={{
            color: 'var(--contrastColor)',
            fontSize: '1.3rem',
            fontWeight: '600',
            marginBottom: '20px',
            borderBottom: '2px solid var(--lightFirstColor)',
            paddingBottom: '10px'
          }}>
            Dati Referente
          </h3>
          
          {/* Cognome e Nome in una riga */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--contrastColor)',
                fontWeight: '500',
                marginBottom: '8px',
                fontSize: '0.9rem'
              }}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
                Cognome Referente *
              </label>
              <input
                type="text"
                name="cognomereferente"
                value={formData.cognomereferente}
                onChange={handleInputChange}
                placeholder="Inserisci il cognome"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e1e1',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: '"Montserrat", sans-serif',
                  backgroundColor: '#f8f9fa',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--contrastColor)',
                fontWeight: '500',
                marginBottom: '8px',
                fontSize: '0.9rem'
              }}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
                Nome Referente *
              </label>
              <input
                type="text"
                name="nomereferente"
                value={formData.nomereferente}
                onChange={handleInputChange}
                placeholder="Inserisci il nome"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e1e1',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: '"Montserrat", sans-serif',
                  backgroundColor: '#f8f9fa',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Telefono */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--contrastColor)',
              fontWeight: '500',
              marginBottom: '8px',
              fontSize: '0.9rem'
            }}>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px' }} />
              Telefono Referente *
            </label>
            <input
              type="tel"
              name="telreferente"
              value={formData.telreferente}
              onChange={handleInputChange}
              placeholder="+39 000 000 0000"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e1e1',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: '"Montserrat", sans-serif',
                backgroundColor: '#f8f9fa',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--contrastColor)',
              fontWeight: '500',
              marginBottom: '8px',
              fontSize: '0.9rem'
            }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px' }} />
              Email Referente *
            </label>
            <input
              type="email"
              name="emailreferente"
              value={formData.emailreferente}
              onChange={handleInputChange}
              placeholder="referente@azienda.com"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e1e1',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: '"Montserrat", sans-serif',
                backgroundColor: '#f8f9fa',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Sezione Area di Competenza */}
        <div>
          <h3 style={{
            color: 'var(--contrastColor)',
            fontSize: '1.3rem',
            fontWeight: '600',
            marginBottom: '20px',
            borderBottom: '2px solid var(--lightFirstColor)',
            paddingBottom: '10px'
          }}>
            Area di Competenza
          </h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--contrastColor)',
              fontWeight: '500',
              marginBottom: '8px',
              fontSize: '0.9rem'
            }}>
              <FontAwesomeIcon icon={faIndustry} style={{ marginRight: '8px' }} />
              Seleziona Area *
            </label>
            <select
              name="idarea"
              value={formData.idarea}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e1e1',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: '"Montserrat", sans-serif',
                backgroundColor: '#f8f9fa',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Seleziona un'area</option>
              {aree.map((area) => (
                <option key={area.idarea} value={area.idarea}>
                  {area.descrizione}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sezione Sicurezza */}
        <div>
          <h3 style={{
            color: 'var(--contrastColor)',
            fontSize: '1.3rem',
            fontWeight: '600',
            marginBottom: '20px',
            borderBottom: '2px solid var(--lightFirstColor)',
            paddingBottom: '10px'
          }}>
            Sicurezza
          </h3>
          
          {/* Password e Conferma Password in una riga */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--contrastColor)',
                fontWeight: '500',
                marginBottom: '8px',
                fontSize: '0.9rem'
              }}>
                <FontAwesomeIcon icon={faLock} style={{ marginRight: '8px' }} />
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Inserisci password"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e1e1',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: '"Montserrat", sans-serif',
                  backgroundColor: '#f8f9fa',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--contrastColor)',
                fontWeight: '500',
                marginBottom: '8px',
                fontSize: '0.9rem'
              }}>
                <FontAwesomeIcon icon={faLock} style={{ marginRight: '8px' }} />
                Conferma Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Conferma password"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e1e1',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: '"Montserrat", sans-serif',
                  backgroundColor: '#f8f9fa',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottone Submit */}
        <button 
          type="submit" 
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '15px 24px',
            background: 'linear-gradient(135deg, var(--thirdColor) 0%, var(--fourthColor) 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: '"Montserrat", sans-serif',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            marginTop: '20px',
            transition: 'all 0.3s ease'
          }}
        >
          {isLoading ? 'Completamento in corso...' : 'Completa Registrazione'}
        </button>
      </div>
    </RecapContainer>
  );
}

export default CompletaRegistrazioneAzienda;