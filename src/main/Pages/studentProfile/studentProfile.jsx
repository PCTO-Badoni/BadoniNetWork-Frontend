import { useParams } from 'react-router-dom';
import * as Components from './studentProfileComponents';
import {students} from '../../Components/students';
import {contactContainer} from "./studentProfileComponents";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { SocialIcon } from 'react-social-icons'
import {
    faInstagram,
    faFacebook,
    faTwitter,
    faLinkedin

} from "@fortawesome/free-brands-svg-icons";
import {
    faLink

} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {FaCommentDots, FaEnvelope, FaPhone} from "react-icons/fa";

const instagram = <FontAwesomeIcon icon={faInstagram} />
const facebook = <FontAwesomeIcon icon={faFacebook} />
const twitter = <FontAwesomeIcon icon={faTwitter} />
const linkedin = <FontAwesomeIcon icon={faLinkedin} />

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
                        <Components.portfolioLinkContainer>
                            <Components.portfolioLink>
                                PORTFOLIO
                                <FontAwesomeIcon icon={faLink} />
                            </Components.portfolioLink>

                        </Components.portfolioLinkContainer>
                        <Components.socialLinksContainer>
                            <Components.SocialIcon icon={instagram}/>
                            <Components.SocialIcon icon={facebook}/>
                            <Components.SocialIcon icon={twitter}/>
                            <Components.SocialIcon icon={linkedin}/>
                        </Components.socialLinksContainer>
                    </Components.linksContainer>
                    <Components.contactContainer>
                        <Components.Contacts>
                            <Components.EmailContainer>
                                <Components.EmailForm>
                                    <Components.EmailAziendale
                                        type="email"
                                        placeholder="Email Aziendale"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <Components.EmailTitleInput
                                        type="text"
                                        placeholder="Nome Azienda"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <Components.EmailContentInput
                                        type="text"
                                        placeholder="Messaggio"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Components.ButtonsRow>
                                        <Components.Iconbutton icon={<FaEnvelope size={20}/>} />
                                        <Components.Iconbutton icon={<FaPhone size={20} />} />
                                        <Components.Iconbutton icon={<FaCommentDots size={20} />} />
                                    </Components.ButtonsRow>
                                </Components.EmailForm>
                            </Components.EmailContainer>
                        </Components.Contacts>
                    </Components.contactContainer>

                </Components.rightContainer>


            </Components.contentContainer>
        </Components.Container>
    );
}

export default StudentProfile;
