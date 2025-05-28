import React, { useState, useEffect, useCallback, useRef } from "react";
import * as Components from "../componenti/AnnunciComponents";
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
import ListaAnnunciAzienda from "../componenti/Fragments/ListaAnnunciAzienda";
const listIcon = <FontAwesomeIcon icon={faList} />;
const prefix = import.meta.env.VITE_DEFAULT_HOST_DOMAIN;

const Annunci = ({ onAnnuncioAggiunto, onAnnuncioRimosso, onAnnunciCountUpdate, annunciCount = 0, loaded = false }) => {
  // Ref per tracciare le statistiche reali dall'ultima chiamata API
  const ultimiDatiRef = useRef({
    annunciAttivi: 0,
    candidatureRicevute: 0,
    annunciChiusi: 0
  });
  
  const [statisticheAnnunci, setStatisticheAnnunci] = useState({
    annunciAttivi: 0,
    candidatureRicevute: 0,
    annunciChiusi: 0
  });
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Caricamento iniziale all'avvio del componente
  useEffect(() => {
    console.log("🚀 Componente montato, caricamento iniziale...");
    fetchListaAnnunciEStatistiche();
  }, []);
  
  // Effetto per sincronizzare con l'annunciCount esterno quando loaded è true
  useEffect(() => {
    if (loaded && annunciCount !== undefined) {
      console.log("🔄 Sincronizzazione iniziale con annunciCount esterno:", annunciCount);
      setStatisticheAnnunci(prev => ({
        ...prev,
        annunciAttivi: annunciCount
      }));
    }
  }, [loaded, annunciCount]);
  
  // Effetto per il refresh trigger
  useEffect(() => {
    console.log("🔁 Refresh trigger cambiato:", refreshTrigger);
    if (refreshTrigger > 0) {
      fetchListaAnnunciEStatistiche();
    }
  }, [refreshTrigger]);

  // Funzione migliorata che prima ottiene la lista effettiva degli annunci, poi le statistiche
  const fetchListaAnnunciEStatistiche = useCallback(() => {
    console.log("⏳ Iniziando recupero lista annunci e statistiche...");
    setIsLoading(true);
    
    // Prima recuperiamo la lista degli annunci per avere un conteggio preciso
    fetch(`${prefix}/api/annunci-azienda`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella risposta del server per lista annunci');
        }
        return response.json();
      })
      .then(listaAnnunci => {
        // Calcola il numero REALE di annunci attivi dalla lista
        const annunciAttiviEffettivi = Array.isArray(listaAnnunci) ? listaAnnunci.length : 0;
        console.log("📋 Lista annunci recuperata, conteggio REALE:", annunciAttiviEffettivi);
        
        // Aggiorna immediatamente il conteggio annunci con il valore REALE
        setStatisticheAnnunci(prev => ({
          ...prev,
          annunciAttivi: annunciAttiviEffettivi
        }));
        
        // Aggiorna anche il counter globale
        if (onAnnunciCountUpdate) {
          console.log("📊 Aggiornamento conteggio globale con valore REALE:", annunciAttiviEffettivi);
          onAnnunciCountUpdate(annunciAttiviEffettivi);
        }
        
        // Ora recupera le altre statistiche per avere i dati completi
        return fetch(`${prefix}/api/get-statistiche-annunci`);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella risposta del server per statistiche');
        }
        return response.json();
      })
      .then(data => {
        console.log("✅ Statistiche complete ricevute:", data);
        
        // Manteniamo il conteggio annunci già aggiornato correttamente dalla lista
        // e aggiorniamo solo le altre statistiche
        setStatisticheAnnunci(prev => ({
          ...prev, // Mantiene il conteggio annunci corretto
          candidatureRicevute: data.candidatureRicevute || 0,
          annunciChiusi: data.annunciChiusi || 0
        }));
        
        // Aggiorniamo il riferimento
        ultimiDatiRef.current = {
          annunciAttivi: statisticheAnnunci.annunciAttivi, // Mantiene il valore corretto
          candidatureRicevute: data.candidatureRicevute || 0,
          annunciChiusi: data.annunciChiusi || 0
        };
      })
      .catch(error => {
        console.error('❌ Errore nel caricamento dei dati:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [onAnnunciCountUpdate]);

  // Gestione dell'aggiunta di un nuovo annuncio
  const handleAnnuncioAggiunto = useCallback(() => {
    console.log("➕ Annuncio aggiunto in Annunci.jsx");
    
    // Aggiorna immediatamente il counter locale (ottimistico)
    setStatisticheAnnunci(prev => ({
      ...prev,
      annunciAttivi: prev.annunciAttivi + 1
    }));
    
    // Informa il componente padre
    if (onAnnuncioAggiunto) {
      onAnnuncioAggiunto();
    }
    
    // Forza un aggiornamento completo dopo un breve delay
    setTimeout(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 500);
  }, [onAnnuncioAggiunto]);

  // Gestione della rimozione di un annuncio
  const handleAnnuncioRimosso = useCallback((reset = false) => {
    console.log("➖ Annuncio rimosso in Annunci.jsx, reset:", reset);
    
    // Aggiorna immediatamente il counter locale (ottimistico)
    if (reset) {
      console.log("🧹 Resettando tutti gli annunci");
      setStatisticheAnnunci(prev => ({
        ...prev,
        annunciAttivi: 0,
        annunciChiusi: prev.annunciChiusi + prev.annunciAttivi
      }));
      
      // Informa il componente padre
      if (onAnnuncioRimosso) {
        onAnnuncioRimosso(true);
      }
    } else {
      console.log("🗑️ Rimuovendo un singolo annuncio");
      setStatisticheAnnunci(prev => ({
        ...prev,
        annunciAttivi: Math.max(0, prev.annunciAttivi - 1),
        annunciChiusi: prev.annunciChiusi + 1
      }));
      
      // Informa il componente padre
      if (onAnnuncioRimosso) {
        onAnnuncioRimosso(false);
      }
    }
    
    // Forza un aggiornamento completo dopo un breve delay
    setTimeout(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 500);
  }, [onAnnuncioRimosso]);
  
  // Funzione per aggiornamento diretto del conteggio
  const handleAnnunciUpdate = useCallback((count) => {
    console.log("📊 Aggiornamento diretto conteggio annunci:", count);
    
    setStatisticheAnnunci(prev => ({
      ...prev,
      annunciAttivi: count
    }));
    
    if (onAnnunciCountUpdate) {
      onAnnunciCountUpdate(count);
    }
  }, [onAnnunciCountUpdate]);

  // Funzione per forzare il refresh
  const forceRefresh = useCallback(() => {
    console.log("🔄 Forza refresh richiesto");
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <Components.contentContainer>
      <Components.TopBar style={{ height: "150px" }}>
        <Components.InfoAnnunciElement>
          <h1>{isLoading ? "..." : statisticheAnnunci.annunciAttivi}</h1>
          <h5>ANNUNCI ATTIVI</h5>
        </Components.InfoAnnunciElement>

        <Components.InfoAnnunciElement>
          <h1>{isLoading ? "..." : statisticheAnnunci.candidatureRicevute}</h1>
          <h5>CANDIDATURE RICEVUTE</h5>
        </Components.InfoAnnunciElement>

        <Components.InfoAnnunciElement>
          <h1>{isLoading ? "..." : statisticheAnnunci.annunciChiusi}</h1>
          <h5>ANNUNCI CHIUSI</h5>
        </Components.InfoAnnunciElement>
      </Components.TopBar>

      <Components.AnnunciContainer>
        <ListaAnnunciAzienda 
          onAnnuncioAggiunto={handleAnnuncioAggiunto} 
          onAnnuncioRimosso={handleAnnuncioRimosso}
          onAnnunciCountUpdate={handleAnnunciUpdate}
          annunciAttivi={statisticheAnnunci.annunciAttivi}
          refreshStatistiche={forceRefresh}
          refreshTrigger={refreshTrigger}
          isLoading={isLoading}
        />
      </Components.AnnunciContainer>
    </Components.contentContainer>
  );
};

export default Annunci;