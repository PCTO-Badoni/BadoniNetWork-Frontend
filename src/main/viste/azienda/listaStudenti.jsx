import React, {useState} from "react";
import * as Components from "../../HomeComponents";
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
                           chips,
                           competenze,
                           isFilterOpen,
                           setFilterOpen,
                           viewMode,
                           setViewMode,
                           handleChipClick,
                           handleChipDelete,
                           handleCompetenzaClick,
                           handleCompetenzaDelete
                       }) => {

    const selectedFilteredChips = selectedChips.filter((chip) =>
        chip.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const filteredChips = chips.filter((chip) =>
        chip.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const filteredCompetenze = competenze.filter((competenza) =>
        competenza.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const unselectedFilteredChips = filteredChips.filter(
        (chip) => !selectedChips.includes(chip),
    );

    const selectedFilteredCompetenze = selectedCompetenze.filter((competenza) =>
        competenza.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const unselectedFilteredCompetenze = filteredCompetenze.filter(
        (competenza) => !selectedCompetenze.includes(competenza),
    );


    const [activeButtons, setActiveButtons] = useState([]);

    const handleButtonClick = (buttonName) => {
        if (activeButtons.includes(buttonName)) {
            setActiveButtons(activeButtons.filter(button => button !== buttonName));
        } else {
            setActiveButtons([...activeButtons, buttonName]);
        }
    };

    return (
        <Components.contentContainer>
            <Components.TopBar style={{ height: isFilterOpen ? '250px' : '100px', transition: 'height 0.3s' }}>
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
                        <Components.DisponibilityButton onClick={() => handleButtonClick('rosso')} style={{borderBottom: activeButtons.includes('rosso') ? '2px solid blue' : null}}>Non Accetta Proposte</Components.DisponibilityButton></Components.DisponibilityContainer>
                    <Components.ViewModeButton
                        onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')}
                    >
                        {viewMode === 'cards' ? listIcon : <BsFillGridFill />}
                    </Components.ViewModeButton>
                </div>
                {isFilterOpen ?
                    <Components.FilterContainer style={{transition: 'all 0.3s'}}>
                        <div style={{flexDirection: 'column', justifyContent:'flex-start', alignContent: 'flex-start', alignItems: 'flex-start'}}>
                            <h5 style={{paddingTop: '20px', paddingLeft: '10px', margin: '0'}}>Indirizzi</h5>
                            <div style={{width: '400px'}}>
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
                            <div style={{width: '50%', overflowY: 'scroll', height: '7.5em'}}>
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
                    </Components.FilterContainer>
                    :
                    null
                }
            </Components.TopBar>
            {viewMode === 'cards' ? (
                <Components.cardsContainer>
                    {students.map((student, index) => (
                        <StudentCard
                            key={index}
                            student={student}
                            index={index}
                        />
                    ))}
                </Components.cardsContainer>
            ) : (
                <Components.listContainer>
                    {students.map((student, index) => (
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
