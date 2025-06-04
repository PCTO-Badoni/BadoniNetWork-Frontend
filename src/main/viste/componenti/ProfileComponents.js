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
  background-color: transparent;
  width: 100%;
  max-width: 98.9%;
  overflow: scroll;
  box-sizing: border-box;
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

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 30px;
  border: 1px solid #f0f0f0;
  width: 100%;
`;

export const ProfileHeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CompanyTitle = styled.h1`
  color: var(--contrastColor);
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

export const CompanySubtitle = styled.p`
  color: var(--contrastColor);
  margin: 5px 0 0 0;
  font-size: 1rem;
  opacity: 0.8;
`;

export const ActionButton = styled.button`
  background: ${(props) =>
    props.$isEditing
      ? "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)"
      : "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)"};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FormContainer = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const FormSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #f0f0f0;
  width: 100%;
`;

export const SectionHeader = styled.h2`
  color: #333;
  margin: 0 0 25px 0;
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
  position: relative;
`;

export const ReadOnlyBadge = styled.span`
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
  color: white;
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 12px;
  margin-left: auto;
  font-weight: 500;
`;

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${(props) => (props.$fullWidth ? "1 / -1" : "auto")};
`;

export const FieldLabel = styled.label`
  color: #555;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${(props) =>
    props.$editable &&
    `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid transparent;
      border-radius: 12px;
      background: linear-gradient(45deg, #4CAF50, #2196F3) border-box;
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      z-index: -1;
    }
  `}
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid
    ${(props) =>
      props.$readOnly ? "#e9ecef" : props.$editable ? "#4CAF50" : "#ddd"};
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  background: ${(props) =>
    props.$readOnly ? "#f8f9fa" : props.$editable ? "#fff" : "#fff"};
  color: ${(props) => (props.$readOnly ? "#6c757d" : "#333")};

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$readOnly ? "#e9ecef" : "#4CAF50")};
  }

  &:disabled {
    cursor: ${(props) => (props.$readOnly ? "not-allowed" : "default")};
  }

  &::placeholder {
    color: #999;
    font-style: italic;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid ${(props) => (props.$readOnly ? "#e9ecef" : "#ddd")};
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  background: ${(props) => (props.$readOnly ? "#f8f9fa" : "#fff")};
  color: ${(props) => (props.$readOnly ? "#6c757d" : "#333")};
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$readOnly ? "#e9ecef" : "#4CAF50")};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    color: #999;
    font-style: italic;
  }
`;

export const EditIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #4CAF50;
  pointer-events: none;
`;

export const InfoFooter = styled.div`
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1565c0;
  padding: 15px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  border-left: 4px solid #2196F3;
  margin-top: 10px;
`;
