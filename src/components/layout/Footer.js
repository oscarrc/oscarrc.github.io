import { BsFillTerminalFill, BsTerminal } from 'react-icons/bs'

import social from "../../config/social";

const Footer = ({ terminal, setTerminal }) => {
    return (
        <footer>
            <div className="flex flex-col items-center gap-4 lg:w-8 fixed bottom-4 left-4 z-10">
                <div className="w-full h-32 m-0 divider divider-horizontal self-center text-xs hidden lg:flex">
                    <span className="rotate-180 writing-mode-vertical">SOCIAL</span>   
                </div>
                <ul className="flex lg:flex-col justify-center gap-4">
                    {
                        social.map( (service, index) =>
                            <li key={index} className="tooltip lg:tooltip-right" data-tip={service.label}>
                                <a name={ service.label } href={service.url} target="_blank" rel="noopener noreferrer">{ service.icon }</a>
                            </li>
                        )
                    }
                </ul>
            </div>            
            <div className="fixed bottom-2 right-4 z-10">                
                <button name={`${terminal ? 'Close' : 'Open'} terminal`} onClick={() => setTerminal(!terminal) } className="tooltip tooltip-left" data-tip={`${terminal ? 'Close' : 'Open'} terminal`}>        
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