import { AiFillStar, AiOutlineClose, AiOutlineEye, AiOutlineFork } from 'react-icons/ai';
import { useCallback, useEffect } from 'react';

import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';

const ProjectCard = ({ project, maximized, onClick, onClose }) => {
    const Content = project.default;

    const closeWindow = useCallback((event) => {
        if( event.key === "Escape" || event.currentTarget.ariaLabel === "close"){
            onClose && onClose();
        }
    }, [onClose])

    const maximizeWindow = () => onClick && onClick();

    useEffect(() => {
        maximized && document.addEventListener("keydown", closeWindow, false);
        maximized && document.body.classList.add("overflow-hidden");
        
        return () =>  {
            document.removeEventListener("keydown", closeWindow, false)
            document.body.classList.remove("overflow-hidden")
        };
    }, [closeWindow, maximized])
    
    return (
        <div onClick={ maximizeWindow } className={`transition-all transition-500 ease-in-out mockup-code ${maximized ? 'maximized' : ''}`}>
            <label className="bg-secondary pl-2 text-neutral truncate">{ `${project.title}${maximized ? ` | ${project.description}` : '' }` }</label>
            { maximized && <button aria-label="close" onClick={closeWindow} className="absolute right-3 top-4 hover:text-accent"><AiOutlineClose className="h-4 w-4" /></button> }
            <div className={`card border-t border-t-base-100 relative h-full scroll ${maximized ? 'overflow-y-scroll' : 'aspect-video'}`}>
                <figure className="h-full w-full">
                    <img className="object-cover h-full w-full" src={ project.image } alt={ project.title } />
                </figure>
                { maximized && 
                    <div className="card-body px-12 md:px-16 items-center">
                        <div className="max-w-full prose pt-8 pb-16">
                            <Content />
                        </div>
                    </div>
                }
                <div className="info">
                    <div className="flex flex-1 gap-2">
                        { maximized && project.tags.split(',').map(tag => <span key={tag} className="badge truncate">{ tag }</span> )}
                    </div>
                    <div className="flex py-1 px-2 bg-neutral/75 gap-2">
                        <span className="flex items-center gap-1"><AiFillStar /> { project.info.stargazers_count }</span>
                        <span className="flex items-center gap-1"><AiOutlineEye /> { project.info.subscribers_count }</span>
                        <span className="flex items-center gap-1"><AiOutlineFork /> { project.info.forks_count }</span>
                        <span className="divider divider-horizontal mx-0"></span>
                        <div className="flex items-center gap-4">
                            <a aria-label="Github page" onClick={ e => e.stopPropagation() } target="_BLANK" rel="noreferrer noopener" href={ project.info.html_url }><SiGithub /></a>                 
                            <a aria-label="Visit site" onClick={ e => e.stopPropagation() } target="_BLANK" rel="noreferrer noopener" href={ project.link }><FiExternalLink /></a> 
                        </div> 
                    </div>                              
                </div>
            </div>
        </div>
    )
}

export default ProjectCard