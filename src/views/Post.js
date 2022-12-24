import { Await, useLoaderData } from "react-router-dom";

import { AiOutlineCalendar } from 'react-icons/ai';
import { IoIosTimer } from 'react-icons/io';
import { Suspense } from "react";
import { useMemo } from "react";

const Post = () => {
    const post = useLoaderData();
    const Content = useMemo(() =>  post?.default, [post?.default])

    return (
        <Suspense>
            <Await resolve={post}>
                <section id="post">
                    <div className="container mx-auto">
                        <div className="prose mx-auto w-three-quarter max-w-three-quarter flex flex-col">
                            <div className="flex ml-auto">
                                <span className="flex items-center gap-1"><AiOutlineCalendar /> { post?.date }</span>
                                <span className="divider divider-horizontal mx-0"></span>                    
                                <span className="flex items-center gap-1"><IoIosTimer /> {post?.readingTime} min</span>   
                            </div>
                            <h2>{post?.title}</h2>
                            <p>{post?.excerpt}</p>
                            <figure className="w-full overflow-hidden mb-4 max-h-half">
                                <img src={post?.image} alt={post?.title} />
                            </figure>
                            { Content && <Content /> }
                        </div>
                    </div>
                </section>
            </Await>
        </Suspense>
    )
}

export default Post;