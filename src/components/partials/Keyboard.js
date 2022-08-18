const keys = [
    {
        key: '~',
        span: 'col-span-4'
    },
    { 
        key: "1",
        span: "col-span-4"
    },
    { 
        key: "2",
        span: "col-span-4"
    },
    { 
        key: "3",
        span: "col-span-4"
    },
    { 
        key: "4",
        span: "col-span-4"
    },
    { 
        key: "5",
        span: "col-span-4"
    },
    { 
        key: "6",
        span: "col-span-4"
    },
    { 
        key: "7",
        span: "col-span-4"
    },
    { 
        key: "8",
        span: "col-span-4"
    },
    { 
        key: "9",
        span: "col-span-4"
    },
    { 
        key: "0",
        span: "col-span-4"
    },
    { 
        key: "-",
        span: "col-span-4"
    },
    { 
        key: "=",
        span: "col-span-4"
    },
    { 
        key: "backspace",
        span: "col-span-10"
    },
    { 
        key: "tab",
        span: "col-span-7"
    },
    { 
        key: "q",
        span: "col-span-4"
    },
    { 
        key: "w",
        span: "col-span-4"
    },
    { 
        key: "e",
        span: "col-span-4"
    },
    { 
        key: "r",
        span: "col-span-4"
    },
    { 
        key: "t",
        span: "col-span-4"
    },
    { 
        key: "y",
        span: "col-span-4"
    },
    { 
        key: "u",
        span: "col-span-4"
    },
    { 
        key: "i",
        span: "col-span-4"
    },
    { 
        key: "o",
        span: "col-span-4"
    },
    { 
        key: "p",
        span: "col-span-4"
    },
    { 
        key: "{",
        span: "col-span-4"
    },
    { 
        key: "}",
        span: "col-span-4"
    },
    { 
        key: "|",
        span: "col-span-7"
    },
    { 
        key: "caps",
        span: "col-span-9"
    },
    { 
        key: "a",
        span: "col-span-4"
    },
    { 
        key: "s",
        span: "col-span-4"
    },
    { 
        key: "d",
        span: "col-span-4"
    },
    { 
        key: "f",
        span: "col-span-4"
    },
    { 
        key: "g",
        span: "col-span-4"
    },
    { 
        key: "h",
        span: "col-span-4"
    },
    { 
        key: "j",
        span: "col-span-4"
    },
    { 
        key: "k",
        span: "col-span-4"
    },
    { 
        key: "l",
        span: "col-span-4"
    },
    { 
        key: ";",
        span: "col-span-4"
    },
    { 
        key: "'",
        span: "col-span-4"
    },
    { 
        key: "enter",
        span: "col-span-9"
    },
    { 
        key: "lshift",
        span: "col-span-11"
    },
    { 
        key: "z",
        span: "col-span-4"
    },
    { 
        key: "x",
        span: "col-span-4"
    },
    { 
        key: "c",
        span: "col-span-4"
    },
    { 
        key: "v",
        span: "col-span-4"
    },
    { 
        key: "b",
        span: "col-span-4"
    },
    { 
        key: "n",
        span: "col-span-4"
    },
    { 
        key: "m",
        span: "col-span-4"
    },
    { 
        key: ",",
        span: "col-span-4"
    },
    { 
        key: ".",
        span: "col-span-4"
    },
    { 
        key: "/",
        span: "col-span-4"
    },
    { 
        key: "rshift",
        span: "col-span-11"
    },
    { 
        key: "lctrl",
        span: "col-span-6"
    },
    { 
        key: "lsuper",
        span: "col-span-6"
    },
    { 
        key: "alt",
        span: "col-span-6"
    },
    { 
        key: "space",
        span: "col-[span_20]"
    },
    { 
        key: "altgr",
        span: "col-span-6"
    },
    { 
        key: "rsuper",
        span: "col-span-6"
    },
    { 
        key: "meta",
        span: "col-span-6"
    },
    { 
        key: "rctrl",
        span: "col-span-6"
    },
]

const Keyboard = ({ pressed }) => {
    return (
        <div className="grid grid-cols-qwerty-responsive md:grid-cols-qwerty grid-rows-qwerty-responsive md:grid-rows-qwerty gap-y-[0.75vw] md:gap-y-1">
            {
                keys.map((key, index) => <div key={ index } className={`mr-1 rounded-sm transition-all ${ pressed.toLowerCase() === key.key ? 'bg-primary' : 'bg-secondary' } ${key.span}`}></div>)
            }
        </div>
    )
}

export default Keyboard;