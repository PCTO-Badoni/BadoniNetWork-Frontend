export let theme = "light";

export const setCSSVariables = () => {
  const root = document.documentElement;

  const colors = {
    lightFirstColor: theme === "light" ? "#f2f2f2" : "#2f2f2f",
    firstColor: theme === "light" ? "#fff" : "#3f3f3f",
    secondColor: theme === "light" ? "#f2f2f2" : "#242424",
    secondColorDarker: theme === "light" ? "#e6e6e6" : "#4f4f4f",
    thirdColor: "#79a5ed", // Costante
    fourthColor: theme === "light" ? "#f0f0f0" : "",
    fifthColor: theme === "light" ? "#8a8a8a" : "#f1f1f1",
    borderColor: theme === "light" ? "#ccc" : "#282828",
    contrastColor: theme === "light" ? "black" : "#f2f2f2",
    searchBarColor: theme === "light" ? "#f2f2f2" : "#383838",
    shadowColor: theme === "light" ? "#c2c2c2" : "#0000001a",
  };

  // Imposta le variabili CSS dinamicamente
  for (const [key, value] of Object.entries(colors)) {
    root.style.setProperty(`--${key}`, value);
  }
};

export const switchTheme = () => {
  theme = theme === "light" ? "dark" : "light";
  setCSSVariables(); // Applica i nuovi colori del tema
};
