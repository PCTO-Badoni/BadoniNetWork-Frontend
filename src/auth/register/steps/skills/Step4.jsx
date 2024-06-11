import React from "react";
import ChipSelector from "./ChipSelector";

const Step4 = React.memo(
  ({
    minSelectedChips,
    setMinSelectedChips,
    setArticolazione,
    selectedChips,
    setSelectedChips,
  }) => {
    return (
      <ChipSelector
        minSelectedChips={minSelectedChips}
        setMinSelectedChips={setMinSelectedChips}
        setArticolazione={setArticolazione}
        selectedChips={selectedChips}
        setSelectedChips={setSelectedChips}
      />
    );
  },
);

export default Step4;
