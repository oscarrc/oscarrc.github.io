import { useEffect, useRef, useState } from 'react';

const welcome = [
    {   
        prefix: ">",
        text: <>{ new Intl.DateTimeFormat(navigator.languages && navigator.languages.length  ? navigator.languages[0] : navigator.language, { dateStyle: 'medium', timeStyle: 'medium' }).format(Date.now()) }</>,
        classes: "text-success"
    },
    { text: <>Hi, my name is <strong>Oscar</strong></> },
    { text: "And I do web development" },
    { text: "---------------------------------------" },
    { text: <>Type <i>help</i> for available commands</> }
]

const Terminal = ({ isOpen }) => {
    const inputRef = useRef(null);
    const isInitialzed = useRef(false);
    const [ lines, setLines ] = useState([]);

    const addLines = (lines) => {
        lines.forEach((line, index) => {
            setTimeout(() => {
                setLines( l => [...l, line])
            }, 100 * index);
        });
    }

    useEffect(() => {
        isOpen && inputRef.current.focus();
        isOpen ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden');
        if(isOpen && !isInitialzed.current){ 
            addLines(welcome);
            isInitialzed.current = true;
        }
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
        <div onClick={ () => inputRef.current.focus() } className={`mockup-code fixed mx-4 sm:mx-16 my-16 transition-all inset-0 duration-250 ease-in-out origin-bottom-right ${isOpen ? 'scale-1 translate-y-0 translate-x-0' : 'scale-0 translate-y-8 translate-x-8'} shadow-lg`}>
            {
                lines.map( (line, index) => <pre className={ line.classes } key={index} data-prefix={line.prefix || ""}><code>{ line.text }</code></pre> )
            }
            <pre className="mt-4" data-prefix="$">
                <code>
                    <input aria-label="command prompt" ref={ inputRef } className="input active:outline-transparent focus:outline-transparent bg-transparent border-none p-0 h-6 rounded-none" type="text" />
                </code>
            </pre>
        </div>
    )
}

export default Terminal;