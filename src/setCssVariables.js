import { firstColor, secondColor, thirdColor } from "./constants/colors";

const setCssVariables = () => {
  document.documentElement.style.setProperty("--first-color", firstColor);
  document.documentElement.style.setProperty("--second-color", secondColor);
  document.documentElement.style.setProperty("--third-color", thirdColor);
};

export default setCssVariables;
