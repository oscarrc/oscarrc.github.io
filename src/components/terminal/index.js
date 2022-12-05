import { useCallback, useEffect, useRef, useState } from 'react';

import commands from './commands';

const Terminal = ({ isOpen, setOpen, toggleTheme }) => {
    const inputRef = useRef(null);
    const isInitialzed = useRef(false);
    const termRef = useRef(null);
    const [ history, setHistory ] = useState([]);
    const [ lines, setLines ] = useState([]);

    const addLines = (lines) => {
        lines.forEach((line, index) => {
            setTimeout(() => {
                setLines( l => [...l, line])
                termRef?.current && termRef.current.scrollBy({top: termRef.current.scrollHeight, behavior: "smooth"});
            }, 100 * index);
        });
    }

    const runCommand = useCallback((command) => { 
        inputRef.current.value = "";
        
        setHistory(h => [...h, command]);
        addLines([{ text: command, prefix: ">", classes:"text-success mt-2" }]);

        const [ c, option ] = command.split(' ');

        switch(c){
            case "exit":
                setOpen(false);
                break;
            case "clear":
                setLines([]);
                break;
            case "history":
                let h = [];
                history.forEach( (e,i) => h.push({text: <>{i}. {e}</>}));
                addLines(h);
                break;
            case "theme":
                const themes = ["black", "white", "cyberpunk"];
                if(!themes.includes(option)){
                    option !== '-h' && addLines([{ text: `Unrecognized theme ${option}`}]);
                    addLines([
                        { text: 'Usage: theme <theme_name>'},
                        { text: `Valid themes are ${themes.join(', ')}`}
                    ])
                }
                else {
                    toggleTheme(option);
                    addLines([{ text: `Theme ${option} set`}])
                }
                break;
            default:
                addLines([{ text: command, prefix: ">", classes:"text-success mt-2" }]);                
                addLines(commands(command));        
                break;
        }
    }, [setOpen, history, toggleTheme])

    useEffect(() => {        
        const handleEnter = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
              event.preventDefault();            
              runCommand(inputRef.current.value);
            }
        };

        isOpen && inputRef.current.focus();
        isOpen ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden');
        isOpen ? document.addEventListener("keydown", handleEnter) : document.removeEventListener("keydown", handleEnter);
        
        if(isOpen && !isInitialzed.current){ 
            runCommand("welcome");
            isInitialzed.current = true;
        }

        return () => document.removeEventListener("keydown", handleEnter);
    }, [isOpen, runCommand]);
    
    return (
        <div ref={termRef} onClick={ () => inputRef.current.focus() } className={`mockup-code overflow-y-scroll fixed mx-4 sm:mx-16 my-16 transition-all inset-0 duration-250 ease-in-out origin-bottom-right ${isOpen ? 'scale-1 translate-y-0 translate-x-0' : 'scale-0 translate-y-8 translate-x-8'} shadow-lg`}>
            {
                lines.map( (line, index) => 
                    <pre className={ line.classes } key={index} data-prefix={line.prefix || ""}>
                        <code className="inline-block whitespace-normal	max-w-full break-all pr-6">{ line.text }</code>
                    </pre>
                )
            }
            <pre className="mt-4 mb-2" data-prefix="$">
                <code className="inline-block whitespace-normal	max-w-full break-all pr-6">
                    <input aria-label="command prompt" ref={ inputRef } className="input active:outline-transparent focus:outline-transparent bg-transparent border-none p-0 h-6 rounded-none" type="text" />
                </code>
            </pre>
        </div>
    )
}

export default Terminal;