import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 350px;
  height: 350px;
  max-width: 100%;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 7px 0;
  width: 80%;
  border-radius: 15px;
`;

export const Button = styled.button`
  border-radius: 20px;
  width: 80%;
  border: 1px solid #5865f2;
  background-color: #5865f2;
  color: #ffffff;
  margin: 8px 0;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  margin-top: 15px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;
