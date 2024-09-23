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
  height: 95dvh;
  border-radius: 12px;
  background-color: var(--firstColor);
  width: 100%;
  max-width: 98.9%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px;
  margin: 0 auto 0 15px;
`;

export const profileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 150px;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid var(--thirdColor);
  background-color: var(--thirdColor);
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  text-decoration: none;
  width: 100%;
  z-index: 50;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const RecapInput = styled.div`
  @media only screen and (max-width: 1500px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  background-color: var(--secondColor);
  border: 3px solid var(--borderColor);
  color: var(--contrastColor);
  padding: 0.75rem;
  width: 100%;
  border-radius: 15px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  outline: ${(props) => (props.error ? "solid red" : null)};
`;

export const RecapIcon = styled.i`
  margin-right: 10px;
  font-size: 18px;
  text-decoration: none;
  color: var(--contrastColor);
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  border-color: var(--borderColor);
`;
