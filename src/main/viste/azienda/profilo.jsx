import React, {useState} from "react";
import * as Components from "../componenti/ProfileComponents";
import StudentCard from '../../Components/cards/StudentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsFillGridFill } from "react-icons/bs";
import Chip from "@mui/material/Chip";
import {students} from "../../Components/students";
import {faHouse, faList} from '@fortawesome/free-solid-svg-icons';
import {faRightFromBracket, faFilter} from '@fortawesome/free-solid-svg-icons';
const listIcon = <FontAwesomeIcon icon={faList} />;

const Profilo = ({
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

    return (
        <Components.contentContainer>
            <Components.TopBar style={{height: '150px'}}>
                    <Components.ProfileInformations style={{transition: 'all 0.3s'}}>
                        <div style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{width: '73.8em'}}>

                            </div>
                        </div>

                    </Components.ProfileInformations>

            </Components.TopBar>
                <Components.cardsContainer>

                </Components.cardsContainer>

        </Components.contentContainer>
    );
}

export default Profilo;
