import { AiFillStar, AiOutlineEye, AiOutlineFork, AiOutlineInfoCircle } from 'react-icons/ai';

import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';

const ProjectCard = ({ project }) => {
    return (
        <div className="mockup-code pb-0 relative">
            <label className="bg-secondary pl-2 text-neutral truncate">Non adipisicing incididunt aute non et mollit irure ad.</label>
            <div className="card border-t border-t-base-100 relative aspect-video">
                <figure className="w-full"><img src="https://placeimg.com/1080/1920/tech" alt="Movie"/></figure>
                <div className="absolute flex py-1 px-2 bottom-2 right-2 bg-neutral/75 gap-2">
                    <span className="flex items-center gap-1"><AiFillStar /> 5</span>
                    <span className="flex items-center gap-1"><AiOutlineEye /> 5</span>
                    <span className="flex items-center gap-1"><AiOutlineFork /> 5</span>
                    <span className="divider divider-horizontal mx-0"></span>
                    <div className="flex items-center gap-4">
                        <a href="/"><SiGithub /></a>    
                        <a href="/"><AiOutlineInfoCircle /></a>              
                        <a href="/"><FiExternalLink /></a> 
                    </div>                               
                </div>
            </div>
        </div>
    )
}

export default ProjectCard