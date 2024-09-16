import * as Components from "./MainPageComponents";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import "../styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faList } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket, faFilter } from '@fortawesome/free-solid-svg-icons';
import "././sideBar/homeStyle.css";
import { Link } from 'react-router-dom';
import Footer from "../footer";
import { BiSolidMegaphone } from "react-icons/bi";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";
import ListaStudenti from "./viste/azienda/listaStudenti";
import Profilo from "./viste/azienda/profilo";
import Chat from "./viste/azienda/chat";
import HomePage from "./viste/azienda/home";
import Annunci from "./viste/azienda/annunci";

const logoutIcon = <FontAwesomeIcon icon={faRightFromBracket} />

function MainPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChips, setSelectedChips] = useState([]);
    const [selectedCompetenze, setSelectedCompetenze] = useState([]);
    const [selectedLingue, setSelectedLingue] = useState([]);
    const [chips] = useState([
        { id: 1, descrizione: 'Informatica' },
        { id: 2, descrizione: 'Scientifico' },
        { id: 3, descrizione: 'Meccanica' },
        { id: 4, descrizione: 'Meccatronica' },
        { id: 5, descrizione: 'Telecomunicazioni' },
        { id: 6, descrizione: 'Automazione' },
        { id: 7, descrizione: 'Elettrotecnica' },
        { id: 8, descrizione: 'Elettronica' },
        { id: 9, descrizione: 'Energia' }
    ]);
    const [competenze] = useState([
        { id: 1, descrizione: 'Java' },
        { id: 2, descrizione: 'JavaFX' },
        { id: 3, descrizione: 'JavaScript' },
        { id: 4, descrizione: 'Python' },
        { id: 5, descrizione: 'C' },
        { id: 6, descrizione: 'C++' },
        { id: 7, descrizione: 'C#' },
        { id: 8, descrizione: 'MongoDB' },
        { id: 9, descrizione: 'SceneBuilder' },
        { id: 10, descrizione: 'HTML' },
        { id: 11, descrizione: 'Packet Tracer' },
        { id: 12, descrizione: 'Cisco' },
        { id: 13, descrizione: 'CAD' },
        { id: 14, descrizione: 'CSS' },
        { id: 15, descrizione: 'Sistemi' },
        { id: 16, descrizione: 'Arduino' },
        { id: 17, descrizione: 'PHP' },
        { id: 18, descrizione: 'Database' },
        { id: 19, descrizione: 'LabView' },
        { id: 20, descrizione: 'Impianti' },
        { id: 21, descrizione: 'Excel' },
        { id: 22, descrizione: 'FlowGorithm' },
        { id: 23, descrizione: 'Circuiti' },
        { id: 24, descrizione: 'Sicurezza' },
        { id: 25, descrizione: 'Assembly' },
        { id: 26, descrizione: 'React' },
        { id: 27, descrizione: 'Angular' },
        { id: 28, descrizione: 'Go' },
        { id: 29, descrizione: 'Gimp' },
        { id: 30, descrizione: 'Cyber Security' },
        { id: 31, descrizione: 'Tornio' },
        { id: 32, descrizione: 'Fresa' },
        { id: 33, descrizione: 'Word' },
        { id: 34, descrizione: 'Multisim' },
        { id: 35, descrizione: 'Powerpoint' },
        { id: 36, descrizione: 'Latex' },
        { id: 37, descrizione: 'Plc' },
        { id: 38, descrizione: 'Sensori' },
        { id: 39, descrizione: 'Cablaggio' }
    ]);
    const [lingue] = useState([
        { id: 1, descrizione: 'Inglese' },
        { id: 2, descrizione: 'Francese' },
        { id: 3, descrizione: 'Tedesco' },
        { id: 4, descrizione: 'Giapponese' },
        { id: 5, descrizione: 'Spagnolo' },
        { id: 6, descrizione: 'Serbo' },
        { id: 7, descrizione: 'Arabo' },
        { id: 8, descrizione: 'Cinese' },
        { id: 9, descrizione: 'Portoghese' }
    ]);
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('cards');
    const [activeButton, setActiveButton] = useState('home');

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveButton(hash);
        }
    }, []);

    const handleButtonClick = (buttonName) => {
        if (activeButton === 'logout') {
            setActiveButton('home');
        }
        setActiveButton(buttonName);
    };

    const handleChipClick = (chip) => {
        if (!selectedChips.includes(chip)) {
            const newSelectedChips = [...selectedChips, chip];
            setSelectedChips(newSelectedChips);
        }
    };

    const handleChipDelete = (chipToDelete) => {
        setSelectedChips(selectedChips.filter((chip) => chip !== chipToDelete));
    };

    const handleCompetenzaClick = (competenza) => {
        if (!selectedCompetenze.includes(competenza)) {
            const newSelectedCompetenze = [...selectedCompetenze, competenza];
            setSelectedCompetenze(newSelectedCompetenze);
        }
    };

    const handleCompetenzaDelete = (competenzaToDelete) => {
        setSelectedCompetenze(selectedCompetenze.filter((competenza) => competenza !== competenzaToDelete));
    };

    const handleLinguaClick = (lingua) => {
        if (!selectedLingue.includes(lingua)) {
            const newSelectedLingue = [...selectedLingue, lingua];
            setSelectedLingue(newSelectedLingue);
        }
    };

    const handleLinguaDelete = (linguaToDelete) => {
        setSelectedLingue(selectedLingue.filter((lingua) => lingua !== linguaToDelete));
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll', marginTop: 'auto' }}>
                <Components.Container style={{ scale: '0.9' }}>
                    <Components.Sidebar>
                        <Components.MenuContainer>
                            <Components.MenuItem to='/' onClick={() => handleButtonClick('home')} style={{ backgroundColor: activeButton === ('home' || 'logout') ? '#f0f0f0' : 'transparent', borderLeft: activeButton === ('home' || 'logout') ? '2px solid black' : null }}>
                                <FontAwesomeIcon icon={faHouse} /> Homepage
                            </Components.MenuItem>
                            <Components.MenuItem to='/' onClick={() => handleButtonClick('lista')} style={{ backgroundColor: activeButton === 'lista' ? '#f0f0f0' : 'transparent', borderLeft: activeButton === 'lista' ? '2px solid black' : null }}>
                                <FaIdCard /> Lista Studenti
                            </Components.MenuItem>
                            <Components.MenuItem to='/' onClick={() => handleButtonClick('chat')} style={{ backgroundColor: activeButton === 'chat' ? '#f0f0f0' : 'transparent', borderLeft: activeButton === 'chat' ? '2px solid black' : null }}>
                                <IoChatboxEllipses /> Chat
                            </Components.MenuItem>
                            <Components.MenuItem to='/' onClick={() => handleButtonClick('annunci')} style={{ backgroundColor: activeButton === 'annunci' ? '#f0f0f0' : 'transparent', borderLeft: activeButton === 'annunci' ? '2px solid black' : null }}>
                                <BiSolidMegaphone /> Annunci
                            </Components.MenuItem>
                            <Components.MenuItem to='/' onClick={() => handleButtonClick('profilo')} style={{ backgroundColor: activeButton === 'profilo' ? '#f0f0f0' : 'transparent', borderLeft: activeButton === 'profilo' ? '2px solid black' : null }}>
                                <RiSettings3Fill /> Profilo
                            </Components.MenuItem>
                        </Components.MenuContainer>
                        <div style={{ width: '100%', marginTop: 'auto' }}>
                            <Components.MenuItem to='/login' onClick={() => handleButtonClick('logout')} style={{ borderRadius: '8px', backgroundColor: activeButton === 'logout' ? '#f0f0f0' : 'transparent' }}>
                                {logoutIcon} Logout
                            </Components.MenuItem>
                        </div>
                    </Components.Sidebar>
                    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        {activeButton === 'lista' && (
                            <ListaStudenti
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                selectedChips={selectedChips}
                                setSelectedChips={setSelectedChips}
                                selectedCompetenze={selectedCompetenze}
                                setSelectedCompetenze={setSelectedCompetenze}
                                selectedLingue={selectedLingue}
                                setSelectedLingue={setSelectedLingue}
                                chips={chips}
                                competenze={competenze}
                                lingue={lingue}
                                isFilterOpen={isFilterOpen}
                                setFilterOpen={setFilterOpen}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                handleChipClick={handleChipClick}
                                handleChipDelete={handleChipDelete}
                                handleCompetenzaClick={handleCompetenzaClick}
                                handleCompetenzaDelete={handleCompetenzaDelete}
                                handleLinguaClick={handleLinguaClick}
                                handleLinguaDelete={handleLinguaDelete}
                            />
                        )}
                        {activeButton === 'profilo' && (
                            <Profilo
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                selectedChips={selectedChips}
                                setSelectedChips={setSelectedChips}
                                selectedCompetenze={selectedCompetenze}
                                setSelectedCompetenze={setSelectedCompetenze}
                                selectedLingue={selectedLingue}
                                setSelectedLingue={setSelectedLingue}
                                chips={chips}
                                competenze={competenze}
                                lingue={lingue}
                                isFilterOpen={isFilterOpen}
                                setFilterOpen={setFilterOpen}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                handleChipClick={handleChipClick}
                                handleChipDelete={handleChipDelete}
                                handleCompetenzaClick={handleCompetenzaClick}
                                handleCompetenzaDelete={handleCompetenzaDelete}
                                handleLinguaClick={handleLinguaClick}
                                handleLinguaDelete={handleLinguaDelete}
                            />
                        )}
                        {activeButton === 'chat' && (
                            <Chat
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                selectedChips={selectedChips}
                                setSelectedChips={setSelectedChips}
                                selectedCompetenze={selectedCompetenze}
                                setSelectedCompetenze={setSelectedCompetenze}
                                selectedLingue={selectedLingue}
                                setSelectedLingue={setSelectedLingue}
                                chips={chips}
                                competenze={competenze}
                                lingue={lingue}
                                isFilterOpen={isFilterOpen}
                                setFilterOpen={setFilterOpen}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                handleChipClick={handleChipClick}
                                handleChipDelete={handleChipDelete}
                                handleCompetenzaClick={handleCompetenzaClick}
                                handleCompetenzaDelete={handleCompetenzaDelete}
                                handleLinguaClick={handleLinguaClick}
                                handleLinguaDelete={handleLinguaDelete}
                            />
                        )}
                        {activeButton === ('home' || 'logout') && (
                            <HomePage
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                selectedChips={selectedChips}
                                setSelectedChips={setSelectedChips}
                                selectedCompetenze={selectedCompetenze}
                                setSelectedCompetenze={setSelectedCompetenze}
                                selectedLingue={selectedLingue}
                                setSelectedLingue={setSelectedLingue}
                                chips={chips}
                                competenze={competenze}
                                lingue={lingue}
                                isFilterOpen={isFilterOpen}
                                setFilterOpen={setFilterOpen}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                handleChipClick={handleChipClick}
                                handleChipDelete={handleChipDelete}
                                handleCompetenzaClick={handleCompetenzaClick}
                                handleCompetenzaDelete={handleCompetenzaDelete}
                                handleLinguaClick={handleLinguaClick}
                                handleLinguaDelete={handleLinguaDelete}
                            />
                        )}
                        {activeButton === 'annunci' && (
                            <Annunci

                            />
                        )}
                    </div>
                </Components.Container>
                <Footer />
            </div>
        </>
    );
}

export default MainPage;