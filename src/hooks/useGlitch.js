const { useState, useRef } = require("react")

const useGlitch = ({text, className}) => {
    const [glitched, setGlitched] = useState(false);
    
    const glitchRef = useRef( setInterval(() => {
        const isGlitched = Math.random() > 0.5;
        const timeout = Math.floor(Math.random() * (5 + 1)) * 1000;

        setGlitched(isGlitched);
        setTimeout( () => setGlitched(false),  timeout)
    }), 1000)

    return {
        glitch: <span data-text={ text } className={`relative ${glitched && '.glitch'} ${className}`}>{text}</span>
    }
}

export default useGlitch;