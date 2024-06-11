import React from "react";
import ProfilePicUploader from "./ProfilePicUploader";

const Step3 = React.memo((stepTitles) => {
  return (
    <>
      <ProfilePicUploader title={stepTitles[2]} />
    </>
  );
});

export default Step3;
