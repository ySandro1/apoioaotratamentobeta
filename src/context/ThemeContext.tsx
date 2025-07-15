
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      // Verifica se há um tema salvo no localStorage
      const savedTheme = localStorage.getItem("theme") as Theme;
      // Verifica preferência do sistema
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      // Retorna o tema salvo ou a preferência do sistema
      return savedTheme || (prefersDark ? "dark" : "light");
    } catch (error) {
      console.warn("Erro ao acessar localStorage para tema:", error);
      return "light";
    }
  });

  useEffect(() => {
    try {
      // Salva o tema no localStorage
      localStorage.setItem("theme", theme);
      
      // Aplica a classe ao documento HTML
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } catch (error) {
      console.warn("Erro ao salvar tema no localStorage:", error);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
