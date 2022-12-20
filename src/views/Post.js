import { Await, useLoaderData } from "react-router-dom";

import { Suspense } from "react";
import { useMemo } from "react";

const Post = () => {
    const post = useLoaderData();
    const Content = useMemo(() =>  post?.default, [post.default])

    return (
        <Suspense>
            <Await resolve={post}>
                <section id="post">
                    <div className="container">
                        <figure className="w-full max-h-half overflow-hidden mb-4">
                            <img src={post.image} alt={post.title} />
                        </figure>
                        <div className="prose mx-auto w-three-quarter max-w-three-quarter">
                            <Content />
                        </div>
                    </div>
                </section>
            </Await>
        </Suspense>
    )
}

export default Post;