import Posts from "../components/posts";

const Blog = () => {
    return (
        <section id="blog" className="flex flex-col min-h-view gap-16">      
            <h2 className="divider w-three-quarter mx-auto">WHAT I'VE WRITING ABOUT</h2>         
            <Posts infinite={true} />
        </section>
    )
}

export default Blog;