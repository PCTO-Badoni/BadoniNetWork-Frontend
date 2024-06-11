import * as HomeComponents from "./HomeComponents.js";
import ReactDOM from "react-dom";
import React from "react";
import "../styles.css";
import Register from '../auth/register/register';
import StudentCard from './Components/cards/StudentCard';
import * as Components from "./HomeComponents.js";

import "././sideBar/homeStyle.css";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import MaterialMenuItem from './sideBar/MaterialMenuItem';


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
        dotColor: getRandomColor() // Aggiungi questa linea


    },
    {
        profilePic: 'url della foto del profilo 2',
        firstName: 'Luigi',
        lastName: 'Bianchi',
        description: 'Amo la programmazione',
        skills: ['JavaScript', 'React', 'Node.js'],
        bannerImage: 'https://media-assets.wired.it/photos/637b4e79e8ddcc5a60de780c/3:2/w_2400,h_1600,c_limit/Hot-To-Find-Discord-Servers-Gear-1398472119.jpg',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 3',
        firstName: 'Giulia',
        lastName: 'Verdi',
        description: 'Appassionata di data science',
        skills: ['Python', 'R', 'SQL'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9lrqSclqKltnERsJczgFPdIVJBHL1fROxUQ&s',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 4',
        firstName: 'Marco',
        lastName: 'Neri',
        description: 'Mi piace lo sviluppo web',
        skills: ['HTML', 'CSS', 'JavaScript'],
        bannerImage: 'https://static.vecteezy.com/system/resources/thumbnails/002/949/141/small/programming-code-coding-or-hacker-background-vector.jpg',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 5',
        firstName: 'Sara',
        lastName: 'Gialli',
        description: 'Interessata all\'Intelligenza Artificiale',
        skills: ['Python', 'TensorFlow', 'PyTorch'],
        bannerImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 6',
        firstName: 'Andrea',
        lastName: 'Viola',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://png.pngtree.com/thumb_back/fh260/background/20201104/pngtree-technology-background-binary-computer-code-vector-design-image_458702.jpg',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 7',
        firstName: 'Elena',
        lastName: 'Azzurri',
        description: 'Appassionata di sviluppo mobile',
        skills: ['Swift', 'Kotlin', 'React Native'],
        bannerImage: 'https://as2.ftcdn.net/v2/jpg/02/50/89/79/1000_F_250897949_pTzxDTqVxz42hgZ8t6HqbYKHGCLvX9yD.jpg',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 8',
        firstName: 'Matteo',
        lastName: 'Rosa',
        description: 'Mi piace il backend development',
        skills: ['Java', 'Spring Boot', 'SQL'],
        bannerImage: 'https://images.pond5.com/blue-programming-code-background-abstract-footage-090894338_iconl.jpeg',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 9',
        firstName: 'Giovanna',
        lastName: 'Marrone',
        description: 'Appassionata di sviluppo web',
        skills: ['HTML', 'CSS', 'JavaScript'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVr8h4t3V9Q9z1eRb9X6y1X2O4V5G5qFQ5YQ&s',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 10',
        firstName: 'Giovanni',
        lastName: 'Arancioni',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 11',
        firstName: 'Giorgio',
        lastName: 'Viola',
        description: 'Appassionato di sviluppo mobile',
        skills: ['Swift', 'Kotlin', 'React Native'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 12',
        firstName: 'Elisa',
        lastName: 'Azzurri',
        description: 'Mi piace il backend development',
        skills: ['Java', 'Spring Boot', 'SQL'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 13',
        firstName: 'Matteo',
        lastName: 'Rosa',
        description: 'Appassionato di sviluppo web',
        skills: ['HTML', 'CSS', 'JavaScript'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 14',
        firstName: 'Giovanna',
        lastName: 'Marrone',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 15',
        firstName: 'Giovanni',
        lastName: 'Arancioni',
        description: 'Appassionato di sviluppo mobile',
        skills: ['Swift', 'Kotlin', 'React Native'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 16',
        firstName: 'Giorgio',
        lastName: 'Viola',
        description: 'Mi piace il backend development',
        skills: ['Java', 'Spring Boot', 'SQL'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 17',
        firstName: 'Elisa',
        lastName: 'Azzurri',
        description: 'Appassionata di sviluppo web',
        skills: ['HTML', 'CSS', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3t4v4Z9OvKj1X1w2F0fU9vUjQ&s',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 18',
        firstName: 'Matteo',
        lastName: 'Rosa',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 18',
        firstName: 'Matteo',
        lastName: 'Rosa',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
    {
        profilePic: 'url della foto del profilo 18',
        firstName: 'Matteo',
        lastName: 'Rosa',
        description: 'Mi piace il machine learning',
        skills: ['Python', 'Scikit-learn', 'Pandas'],
        bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2Jv9gQI3m3',
        dotColor: getRandomColor() // Aggiungi questa linea
    },
];


function HomePage() {



    return (
        <>

        <HomeComponents.Container>
            <Components.Sidebar>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Components.Logo/>
                    <h3 style={{paddingLeft: '0.9em'}}>Badoni NetWork</h3>
                </div>
                <Menu iconShape="square">
                    <MaterialMenuItem text="ciao"/>
                    <MenuItem>
                        <Link to="/register">Register</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/login">Login</Link>
                    </MenuItem>
                </Menu>
                <Components.Button>

                    <Link to="/">Logout</Link>
                </Components.Button>
            </Components.Sidebar>
            <HomeComponents.contentContainer>

                <HomeComponents.cardsContainer>
                    {students.map((student, index) => (
                        <StudentCard
                            key={index}
                            student={student}
                            index={index} // Pass the index to StudentCard
                        />
                    ))}
                </HomeComponents.cardsContainer>
            </HomeComponents.contentContainer>
        </HomeComponents.Container>
        </>
    );


}
export default HomePage;