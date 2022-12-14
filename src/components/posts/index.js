import { useEffect, useState } from "react";

import PostCard from "./PostCard";
import config from "../../config/github"
import useGithub from "../../hooks/useGithub";
import useMDX from "../../hooks/useMdx";
import { useNavigate } from "react-router-dom";

const Posts = ({ page = 0, limit = 10 }) => {
    const { getFiles, getMedia } = useGithub(config.user, config.repo);
    const { parseMDX } = useMDX();
    const [ posts, setPosts ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFiles(config.repo, "gh-posts", page, limit).then( async (projects) => {
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
        <div className="flex w-three-quarter flex-col mx-auto gap-8">
            { posts && posts.map( (post, index) => {
                return (
                    <div key={post.title}>
                        <PostCard 
                            title={post.title}
                            excerpt={post.excerpt}                   
                            image={post.image}
                            date={post.date}
                            onClick={ () => navigate(`/blog/${post.slug}`, { state: { post }}) }
                        />
                        { index < posts.length && <span className="divider flex sm:hidden m-0"></span> }
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;