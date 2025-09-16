import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ThemeContext = React.createContext({ theme: "light", setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("massist-theme", "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => React.useContext(ThemeContext);