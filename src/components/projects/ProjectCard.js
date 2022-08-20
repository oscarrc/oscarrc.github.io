import { AiFillStar, AiOutlineEye, AiOutlineFork } from 'react-icons/ai';

import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';

const ProjectCard = () => {
    const getRepoInfo = async (user, repo) => {
        return await fetch(`https://api.github.com/repos/${user}/${repo}`).then( res => res.json())
    }

    return (
        <div className="w-three-quarter bg-base">
            <div className="card-body">
                <div className="flex gap-4">
                    <div className="mockup-window border border-base-300 shadow-xl max-w-xl  w-3/4">
                        <div className="w-full aspect-video overflow-y-scroll border-t border-base-300">                            
                            <img className="w-full" src="https://placeimg.com/192/192/people" alt="icon" />
                        </div>
                    </div>
                    <div>
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
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
    )
}

export default ProjectCard