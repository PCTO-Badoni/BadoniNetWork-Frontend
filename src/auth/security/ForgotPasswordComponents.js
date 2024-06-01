import styled from "styled-components";
import cat from "../../../assets/laughing-cat.png";

export const Logo = styled.img.attrs(props => ({
    src: cat
}))`
    width: 400px;
    height: 400px;
    border-radius: 20px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;