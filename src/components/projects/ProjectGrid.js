import { useLocation, useNavigate } from 'react-router-dom';

import ProjectCard from './ProjectCard';

const ProjectGrid = (projects) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className="w-three-quarter mx-auto grid grid-cols grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8">
            <ProjectCard 
                maximized={ pathname === "/projects/test" } 
                onClick={ () => navigate('/projects/test', { state: { background: pathname }})}
                onClose={ () => navigate(pathname) }
            />
            <ProjectCard background={ pathname } maximized={ false } />
            <ProjectCard background={ pathname } maximized={ false } />
        </div>
    )
}

export default ProjectGrid