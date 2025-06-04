import React, { forwardRef } from "react";
import { 
  RecapContainer, 
  RecapSection,
  RecapRow,
  RecapInput, 
  ProfileImageContainer,
  ChipsContainer,
} from "../../RegisterComponents";
import Chip from "@mui/material/Chip";
import { usePhoto } from "../profilePicture/PhotoContext";

const Step6 = forwardRef(
  (
    {
      nome,
      cognome,
      pronomi,
      dataDiNascita,
      email,
      telefono,
      indirizzo,
      articolazione,
      competenze,
    },
    ref,
  ) => {
    const { photo } = usePhoto();

    // Immagine profilo di default (avatar blu)
    const defaultAvatar = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiMyMTk2RjMiLz4KPHBhdGggZD0iTTUwIDMwQzU2LjYyNzQgMzAgNjIgMzUuMzcyNiA2MiA0MkM2MiA0OC42Mjc0IDU2LjYyNzQgNTQgNTAgNTRDNDMuMzcyNiA1NCAzOCA0OC42Mjc0IDM4IDQyQzM4IDM1LjM3MjYgNDMuMzcyNiAzMCA1MCAzMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMCA3NkMzMCA2NS41MDY2IDM5LjUwNjYgNTcgNTAgNTdDNjAuNDkzNCA1NyA3MCA2NS41MDY2IDcwIDc2VjgySDMwVjc2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";

    return (
      <RecapContainer ref={ref}>
        {/* Titolo principale */}
        <h1>Recap</h1>

        {/* Immagine Profilo - sempre mostrata */}
        <ProfileImageContainer>
          <img 
            src={photo || defaultAvatar} 
            alt="Immagine profilo" 
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: photo ? '3px solid var(--thirdColor)' : '3px solid #2196F3'
            }}
          />
          <p style={{ 
            color: 'var(--contrastColor)', 
            fontSize: '0.9rem', 
            margin: '8px 0 0 0',
            fontWeight: '500'
          }}>
            {photo ? 'Immagine Profilo' : ''}
          </p>
        </ProfileImageContainer>

        {/* Informazioni Personali */}
        <RecapSection>
          <h3>Informazioni Personali</h3>
          <RecapRow>
            <RecapInput>
              <label>Nome</label>
              <input value={nome || ""} disabled />
            </RecapInput>
            <RecapInput>
              <label>Cognome</label>
              <input value={cognome || ""} disabled />
            </RecapInput>
          </RecapRow>
          
          <RecapRow>
            <RecapInput>
              <label>Pronomi</label>
              <input value={pronomi ? pronomi.toString().replace("_", "/") : ""} disabled />
            </RecapInput>
            <RecapInput>
              <label>Data di nascita</label>
              <input 
                value={dataDiNascita ? dataDiNascita.toString().split(" ").slice(0, 4).join(" ") : ""} 
                disabled 
              />
            </RecapInput>
          </RecapRow>
        </RecapSection>

        {/* Contatti */}
        <RecapSection>
          <h3>Contatti</h3>
          <RecapInput>
            <label>Email</label>
            <input value={email || ""} disabled />
          </RecapInput>
          <RecapInput>
            <label>Telefono</label>
            <input value={telefono || ""} disabled />
          </RecapInput>
          <RecapInput>
            <label>Indirizzo</label>
            <input value={indirizzo || ""} disabled />
          </RecapInput>
        </RecapSection>

        {/* Formazione */}
        <RecapSection>
          <h3>Formazione</h3>
          <RecapInput>
            <label>Articolazione</label>
            <input value={articolazione?.descrizione || ""} disabled />
          </RecapInput>
        </RecapSection>

        {/* Competenze */}
        <RecapSection>
          <h3>Competenze</h3>
          <ChipsContainer>
            {competenze && competenze.length > 0 ? (
              competenze.map((competenza, index) => (
                <Chip 
                  key={index} 
                  label={competenza.descrizione}
                  size="small"
                  variant="outlined"
                  style={{
                    backgroundColor: 'var(--lightFirstColor)',
                    color: 'var(--contrastColor)',
                    fontSize: '0.8rem'
                  }}
                />
              ))
            ) : (
              <p style={{ color: '#999', margin: 0 }}>Nessuna competenza selezionata</p>
            )}
          </ChipsContainer>
        </RecapSection>
      </RecapContainer>
    );
  },
);

export default Step6;