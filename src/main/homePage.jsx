import * as Components from "./HomeComponents.js";
import ReactDOM from "react-dom";
import React, {useEffect, useState} from "react";
import "../styles.css";
import StudentCard from './Components/cards/StudentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faTh, faInbox, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import "././sideBar/homeStyle.css";
import { Link } from 'react-router-dom';
import Chip from "@mui/material/Chip";
import Footer from "../footer";

const listIcon = <FontAwesomeIcon icon={faList} />;
const cardIcon = <FontAwesomeIcon icon={faTh} />;
const filterIcon = <FontAwesomeIcon icon={faFilter} />;
const bellIcon = <FontAwesomeIcon icon={faInbox} />
const logoutIcon = <FontAwesomeIcon icon={faRightFromBracket} />

function getRandomColor() {
    const colors = ['green', 'orange', 'red'];
    return colors[Math.floor(Math.random() * colors.length)];
}

const students = [
    {
        profilePic: 'url della foto del profilo 1',
        firstName: 'Mario',
        lastName: 'Rossi',
        description: 'Mi piacciono i cani',
        skills: ['Java', 'Python', 'C++'],
        bannerImage: 'https://m.media-amazon.com/images/I/513eVMR+cML._AC_UF894,1000_QL80_.jpg',
        dotColor: getRandomColor()


    },
    {
        profilePic: 'url della foto del profilo 2',
        firstName: 'Luigi',
        lastName: 'Bianchi',
        description: 'Amo la programmazione',
        skills: ['JavaScript', 'React', 'Node.js'],
        bannerImage: 'https://media-assets.wired.it/photos/637b4e79e8ddcc5a60de780c/3:2/w_2400,h_1600,c_limit/Hot-To-Find-Discord-Servers-Gear-1398472119.jpg',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 3',
        firstName: 'Giulia',
        lastName: 'Verdi',
        description: 'Appassionata di data science',
        skills: ['Python', 'R', 'SQL'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9lrqSclqKltnERsJczgFPdIVJBHL1fROxUQ&s',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 4',
        firstName: 'Marco',
        lastName: 'Neri',
        description: 'Mi piace lo sviluppo web',
        skills: ['H0TML', 'CSS', 'JavaScript'],
        bannerImage: 'https://static.vecteezy.com/system/resources/thumbnails/002/949/141/small/programming-code-coding-or-hacker-background-vector.jpg',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 5',
        firstName: 'Sara',
        lastName: 'Gialli',
        description: 'Interessata all\'Intelligenza Artificiale',
        skills: ['Python', 'TensorFlow', 'PyTorch'],
        bannerImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 6',
        firstName: 'Andrea',
        lastName: 'Viola',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://png.pngtree.com/thumb_back/fh260/background/20201104/pngtree-technology-background-binary-computer-code-vector-design-image_458702.jpg',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 7',
        firstName: 'Elena',
        lastName: 'Azzurri',
        description: 'Appassionata di sviluppo mobile',
        skills: ['Swift', 'Kotlin', 'React Native'],
        bannerImage: 'https://as2.ftcdn.net/v2/jpg/02/50/89/79/1000_F_250897949_pTzxDTqVxz42hgZ8t6HqbYKHGCLvX9yD.jpg',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 8',
        firstName: 'Matteo',
        lastName: 'Rosa',
        description: 'Mi piace il backend development',
        skills: ['Java', 'Spring Boot', 'SQL'],
        bannerImage: 'https://images.pond5.com/blue-programming-code-background-abstract-footage-090894338_iconl.jpeg',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 9',
        firstName: 'Giovanna',
        lastName: 'Marrone',
        description: 'Appassionata di sviluppo web',
        skills: ['HTML', 'CSS', 'JavaScript'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVr8h4t3V9Q9z1eRb9X6y1X2O4V5G5qFQ5YQ&s',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 10',
        firstName: 'Giovanni',
        lastName: 'Arancioni',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 11',
        firstName: 'Giorgio',
        lastName: 'Viola',
        description: 'Appassionato di sviluppo mobile',
        skills: ['Swift', 'Kotlin', 'React Native'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 12',
        firstName: 'Elisa',
        lastName: 'Azzurri',
        description: 'Mi piace il backend development',
        skills: ['Java', 'Spring Boot', 'SQL'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 13',
        firstName: 'Matteo',
        lastName: 'Rosa',
        description: 'Appassionato di sviluppo web',
        skills: ['HTML', 'CSS', 'JavaScript'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 14',
        firstName: 'Giovanna',
        lastName: 'Marrone',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 15',
        firstName: 'Giovanni',
        lastName: 'Arancioni',
        description: 'Appassionato di sviluppo mobile',
        skills: ['Swift', 'Kotlin', 'React Native'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 16',
        firstName: 'Giorgio',
        lastName: 'Viola',
        description: 'Mi piace il backend development',
        skills: ['Java', 'Spring Boot', 'SQL'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 17',
        firstName: 'Elisa',
        lastName: 'Azzurri',
        description: 'Appassionata di sviluppo web',
        skills: ['HTML', 'CSS', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 18',
        firstName: 'Matteo',
        lastName: 'Rosa',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 18',
        firstName: 'Matteo',
        lastName: 'Rosa',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3',
        dotColor: getRandomColor()
    },
    {
        profilePic: 'url della foto del profilo 18',
        firstName: 'Matteo',
        lastName: 'Rosa',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3',
        dotColor: getRandomColor()
    },
];

function HomePage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChips, setSelectedChips] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [chips, setChips] = useState([
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
    const [competenze, setCompetenze] = useState([
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
    const [selectedCompetenze, setSelectedCompetenze] = useState([]);
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('cards');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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

    const handleCompetenzaClick = (competenza) => {
        if (!selectedCompetenze.includes(competenza)) {
            const newSelectedCompetenze = [...selectedCompetenze, competenza];
            setSelectedCompetenze(newSelectedCompetenze);
        }
    };

    const handleCompetenzaDelete = (competenzaToDelete) => {
        setSelectedCompetenze(selectedCompetenze.filter((competenza) => competenza !== competenzaToDelete));
    };

    const selectedFilteredCompetenze = selectedCompetenze.filter((competenza) =>
        competenza.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const unselectedFilteredCompetenze = filteredCompetenze.filter(
        (competenza) => !selectedCompetenze.includes(competenza),
    );

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', overflow: 'scroll', marginTop: 'auto'}}>
            <Components.Container style={{scale:'0.9'}}>
                <Components.Sidebar>
                    <Components.MenuContainer>
                        <Components.MenuItem to='/'>Campo</Components.MenuItem>
                        <Components.MenuItem to='/'>Campo</Components.MenuItem>
                        <Components.MenuItem to='/'>Campo</Components.MenuItem>
                        <Components.MenuItem to='/'>Campo</Components.MenuItem>
                        <Components.MenuItem to='/'>Campo</Components.MenuItem>
                    </Components.MenuContainer>
                    <div style={{marginTop: 'auto'}}>
                        <Components.LogoutButton>
                            <Link to='/' style={{textDecoration: 'none', color:'black'}}>{logoutIcon}</Link>
                        </Components.LogoutButton>
                    </div>
                </Components.Sidebar>
                <Components.contentContainer>

                    <Components.Header style={{ height: isFilterOpen ? '350px' : '100px', transition: 'height 0.3s' }}>
                        <div style={{position: 'sticky', display:'flex', flexDirection:'row', columnGap:'20px'}}>
                            <Components.SearchBar onChange={handleSearchChange} />
                            <Components.FilterButton onClick={() => setFilterOpen(!isFilterOpen)}>
                                {filterIcon} Filtra
                            </Components.FilterButton>

                            {/*<Components.ViewModeButton
                                onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')}
                            >
                                {viewMode === 'cards' ? listIcon : cardIcon}
                            </Components.ViewModeButton>*/}
                            <Components.NotificationButton>

                                {bellIcon}

                            </Components.NotificationButton>
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
                                    <div style={{width: '100%'}}>
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
                    </Components.Header>
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
                                <Components.listItem>
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
            </Components.Container>
            <Footer/>
            </div>
        </>
    );


}
export default HomePage;