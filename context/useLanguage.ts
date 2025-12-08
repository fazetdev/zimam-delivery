'use client';
import { createContext, useContext } from 'react';

// Create a context for language state
const LanguageContext = createContext({ language: 'en' });

// Export a hook to consume the context
export const useLanguage = () => useContext(LanguageContext);

// Optional: export the context itself for a provider
export { LanguageContext };
