import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-height: 200vh;
    overflow: scroll;
    justify-content: flex-start;
    align-items: flex-start; // Modifica qui
`;

export const contentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 110dvh;
    border-radius: 12px;
    padding-left: 15px;
`;

export const TopBar = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    height: 7em;
    border-radius: 12px;
    padding: 2em 2em 1.5em;
    margin-bottom: 15px;
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
    background: none;
    border: none;
    font-size: 1em;
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
`;

export const ProfileInformations = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 2em;
    padding-bottom: 20px;
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

export const cardsContainer = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 90vh;
    border-radius: 12px;
    background-color: #fff;
    overflow: scroll;
`;

export const listContainer = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 150vh;

    border-radius: 12px;
    background-color: #fff;
    overflow: scroll;
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
        background-color: ${props => props.dotColor};
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