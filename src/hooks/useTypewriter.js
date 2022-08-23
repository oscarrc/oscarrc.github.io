import { useEffect, useRef, useState } from "react";

const BACKWARDS = "backwards";
const FORWARD = "forward";

const useTypewriter = (strings, speed=100, delay=20, loop = false) => {
    const [index, setIndex] = useState(0);
    const [current, setCurrent] = useState([]);
    const [isStopped, setIsStopped] = useState(false);

    const direction = useRef(FORWARD);
	const typingInterval = useRef();
	const letterIndex = useRef(0);

    const stop = () => {
        clearInterval(typingInterval.current);
        setIsStopped(true);
    }

    useEffect(() => {
        if (isStopped) return;

        let pause = 0;

        const backspace = () => {
            const isLast = index === strings.length - 1;
              
            if( isLast && !loop ) return stop();

            if (letterIndex.current === 0) {
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
                direction.current = BACKWARDS;
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
        text: current,
        direction: direction.current,
        typewritter: (
          <>
            {current.length ? current.join('') : ''}
            <span className="ml-1 animate-blink">_</span>
          </>
        ),
        start: () => setIsStopped(false),
        stop
    };
}

export default useTypewriter;