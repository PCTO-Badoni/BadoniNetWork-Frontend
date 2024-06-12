import styled from "styled-components";
import batmanLogo from '../../assets/logo.png';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 95vw;
    height: 95vh;
    overflow: clip;
    
`;

export const contentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    padding-left: 15px;
`;

export const Header = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    width: 100%;
    height: 7em;
    border-radius: 12px;
    padding-left: 2em;
    padding-top: 1.5em;
    margin-bottom: 15px;
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
    outline-color: black;
`;

export const FilterButton = styled.button`
    opacity: 1;
    scale: 1.5;
    background: none;
    border: none;
    font-size: 0.7em;
    font-family: "Montserrat", sans-serif;
    padding-left: 20px;
    cursor: pointer;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const Sidebar = styled.div`
    background-color: #fff;
    width: 18dvw;
    height: 100%;
    padding: 15px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    
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
    width: 100%;
    
    z-index: 50;
    
    &:focus {
    outline: none;
    }
`;

export const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 40%;
    margin-top: 80px;

`;

export const MenuItem = styled.div`
    cursor: pointer;
    color: black;
    text-decoration: none;
    width: 100%;
    height: 30px;
    border-radius: 8px;
    align-content: center;
    text-align: center;
    

    &:hover {
        opacity: 0.8;
    }

    &:active {
        background-color: #3945c8;
        color: white
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
    overflow: auto;
    background-color: #fff;
`;

export const listContainer = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: auto;
    background-color: #fff;
`;

export const listItem = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ccc;
`;

export const listItemProfilePic = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url("https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg");
    background-size: cover;
    background-position: center;
    margin: 10px auto 10px;
    border: 2px solid #fff;
    box-shadow: 0 0 23px -3px rgba(0, 0, 0, 0.4);

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${props => props.dotColor}; // Modifica qui
        border: 2px solid #fff;
    }
`;

export const listItemName = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0;
    padding-left: 10px;
`;

export const listItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 70%;
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




export const ViewModeButton = styled.button`
    border-radius: 20px;
    background: none;
    border: none;
    font-size: 25px;
    color: #0b75ed;
    margin-right: 30px;
    padding-top: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-decoration: none;
    
    z-index: 50;
    
    
`;
