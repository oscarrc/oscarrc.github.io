import { useEffect, useState } from "react";

import Posts from "../components/posts";
import config from "../config/github"
import useGithub from "../hooks/useGithub";
import useMDX from "../hooks/useMdx";

const Blog = () => {
    const { getFiles, getMedia } = useGithub(config.user, config.repo);
    const { parseMDX } = useMDX();

    const [ page, setPage ] = useState(0);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        getFiles(config.repo, "gh-posts", page).then( async (projects) => {
            const parsed = await Promise.all(projects.map(async p => {
                const evaluated = await parseMDX(p);
                evaluated.image = await getMedia(evaluated.image, "gh-posts");
                return evaluated;
            }))

            setPosts(p => [...p, ...parsed])
        } );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return (
        <section id="blog" className="flex flex-col justify-center items-center min-h-view">                
            <Posts />
        </section>
    )
}

export default Blog;