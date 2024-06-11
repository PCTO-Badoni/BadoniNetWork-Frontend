import styled from "styled-components";
import batmanLogo from '../../assets/logo.png';

export const Container = styled.div`
    background-color: #fff;
    padding: 30px 65px;
    border-radius: 12px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    width: 95vw;
    height: 95vh;
    display: flex;
    flex-direction: row;
`;

export const contentContainer = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;


export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    height: 7em;
    background: #fff;
    border-top-right-radius: 12px;
`;

export const Logo = styled.img.attrs(props => ({src: batmanLogo}))`
    width: 60px;
    height: 60px;
    background-size: cover;
`;

export const SearchBar = styled.input.attrs({type: 'search', placeholder: 'Cerca'})`
    border-radius: 20px;
    border: 1px solid #ccc;
    padding: 10px 5px 10px 40px;
    background: url("https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png") no-repeat left 10px center;
    background-size: 20px;
    font-family: "Montserrat", sans-serif;
    font-size: 0.9em;
    width: 30em;
    align-self: center;
    outline-color: black;
`;

export const Sidebar = styled.div`
    background-color: #fff;
    width: 15dvw;
    height: 100%;
    padding: 10px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
`;

export const Button = styled.button`
    border-radius: 20px;
    border: 1px solid #5865f2;
    background-color: #5865f2;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    margin: 8px 0 0;
    text-decoration: none;
    
    z-index: 50;
    
    &:focus {
    outline: none;
    }
`;

export const MainPageContainer = styled.div`
    display: flex;
    flex-direction: column;    
    flex: 1;
    border-radius: 12px;
    padding-right: 20px;
`;

export const PageContentContainer = styled.div `
    margin-bottom: 20px;
    background: rgba(64, 112, 244, 0.48);
    border-radius: 12px;
    width: 100%;
    height: 100%;
    padding: 20px;
`;

export const StudentCard = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    margin-bottom: 20px;
    width: 300px;
    height: 400px;
`;

export const StudentCardImage = styled.img`
    width: 250px; // You can adjust this
    height: 250px; // You can adjust this
    border-radius: 50%; // This will make the image round
    object-fit: cover; // This will ensure the image covers the whole area
    margin-bottom: 20px;
`;


export const cardsContainer = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: auto; // Aggiungi questa linea
`;
