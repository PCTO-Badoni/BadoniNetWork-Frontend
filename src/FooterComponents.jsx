import styled from "styled-components";

export const Box = styled.div`
  padding: 5% 2.5%;
  background: black;
  bottom: 0;
  width: 100%;
  border-top: 2px solid #e5e5e5;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #0b75ed;
    transition: 0.6ms ease-in;
  }
`;

export const FooterText = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
`;

export const FooterIcon = styled.i`
  color: #fff;
  margin-bottom: 20px;
  margin-right: 10px;
  font-size: 18px;
  text-decoration: none;
`;

export const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
  border-bottom: 1px solid #e5e5e5;
`;
