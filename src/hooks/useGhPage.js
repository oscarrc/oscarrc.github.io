import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'

const GHPageContext = createContext();

const GHPageProvider = ({ children }) => {
    
    return (
        <GHPageContext.Provider 
            value={{
                
            }}
        >
            { children }
        </ GHPageContext.Provider>
    )
}

const useGHPage = () => {
    const context = useContext(GHPageContext);
    if(context === undefined) throw new Error("useGHPage must be used within a GHPageProvider")
    return context;
}

export { GHPageProvider, useGHPage };