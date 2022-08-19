import { AiFillStar, AiOutlineEye, AiOutlineFork } from 'react-icons/ai';

import { SiGithub } from 'react-icons/si';

const Project = () => {
    const getRepoInfo = async (user, repo) => {
        return await fetch(`https://api.github.com/repos/${user}/${repo}`).then( res => res.json())
    }

    return (
        <div role="button" className="card pointer w-full bg-base-100 shadow-xl border-secondary !border-t-4 !border-t-secondary bordered">
            <div className="card-body ">
                <div className="flex gap-4">
                    <div class="avatar">
                        <div class="rounded">
                            <img src="https://placeimg.com/192/192/people" alt="icon" />
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
                    <a href="/"><SiGithub /></a>                                        
                </div>
            </div>
        </div>
    )
}

export default Project