import React, {useState} from "react";
import * as Components from "../componenti/AnnunciComponents";
import StudentCard from '../../Components/cards/StudentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsFillGridFill } from "react-icons/bs";
import Chip from "@mui/material/Chip";
import {students} from "../../Components/students";
import {faHouse, faList} from '@fortawesome/free-solid-svg-icons';
import {faRightFromBracket, faFilter} from '@fortawesome/free-solid-svg-icons';
const listIcon = <FontAwesomeIcon icon={faList} />;

const Annunci = ({

              }) => {
    return (
        <Components.contentContainer>
            <Components.TopBar style={{height: '150px'}}>

                    <Components.InfoAnnunciElement>
                        <h1>9</h1>
                        <h5>ANNUNCI ATTIVI</h5>
                    </Components.InfoAnnunciElement>

                    <Components.InfoAnnunciElement>
                        <h1>12</h1>
                        <h5>CANDIDATURE RICEVUTE</h5>
                    </Components.InfoAnnunciElement>

                    <Components.InfoAnnunciElement>
                        <h1>3</h1>
                        <h5>ANNUNCI CHIUSI</h5>
                    </Components.InfoAnnunciElement>


            </Components.TopBar>
            <Components.AnnunciContainer>
                <Components.ListaAnnunci>
                    <Components.Annuncio>
                        <Components.AnnuncioImage/>

                    </Components.Annuncio>


                    <Components.Annuncio>
                        <Components.AnnuncioImage/>

                    </Components.Annuncio>
                </Components.ListaAnnunci>
                <Components.NuovoAnnuncio>

                </Components.NuovoAnnuncio>

            </Components.AnnunciContainer>

        </Components.contentContainer>
    );
}

export default Annunci;