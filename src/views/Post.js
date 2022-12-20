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
                        <div className="prose mx-auto w-three-quarter max-w-three-quarter">
                            <figure className="w-full overflow-hidden mb-4">
                                <img src={post.image} alt={post.title} />
                            </figure>
                            <Content />
                        </div>
                    </div>
                </section>
            </Await>
        </Suspense>
    )
}

export default Post;