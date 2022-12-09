import ProjectCard from './ProjectCard';
import { useLocation } from 'react-router-dom';

const ProjectGrid = (projects) => {
    const { pathname } = useLocation();

    return (
        <div className="w-three-quarter mx-auto grid grid-cols grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8">
            <ProjectCard referer={ pathname } maximized={ false } />
            <ProjectCard referer={ pathname } maximized={ false } />
            <ProjectCard referer={ pathname } maximized={ false } />
        </div>
    )
}

export default ProjectGrid