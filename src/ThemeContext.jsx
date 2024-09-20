// ThemeContext.jsx
import React, { createContext, useState, useContext } from "react";

// Crea il contesto del tema
const ThemeContext = createContext();

// Provider che avvolgerà l'app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark"); // Stato iniziale

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    console.log(`Tema cambiato a: ${theme}`);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizzato per usare il contesto del tema
export const useTheme = () => useContext(ThemeContext);
