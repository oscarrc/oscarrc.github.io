import { useEffect, useState } from "react";

import { getFiles } from "../../utils/github";

const Blog = () => {
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState(new Set());

    useEffect(() => {
        getFiles("gh-posts", page).then( (posts) => setPosts(p => new Set([...p, ...posts])) );
    }, [page])

    return (
        <>
        </>
    )
}

export default Blog;