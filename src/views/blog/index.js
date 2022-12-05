import { useEffect, useState } from "react";

import { getFiles } from "../../utils/github";

const Blog = () => {
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(p => [...p, getFiles("gh-posts", page)])
    }, [page])

    return (
        <>
        </>
    )
}

export default Blog;