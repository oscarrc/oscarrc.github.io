const Post = ({ post }) => {
    const Content = post?.default;

    return (
        <section id="post">
            <div className="container">
                <div className="prose max-w-full">
                    { Content && <Content /> }
                </div>
            </div>
        </section>
    )
}

export default Post;