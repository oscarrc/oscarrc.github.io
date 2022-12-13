import { useLocation, useNavigate } from 'react-router-dom';

import ProjectCard from './ProjectCard';

const Projects = ({ projects }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    
    return (
        <div className="w-three-quarter mx-auto grid grid-cols grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8">
            {
                projects?.map(project => {
                    return (
                        <ProjectCard 
                            project={project}
                            maximized={ pathname === "/portfolio/test" } 
                            onClick={ () => navigate('/portfolio/test', { state: { background: pathname }})}
                            onClose={ () => { navigate(-1) } }
                        />
                    )
                })
            }
        </div>
    )
}

export default Projects