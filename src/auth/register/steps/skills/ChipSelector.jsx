// src/ChipSelector.js
import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import * as Components from "../../RegisterComponents";

const ChipSelector = ({ minSelectedChips, setMinSelectedChips }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);
  const [chips, setChips] = useState([]); // Add this line

  useEffect(() => {
    fetch('http://localhost:8080/api/get-all-competenze')
        .then(response => response.json())
        .then(data => setChips(data))
        .catch(error => console.error('Error:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChipClick = (chip) => {
    if (!selectedChips.includes(chip)) {
      const newSelectedChips = [...selectedChips, chip];
      setSelectedChips(newSelectedChips);
      if (newSelectedChips.length < minSelectedChips) {
        setMinSelectedChips(minSelectedChips - newSelectedChips.length);
      } else {
        setMinSelectedChips(0);
      }
    }
  };

  const handleChipDelete = (chipToDelete) => {
    setSelectedChips(selectedChips.filter((chip) => chip !== chipToDelete));
    setMinSelectedChips(minSelectedChips + 1);
  };

  const filteredChips = chips.filter((chip) =>
      chip.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedFilteredChips = selectedChips.filter((chip) =>
      chip.descrizione.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const unselectedFilteredChips = filteredChips.filter(
      (chip) => !selectedChips.includes(chip),
  );

  return (
    <Components.chipsBox>
      <p>Seleziona almeno 3 competenze</p>
      <Components.Input
        onChange={handleSearchChange}
        style={{
          marginLeft: "200px",
          marginRight: "200px",
          marginBottom: "25px",
        }}
      />
      <Box style={{ padding: "50px", paddingTop: "0px" }}>
        {selectedFilteredChips.map((chip) => (
            <Chip
                key={chip.id} // Assuming each chip has an id
                label={chip.descrizione}
                onDelete={() => handleChipDelete(chip)}
                style={{
                  margin: "4px",
                  backgroundColor: "#4070f4",
                  color: "white",
                }}
            />
        ))}
        {unselectedFilteredChips.map((chip) => (
            <Chip
                key={chip.id} // Assuming each chip has an id
                label={chip.descrizione}
                onClick={() => handleChipClick(chip)}
                style={{ margin: "4px" }}
                clickable
            />
        ))}
      </Box>
    </Components.chipsBox>
  );
};

export default ChipSelector;
