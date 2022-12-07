const { useRef, useEffect} = require("react");

const Glitch = ({children, delay, className}) => {
    const glitchRef = useRef(null);
    const glitchTimer = useRef(null);

    useEffect(() => {
        glitchTimer.current = setInterval(() => {
            Math.random() > 0.5 ? glitchRef.current.classList.add('glitch') : glitchRef.current.classList.remove('glitch')
        }, Math.floor(Math.random() * (delay - ( delay/2 ) + 1) + delay/2 ))

        return () => clearInterval(glitchTimer.current);
    }, [delay])
    
    
    return (
        <span ref={ glitchRef } data-text={ children } className={`relative ${className ? className :  ''}`}>{children}</span>
    )
}

export default Glitch;