import { Await, useLoaderData } from "react-router-dom";

import { Suspense } from "react";
import { useMemo } from "react";

const Post = () => {
    const post = useLoaderData();
    const children = useMemo(() => {
        const Content = post.default;
        return Content && <Content />
    }, [post.default])

    return (
        <section id="post">
            <div className="container mx-auto">
                <div className="prose w-three-quarter max-w-three-quarter">
                <Suspense>
                    <Await resolve={post} children={children} />
                </Suspense>
                </div>
            </div>
        </section>
    )
}

export default Post;