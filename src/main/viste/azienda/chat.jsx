import React, {useState} from "react";
import * as Components from "../componenti/ChatComponents";
import StudentCard from '../../Components/cards/StudentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsFillGridFill } from "react-icons/bs";
import Chip from "@mui/material/Chip";
import {students} from "../../Components/students";
import {faHouse, faList} from '@fortawesome/free-solid-svg-icons';
import {faRightFromBracket, faFilter} from '@fortawesome/free-solid-svg-icons';
import UserInfo from "../componenti/Fragments/UserInfo";
import {ContactCard} from "../componenti/ChatComponents";
const listIcon = <FontAwesomeIcon icon={faList} />;

const Chat = ({
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



    return (
        <Components.contentContainer>
            <Components.TopBar style={{height: '150px'}}>
                <UserInfo/>

            </Components.TopBar>
            <Components.Content>
                <Components.ContactsContainer>
                    <Components.ContactCardList>
                        <ContactCard>
                            Contatto 1
                        </ContactCard>
                        <ContactCard>
                            Contatto 2
                        </ContactCard>
                        <ContactCard>
                            Contatto 3
                        </ContactCard>
                        <ContactCard>
                            Contatto 4
                        </ContactCard>
                        <ContactCard>
                            Contatto 5
                        </ContactCard>
                        <ContactCard>
                            Contatto 6
                        </ContactCard>
                        <ContactCard>
                            Contatto 7
                        </ContactCard>
                        <ContactCard>
                            Contatto 8
                        </ContactCard>
                        <ContactCard>
                            Contatto 9
                        </ContactCard>
                        <ContactCard>
                            Contatto 10
                        </ContactCard>
                        <ContactCard>
                            Contatto 11
                        </ContactCard>
                        <ContactCard>
                            Contatto 12
                        </ContactCard>
                        <ContactCard>
                            Contatto 13
                        </ContactCard>
                        <ContactCard>
                            Contatto 14
                        </ContactCard>
                        <ContactCard>
                            Contatto 15
                        </ContactCard>
                        <ContactCard>
                            Contatto 16
                        </ContactCard>
                        <ContactCard>
                            Contatto 17
                        </ContactCard>
                        <ContactCard>
                            Contatto 18
                        </ContactCard>
                    </Components.ContactCardList>

                </Components.ContactsContainer>
                <Components.ChatsContainer>

                </Components.ChatsContainer>

            </Components.Content>
        </Components.contentContainer>
    );
}

export default Chat;