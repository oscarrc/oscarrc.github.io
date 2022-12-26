import { useCallback, useEffect, useRef, useState } from 'react';

import { useQueryClient } from 'react-query';

const Terminal = ({ isOpen, setOpen, toggleTheme }) => {
    const queryClient = useQueryClient();
    const inputRef = useRef(null);
    const isInitialzed = useRef(false);
    const termRef = useRef(null);
    const [ history, setHistory ] = useState([]);
    const [ lines, setLines ] = useState([]);

    const addLines = (lines) => {
        lines.forEach((line, index) => {
            setTimeout(() => {
                setLines( l => [...l, line])
            }, 100 * index);
        });
    }

    const runCommand = useCallback(async (input) => { 
        const parsed = input.split(" ");
        const cmd = parsed[0];
        const opt = parsed.slice(1, input.length);
        let action;
        let lines;

        inputRef.current.value = "";
        
        if(input !== "error"){
            setHistory(h => [...h, input]);
            !["clear", "exit"].includes(input) && addLines([{ text: input, prefix: ">", classes:"text-success mt-2" }]);
        }

        switch(cmd){
            case "exit":
                if(opt.length === 1 && opt.includes("-h")) addLines([{ text: `Exits the terminal`}])
                else if(opt.length > 1) addLines([{ text: `Unrecognized opt ${opt.join(' ')}`}])
                else setOpen(false);
                break;
            case "clear":
                if(opt.length === 1 && opt.includes("-h")) addLines([{ text: `Clears the screen`}])
                else if(opt.length) addLines([{ text: `Unrecognized opt ${opt}`}])
                else setLines([]);
                break;
            case "history":
                if(opt.length === 1 && opt.includes("-h")) addLines([
                    { text: `Shows command history`},
                    { text: `Usage: history <number> - runs command in given possition`}
                ])
                else if(opt.length > 1 || (opt[0] && isNaN(parseInt(opt[0])))) addLines([{ text: `Unrecognized opt ${opt}`}])
                else if(opt.length === 1 && !isNaN(parseInt(opt[0]))) runCommand(history[parseInt(opt)])
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
            case "ls":
            case "post":
            case "project":
            case "about":
                action = (await import(`./${cmd}`)).default;
                lines = await action(queryClient, opt);
                addLines(lines);
                break;
            default:
                try { 
                    action = await import(`./${cmd}`);
                    addLines(action.default);
                }
                catch { runCommand("error") }
                break;
        }
    }, [setOpen, history, queryClient, toggleTheme])

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

    useEffect(() => {        
        termRef?.current && termRef.current.scrollBy({top: termRef.current.scrollHeight, behavior: "smooth"});
    }, [lines])

    return (
        <div onClick={ () => inputRef.current.focus() } className={`z-30 mockup-code fixed mx-4 sm:mx-16 my-16 pt-12 transition-all inset-0 duration-250 ease-in-out origin-bottom-right ${isOpen ? 'scale-1 translate-y-0 translate-x-0' : 'scale-0 translate-y-8 translate-x-8'} shadow-lg`}>
            <div ref={termRef} className="overflow-y-scroll overflow-x-hidden h-full w-full">
                {
                    lines.map( (line, index) => 
                        <pre className={ line.classes } key={index} data-prefix={line.prefix || ""}>
                            <code className="inline-block whitespace-normal	max-w-full mr-8 break-words">{ line.text }</code>
                        </pre>
                    )
                }
                <pre className="mt-4 mb-2" data-prefix="$">
                    <code className="inline-block whitespace-normal	max-w-full mr-8 break-words">
                        <input aria-label="command prompt" ref={ inputRef } className="input active:outline-transparent focus:outline-transparent bg-transparent border-none p-0 h-6 rounded-none" type="text" />
                    </code>
                </pre>
            </div>
        </div>
    )
}

export default Terminal;