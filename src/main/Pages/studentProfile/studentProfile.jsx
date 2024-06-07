import { useParams } from 'react-router-dom';
import * as Components from './studentProfileComponents';
import {students} from '../../Components/students';
import {contactContainer} from "./studentProfileComponents";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



function StudentProfile() {
    const { id } = useParams();
    const student = students[parseInt(id)];

    if (!student) {
        return <div>No student data available</div>;
    }

    return (
        <Components.Container>
            <Components.customBanner image={student.bannerImage}>
                <Components.cardProfilePic dotColor={student.dotColor}/>
                <Components.userInformations>
                    <Components.studentName>{student.firstName} {student.lastName}</Components.studentName>
                    <Components.studentDescription>{student.description}</Components.studentDescription>
                    <Components.studentDescription>18/12/2006</Components.studentDescription>
                    <Components.studentSkills>
                        {student.skills.map(skill => <Components.studentSkill key={skill}>{skill}</Components.studentSkill>)}
                    </Components.studentSkills>
                </Components.userInformations>
            </Components.customBanner>
            <Components.contentContainer>
                <Components.leftContainer>

                    <Components.CVContainer>
                        CV
                    </Components.CVContainer>

                </Components.leftContainer>
                <Components.rightContainer>
                    <Components.linksContainer>
                        link (social + portfolio)
                    </Components.linksContainer>
                    <Components.contactContainer>
                        contatti (email + cellulare + chat)
                    </Components.contactContainer>

                </Components.rightContainer>


            </Components.contentContainer>
        </Components.Container>
    );
}

export default StudentProfile;
