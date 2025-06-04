import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export const Header = styled.div`
  background: var(--firstColor);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 19px 15px -22px var(--shadowColor);
  width: 100vw;
  height: 5em;
  position: sticky;
  top: 0;
  z-index: 1000;
  margin-top: -1em;
  padding-left: calc(50vw - 50%);
  padding-right: calc(50vw - 50%);
`;

export const Logo = styled.img.attrs((props) => ({ src: logo }))`
  width: 60px;
  height: 60px;
  background-size: cover;
`;

export const NotificationButton = styled.button`
  background: none;

  position: relative;
  border: none;
  font-size: 30px;
  &::after {
    content: "${(props) =>
      props.notificationNumber < 99
        ? String(props.notificationNumber)
        : "99+"}";
    position: absolute;
    font-size: 8px;
    text-align: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
    border: 2px solid white;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: inherit;
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
    background-color: ${(props) => props.dotColor};
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

export const NotificationsContainer = styled.div`
  position: absolute;
  top: 4em;
  right: 3em;
  width: 12em;
  max-height: 20em;
  background: white;
  border-radius: 10px;
  box-shadow: 0 19px 15px -22px #c2c2c2;
  z-index: 1000;
  border: 1px solid #c2c2c2;
  overflow-y: scroll;

  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1em;
  border-bottom: 1px solid #c2c2c2;
`;
