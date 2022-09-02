import { createContext, useContext, useState } from "react";

const TerminalContext = createContext();

const TerminalProvider = ({children, ref}) => {
    const [ lines, setLines ] = useState([]);
    const [ history, setHistory ] = useState([]);

    return (
      <TerminalContext.Provider value={{ lines, setLines }}>
        {children}
      </TerminalContext.Provider>
    )
}

const useTerminal = () => {
  const context = useContext(TerminalContext);
  if(context === undefined) throw new Error("useCurrency must be used within a TerminalProvider")
  return context;
}

export { TerminalProvider, useTerminal };