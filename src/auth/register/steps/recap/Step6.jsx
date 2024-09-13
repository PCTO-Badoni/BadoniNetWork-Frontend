import React from "react";
import { PhotoProvider, usePhoto } from "../profilePicture/PhotoContext";
import { MdCloudUpload } from "react-icons/md";
import {
  Input,
  RecapContainer,
  RecapImage,
  RecapInput,
} from "../../RegisterComponents";
import ChipSelector from "../skills/ChipSelector";
import Chip from "@mui/material/Chip";

const Step6 = React.memo(
  ({
    nome,
    cognome,
    pronomi,
    dataDiNascita,
    email,
    telefono,
    indirizzo,
    articolazione,
    competenze,
  }) => {
    // Use the usePhoto hook to get the photo state
    const { photo } = usePhoto();

    return (
      <RecapContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            marginTop: "2em",
          }}
        >
          <RecapImage
            src={
              photo
                ? photo
                : "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingLeft: "2em",
            paddingBottom: "1em",
            gap: "20px",
            width: "100%",
          }}
        >
          <RecapInput>
            <label htmlFor="nome">Nome</label>
            <Input idtype="nome" value={nome} disabled={true} />
          </RecapInput>
          <RecapInput>
            <label htmlFor="cognome">Cognome</label>
            <Input idtype="cognome" value={cognome} disabled={true} />
          </RecapInput>
          <RecapInput>
            <label htmlFor="pronomi">Pronomi</label>
            <Input
              idtype="pronomi"
              value={pronomi.toString().replace("_", "/")}
              disabled={true}
            />
          </RecapInput>
          <RecapInput>
            <label htmlFor="datadinascita">Data di nascita</label>
            <Input
              idtype="datadinascita"
              value={dataDiNascita.toString().split(" ").slice(0, 4).join(" ")}
              disabled={true}
            />
          </RecapInput>
          <RecapInput>
            <label htmlFor="email">Email</label>
            <Input idtype="email" value={email} disabled={true} />
          </RecapInput>
          <RecapInput>
            <label htmlFor="telefono">Telefono</label>
            <Input idtype="telefono" value={telefono} disabled={true} />
          </RecapInput>
          <RecapInput>
            <label htmlFor="indirizzo">Indirizzo</label>
            <Input idtype="indirizzo" value={indirizzo} disabled={true} />
          </RecapInput>
          <RecapInput>
            <label htmlFor="articolazione">Articolazione</label>
            <Input
              idtype="articolazione"
              value={articolazione.descrizione}
              disabled={true}
            />
          </RecapInput>
          <RecapInput>
            <label htmlFor="competenze">Competenze</label>
            <div
              style={{
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                border: "3px solid #eee",
                padding: "0.75rem",
                borderRadius: "15px",
                fontSize: "1rem",
                height: "8em",
                scrollbarWidth: "none", // For Firefox
                msOverflowStyle: "none", // For Internet Explorer and Edge
                width: "51em",
                flexWrap: "wrap",
                overflow: "scroll",
              }}
            >
              {competenze &&
                competenze.map((competenza, index) => (
                  <Chip key={index} label={competenza.descrizione} />
                ))}
            </div>
          </RecapInput>
        </div>
      </RecapContainer>
    );
  },
);

export default Step6;
