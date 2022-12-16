import { Suspense, useEffect, useMemo } from "react";

import PostCard from "./PostCard";
import config from "../../config/github"
import { useNavigate, Await } from "react-router-dom";

import { getFiles, getMedia } from "../../lib/github"
import { parse } from "../../lib/mdx";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

const fetchPosts = async (page, limit) => {
    const files = await getFiles(config.user, config.repo, "gh-posts", page, limit);

    const posts = await Promise.all(files.docs.map(async p => {
        const evaluated = await parse(p);
        evaluated.image = await getMedia(config.repo, evaluated.image, "gh-posts");
        evaluated.readingTime = Math.ceil(p.match(/\w+/g).length / 260);
        return evaluated;
    }))

    return {
        docs: posts,
        pages: files.pages
    }
}

const postsLoader = (queryClient, page = 0, limit = 9) => async () => {  
    return await queryClient.fetchInfiniteQuery(["posts"], () => fetchPosts(page, limit))  
}

const Posts = ({ limit = 9, infinite}) => {
    const { 
        isFetchingNextPage, 
        fetchNextPage,
        data:posts 
    } = useInfiniteQuery(["posts"], ({pageParam = 0}) => fetchPosts(pageParam, limit), {
        getNextPageParam: (lastPage) =>  lastPage.pages?.next ?? undefined,
        getPreviousPageParam: (firstPage) => firstPage.pages?.prev ?? undefined, 
    })
    
    const { ref: next, inView: loadNext } = useInView();

    const navigate = useNavigate();

    const children = useMemo(() => {
        return posts?.pages.map(p => 
            p.docs.map( (post, index) => {
                return <PostCard 
                            key={index}
                            title={post.title}
                            excerpt={post.excerpt}                   
                            image={post.image}
                            date={post.date}
                            readingTime={post.readingTime}
                            onClick={ () => navigate(`/blog/${post.slug}`, { state: { post }} ) }
                        />
            })
        )
    }, [navigate, posts?.pages])

    useEffect(() => {
        if (loadNext && !isFetchingNextPage) fetchNextPage();
    }, [loadNext, isFetchingNextPage, fetchNextPage])

    return (
        <div className="flex w-three-quarter flex-col mx-auto gap-8">
            <Suspense>
                <Await resolve={posts} children={children} />
            </Suspense>
            { infinite && <aside ref={next} /> }
        </div>
    )
}

export { postsLoader }
export default Posts;