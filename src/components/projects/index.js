import { useLocation, useNavigate } from 'react-router-dom';

import ProjectCard from './ProjectCard';

const Projects = ({ projects }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    
    return (
        <div className="w-three-quarter mx-auto grid grid-cols grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8">
            { projects && projects.map( (project, index) => {
                return <ProjectCard 
                            key={index}
                            project={ project }
                            maximized={ pathname === `/portfolio/${project.slug}` } 
                            onClick={ () => navigate(`/portfolio/${project.slug}`, { state: { background: pathname }})}
                            onClose={ () => { navigate(-1) } }
                        />
            })}
        </div>
    )
}

export default Projects