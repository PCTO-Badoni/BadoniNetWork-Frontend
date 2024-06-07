import styled from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    width: 95vw;
    height: 95vh;
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
    margin-top: 0px;
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

export const CVContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 4em;
    width: 100%;
    border-radius: 12px;
    background-color: rgba(11, 117, 237, 0.38);
`;

export const contentContainer = styled.div`
    display: flex;
    padding-top: 20px;
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
    background-color: #01a917;
    
`;

export const leftContainer = styled.div`
    display: flex;
    flex: 3;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #e20b07;
    padding: 20px;
`;

export const contactContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 2;
    border-radius: 12px;
    background-color: rgb(229, 11, 237);
`;

export const linksContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 12px;
    background-color: rgb(229, 237, 11);
`;
