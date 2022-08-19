import { useEffect, useRef, useState } from "react";

import keys from "../../config/keys";

const Keyboard = ({ isDeleting, pressed, speed = 100 }) => {
    const [ press, setPress ] = useState(false);
    const pressInterval = useRef(speed);
    
    const isPressed = () => {
        if(isDeleting) return "backspace";
        return pressed.toLowerCase()
    }

    const isShift = () => {
        if(isDeleting || pressed === " ") return false;
        if(pressed.toUpperCase() === pressed ) return "lshift";
    }

    useEffect(() => {
        if(pressed) setPress(true);

        pressInterval.current = setInterval(() => {
            setPress(false);      
        }, speed);
    
        return () => {
          clearInterval(pressInterval.current);
        }
    }, [pressed, speed]);

    return (
        <div className="grid grid-cols-qwerty-responsive md:grid-cols-qwerty grid-rows-qwerty-responsive md:grid-rows-qwerty gap-y-[0.75vw] md:gap-y-1">
            {
                keys.map((key, index) => <div key={ index } className={`mr-1 rounded-sm transition-all ${ (isPressed() === key.key || isShift() === key.key ) && press ? 'bg-primary  scale-95' : 'bg-secondary' } ${key.span}`}></div>)
            }
        </div>
    )
}

export default Keyboard;