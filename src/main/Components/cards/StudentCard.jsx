import styled from "styled-components";
import * as Components from "./CardComponents";
import { Link } from "react-router-dom";
import { firstColor } from "../../../constants/colors";

const StyledStudentCard = styled.div`
  background-color: ${firstColor};
  border-radius: 12px;
  box-shadow: 0 0 10px -3px rgba(0, 0, 0, 0.4);
  width: 200px;
  height: 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: clip;

  ${Components.customBanner} {
    filter: brightness(0.9);
  }

  &:hover {
    scale: 1.05; // Aggiungi l'effetto desiderato qui
    transition: 0.2s;

    ${Components.studentButton} {
      background-color: rgba(20, 117, 207, 0.9);
    }

    box-shadow: 0 0 20px -3px rgba(0, 0, 0, 0.4);

    ${Components.customBanner} {
      filter: brightness(1);
      transition: 0.6s;
    }
  }
`;

const StudentCard = ({ student, index }) => (
  <StyledStudentCard>
    <div>
      <Components.customBanner image={student.bannerImage}>
        <Components.cardProfilePic dotColor={student.dotColor} />
      </Components.customBanner>

      <Components.studentName>
        {student.firstName} {student.lastName}
      </Components.studentName>
      <Components.studentSkills>
        {student.skills.map((skill) => (
          <Components.studentSkill key={skill}>{skill}</Components.studentSkill>
        ))}
      </Components.studentSkills>
      <Components.studentDescription>
        {student.description}
      </Components.studentDescription>
    </div>
    <Link
      style={{ textDecoration: "none" }}
      to={`/homepage/studentProfile/${index}`}
    >
      <Components.studentButton>Contatta</Components.studentButton>
    </Link>
  </StyledStudentCard>
);

export default StudentCard;
