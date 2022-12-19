const ProjectsLoader = ({amount = 3}) => {
    return (
        <div className="w-three-quarter mx-auto grid grid-cols grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8">
            {
                [...Array(amount).keys()].map( (i) => {
                    return (
                        <aside key={i} role="progressbar" aria-busy="true" className="mockup-code animate-pulse">
                            <div className="h-full w-full aspect-video">
                            </div>
                        </aside>
                    )
                })
            } 
        </div>       
    )
}

export default ProjectsLoader;