import { createContext, useContext, useState } from 'react';

const FontContext = createContext({
    czcionka: 'small',
    setCzcionka: () => {}
});

export function FontProvider({ children }) {
    const [czcionka, setCzcionka] = useState('small');

    return (
        <FontContext.Provider value={{ czcionka, setCzcionka }}>
            {children}
        </FontContext.Provider>
    );
}

export function useFont() {
    return useContext(FontContext);
}
