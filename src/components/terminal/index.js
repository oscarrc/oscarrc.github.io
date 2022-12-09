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

        const [ cmd, opt ] = command.split(' ');

        switch(cmd){
            case "exit":
                if(opt && opt === "-h") addLines([{ text: `Exits the terminal`}])
                else if(opt && opt !== "-h") addLines([{ text: `Unrecognized opt ${opt}`}])
                else setOpen(false);
                break;
            case "clear":
                if(opt && opt === "-h") addLines([{ text: `Clears the screen`}])
                else if(opt && opt !== "-h") addLines([{ text: `Unrecognized opt ${opt}`}])
                else setLines([]);
                break;
            case "history":
                if(opt && opt === "-h") addLines([
                    { text: `Shows command history`},
                    { text: `Usage: history <number> - runs command in given possition`}
                ])
                else if(opt && opt !== "-h" && isNaN(parseInt(opt))) addLines([{ text: `Unrecognized opt ${opt}`}])
                else if(opt && !isNaN(parseInt(opt))) runCommand(history[parseInt(opt)])
                else {
                    let h = [];
                    history.forEach( (e,i) => h.push({text: <>{i}. {e}</>}));
                    addLines(h);
                }
                break;
            case "theme":
                const themes = ["black", "white", "cyberpunk"];
                if(!themes.includes(opt)){
                    opt && opt !== '-h' && addLines([{ text: `Unrecognized theme ${opt}`}]);
                    addLines([
                        { text: 'Usage: theme <theme_name>'},
                        { text: `Valid themes are ${themes.join(', ')}`}
                    ])
                }
                else {
                    toggleTheme(opt);
                    addLines([{ text: `Theme ${opt} set`}])
                }
                break;
            default:         
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
        <div ref={termRef} onClick={ () => inputRef.current.focus() } className={`z-30 mockup-code fixed mx-4 sm:mx-16 my-16 pt-12 transition-all inset-0 duration-250 ease-in-out origin-bottom-right ${isOpen ? 'scale-1 translate-y-0 translate-x-0' : 'scale-0 translate-y-8 translate-x-8'} shadow-lg`}>
            <div className="overflow-y-scroll h-full w-full">
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
        </div>
    )
}

export default Terminal;