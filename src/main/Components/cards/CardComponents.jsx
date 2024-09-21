import styled from "styled-components";
import { getColors } from "../../../constants/colors";

const colors = getColors();

function getRandomColor() {
  const colors = ["green", "yellow", "red"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export const cardProfilePic = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg");
  background-size: cover;
  background-position: center;
  margin: 10px auto 10px;
  border: 2px solid ${colors.firstColor};
  box-shadow: 0 0 23px -3px rgba(0, 0, 0, 0.4);

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.dotColor}; // Modifica qui
    border: 2px solid ${colors.firstColor};
  }
`;

export const studentName = styled.h2`
  font-size: 1rem; // Modifica qui
  margin: 0;
  text-align: center;
`;

export const studentDescription = styled.p`
  font-size: 0.8rem; // Modifica qui
  text-align: center;
  padding-right: 10px;
  padding-left: 10px;
`;

export const studentSkills = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap; // Aggiungi questa linea
  margin-top: 0px;
  height: 55px;
  padding-right: 20px;
  padding-left: 20px;
  overflow: scroll;
  scrollbar-width: none; // For Firefox
  -ms-overflow-style: none; // For Internet Explorer and Edge
`;
export const studentSkill = styled.span`
    font-size: 10px; // Modifica qui
    font-family: "Montserrat", sans-serif;
    padding: 5px 10px;
    height: 20px;
    margin-left: 5px;
    margin-top: 5px;
    border-radius: 10px;
    background-color: rgba(20, 117, 207, 0.7);
    color: ${colors.firstColor};
    
    &:first-child {
        margin-left: 0;
    }
    
    &:hover {
        background-color: rgba(20, 117, 207, 0.9);
`;

export const studentButton = styled.button`
  background-color: rgba(20, 117, 207, 0.62);
  color: ${colors.firstColor};
  border: none;
  border-radius: 10px;
  width: 85%;

  padding: 5px 10px;
  font-size: 0.8rem; // Modifica qui
  margin-bottom: 15px;
  cursor: pointer;
  display: block; // Aggiungi questa linea
  margin-left: auto; // Aggiungi questa linea
  margin-right: auto; // Aggiungi questa linea

  &:hover {
    background-color: rgba(20, 117, 207, 0.9);
  }
`;

export const customBanner = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.firstColor};
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const UploadForm = styled.form`
  display: flex;
  margin-top: 3.4375rem;
  flex-direction: column;
  justify-content: center; /* Distribuisce equamente gli elementi verticalmente */
  align-items: center; /* Centra gli elementi orizzontalmente */
  border: 2px dashed #1475cf;
  height: 16.875rem;
  width: 31.25rem;
  cursor: pointer;
  border-radius: 5px;

  /* Centra il form nella pagina */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
