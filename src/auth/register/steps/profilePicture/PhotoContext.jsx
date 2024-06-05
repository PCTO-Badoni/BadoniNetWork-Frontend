import React, { createContext, useState, useContext } from 'react';

// Creare un nuovo contesto
const PhotoContext = createContext();

// Creare un provider personalizzato
export function PhotoProvider({ children }) {
    const [photo, setPhoto] = useState(null);

    return (
        <PhotoContext.Provider value={{ photo, setPhoto }}>
            {children}
        </PhotoContext.Provider>
    );
}

// Creare un hook personalizzato per utilizzare il contesto della foto
export function usePhoto() {
    const context = useContext(PhotoContext);
    if (context === undefined) {
        throw new Error('usePhoto must be used within a PhotoProvider');
    }
    return context;
}