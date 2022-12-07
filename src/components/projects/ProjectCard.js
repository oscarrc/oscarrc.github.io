import { AiFillStar, AiOutlineClose, AiOutlineEye, AiOutlineFork } from 'react-icons/ai';
import { useEffect, useState } from 'react';

import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';

const ProjectCard = ({ project }) => {
    const [maximized, setMaximized] = useState(false);

    const closeWindow = (event) => {
        if( event.key === "Escape") setMaximized(false);
    }

    useEffect(() => {
        maximized && document.addEventListener("keydown", closeWindow, false);
        maximized && document.body.classList.add("overflow-hidden");

        return () =>  {
            document.removeEventListener("keydown", closeWindow, false)
            document.body.classList.remove("overflow-hidden")
        };
    }, [maximized])
    
    return (
        <div onClick={() => setMaximized(true)} className={`transition-all transition-1000 ease-in-out mockup-code ${maximized ? 'maximized' : ''}`}>
            <label className="bg-secondary pl-2 text-neutral truncate">Non adipisicing incididunt aute non et mollit irure ad.</label>
            { maximized && <button onClick={() => setMaximized(false)} className="absolute btn-primary btn-circle hover:bg-transparent right-2 top-3 btn btn-outline border-0 btn-xs"><AiOutlineClose className="h-4 w-4" /></button> }
            <div className={`card border-t border-t-base-100 relative h-full scroll ${maximized ? 'overflow-y-scroll' : 'aspect-video'}`}>
                <figure className="w-full"><img src="https://placeimg.com/1080/1920/tech" alt="Movie"/></figure>
                { maximized && 
                    <div className="card-body px-6 md:px-8 items-center">
                        <div className="w-three-quarter">
                            Proident eu officia est id cillum aute consectetur ut. Quis laborum ea quis incididunt ullamco eiusmod aliqua fugiat tempor elit mollit reprehenderit cupidatat. Fugiat sint eiusmod eiusmod sunt.
                            Dolor esse anim dolore Lorem. Officia sint irure proident ut anim sint velit qui excepteur. Cillum eu in sunt proident occaecat nisi. Proident dolore anim deserunt officia est ipsum ut ea aliqua.
                            Incididunt Lorem adipisicing dolor dolor sit laborum nulla. Nisi commodo labore do ad velit sit Lorem minim. Dolore officia quis nulla cupidatat magna voluptate veniam. Est dolor amet pariatur do. Enim occaecat ad aute laborum nostrud sint voluptate sunt sit. Exercitation enim qui voluptate pariatur ut dolor ea occaecat sit minim velit. Sint minim ea reprehenderit ea non nulla minim eiusmod dolor minim.
                            Ut veniam Lorem anim consectetur eiusmod ullamco ipsum ipsum officia officia culpa dolore. Do fugiat qui ut tempor. In eu culpa amet eiusmod in aliqua nostrud. Veniam ullamco sint exercitation nostrud dolor.
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