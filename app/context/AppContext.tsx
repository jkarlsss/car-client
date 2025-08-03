import React, { createContext, useContext } from "react";

interface AppContextProps {
    user: User | null;
    logOut: () => void;
}

export const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider = ({ children } : { children: React.ReactNode }) => {

    const value = {
        user: null,
        logOut: () => {}
    };

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
    
}

export const useAppProvider = () => {
    return useContext(AppContext);
}