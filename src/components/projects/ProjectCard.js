import { AiFillStar, AiOutlineEye, AiOutlineFork } from 'react-icons/ai';

import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import { getRepoInfo } from "../../utils/github";

const ProjectCard = ({ project }) => {
    return (
        <div className="mockup-code pb-0">
            <div className="card border-t border-t-base-100">
                <figure><img src="https://placeimg.com/1920/1080/arch"  alt="Movie"/></figure>
                <div className="card-body gap-8">
                    <div className="card-content">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>   
                    </div>
                    <div className="card-actions justify-end">
                        <span className="flex items-center gap-1"><AiFillStar /> 5</span>
                        <span className="flex items-center gap-1"><AiOutlineEye /> 5</span>
                        <span className="flex items-center gap-1"><AiOutlineFork /> 5</span>
                        <span className="divider divider-horizontal mx-0"></span>
                        <div className="flex items-center gap-4">
                            <a href="/"><SiGithub /></a>         
                            <a href="/"><FiExternalLink /></a> 
                        </div>                               
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard