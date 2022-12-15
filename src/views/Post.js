import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
    const Content = post?.default;
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(!post) navigate("/404");
    // }, [post, navigate])

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