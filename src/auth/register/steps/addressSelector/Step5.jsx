import React, { useState, useRef, useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";
import { AddressSelector } from "../../RegisterComponents";
import Select from "react-select";

const AutocompleteSearch = ({
  onSelect,
  selectedAddress,
  setSelectedAddress,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const VITE_TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API_KEY;

  const options = suggestions.map((suggestion) => ({
    value: suggestion.id, // or any unique identifier
    label: suggestion.address.freeformAddress,
  }));

  const fetchSuggestions = async (inputValue) => {
    if (inputValue.length > 2) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.tomtom.com/search/2/search/${inputValue}.json`,
          {
            params: {
              key: VITE_TOMTOM_API_KEY,
              typeahead: true,
              limit: 5,
            },
          },
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (inputValue) => {
    setQuery(inputValue);
    fetchSuggestions(inputValue);
  };

  const handleSelect = (selectedOption) => {
    setSelectedAddress(selectedOption); // Update the selected option
    const selectedSuggestion = suggestions.find(
      (suggestion) => suggestion.id === selectedOption.value,
    );
    if (selectedSuggestion) {
      onSelect(selectedSuggestion);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        height: "auto",
        paddingBottom: "2em",
      }}
    >
      <label htmlFor="select">Indirizzo</label>
      <Select
        id="select"
        className="basic-single"
        classNamePrefix="select"
        defaultValue={null}
        isLoading={isLoading}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name="suggestions"
        options={options}
        value={selectedAddress} // Use the selected option here
        onInputChange={handleInputChange}
        onChange={handleSelect}
        placeholder="es: Via Rivolta 10, 23900 Lecco"
        theme={(theme) => ({
          ...theme,
          backgroundColor: "#ffffff",
          border: "3px solid #eee",
          paddingBottom: "1rem",
          width: "150em",
          borderRadius: "15px",
          fontFamily: "Montserrat sans-serif",
          fontSize: "1rem",
        })}
      />
    </div>
  );
};

const Map = ({ position }) => {
  const mapContainerRef = useRef(null);
  const VITE_TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API_KEY;

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const map = tt.map({
      key: VITE_TOMTOM_API_KEY,
      container: mapContainerRef.current,
      center: position,
      zoom: 17,
    });

    return () => {
      map.remove();
    };
  }, [position]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%", borderRadius: "15px" }}
    ></div>
  );
};

const Step5 = ({ selectedAddress, setSelectedAddress }) => {
  const [position, setPosition] = useState([
    9.401288797167298, 45.852706081676224,
  ]);

  const handleSelect = (suggestion) => {
    const { position } = suggestion;
    setPosition([position.lon, position.lat]);
  };

  return (
    <AddressSelector>
      <AutocompleteSearch
        onSelect={handleSelect}
        onSubmit={handleSelect}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <Map position={position} />
    </AddressSelector>
  );
};

export default Step5;
