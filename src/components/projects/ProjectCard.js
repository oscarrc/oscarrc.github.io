import { AiFillStar, AiOutlineEye, AiOutlineFork } from 'react-icons/ai';

import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';

const ProjectCard = ({ project, onClick }) => {
    const maximizeWindow = () => onClick && onClick();

    return (
        <div onClick={ maximizeWindow } className="transition-all transition-500 ease-in-out mockup-code">
            <label className="bg-secondary pl-2 text-neutral truncate">{project.title}</label>
            <div className="card border-t border-t-base-100 relative h-full scroll aspect-video">
                <figure className="h-full w-full">
                    <img className="object-cover h-full w-full" src={ project.image } alt={ project.title } />
                </figure>
                <div className="info">
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