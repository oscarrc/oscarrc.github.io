import { Await, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { getFiles, getMedia, getRepoInfo } from "../../lib/github"

import ProjectCard from './ProjectCard';
import config from "../../config/github";
import { parse } from "../../lib/mdx";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

const getProjects = async (page, limit) => {
    const files = await getFiles(config.user, config.repo, "gh-projects", page, limit);

    const projects = await Promise.all(files.docs.map(async p => {
        const evaluated = await parse(p.file);
        evaluated.slug = p.slug;
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
    return await queryClient.fetchInfiniteQuery(["projects"], () => getProjects(page, limit))  
}

const Projects = ({ limit = 9, infinite }) => {
    const {  
        hasNextPage,
        isFetchingNextPage, 
        fetchNextPage,
        data:projects 
    } = useInfiniteQuery(["projects"], ({pageParam = 0}) => getProjects(pageParam, limit), {
        getNextPageParam: (lastPage) =>  lastPage.pages?.next ?? undefined,
        getPreviousPageParam: (firstPage) => firstPage.pages?.prev ?? undefined, 
    })

    const { ref: next, inView: loadNext } = useInView();
    const { pathname } = useLocation();
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const [ project, setProject ] = useState(null);

    const maximize = useCallback((project) => {
        setProject(project);
        navigate(`/portfolio/${project.slug}`, { state: { background: pathname }})
    }, [navigate, pathname])

    const children = useMemo(() => {
        return projects?.pages.map(p => 
            p.docs.map( (project, index) => {
                return <ProjectCard 
                            key={index}
                            project={ project }
                            onClick={ () => maximize(project) }
                        />
        }))
    }, [maximize, projects?.pages])

    useEffect(() => {
        if (hasNextPage && loadNext && !isFetchingNextPage) fetchNextPage();
    }, [hasNextPage, loadNext, isFetchingNextPage, fetchNextPage])

    return (
        <div className="w-three-quarter mx-auto grid grid-cols grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8">
            <Suspense>
                <Await resolve={projects} children={children} />
            </Suspense>
            { infinite && <aside ref={next} /> }
            <Outlet context={{ project, setProject }}/>
        </div>
    )
}

export { projectsLoader }
export default Projects