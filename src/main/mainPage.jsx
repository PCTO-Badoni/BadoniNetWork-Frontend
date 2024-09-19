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
import { useNavigate } from 'react-router-dom';

const prefix = import.meta.env.VITE_DEFAULT_HOST_DOMAIN
const logoutIcon = <FontAwesomeIcon icon={faRightFromBracket} />

function MainPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChips, setSelectedChips] = useState([]);
    const [selectedCompetenze, setSelectedCompetenze] = useState([]);
    const [selectedLingue, setSelectedLingue] = useState([]);
    const [chips, setChips] = useState([]);
    const [competenze, setCompetenze] = useState([]);
    const [lingue, setLingue] = useState([]);
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('cards');
    const [activeButton, setActiveButton] = useState('home');
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
          fetch(prefix+'/api/get-all-articolazioni').then(response => response.json()),
          fetch(prefix+'/api/get-all-competenze').then(response => response.json()),
          fetch(prefix+'/api/get-all-lingue').then(response => response.json())
        ])
          .then(([chipsData, competenzeData, lingueData]) => {
            setChips(chipsData);
            setCompetenze(competenzeData);
            setLingue(lingueData);
          })
          .catch(error => console.error('Errore in una delle chiamate:', error));
    }, []);

    useEffect(() => {
        const hash = location.hash.substring(1);
        if (hash) {
            setActiveButton(hash);
        }
    }, [location]);

    useEffect(() => {
        if (activeButton) {
            navigate(`#${activeButton}`);
        }
    }, [activeButton, navigate]);

    const handleButtonClick = (buttonName) => {
        if (activeButton === 'logout') {
            setActiveButton('home');
        } else {
            setActiveButton(buttonName);
        }
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