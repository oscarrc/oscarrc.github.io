import { Await, useLoaderData } from "react-router-dom";

import { Suspense } from "react";
import { useMemo } from "react";

const Post = () => {
    const post = useLoaderData();
    const Content = useMemo(() =>  post?.default, [post.default])

    return (
        <section id="post">
            <div className="container mx-auto">
                <div className="prose w-three-quarter max-w-three-quarter">
                <Suspense>
                    <Await resolve={post}>
                        <Content />
                    </Await>
                </Suspense>
                </div>
            </div>
        </section>
    )
}

export default Post;