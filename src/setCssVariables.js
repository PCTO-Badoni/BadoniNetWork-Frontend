import { useColors } from "./constants/colors";

const { firstColor, secondColor, thirdColor } = useColors();

const setCssVariables = () => {
  document.documentElement.style.setProperty("--first-color", firstColor);
  document.documentElement.style.setProperty("--second-color", secondColor);
  document.documentElement.style.setProperty("--third-color", thirdColor);
};

export default setCssVariables;
