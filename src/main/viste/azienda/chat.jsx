import React, { useState, useRef, useEffect } from "react";
import * as Components from "../componenti/ChatComponents";
import StudentCard from "../../Components/cards/StudentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsFillGridFill } from "react-icons/bs";
import Chip from "@mui/material/Chip";
import { students } from "../../Components/students";
import { faHouse, faList } from "@fortawesome/free-solid-svg-icons";
import {
  faRightFromBracket,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import UserInfo from "../componenti/Fragments/UserInfo";
import { ContactCard } from "../componenti/ChatComponents";
const listIcon = <FontAwesomeIcon icon={faList} />;
import "../chat.css";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { ContextMenu } from "primereact/contextmenu";
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
  handleLinguaDelete,
}) => {
  const contacts = [
    {
      id: 1,
      name: "Federico Bugni",
      profilePic:
        "https://img.freepik.com/foto-premium/un-gatto-bianco-sorridente-uno-stupido-gatto-arancione-un-pazzo-ai-ha-generato-arte_843679-1828.jpg",
    },
    {
      id: 2,
      name: "Pietro Marvelli",
      profilePic:
        "https://ultimejuve.it/wp-content/uploads/2024/01/Screenshot-2024-01-11-alle-10.15.35-1024x689.png",
    },
    {
      id: 3,
      name: "Pietro Vassena",
      profilePic:
        "https://m.media-amazon.com/images/I/51aZN0mzAfL._UXNaN_FMjpg_QL85_.jpg",
    },
    {
      id: 4,
      name: "Giovanni Cifariello",
      profilePic:
        "https://img.a.transfermarkt.technology/portrait/big/4289-1683631011.jpg?lm=1",
    },
    {
      id: 5,
      name: "Andrea Sormani",
      profilePic:
        "https://cdn.vegaoo.it/images/rep_art/gra/326/7/326783/costume-steve-classico-minecraft-bambino_3.jpg",
    },
    {
      id: 6,
      name: "Antonio Rubinacci",
      profilePic:
        "https://content-s3.tuttocampo.it/Players/Original/8837386.png?v=2",
    },
    {
      id: 7,
      name: "Gabriele Landi",
      profilePic:
        "https://variety.com/wp-content/uploads/2023/11/zelda.jpg?w=1000&h=563&crop=1",
    },
    {
      id: 8,
      name: "Lorenzo Nava",
      profilePic:
        "https://i.natgeofe.com/n/af80ab23-e2e7-4ca6-bf4a-d546f3f74bf9/genius2-albert-einstein-black-white-portrait.jpg",
    },
    {
      id: 9,
      name: "Lorenzo Molteni",
      profilePic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyUgGMq-qn-eTXO65Kfoc6R8XkT38O63NoBQ&s",
    },
    {
      id: 10,
      name: "Lorenzo Bellotta",
      profilePic:
        "https://www.my-personaltrainer.it/2023/10/04/diabete_900x760.jpeg",
    },
    {
      id: 11,
      name: "Nicolò Musolino",
      profilePic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfEhguRRbwfoedGpldqYUPlSnhhol80KUcRg&s",
    },
    {
      id: 12,
      name: "Marco Frigerio",
      profilePic:
        "https://www.my-personaltrainer.it/2020/07/20/arrampicata-sportiva-attrezzatura_900x760.jpeg",
    },
    {
      id: 13,
      name: "Davide Mazzoleni",
      profilePic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZMrUcS8bpgjxDn2xrrR4oF8irQ0Tn11zGNA&s",
    },
    {
      id: 14,
      name: "Nicolò Molteni",
      profilePic:
        "https://upload.wikimedia.org/wikipedia/commons/5/5e/Charles_Leclerc_portrait_2020.png",
    },
    {
      id: 15,
      name: "Filippo Pinizzotto",
      profilePic:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/800px-FC_Internazionale_Milano_2021.svg.png",
    },
    {
      id: 16,
      name: "Maurizio Testa",
      profilePic:
        "https://fursonafy.com/wp-content/uploads/2022/11/121d9679cb1032d9b2e0177b0d6d2376.jpg",
    },
    {
      id: 17,
      name: "Mohamed Aihableame",
      profilePic:
        "https://www.adlmag.it/wp-content/uploads/2024/02/Senza-titolo-1-1.png",
    },
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

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const [activeContact, setActiveContact] = useState(contacts[0]);

  const messages = [
    {
      id: 1,
      sender: activeContact.name,
      text: "Ciao, come staiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa?",
      timestamp: "ggwp AM",
    },
    {
      id: 2,
      sender: "Tu",
      text: "Tutto bene, grazie! E tu?",
      timestamp: "10:02 AM",
    },
    {
      id: 3,
      sender: activeContact.name,
      text: "Anche io, grazie!",
      timestamp: "10:03 AM",
    },
    { id: 4, sender: activeContact, text: "Stornzo", timestamp: "10:03 AM" },
    {
      id: 5,
      sender: activeContact.name,
      text: "Ciao, come stai?",
      timestamp: "10:01 AM",
    },
    {
      id: 6,
      sender: "Tu",
      text: "Tutto bene, grazie! E tu?",
      timestamp: "10:02 AM",
    },
    {
      id: 7,
      sender: activeContact.name,
      text: "Anche io, grazie!",
      timestamp: "10:03 AM",
    },
    {
      id: 8,
      sender: activeContact.name,
      text: "Ciao! Tutto bene?",
      timestamp: "10:04 AM",
    },
  ];

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const Message = ({
    sender,
    text,
    timestamp,
    isOwnMessage,
    isContextMenuOpen,
    onContextMenuOpen,
  }) => {
    const [isTouched, setIsTouched] = useState(false);
    const cm = useRef(null);

    const handleMouseEnter = () => {
      setIsTouched(true);
    };

    const handleMouseLeave = () => {
      setIsTouched(false);
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
      onContextMenuOpen();
      cm.current.show(event);
    };

    const items = [
      { label: "Copy", icon: "pi pi-copy" },
      { label: "Rename", icon: "pi pi-file-edit" },
    ];

    useEffect(() => {
      if (!isContextMenuOpen && cm.current) {
        cm.current.hide();
      }
    }, [isContextMenuOpen]);

    return (
      <>
        <div
          style={{
            textAlign: isOwnMessage ? "right" : "left",
            marginBottom: "10px",
            width: "100%",
            position: "relative",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onContextMenu={handleContextMenu}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: isOwnMessage
                ? `var(--thirdColor)`
                : `var(--secondColor)`,
              color: isOwnMessage ? "#000" : `var(--contrastColor)`,
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "70%",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              position: "relative",
            }}
            className="message-container"
          >
            <p style={{ margin: 0 }}>{text}</p>
            <p
              style={{
                fontSize: "0.8em",
                color: isOwnMessage ? "#000" : "#888",
              }}
            >
              {timestamp}
            </p>
            <ContextMenu model={items} ref={cm} breakpoint="767px" />
            <i
              className="pi pi-angle-down"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "40px",
                height: "30px",
                background: `linear-gradient(to left,
               ${isOwnMessage ? `var(--thirdColor)` : `var(--secondColor)`} 50%,
               rgba(255, 255, 255, 0) 100%)`,
                display: isTouched && isOwnMessage ? "block" : "none",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </>
    );
  };

  const handleContactClick = (contact) => {
    setActiveContact(contact);
  };

  const [openContextMenu, setOpenContextMenu] = useState(null);

  const handleContextMenuOpen = (id) => {
    setOpenContextMenu(id);
  };

  return (
    <Components.contentContainer>
      <Components.TopBar style={{ height: "150px" }}>
        <UserInfo />
      </Components.TopBar>
      <Components.Content>
        <Components.ContactsContainer>
          <Components.ContactsSearchBar
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Components.ContactCardList>
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                contactId={contact.id}
                selectedId={activeContact.id}
              >
                <Components.ContactProfileImage url={contact.profilePic} />
                <Components.ContactInfos>
                  <Components.ContactName>
                    {contact.name}
                    {/* Messaggio allineato a sinistra */}
                    <span style={{ color: `var(--fifthColor)` }}>
                      {messages[7].timestamp}
                    </span>{" "}
                  </Components.ContactName>
                  <Components.ContactLastMsg>
                    <span>{messages[7].text}</span>{" "}
                  </Components.ContactLastMsg>
                </Components.ContactInfos>
              </ContactCard>
            ))}
          </Components.ContactCardList>
        </Components.ContactsContainer>

        <Components.ChatsContainer
          ref={chatContainerRef}
          style={{ height: "100%" }}
        >
          <Components.nameContainer>
            <h2>{activeContact.name}</h2>
          </Components.nameContainer>
          <div
            style={{
              width: "100%",
              overflowY: "scroll",
              paddingRight: "20px",
              paddingLeft: "20px",
              paddingTop: "10px",
            }}
          >
            {messages.map((message) => (
              <Message
                key={message.id}
                sender={message.sender}
                text={message.text}
                timestamp={message.timestamp}
                isOwnMessage={message.sender === "Tu"}
                isContextMenuOpen={openContextMenu === message.id}
                onContextMenuOpen={() => handleContextMenuOpen(message.id)}
              />
            ))}
          </div>
          <Components.Input>
            <IconField style={{ width: "100%" }}>
              <InputIcon
                className="pi pi-send"
                onClick={() => console.log("Icon clicked")}
                style={{
                  cursor: "pointer",
                  color: isInputActive ? "#6366f1" : "#ccc",
                  marginRight: "5px",
                  scale: isInputActive ? "1.5" : "1",
                  transition: "all 0.3s",
                }}
              />
              <InputText
                v-model="value2"
                style={{
                  borderRadius: "12px",
                  width: "100%",
                  borderColor: `var(--borderColor)`,
                  backgroundColor: `var(--searchBarColor)`,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </IconField>
          </Components.Input>
        </Components.ChatsContainer>
      </Components.Content>
    </Components.contentContainer>
  );
};

export default Chat;
