import React, {useState} from "react";
import * as Components from "../../MainPageComponents";
import StudentCard from '../../Components/cards/StudentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsFillGridFill } from "react-icons/bs";
import Chip from "@mui/material/Chip";
import {students} from "../../Components/students";
import {faHouse, faList} from '@fortawesome/free-solid-svg-icons';
import {faRightFromBracket, faFilter} from '@fortawesome/free-solid-svg-icons';
const listIcon = <FontAwesomeIcon icon={faList} />;

const ListaStudenti = ({
                           searchTerm,
                           setSearchTerm,
                           selectedChips,
                           setSelectedChips,
                           selectedCompetenze,
                           setSelectedCompetenze,
                           selectedLingue,
                           setSelectedLingue,
                           chips,
                           competenze,
                           lingue,
                           isFilterOpen,
                           setFilterOpen,
                           viewMode,
                           setViewMode,
                           handleChipClick,
                           handleChipDelete,
                           handleCompetenzaClick,
                           handleCompetenzaDelete,
                           handleLinguaClick,
                           handleLinguaDelete
                       }) => {

    const selectedFilteredChips = selectedChips.filter((chip) =>
        chip.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const filteredChips = chips.filter((chip) =>
        chip.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const unselectedFilteredChips = filteredChips.filter(
        (chip) => !selectedChips.includes(chip),
    );

    const selectedFilteredCompetenze = selectedCompetenze.filter((competenza) =>
        competenza.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const filteredCompetenze = competenze.filter((competenza) =>
        competenza.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const unselectedFilteredCompetenze = filteredCompetenze.filter(
        (competenza) => !selectedCompetenze.includes(competenza),
    );

    const selectedFilteredLingue = selectedLingue.filter((lingua) =>
        lingua.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const filteredLingue = lingue.filter((lingua) =>
        lingua.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const unselectedFilteredLingue = filteredLingue.filter(
        (lingua) => !selectedLingue.includes(lingua),
    );

    const [activeButtons, setActiveButtons] = useState([]);

    const handleButtonClick = (buttonName) => {
        if (activeButtons.includes(buttonName)) {
            setActiveButtons(activeButtons.filter(button => button !== buttonName));
        } else {
            setActiveButtons([...activeButtons, buttonName]);
        }
    };


    const filteredStudents = students.filter(student => {
        // Se non ci sono competenze selezionate, mostra tutti gli studenti
        if (selectedCompetenze.length === 0) {
            return true;
        }

        // Controlla se lo studente ha tutte le competenze selezionate
        return selectedCompetenze.every(competenza =>
            student.skills.includes(competenza.descrizione)
        );
    });

    return (
        <Components.contentContainer>
            <Components.TopBar style={{ height: isFilterOpen ? '285px' : '100px', transition: 'height 0.3s' }}>
                <div style={{position: 'sticky', display:'flex', flexDirection:'row', columnGap:'20px', width:'100%', justifyContent:'space-between', alignItems: 'center'}}>
                    <div style={{display:'flex', flexDirection: 'row', gap: '20px'}}>
                        <Components.SearchBar onChange={(e) => setSearchTerm(e.target.value)} onClick={() => {
                            isFilterOpen ? setFilterOpen(true) : setFilterOpen(!isFilterOpen)
                        }}/>
                        <Components.FilterButton onClick={() => setFilterOpen(!isFilterOpen)}>
                            <FontAwesomeIcon icon={faFilter} /> Filtra
                        </Components.FilterButton>
                    </div>

                    <Components.DisponibilityContainer>
                        <Components.DisponibilityButton onClick={() => handleButtonClick('verde')} style={{borderBottom: activeButtons.includes('verde') ? '2px solid blue' : null}}>Disponibile</Components.DisponibilityButton>
                        <Components.VerticalSeparator/>
                        <Components.DisponibilityButton onClick={() => handleButtonClick('arancione')} style={{borderBottom: activeButtons.includes('arancione') ? '2px solid blue' : null}}>Accetta Proposte</Components.DisponibilityButton>
                        <Components.VerticalSeparator/>
                        <Components.DisponibilityButton onClick={() => handleButtonClick('rosso')} style={{borderBottom: activeButtons.includes('rosso') ? '2px solid blue' : null}}>Non Accetta Proposte</Components.DisponibilityButton>
                    </Components.DisponibilityContainer>
                    <Components.ViewModeButton
                        onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')}
                    >
                        {viewMode === 'cards' ? listIcon : <BsFillGridFill />}
                    </Components.ViewModeButton>
                </div>
                {isFilterOpen ?
                    <Components.FilterContainer style={{transition: 'all 0.3s'}}>
                        <div style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            <h5 style={{paddingTop: '20px', paddingLeft: '10px', margin: '0'}}>Indirizzi</h5>
                            <div style={{width: '400px' , paddingRight:'10px'}}>
                                {selectedFilteredChips.map((chip) => (
                                    <Chip
                                        key={chip.id}
                                        label={chip.descrizione}
                                        onDelete={() => handleChipDelete(chip)}
                                        style={{
                                            margin: "4px",
                                            backgroundColor: "rgba(20, 117, 207, 0.7)",
                                            color: "white",
                                        }}
                                    />
                                ))}
                                {unselectedFilteredChips.map((chip) => (
                                    <Chip
                                        key={chip.id}
                                        label={chip.descrizione}
                                        onClick={() => handleChipClick(chip)}
                                        style={{margin: "4px"}}
                                        clickable
                                    />
                                ))}
                            </div>
                        </div>
                        <div style={{flexDirection: 'column'}}>
                            <h5 style={{paddingTop: '20px', paddingLeft: '10px', margin: '0'}}>Competenze</h5>
                            <div style={{width: '100%', overflowY: 'scroll', height: '7.5em', scrollbarWidth:'none', paddingRight:'10px'}}>
                                {selectedFilteredCompetenze.map((competenza) => (
                                    <Chip
                                        key={competenza.id}
                                        label={competenza.descrizione}
                                        onDelete={() => handleCompetenzaDelete(competenza)}
                                        style={{
                                            margin: "4px",
                                            backgroundColor: "rgba(20, 117, 207, 0.7)",
                                            color: "white",
                                        }}
                                    />
                                ))}
                                {unselectedFilteredCompetenze.map((competenza) => (
                                    <Chip
                                        key={competenza.id}
                                        label={competenza.descrizione}
                                        onClick={() => handleCompetenzaClick(competenza)}
                                        style={{margin: "4px"}}
                                        clickable
                                    />
                                ))}
                            </div>
                        </div>
                        <div style={{flexDirection: 'column'}}>
                            <h5 style={{paddingTop: '20px', paddingLeft: '10px', margin: '0'}}>Lingue</h5>
                            <div style={{width: '100%', overflowY: 'scroll', height: '7.5em', scrollbarWidth:'none'}}>
                                {selectedFilteredLingue.map((lingua) => (
                                    <Chip
                                        key={lingua.id}
                                        label={lingua.descrizione}
                                        onDelete={() => handleLinguaDelete(lingua)}
                                        style={{
                                            margin: "4px",
                                            backgroundColor: "rgba(20, 117, 207, 0.7)",
                                            color: "white",
                                        }}
                                    />
                                ))}
                                {unselectedFilteredLingue.map((lingua) => (
                                    <Chip
                                        key={lingua.id}
                                        label={lingua.descrizione}
                                        onClick={() => handleLinguaClick(lingua)}
                                        style={{margin: "4px"}}
                                        clickable
                                    />
                                ))}
                            </div>
                        </div>
                    </Components.FilterContainer>
                    :
                    null
                }
            </Components.TopBar>
            {viewMode === 'cards' ? (
                <Components.cardsContainer>
                    {filteredStudents.map((student, index) => (
                        <StudentCard
                            key={index}
                            student={student}
                            index={index}
                        />
                    ))}
                </Components.cardsContainer>
            ) : (
                <Components.listContainer>
                    {filteredStudents.map((student, index) => (
                        <Components.listItem key={index}>
                            <Components.listItemProfilePic dotColor={student.dotColor}/>
                            <Components.listItemInfo>
                                <Components.listItemName>{student.firstName} {student.lastName}</Components.listItemName>
                                <Components.ListItemSkills>
                                    {student.skills.map(skill => (
                                        <Components.ListItemSkill key={skill}>{skill}</Components.ListItemSkill>
                                    ))}
                                </Components.ListItemSkills>
                            </Components.listItemInfo>
                        </Components.listItem>
                    ))}
                </Components.listContainer>
            )}
        </Components.contentContainer>
    );
}

export default ListaStudenti;
