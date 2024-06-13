// src/ChipSelector.js
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import * as Components from "../../RegisterComponents";
import { Select } from "../../RegisterComponents";

const ChipSelector = ({
  minSelectedChips,
  setMinSelectedChips,
  articolazione,
  setArticolazione,
  selectedChips,
  setSelectedChips,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chips, setChips] = useState([]); // Add this line
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/get-all-competenze")
      .then((response) => response.json())
      .then((data) => setChips(data))
      .catch((error) => console.error("Error:", error));

    fetch("http://localhost:8080/api/get-all-articolazioni")
      .then((response) => response.json())
      .then((data) => {
        // 4. Parse the response data and update the options state with the data.
        setOptions(data);
      })
      .catch((error) => console.error("Error:", error));
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>Seleziona almeno 3 competenze</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "200px",
            marginRight: "200px",
            marginBottom: "25px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <label htmlFor="articolazione">Articolazione</label>
            <Select
              name="articolazione"
              id="articolazione"
              defaultValue={articolazione ? articolazione : ""}
              style={{ width: "90%" }}
              onChange={(e) => setArticolazione(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                Seleziona
              </option>
              {
                // Add the map function call here
                options.map((option) => (
                  <option key={option.id} value={option.descrizione}>
                    {option.descrizione}
                  </option>
                ))
              }
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <label htmlFor="cerca">Cerca</label>
            <Components.Input onChange={handleSearchChange} />
          </div>
        </div>
      </div>
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
