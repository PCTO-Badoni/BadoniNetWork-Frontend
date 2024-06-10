import React, { useState, useRef, useEffect } from "react";
import tt, { Marker } from "@tomtom-international/web-sdk-maps";
import axios from "axios";
import {
  Input,
  AddressSelector,
  Button,
  MapButton,
} from "../../RegisterComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

const AutocompleteSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.tomtom.com/search/2/search/${value}.json`,
          {
            params: {
              key: "GKKdaSewOQJ1qLgzHcWa1mJxy3z9JzRg",
              typeahead: true,
              limit: 5,
            },
          },
        );
        console.log("Autocomplete Response:", response.data);
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

  const handleSelect = (e) => {
    const selectedSuggestion = suggestions.find(
      (suggestion) => suggestion.address.freeformAddress === e.target.value,
    );
    if (selectedSuggestion) {
      setQuery(selectedSuggestion.address.freeformAddress);
      setSuggestions([]);
      onSelect(selectedSuggestion);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Input
        list="suggestions"
        type="text"
        value={query}
        onChange={handleInputChange}
        onBlur={handleSelect}
        placeholder="Search for an address"
        style={{ marginBottom: "1rem" }}
      />
      <datalist id="suggestions">
        {suggestions.map((suggestion) => (
          <option
            key={suggestion.id}
            value={suggestion.address.freeformAddress}
          >
            {suggestion.address.freeformAddress}
          </option>
        ))}
      </datalist>
      <MapButton type="submit" onClick={handleSelect}>
        <FontAwesomeIcon icon={faMapPin} />
      </MapButton>
    </div>
  );
};

const Map = ({ position }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const map = tt.map({
      key: "GKKdaSewOQJ1qLgzHcWa1mJxy3z9JzRg",
      container: mapContainerRef.current,
      center: position,
      zoom: 17,
    });

    console.log("Marker position:", position); // Add this line

    return () => {
      map.remove();
    };
  }, [position]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

const Step5 = () => {
  const [position, setPosition] = useState([
    9.401288797167298, 45.852706081676224,
  ]);

  const handleSelect = (suggestion) => {
    const { position } = suggestion;
    setPosition([position.lon, position.lat]);
  };

  return (
    <AddressSelector>
      <AutocompleteSearch onSelect={handleSelect} onSubmit={handleSelect} />
      <Map position={position} />
    </AddressSelector>
  );
};

export default Step5;
