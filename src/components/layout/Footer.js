import { BsFillTerminalFill, BsTerminal } from 'react-icons/bs'

import social from "../../config/social";

const Footer = ({ terminal, setTerminal }) => {
    return (
        <footer>
            <div className="flex flex-col items-center gap-4 md:w-8 fixed bottom-4 left-4">
                <div className="w-full h-32 m-0 divider divider-horizontal self-center text-xs hidden md:flex">
                    <span className="rotate-180 writing-mode-vertical">SOCIAL</span>   
                </div>
                <ul className="flex md:flex-col justify-center gap-4">
                    {
                        social.map( (service, index) =>
                            <li key={index} className="tooltip md:tooltip-right" data-tip={service.label}>
                                <a href={service.url} target="_blank" rel="noopener noreferrer">{ service.icon }</a>
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