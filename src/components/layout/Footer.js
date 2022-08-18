import { BsFillTerminalFill, BsTerminal } from 'react-icons/bs'

import social from "../../config/social";

const Footer = ({ terminal, setTerminal }) => {
    return (
        <footer>
            <div className="flex flex-col items-center gap-4 md:w-8 fixed bottom-4 left-2">
                <div className="w-full md:h-32 m-0 divider md:divider-horizontal self-center text-xs">
                    <span className="md:rotate-180 md:writing-mode-vertical">SOCIAL</span>   
                </div>
                <ul className="flex md:flex-col justify-center gap-4">
                    {
                        Object.keys(social).map(key =>
                            <li key={key} className="tooltip md:tooltip-right" data-tip={social[key].label}>
                                <a href={social[key].url} target="_blank" rel="noopener noreferrer">{ social[key].icon }</a>
                            </li>
                        )
                    }
                </ul>
            </div>            
            <div className="fixed bottom-2 right-4">                
                <button onClick={() => setTerminal(!terminal) } className="tooltip tooltip-left" data-tip={`${terminal ? 'Close' : 'Open'} terminal`}>        
                    <label className={`swap ${!terminal && 'hover:swap-active'} ${terminal && 'swap-active'}`}> 
                        <BsFillTerminalFill className="swap-on h-6 w-6" />
                        <BsTerminal className="swap-off h-6 w-6" />
                    </label>        
                </button>
            </div>
        </footer>
    )
}

export default Footer;