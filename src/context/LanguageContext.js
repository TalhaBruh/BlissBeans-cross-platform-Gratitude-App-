// LanguageContext.js
import React, { createContext, useState } from "react";

// Create the context
export const LanguageContext = createContext();

// Create the provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("English");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
