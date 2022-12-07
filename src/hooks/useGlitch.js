const { useState, useEffect } = require("react")

const useGlitch = ({ delay }) => {
    const [glitched, setGlitched] = useState(false);
    
    useEffect(()=> { 
        setInterval(() => setGlitched(Math.random() > 0.5), delay);
    }, [delay])

    const glitchText = (text, className) => {
        return ( 
            <span data-text={ text } className={`relative ${glitched ? 'glitch' : ''} ${className ? className :  ''}`}>{text}</span>
        )
    }

    return {
        glitchText
    }
}

export default useGlitch;