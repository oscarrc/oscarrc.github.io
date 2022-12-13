import { useEffect, useState } from "react";

import PostCard from "./PostCard";
import config from "../../config/github"
import useGithub from "../../hooks/useGithub";
import useMDX from "../../hooks/useMdx";

const Posts = ({ page = 0, limit = 10 }) => {
    const { getFiles, getMedia } = useGithub(config.user, config.repo);
    const { parseMDX } = useMDX();
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
        <div className="flex w-three-quarter flex-col mx-auto gap-8">
            <PostCard />
            <span className="divider flex sm:hidden m-0"></span>
            <PostCard />
            <span className="divider flex sm:hidden m-0"></span>
            <PostCard />
        </div>
    )
}

export default Posts;