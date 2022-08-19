const Window = ({ capture, src, title }) => {
    return (        
        <div class="mockup-window w-three-quarter relative">
            <a href={src} target="_blank" rel="noreferrer" className="url truncate rounded absolute top bg-secondary top-3 mr-10 left-28 px-4">{src}</a>
            {
                src ?
                    <iframe title={title} className="w-full aspect-video" src={src} /> :
                    <img src={capture} alt={title} className="w-full aspect-video" />
            }
        </div>
    )
}

export default Window;