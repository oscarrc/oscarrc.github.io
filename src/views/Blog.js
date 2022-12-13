import Posts from "../components/posts";
import { useState } from "react";

const Blog = () => {
    const [ page, setPage ] = useState(0);

    return (
        <section id="blog" className="flex flex-col justify-center items-center min-h-view">                
            <Posts />
        </section>
    )
}

export default Blog;