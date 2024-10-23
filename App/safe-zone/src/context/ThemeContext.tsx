import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Definir el tipo del contexto
interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

// Crear el contexto con un valor por defecto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Crear un proveedor de contexto
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('light'); // Cambia 'light' por tu valor por defecto
    // useEffect para leer el tema guardado en localStorage cuando el componente se monte
    useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
        setTheme(savedTheme); // Actualizar el tema si hay un valor guardado
        }
    }, []); // Solo se ejecuta una vez, al montar el componente
    document.body.setAttribute('data-theme', theme);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
};

// Hook para usar el contexto
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme debe ser usado dentro de ThemeProvider');
    }
    return context;
};
