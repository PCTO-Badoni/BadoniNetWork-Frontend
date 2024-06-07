import styled from "styled-components";
import batmanLogo from '../../assets/logo.png';

export const Container = styled.div`
    background-color: #fff;
    padding: 30px 65px;
    border-radius: 12px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    width: 95vw;
    height: 95vh;
`;

export const contentContainer = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(64, 112, 244, 0.47);
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;



export const cardsContainer = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    background-color: rgba(64, 112, 244, 0.47);
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: auto; // Aggiungi questa linea
`;
