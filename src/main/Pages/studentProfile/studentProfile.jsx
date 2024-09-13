import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import * as Components from './studentProfileComponents';
import { students } from '../../Components/students';
import "react-multi-carousel/lib/styles.css";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import exampleCV from './CV/exampleCV.pdf';
import { FaCommentDots, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import {
    faInstagram,
    faFacebook,
    faXTwitter,
    faLinkedin,

} from "@fortawesome/free-brands-svg-icons";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from '@tomtom-international/web-sdk-maps';
import ttServices from '@tomtom-international/web-sdk-services';
import {faLink} from "@fortawesome/free-solid-svg-icons";

const instagram = <FontAwesomeIcon icon={faInstagram} />;
const facebook = <FontAwesomeIcon icon={faFacebook} />;
const twitter = <FontAwesomeIcon icon={faXTwitter} />;
const linkedin = <FontAwesomeIcon icon={faLinkedin} />;

function PDFPreview() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document
                file='./CV/exampleCV.pdf'
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    );
}



function StudentProfile() {

    useEffect(() => {
        const city = 'Lecco, Italy';

        ttServices.services
            .fuzzySearch({
                key: 'GKKdaSewOQJ1qLgzHcWa1mJxy3z9JzRg',
                query: city
            })
            .then(function(response) {
                if (response.results && response.results.length > 0) {
                    const coordinates = response.results[0].position;

                    const map = tt.map({
                        key: 'GKKdaSewOQJ1qLgzHcWa1mJxy3z9JzRg',
                        container: 'map',
                        center: [coordinates.lng, coordinates.lat],
                        zoom: 14
                    });

                    return () => {
                        map.remove();
                    };
                } else {
                    console.error('No results found for the city:', city);
                }
            })
            .catch(function(error) {
                console.error('Error during fuzzySearch:', error);
            });
    }, []);

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
                <Components.AboutMe>
                    Ciao! Sono uno sviluppatore appassionato con una passione per la programmazione e la risoluzione dei problemi. Ho esperienza in vari linguaggi e framework di programmazione e sono sempre desideroso di saperne di più. Credo nel potere del lavoro di squadra e mi piace collaborare con gli altri per creare progetti straordinari.
                </Components.AboutMe>
                </Components.customBanner>
            <Components.contentContainer>
                <Components.leftContainer>


                    <Components.MapAndAziendeContainer>

                        <div style={{height: '100%', display: 'flex', flexDirection: 'column', width: "45%"}}>
                            <Components.MapTitle>Residenza</Components.MapTitle>
                            <div id="map" style={{borderRadius: '12px', flex: '1'}}></div>

                        </div>
                        <Components.AziendeWorkedContainer>
                            <Components.MapTitle style={{backgroundColor:'#fff'}}>Esperienze</Components.MapTitle>
                            <Components.AziendeWorkedContent>
                                <Components.AziendaWorked>
                                    <Components.AziendaName>Ferrari</Components.AziendaName>
                                    <Components.AziendaDescription>ciao</Components.AziendaDescription>
                                </Components.AziendaWorked>
                            <Components.AziendaWorked>
                                <Components.AziendaName>ciao</Components.AziendaName>
                                <Components.AziendaDescription>ciao</Components.AziendaDescription>
                            </Components.AziendaWorked>
                            <Components.AziendaWorked>
                                <Components.AziendaName>ciao</Components.AziendaName>
                                <Components.AziendaDescription>ciao</Components.AziendaDescription>
                            </Components.AziendaWorked>
                            <Components.AziendaWorked>
                                <Components.AziendaName>ciao</Components.AziendaName>
                                <Components.AziendaDescription>ciao</Components.AziendaDescription>
                            </Components.AziendaWorked><Components.AziendaWorked>
                            <Components.AziendaName>ciao</Components.AziendaName>
                            <Components.AziendaDescription>ciao</Components.AziendaDescription>
                        </Components.AziendaWorked><Components.AziendaWorked>
                            <Components.AziendaName>ciao</Components.AziendaName>
                            <Components.AziendaDescription>ciao</Components.AziendaDescription>
                        </Components.AziendaWorked>
                            <Components.AziendaWorked>
                                <Components.AziendaName>ciao</Components.AziendaName>
                                <Components.AziendaDescription>ciao</Components.AziendaDescription>
                            </Components.AziendaWorked>


                            </Components.AziendeWorkedContent>

                    </Components.AziendeWorkedContainer>

                        <Components.CVContainer>
                            <Components.MapTitle style={{backgroundColor:'#fff'}}>Curriculum Vitae</Components.MapTitle>
                            <Components.CVContent>
                                <Components.CVDownloader>Scarica il CV</Components.CVDownloader>
                                <PDFPreview />
                            </Components.CVContent>
                        </Components.CVContainer>

                    </Components.MapAndAziendeContainer>

                </Components.leftContainer>
                <Components.rightContainer>
                    <Components.linksContainer>
                        <Components.portfolioLinkContainer>
                            <Components.portfolioLink href={student.portfolioLink}>
                            PORTFOLIO
                                <FontAwesomeIcon icon={faLink} style={{ paddingLeft: '10px' }} />
                            </Components.portfolioLink>
                        </Components.portfolioLinkContainer>
                        <Components.socialLinksContainer>
                            <Components.SocialIcon icon={instagram} />
                            <Components.SocialIcon icon={facebook} />
                            <Components.SocialIcon icon={twitter} />
                            <Components.SocialIcon icon={linkedin} />
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
                                        <Components.Iconbutton icon={<FaEnvelope size={20} />} />
                                        <Components.Iconbutton icon={<FaPhoneAlt size={20} />} />
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
