import styled from "styled-components";
import logo from "../assets/logo.png";

export const Header = styled.div`
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0px 19px 15px -22px #C2C2C2;
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