import styled from "styled-components";
import Chip from "@mui/material/Chip";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 200vh;
  overflow: scroll;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const contentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 95dvh;
  border-radius: 12px;
  padding-left: 15px;
`;

export const TopBar = styled.div`
  background: #fff;
  width: 100%;
  height: 7em;
  border-radius: 12px;
  padding: 2em;
  margin-bottom: 15px;
`;

export const ProfileInformations = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: #fff;
`;

export const userInfoProfilePic = styled.div`
  position: relative;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-image: url("https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg");
  background-size: cover;
  background-position: center;
  border: 2px solid #fff;
  box-shadow: 0 0 23px -3px rgba(0, 0, 0, 0.4);

  &::after { 
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.dotColor};
    border: 2px solid #fff;
  }
`;

export const listItemName = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const listItemInfo = styled.div`
  width: 100%;
  font-size: 1em;
`;

export const nameContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  height: 4em;
  border-bottom: 2px solid #ccc;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-top: 20px;
  height: 40%;
  gap: 20px;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  color: black;
  text-decoration: none;
  width: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  align-content: center;
  text-align: left;
  justify-content: start;
  align-items: center;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 75vh;
  border-radius: 12px;
  background-color: transparent;
`;

export const ContactsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  border-radius: 12px;
  background-color: #fff;
  overflow: clip;
  height: 100%;
  width: 37%;
  margin-right: 10px;
  padding: 20px 0 20px 20px;
`;

export const ChatsContainer = styled.div`
  display: flex;
  padding: 0 20px 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 5;
  height: 100%;
  border-radius: 12px;
  background-color: #fff;
  margin-left: 5px;
  overflow: scroll;
`;

export const Input = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const ContactCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 5em;
  border-radius: 12px;
  background-color: ${({ contactId, selectedId }) =>
    contactId === selectedId ? "rgba(160,160,160,0.27)" : "#fff"};
  margin-bottom: 15px;
  border: ${({ contactId, selectedId }) =>
    contactId === selectedId ? "2px solid #ccc" : "1px solid #ccc"};

  &:hover {
    background-color: ${({ contactId, selectedId }) =>
      contactId === selectedId
        ? "rgba(160,160,160,0.27)"
        : "rgba(160, 160, 160, 0.15)"};

    cursor: ${({ contactId, selectedId }) =>
      contactId === selectedId ? "" : "pointer"};
  }

  &:active {
    background-color: rgba(160, 160, 160, 0.27);
  }
`;

export const ContactsSearchBar = styled.input.attrs({
  type: "search",
  placeholder: "Cerca",
})`
  border-radius: 12px;
  border: 1px solid #ccc;
  padding: 10px 5px 10px 40px;
  background: url("https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png")
    no-repeat left 10px center;
  background-size: 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9em;
  width: 100%;
  outline-color: black;
  margin-bottom: 10px;
  margin-right: 20px;
`;

export const ContactProfileImage = styled.div`
  position: relative;
  width: 85px;
  height: 85px;
  scale: 0.6;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  border: 2px solid #fff;
  box-shadow: 0 0 23px -3px rgba(0, 0, 0, 0.4);
`;

export const ContactInfos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

export const ContactName = styled.div`
  font-size: 1em;
  display: flex;

  width: 100%;
  justify-content: space-between; /* Distribuisce gli elementi tra l'inizio e la fine */
  padding-right: 10px;
`;

export const ContactLastMsg = styled.div`
  font-size: 0.9em;
  color: #8a8a8a;
  white-space: nowrap; /* Evita che il testo vada a capo */
  overflow: hidden; /* Nasconde il testo che esce fuori */
  text-overflow: ellipsis; /* Aggiunge i "..." quando il testo è troppo lungo */
  max-width: 20em; /* Limita la larghezza al 100% del contenitore */
`;

export const ContactCardList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: #fff;
  margin-bottom: 10px;
  overflow: scroll;
  padding-right: 20px;
  padding-bottom: 30px;
`;

export const listItem = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ccc;
`;

export const SkillChip = styled(Chip)`
  background-color: rgba(20, 117, 207, 0.7);
  color: #fff;
  margin-top: 5px;
  margin-right: 5px;
  font-weight: bold;
  border-radius: 10px;

  &:hover {
    background-color: rgba(20, 117, 207, 0.9);
  }
`;

export const ListItemSkills = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0;
  padding-left: 10px;
`;

export const ListItemSkill = styled.div`
  font-size: 0.6rem;
  padding: 5px 10px;
  height: 20px;
  margin-left: 5px;
  margin-top: 5px;
  border-radius: 10px;
  background-color: rgba(20, 117, 207, 0.7);
  color: #fff;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    background-color: rgba(20, 117, 207, 0.9);
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  font-size: 1em;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
`;

export const ViewModeButton = styled.button`
  border-radius: 20px;
  background: none;
  border: none;
  font-size: 20px;
  color: black;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
`;

export const DisponibilityContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  justify-content: center;
`;

export const DisponibilityButton = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: 15px;
  color: black;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;

  &:hover {
    cursor: pointer;
  }
`;

export const VerticalSeparator = styled.div`
  height: 20px;
  border-left: 1px solid black;
  margin-left: 10px;
  margin-right: 10px;
`;
