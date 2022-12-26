import { AiFillStar, AiOutlineEye, AiOutlineFork } from 'react-icons/ai';
import { elementTransition, elementVariants } from "../../config/animation";

import { BiUnlink } from 'react-icons/bi';
import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, image, link, info, onClick }) => {
    const maximizeWindow = () => onClick && onClick();

    return (
            <motion.div 
                className="mockup-code"
                onClick={ maximizeWindow } 
                key={title}
                initial="initial"
                animate="in"
                variants={elementVariants}
                transition={elementTransition}
            >
                <label className="bg-secondary pl-2 text-neutral truncate">{title}</label>
                <div className="card border-t border-t-base-100 relative h-full scroll aspect-video">
                    <figure className="h-full w-full">
                        <img className="object-cover h-full w-full" src={ image } alt={ title } />
                    </figure>
                    <div className="info">
                        <div className="flex py-1 px-2 bg-neutral/75 gap-2">
                            <span className="flex items-center gap-1"><AiFillStar /> { info.stargazers_count }</span>
                            <span className="flex items-center gap-1"><AiOutlineEye /> { info.subscribers_count }</span>
                            <span className="flex items-center gap-1"><AiOutlineFork /> { info.forks_count }</span>
                            <span className="divider divider-horizontal mx-0"></span>
                            <div className="flex items-center gap-4">
                                <a aria-label="Github page" onClick={ e => e.stopPropagation() } target="_BLANK" rel="noreferrer noopener" href={ info.html_url }><SiGithub /></a>                 
                                <a className={`${!link && 'cursor-not-allowed'}`} aria-label={link ? "Visit site" : "No link available"} onClick={ e => e.stopPropagation() } target="_BLANK" rel="noreferrer noopener" { ...(link && {href: link}) } >
                                    { link ? <FiExternalLink /> : <BiUnlink /> }
                                </a> 
                            </div> 
                        </div>                              
                    </div>
                </div>
            </motion.div>
    )
}

export default ProjectCard