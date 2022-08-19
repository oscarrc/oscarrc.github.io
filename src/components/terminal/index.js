import { useEffect, useRef } from 'react';

const Terminal = ({ isOpen }) => {
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
        <div onClick={ () => inputRef.current.focus() } className={`mockup-code fixed mx-4 sm:mx-16 my-16 transition-all inset-0 duration-250 ease-in-out origin-bottom-right ${isOpen ? 'scale-1 translate-y-0 translate-x-0' : 'scale-0 translate-y-8 translate-x-8'} shadow-lg`}>
            <pre data-prefix="$"><code>npm i daisyui</code></pre> 
            <pre data-prefix=">" className="text-warning"><code>installing...</code></pre> 
            <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
            <pre data-prefix="$">
                <code>
                    <input ref={ inputRef } className="input active:outline-transparent focus:outline-transparent bg-transparent border-none p-0 h-6 rounded-none" type="text" />
                </code>
            </pre>
        </div>
    )
}

export default Terminal;