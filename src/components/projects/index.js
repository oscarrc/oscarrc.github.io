import { useEffect, useState, Suspense } from "react";
import { useLocation, useNavigate, useParams, Outlet, Await } from 'react-router-dom';

import ProjectCard from './ProjectCard';
import config from "../../config/github"
// import useGithub from "../../hooks/useGithub";
// import useMDX from "../../hooks/useMdx";
import { useInfiniteQuery } from "react-query";
import { getFiles, getRepoInfo, getMedia } from "../../lib/github"
import { parse } from "../../lib/mdx";

const fetchProjects = async (page, limit) => {
    const files = await getFiles(config.user, config.repo, "gh-projects", page, limit);

    const projects = await Promise.all(files.docs.map(async p => {
        const evaluated = await parse(p);
        evaluated.info = await getRepoInfo(config.user, evaluated.repo);
        evaluated.image = await getMedia(config.repo, evaluated.image, "gh-projects");
        return evaluated;
    }))

    return {
        docs: projects,
        pages: files.pages
    }
}

const projectsLoader = (queryClient, page = 0, limit = 9) => async () => {  
    return await queryClient.fetchInfiniteQuery(["projects"], () => fetchProjects(page, limit))  
}

const Projects = ({ limit = 9, infinite }) => {
    const {
        data:projects 
    } = useInfiniteQuery(["projects"], ({pageParam = 0}) => fetchProjects(pageParam, limit), {
        getNextPageParam: (lastPage) =>  lastPage.pages?.next ?? undefined,
        getPreviousPageParam: (firstPage) => firstPage.pages?.prev ?? undefined, 
    })

    const { pathname } = useLocation();
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const [ project, setProject ] = useState(null);

    const maximize = (project) => {
        setProject(project);
        navigate(`/portfolio/${project.slug}`, { state: { background: pathname }})
    }

    // useEffect(() => {
    //     getFiles(config.repo, "gh-projects", page, limit).then( async (projects) => {
    //         const parsed = await Promise.all(projects.map(async p => {
    //             const evaluated = await parseMDX(p);
    //             evaluated.info = await getRepoInfo(evaluated.repo);
    //             evaluated.image = await getMedia(evaluated.image, "gh-projects");
    //             evaluated.slug === slug && setProject(evaluated);
    //             return evaluated;
    //         }))   

    //         setProjects(p => [...p, ...parsed])
    //     });
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [page])

    return (
        <div className="w-three-quarter mx-auto grid grid-cols grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8">
            <Suspense>
                <Await  
                    resolve={projects}
                    children={
                        projects?.pages.map(p => 
                            p.docs.map( (project, index) => {
                                return <ProjectCard 
                                            key={index}
                                            project={ project }
                                            onClick={ () => maximize(project) }
                                        />
                            })
                        )
                    }
                />
            </Suspense>
            <Outlet context={{ project, setProject }}/>
        </div>
    )
}

export { projectsLoader }
export default Projects