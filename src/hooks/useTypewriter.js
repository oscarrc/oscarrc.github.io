import { useEffect, useRef, useState } from "react";

const BACKWARD = "backward";
const FORWARD = "forward";

const useTypewriter = (strings, speed, delay, loop = false) => {
    const [index, setIndex] = useState(0);
    const [current, setCurrent] = useState(strings[index].split(''));
    const [isStopped, setIsStopped] = useState(false);

    const direction = useRef('BACKWARD');
	const typingInterval = useRef();
	const letterIndex = useRef();

    const stop = () => {
        clearInterval(typingInterval.current);
        setIsStopped(true);
    }

    useEffect(() => {
        if (isStopped) return;

        let pause = 0;

        const backspace = () => {
            if (letterIndex.current === 0) {
                const isLast = index === strings.length - 1;
                setIndex(!isLast ? index + 1 : 0);
                direction.current = FORWARD;
                return;
              }
            
              const segment = current.slice(0, current.length - 1);
              setCurrent(segment);
              letterIndex.current = current.length - 1;
        }

        const type = () => {
            if (letterIndex.current >= strings[index].length) {
                if(!loop) return stop();
                
                direction.current = BACKWARD;
                pause = delay;
                return;
            }
            const segment = strings[index].split('');
            
            setCurrent(current.concat(segment[letterIndex.current]));
            letterIndex.current = letterIndex.current + 1;
        }

        typingInterval.current = setInterval(() => {
            pause > 0 ? pause-- : (direction.current === FORWARD ? type() : backspace());            
        }, speed);
    
        return () => {
          clearInterval(typingInterval.current);
        }
      }, [current, index, speed, strings, delay, isStopped, loop]);

    return {
        text: (
          <>
            {current.length ? current.join('') : ''}
            <span className="ml-1 animate-blink">_</span>
          </>
        ),
        start: () => setIsStopped(false),
        stop,
    };
}

export default useTypewriter;