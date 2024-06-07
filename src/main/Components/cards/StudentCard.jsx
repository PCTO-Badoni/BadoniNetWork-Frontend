import styled from 'styled-components';
import * as Components from './CardComponents'
import { Link } from 'react-router-dom';

const StyledStudentCard = styled.div`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 0 23px -3px rgba(0, 0, 0, 0.4);
    width: 220px;
    height: 300px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
        scale: 1.05; // Aggiungi l'effetto desiderato qui
        transition: 0.2s;
    }
`;


const StudentCard = ({ student, index }) => (
    <StyledStudentCard>
        <div>
            <Components.customBanner image={student.bannerImage}>
                <Components.cardProfilePic dotColor={student.dotColor}/>
            </Components.customBanner>

            <Components.studentName>{student.firstName} {student.lastName}</Components.studentName>
            <Components.studentSkills>
                {student.skills.map(skill => <Components.studentSkill key={skill}>{skill}</Components.studentSkill>)}
            </Components.studentSkills>
            <Components.studentDescription>{student.description}</Components.studentDescription>
        </div>
        <Link style={{ textDecoration: 'none' }}
              to={`/homepage/studentProfile/${index}`}>
            <Components.studentButton>Contatta</Components.studentButton>
        </Link>
    </StyledStudentCard>
);

export default StudentCard;