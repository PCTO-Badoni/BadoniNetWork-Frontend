import React from "react";
import ChipSelector from "./ChipSelector";

const Step4 = React.memo(
  ({
    minSelectedChips,
    setMinSelectedChips,
    articolazione,
    setArticolazione,
    selectedChips,
    setSelectedChips,
  }) => {
    return (
      <div style={{ paddingTop: "4em" }}>
        <ChipSelector
          minSelectedChips={minSelectedChips}
          setMinSelectedChips={setMinSelectedChips}
          articolazione={articolazione}
          setArticolazione={setArticolazione}
          selectedChips={selectedChips}
          setSelectedChips={setSelectedChips}
        />
      </div>
    );
  },
);

export default Step4;
