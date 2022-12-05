import { useEffect, useState } from "react";

import config from "../../config/github"
import useGithub from "../../hooks/useGithub";

const Blog = () => {
    const { getFiles } = useGithub(config.user);
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState(new Set());

    useEffect(() => {
        getFiles(config.repo, "gh-posts", page).then( (posts) => setPosts(p => new Set([...p, ...posts])) );
    }, [getFiles, page])

    return (
        <>
        </>
    )
}

export default Blog;