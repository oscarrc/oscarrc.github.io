import social from "../../config/social";

const Social = () => {
    return (
        <div className="flex flex-col items-center gap-4 w-8 fixed bottom-4 left-2">
            <div className="h-32 m-0 divider divider-horizontal self-center text-xs">
                <span className="rotate-180 writing-mode-vertical">SOCIAL</span>   
            </div>
            <ul className="flex flex-col justify-center gap-4">
                {
                    Object.keys(social).map(key =>
                        <li key={key} className="tooltip tooltip-right" data-tip={social[key].label}>
                            <a href={social[key].url} target="_blank" rel="noopener noreferrer">{ social[key].icon }</a>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Social;