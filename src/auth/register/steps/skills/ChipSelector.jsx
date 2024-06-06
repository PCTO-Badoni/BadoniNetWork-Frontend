// src/ChipSelector.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import * as Components from "../../RegisterComponents";

const ChipSelector = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChips, setSelectedChips] = useState([]);
    const [chips] = useState([
        'Java', 'JavaFX', 'JavaScript', 'Python', 'C', 'C++', 'C#', 'MongoDB',
        'SceneBuilder', 'HTML', 'Packet Tracer', 'Cisco', 'CAD', 'CSS', 'Sistemi',
        'Arduino', 'PHP', 'Database', 'Labview', 'Impianti civili e industriali',
        'Excel', 'FlowGorithm', 'Circuiti', 'Sicurezza', 'Assembly', 'React', 'Angular',
        'Go', 'Gimp', 'Cyber Security', 'Tornio', 'Fresa', 'Word', 'Multisim',
        'Powerpoint', 'Latex', 'Cablaggio', 'Plc', 'Sensori'
    ]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleChipClick = (chip) => {
        if (!selectedChips.includes(chip)) {
            setSelectedChips([...selectedChips, chip]);
        }
    };

    const handleChipDelete = (chipToDelete) => {
        setSelectedChips(selectedChips.filter(chip => chip !== chipToDelete));
    };

    const filteredChips = chips.filter((chip) =>
        chip.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedFilteredChips = selectedChips.filter((chip) =>
        chip.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const unselectedFilteredChips = filteredChips.filter(chip => !selectedChips.includes(chip));

    return (
        <Components.chipsBox>
            <Components.Input onChange={handleSearchChange} style={{ marginLeft: '200px', marginRight: '200px', marginBottom: '25px' }} />
            <Box>
                {selectedFilteredChips.map((chip) => (
                    <Chip
                        key={chip}
                        label={chip}
                        onDelete={() => handleChipDelete(chip)}
                        style={{ margin: '4px', backgroundColor: '#4070f4', color: 'white' }}
                    />
                ))}
                {unselectedFilteredChips.map((chip) => (
                    <Chip
                        key={chip}
                        label={chip}
                        onClick={() => handleChipClick(chip)}
                        style={{ margin: '4px' }}
                        clickable
                    />
                ))}
            </Box>
        </Components.chipsBox>
    );
};

export default ChipSelector;
