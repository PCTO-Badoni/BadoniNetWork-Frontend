import React from "react";
import * as Components from "../AnnunciComponents";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "primeicons/primeicons.css";
import { FooterIcon } from "../../../../FooterComponents";
import { red } from "@mui/material/colors";

const ListaAnnunciAzienda = ({}) => {
  return (
    <Components.ListaAnnunci>
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
        }}
      >
        <Components.Annuncio>
          <Components.AnnuncioImage />
          <Components.AnnuncioInfo>
            <Components.AnnuncioTitolo>ingegnere</Components.AnnuncioTitolo>
          </Components.AnnuncioInfo>
          <Components.AnnuncioButtons>
            <FooterIcon
              className="pi pi-eye"
              style={{ color: "black", margin: "auto" }}
            ></FooterIcon>
            <FooterIcon
              className="pi pi-trash"
              style={{ color: "red", margin: "auto" }}
            ></FooterIcon>
          </Components.AnnuncioButtons>
        </Components.Annuncio>

        <Components.Annuncio>
          <Components.AnnuncioImage />
        </Components.Annuncio>

        <Components.Annuncio>
          <Components.AnnuncioImage />
        </Components.Annuncio>

        <Components.Annuncio>
          <Components.AnnuncioImage />
        </Components.Annuncio>

        <Components.Annuncio>
          <Components.AnnuncioImage />
        </Components.Annuncio>

        <Components.Annuncio>
          <Components.AnnuncioImage />
        </Components.Annuncio>

        <Components.Annuncio>
          <Components.AnnuncioImage />
        </Components.Annuncio>
      </div>
    </Components.ListaAnnunci>
  );
};

export default ListaAnnunciAzienda;
