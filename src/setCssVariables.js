import { getColors } from "./constants/colors";

const colors = getColors();

const setCssVariables = () => {
  document.documentElement.style.setProperty(
    "--first-color",
    colors.firstColor,
  );
  document.documentElement.style.setProperty(
    "--second-color",
    colors.secondColor,
  );
  document.documentElement.style.setProperty(
    "--third-color",
    colors.thirdColor,
  );
};

export default setCssVariables;
