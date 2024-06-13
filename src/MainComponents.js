import styled from "styled-components";
import logo from "../assets/logo.png";

export const Header = styled.div`
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0 19px 15px -22px #C2C2C2;
    width: 100vw;
    height: 5em;
    position: sticky;
    top: 0;
    z-index: 1000;
    margin-top: -1em;
`;

export const Logo = styled.img.attrs(props => ({src: logo}))`
    width: 60px;
    height: 60px;
    background-size: cover;
`;

export const NotificationButton = styled.button` 
    background: none;
    position: relative;
    border: none;
    font-size: 20px;
    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: red;
        border: 2px solid white;
    }
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

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${props => props.dotColor};
        border: 2px solid white;
    }
`;

export const HeaderProfilePic = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url("https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg");
    background-size: cover;
    background-position: center;
    margin: 10px auto 10px;
`;