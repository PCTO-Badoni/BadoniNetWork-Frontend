import styled from "styled-components";
import React from "react";


export const Container = styled.div`
    background-color: #fff;
    padding: 30px 30px 10px;
    border-radius: 12px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    width: 95vw;
    height: 95vh;
    overflow: clip;
`;

export const studentName = styled.div`
    font-size: 2rem;
    display: flex;
    text-align: center;
    flex: 1;
`;

export const studentDescription = styled.div`
    font-size: 0.8rem;
    text-align: center;
    flex: 1;
    display: flex;
`;

export const studentSkills = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 0;
`;

export const studentSkill = styled.span`
    font-size: 15px;
    font-family: "Montserrat", sans-serif;
    padding: 10px 10px;
    margin-left: 5px;
    margin-top: 5px;
    border-radius: 20px;
    background-color: rgba(20, 117, 207, 0.7);
    color: #fff;

    &:first-child {
        margin-left: 0;
    }

    &:hover {
        background-color: rgba(20, 117, 207, 0.9);
    }
`;

export const studentButton = styled.button`
    background-color: rgba(20, 117, 207, 0.62);
    color: #fff;
    border: none;
    border-radius: 10px;
    width: 85%;
    padding: 5px 10px;
    font-size: 0.8rem;
    margin-bottom: 15px;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;

    &:hover {
        background-color: rgba(20, 117, 207, 0.9);
    }
`;

export const customBanner = styled.div`
    background-image: url(${props => props.image});
    background-color: rgba(0, 0, 0, 0.5);
    background-blend-mode: multiply;
    background-size: cover;
    background-position: center;
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    padding-left: 35px;
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
    border-radius: 12px;
`;

export const cardProfilePic = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-image: url("https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg");
    background-size: cover;
    background-position: center;
    margin: 10px auto 10px;
    border: 2px solid #fff;
    box-shadow: 0 0 23px -3px rgba(0, 0, 0, 0.4);
    position: relative;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: ${props => props.dotColor};
        border: 2px solid #fff;
    }
`;

export const userInformations = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    padding: 40px 20px;
    border-radius: 12px;
`;


export const contentContainer = styled.div`
    display: flex;
    padding-top: 5px;
    flex-grow: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start; /* Cambiato per migliorare l'allineamento verticale */
    width: 100%;
    height: calc(100% - 200px); /* Sottrai l'altezza del customBanner */
    border-radius: 12px;
`;

export const rightContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    
`;

export const leftContainer = styled.div`
    display: flex;
    flex: 4;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    height: 100%;
    padding-bottom: 10px;
    overflow: clip;
`;

export const contactContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex: 1.5;
    border-radius: 12px;
    padding-top: 20px;
    padding-bottom: 30px;
`;

export const linksContainer = styled.div`
    display: flex;
    flex: 0.5;
    flex-direction: column;
    padding-top: 20px;
    align-items: center;
    width: 100%;
    border-radius: 12px;
    background-color: #f2f2f2;
    
`;

export const portfolioLinkContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    scale: 0.8;
    
    width: 100%;
    border-radius: 12px;
    padding-left: 50px;
    padding-right: 50px;
`;

export const socialLinksContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 100%;
    border-radius: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    scale: 0.8;

`;

export const SocialLink = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #fff;
    color: #0b75ed;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    &:hover {
        background-color: #0b75ed;
        color: #fff;
        scale: 1.05;
        transition: all 0.6s;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        cursor: pointer;
        

    }
`;

export const SocialIcon = ({ icon }) => (
    <SocialLink>
        {React.cloneElement(icon, { style: { fontSize: '25px' }})}
    </SocialLink>

);



export const portfolioLink = styled.a`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 12px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: start;
    text-anchor: start;
    height: 2.5em;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    &:hover {
        background-color: #0b75ed;
        color: #fff;
        scale: 1.05;
        transition: all 0.6s;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        cursor: pointer;
    }
    
`;

export const Contacts = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    
    padding-top: 20px;
    width: 100%;
    border-radius: 12px;
    background-color: #f2f2f2;
    height: 100%; // Assicurati che sia abbastanza alta, o regola secondo necessità
`;


export const ChatButton = styled.button`
    background-color: rgba(20, 117, 207, 0.62);
    color: #fff;
    border: none;
    border-radius: 10px;
    width: 85%;
    padding: 5px 10px;
    font-size: 0.8rem;
    margin-bottom: 15px;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;

    &:hover {
        background-color: rgba(20, 117, 207, 0.9);
    }

`;

export const EmailContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between; // Mantiene gli elementi distribuiti uniformemente verticalmente
    align-items: flex-start;
    width: 100%;
    border-radius: 12px;
    background-color: #f2f2f2;
    height: 100%; // Assicurati che sia abbastanza alta, o regola secondo necessità

    padding-right: 20px;
    padding-left: 20px;
`;

export const EmailTitleInput = styled.input`
    background-color: #ffffff;
    border: 2px solid #aaa;
    outline-offset: -2px;
    padding: 0.5rem;
    width: 100%;
    border-radius: 12px;
    font-family: "Montserrat", sans-serif;
    font-size: 0.75rem;
    margin-top: 10px;
    
    &:focus {
        outline: none;
        box-shadow: 0 0 4px #0b75ed;
    
    }
`;

export const EmailAziendale = styled.input`
    background-color: #ffffff;
    border: 2px solid #aaa;
    outline-offset: -2px;
    padding: 0.5rem;
    width: 100%;
    border-radius: 12px;
    font-family: "Montserrat", sans-serif;
    font-size: 0.75rem;

    &:focus {
        outline: none;
        box-shadow: 0 0 4px #0b75ed;

    }
`;

export const EmailContentInput = styled.textarea`
    background-color: #ffffff;
    border: 2px solid #aaa;
    outline-offset: -2px;
    padding: 0.5rem;
    width: 100%;
    border-radius: 15px;
    font-family: "Montserrat", sans-serif;
    font-size: 0.75rem;
    height: 100%;
    margin-top: 10px;
    resize: none;

    &:focus {
        outline: none;
        box-shadow: 0 0 4px #0b75ed;

    }
    
    
`;

export const EmailForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: stretch;
    width: 100%;
    border-radius: 12px;
    height: 100%;
`;

export const EmailButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: #fff;
    color: #0b75ed;
    border: 2px solid #aaa;
    outline-offset: -2px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    cursor: pointer;

    &:hover {
        background-color: #0b75ed;
        color: #fff;
        scale: 1.05;
        transition: all 0.6s;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
    
    
`;

export const Iconbutton = ({ icon }) => (
    <EmailButton>
        {icon}
    </EmailButton>
);

export const ButtonsRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    border-radius: 12px;
`;


export const AboutMe = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: start;
    font-size: 17px;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background-color: #f2f2f2;
    padding: 0 20px 20px;
    overflow: scroll;
    max-height: 200px;
`;

export const Sectiontitle = styled.h2`
    font-size: 1.5rem;
    width: 100%;
    height: 50px;
    padding-top: 5px;
    border-bottom: 1px solid #333;
    color: #333;
    top: 0;
    background-color: #f2f2f2; // Aggiungi un colore di sfondo per evitare sovrapposizioni di testo
    z-index: 1; // Assicurati che il titolo sia sopra gli altri elementi
    position: sticky;
`;

export const AziendeWorked = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: start;
    font-size: 17px;
    width: 100%;
    height: 40vh;
    border-radius: 12px;
    overflow: scroll;
    gap: 5px;

`;

export const AziendeWorkedContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 44vh;
`;

export const AziendeWorkedContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: start;
    font-size: 17px;
    width: 100%;
    height: calc(100% - 49px); // Sottrai l'altezza del titolo
    border-radius: 12px;
    overflow: scroll;
    gap: 5px;
`;


export const CVContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 44vh;
`;

export const CVContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: start;
    font-size: 17px;
    width: 100%;
    height: calc(100% - 49px); // Sottrai l'altezza del titolo
    overflow: scroll;
    gap: 5px;
`;


export const CVDownloader = styled.button`
    background-color: rgba(20, 117, 207, 0.62);
    color: #fff;
    border: none;
    border-radius: 10px;
    width: 85%;
    padding: 5px 10px;
    font-size: 0.8rem;
    margin-bottom: 15px;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;
    `;






export const MapAndAziendeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    width: 100%;
    height: 100%;
    gap: 20px; /* Adds space between the map and AziendeWorked */
`;

export const AziendaWorked = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ddd; // Aggiunge una linea sottile tra le aziende
`;

export const AziendaName = styled.h3`
    margin: 0;
    font-size: 1em;
    color: #333;
`;

export const AziendaDescription = styled.p`
    margin: 0;
    font-size: 0.7em;
    color: #666;
`;

export const MapTitle = styled.h2`
    font-size: 1.5rem;
    width: 100%;
    height: 40px;
    margin-top: 25px;
    border-bottom: 1px solid #333;
    color: #333;
    position: sticky;
    top: 0;
    z-index: 1; // Assicurati che il titolo sia sopra gli altri elementi

`;
