const { useRef, useEffect} = require("react");

const useGlitch = (delay) => {
    const glitchRef = useRef(null);
    const glitchTimer = useRef(null);

    useEffect(() => {
        glitchTimer.current = setInterval(() => {
            Math.random() > 0.5 ? glitchRef.current.classList.add('glitch') : glitchRef.current.classList.remove('glitch')
        }, Math.floor(Math.random() * (delay - ( delay/2 ) + 1) + delay/2 ))

        return () => clearInterval(glitchTimer.current);
    }, [delay])
    
    const glitchText = (text, className) => {
        return ( 
            <span ref={ glitchRef } data-text={ text } className={`relative ${className ? className :  ''}`}>{text}</span>
        )
    }

    return {
        glitchText
    }
}

export default useGlitch;