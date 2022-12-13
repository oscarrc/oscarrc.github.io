import { AiFillStar, AiOutlineClose, AiOutlineEye, AiOutlineFork } from 'react-icons/ai';
import { useCallback, useEffect } from 'react';

import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import useMDX from '../../hooks/useMdx';

const ProjectCard = ({ project, maximized, onClick, onClose }) => {  
    const mdx = useMDX(project);
    const Content = mdx.default;

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
            <label className="bg-secondary pl-2 text-neutral truncate">{ mdx.title }</label>
            { maximized && <button aria-label="close" onClick={closeWindow} className="absolute right-3 top-4 hover:text-accent"><AiOutlineClose className="h-4 w-4" /></button> }
            <div className={`card border-t border-t-base-100 relative h-full scroll ${maximized ? 'overflow-y-scroll' : 'aspect-video'}`}>
                <figure className="w-full"><img src="https://placeimg.com/1080/1920/tech" alt="Movie"/></figure>
                { maximized && 
                    <div className="card-body px-6 md:px-8 items-center">
                        <div className="w-full">
                            <Content />
                        </div>
                    </div>
                }
                <div className="info flex py-1 px-2 bg-neutral/75 gap-2">
                    <span className="flex items-center gap-1"><AiFillStar /> 5</span>
                    <span className="flex items-center gap-1"><AiOutlineEye /> 5</span>
                    <span className="flex items-center gap-1"><AiOutlineFork /> 5</span>
                    <span className="divider divider-horizontal mx-0"></span>
                    <div className="flex items-center gap-4">
                        <a aria-label="Github page" onClick={ e => e.stopPropagation() } target="_BLANK" rel="noreferer noopener" href="/"><SiGithub /></a>                 
                        <a aria-label="Visit site" onClick={ e => e.stopPropagation() } target="_BLANK" rel="noreferer noopener" href="/"><FiExternalLink /></a> 
                    </div>                               
                </div>
            </div>
        </div>
    )
}

export default ProjectCard