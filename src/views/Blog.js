import Posts from "../components/posts";

const Blog = () => {
    return (
        <section id="blog" className="flex flex-col justify-center items-center min-h-view">                
            <Posts infinite={true} />
        </section>
    )
}

export default Blog;