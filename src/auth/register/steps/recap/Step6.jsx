import React from "react";
import { PhotoProvider, usePhoto } from "../profilePicture/PhotoContext";
import { MdCloudUpload } from "react-icons/md";
import { Input } from "../../RegisterComponents";
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: "15em",
          paddingRight: "15em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src={
              photo
                ? photo
                : "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
            }
            width={250}
            height={250}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid rgba(20, 117, 207, 0.5)",
            }}
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
          <div>
            <label htmlFor="nome">Nome</label>
            <Input idtype="nome" value={nome} disabled={true} />
          </div>
          <div>
            <label htmlFor="cognome">Cognome</label>
            <Input idtype="cognome" value={cognome} disabled={true} />
          </div>
          <div>
            <label htmlFor="pronomi">Pronomi</label>
            <Input
              idtype="pronomi"
              value={pronomi.toString().replace("_", "/")}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="datadinascita">Data di nascita</label>
            <Input
              idtype="datadinascita"
              value={dataDiNascita.toString().split(" ").slice(0, 4).join(" ")}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input idtype="email" value={email} disabled={true} />
          </div>
          <div>
            <label htmlFor="telefono">Telefono</label>
            <Input idtype="telefono" value={telefono} disabled={true} />
          </div>
          <div>
            <label htmlFor="indirizzo">Indirizzo</label>
            <Input idtype="indirizzo" value={indirizzo} disabled={true} />
          </div>
          <div>
            <label htmlFor="articolazione">Articolazione</label>
            <Input
              idtype="articolazione"
              value={articolazione}
              disabled={true}
            />
          </div>
          <div>
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
                height: "4em",
                scrollbarWidth: "none", // For Firefox
                msOverflowStyle: "none", // For Internet Explorer and Edge
                width: "33.5em",
                flexWrap: "wrap",
                overflowY: "scroll",
              }}
            >
              {competenze &&
                competenze.map((competenza, index) => (
                  <Chip key={index} label={competenza.descrizione} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default Step6;
