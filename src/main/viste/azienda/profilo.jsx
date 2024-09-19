import React, { useState } from "react";
import * as Components from "../componenti/ProfileComponents";
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
import UserInfo from "../componenti/Fragments/UserInfo";
import { Row } from "primereact/row";
import { RecapImage } from "../../../auth/register/RegisterComponents";
import { FooterIcon } from "../../../FooterComponents";
import { LabelContainer, RecapIcon } from "../componenti/ProfileComponents";
const listIcon = <FontAwesomeIcon icon={faList} />;

const Profilo = ({
  searchTerm,
  selectedChips,
  selectedCompetenze,
  selectedLingue,
  chips,
  competenze,
  lingue,
}) => {
  const selectedFilteredChips = selectedChips.filter((chip) =>
    chip.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredChips = chips.filter((chip) =>
    chip.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const unselectedFilteredChips = filteredChips.filter(
    (chip) => !selectedChips.includes(chip),
  );

  const selectedFilteredCompetenze = selectedCompetenze.filter((competenza) =>
    competenza.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredCompetenze = competenze.filter((competenza) =>
    competenza.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const unselectedFilteredCompetenze = filteredCompetenze.filter(
    (competenza) => !selectedCompetenze.includes(competenza),
  );

  const selectedFilteredLingue = selectedLingue.filter((lingua) =>
    lingua.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredLingue = lingue.filter((lingua) =>
    lingua.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const unselectedFilteredLingue = filteredLingue.filter(
    (lingua) => !selectedLingue.includes(lingua),
  );

  const [activeButtons, setActiveButtons] = useState([]);
  const [buttonText, setButtonText] = useState("Modifica");
  const [email, setEmail] = useState("email");
  const [telefono, setTelefono] = useState("telefono");
  const [indirizzo, setIndirizzo] = useState("indirizzo");
  const [articolazione, setArticolazione] = useState("articolazione");

  const handleButtonClick = (buttonName) => {
    if (activeButtons.includes(buttonName)) {
      setActiveButtons(activeButtons.filter((button) => button !== buttonName));
    } else {
      setActiveButtons([...activeButtons, buttonName]);
    }
  };

  const handleSaveButtonClick = () => {
    if (buttonText === "Modifica") {
      setButtonText("Salva");
    } else {
      setButtonText("Modifica");
    }
  };

  return (
    <Components.contentContainer>
      <Components.TopBar>
        <UserInfo />
        <Components.Button
          style={{ height: "50px", width: "200px", margin: "auto" }}
          onClick={handleSaveButtonClick}
        >
          {buttonText}
        </Components.Button>
      </Components.TopBar>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Components.RecapInput>
          <label htmlFor="email">Email</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="email"
              value={email}
              disabled={buttonText !== "Salva"}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingRight: "30px" }} // Adjust padding to make space for the icon
            />
            {buttonText === "Salva" && (
              <RecapIcon
                className="pi pi-pen-to-square"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              ></RecapIcon>
            )}
          </div>
        </Components.RecapInput>
        <Components.RecapInput>
          <label htmlFor="telefono">Telefono</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="telefono"
              value={telefono}
              disabled={buttonText !== "Salva"}
              onChange={(e) => setTelefono(e.target.value)}
              style={{ paddingRight: "30px" }} // Adjust padding to make space for the icon
            />
            {buttonText === "Salva" && (
              <RecapIcon
                className="pi pi-pen-to-square"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              ></RecapIcon>
            )}
          </div>
        </Components.RecapInput>
        <Components.RecapInput>
          <label htmlFor="indirizzo">Indirizzo</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="indirizzo"
              value={indirizzo}
              disabled={buttonText !== "Salva"}
              onChange={(e) => setIndirizzo(e.target.value)}
              style={{ paddingRight: "30px" }} // Adjust padding to make space for the icon
            />
            {buttonText === "Salva" && (
              <RecapIcon
                className="pi pi-pen-to-square"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              ></RecapIcon>
            )}
          </div>
        </Components.RecapInput>
        <Components.RecapInput>
          <label htmlFor="articolazione">Articolazione {}</label>
          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              idtype="articolazione"
              value={articolazione}
              disabled={buttonText !== "Salva"}
              onChange={(e) => setArticolazione(e.target.value)}
              style={{ paddingRight: "30px" }} // Adjust padding to make space for the icon
            />
            {buttonText === "Salva" && (
              <RecapIcon
                className="pi pi-pen-to-square"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              ></RecapIcon>
            )}
          </div>
        </Components.RecapInput>
      </div>
    </Components.contentContainer>
  );
};

export default Profilo;
