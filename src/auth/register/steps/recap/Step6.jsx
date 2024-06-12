import React from "react";
import { PhotoProvider, usePhoto } from "../profilePicture/PhotoContext";

const Step6 = React.memo(
  ({ nome, cognome, pronomi, deadlineDate, articolazione, selectedChips }) => {
    // Use the usePhoto hook to get the photo state
    const { photo } = usePhoto();

    return (
      <>
        {/* Other components and elements */}
        {photo && <img src={photo} alt="Profile" />}
        {/* Other components and elements */}
      </>
    );
  },
);

export default Step6;
