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
import '../chat.css';


import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from "primereact/inputtext";


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


    const contacts = [
        { id: 1, name: "Contatto 1" },
        { id: 2, name: "Contatto 2" },
        { id: 3, name: "Contatto 3" },
        { id: 4, name: "Contatto 4" },
        { id: 5, name: "Contatto 5" },
        { id: 6, name: "Contatto 6" },
        { id: 7, name: "Contatto 7" },
        { id: 8, name: "Contatto 8" },
        { id: 9, name: "Contatto 9" },
        { id: 10, name: "Contatto 10" },
        { id: 11, name: "Contatto 11" },
        { id: 12, name: "Contatto 12" },
        { id: 13, name: "Contatto 13" },
        { id: 14, name: "Contatto 14" },
        { id: 15, name: "Contatto 15" },
        { id: 16, name: "Contatto 16" },
        { id: 17, name: "Contatto 17" },
        { id: 18, name: "Giovanni 18" },
    ];


    const [isInputActive, setIsInputActive] = useState(false);

    const handleFocus = () => {
        setIsInputActive(true);
    };

    const handleBlur = () => {
        setIsInputActive(false);
    };

    const handleClick = () => {
        setIconBgColor("blue");
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Components.contentContainer>
            <Components.TopBar style={{height: '150px'}}>
                <UserInfo/>
            </Components.TopBar>
            <Components.Content>
                <Components.ContactsContainer>
                    <Components.ContactsSearchBar
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Components.ContactCardList>
                        {filteredContacts.map((contact) => (
                            <ContactCard key={contact.id}>
                                <Components.ContactProfileImage />
                                {contact.name}
                            </ContactCard>
                        ))}
                    </Components.ContactCardList>
                </Components.ContactsContainer>
                <Components.ChatsContainer>
                    <Components.Chat>
                        <h1>chat content</h1>
                    </Components.Chat>
                    <Components.Input>
                        <IconField style={{width: '100%'}}>
                            <InputIcon
                                className="pi pi-send"
                                onClick={() => console.log("Icon clicked")}
                                style={{ cursor: 'pointer', color: isInputActive ? '#6366f1' : '#ccc', marginRight: '5px', scale: isInputActive ? '1.5' : '1', transition: 'all 0.3s' }}
                            />
                            <InputText
                                v-model="value2"
                                style={{borderRadius: '12px', width: '100%'}}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </IconField>
                    </Components.Input>
                </Components.ChatsContainer>
            </Components.Content>
        </Components.contentContainer>
    );
}

export default Chat;