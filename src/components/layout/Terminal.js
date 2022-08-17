import { useEffect, useRef, useState } from 'react';

import { BsFillTerminalFill } from 'react-icons/bs'

const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
       isOpen && inputRef.current.focus();
    }, [isOpen]);

    useEffect(() => {
        const handleEnter = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            event.preventDefault();
            // callMyFunction();
          }
        };
        document.addEventListener("keydown", handleEnter);
        return () => {
          document.removeEventListener("keydown", handleEnter);
        };
    }, []);
    
    return (
        <div className="fixed bottom-2 right-4">
            <div onClick={ () => inputRef.current.focus() } className={`mockup-code fixed mx-16 my-16 transition-all duration-1000 ${isOpen ? 'inset-0' : 'h-0 w-0'} shadow-lg`}>
                <pre data-prefix="$"><code>npm i daisyui</code></pre> 
                <pre data-prefix=">" className="text-warning"><code>installing...</code></pre> 
                <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
                <pre data-prefix="$">
                    <code>
                        <input ref={ inputRef } className="input active:outline-transparent focus:outline-transparent bg-transparent border-none p-0 h-6 rounded-none" type="text" />
                    </code>
                </pre>
            </div>
            <button onClick={() => setIsOpen(!isOpen) } className="tooltip tooltip-left" data-tip={`${isOpen ? 'Close' : 'Open'} terminal`}>                
                <BsFillTerminalFill className="h-8 w-8" />
            </button>
        </div>
    )
}

export default Terminal;