import { Await, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useMemo } from "react";
import { getFiles, getMedia } from "../../lib/github"

import PostCard from "./PostCard";
import config from "../../config/github"
import { parse } from "../../lib/mdx";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

const fetchPosts = async (files, page, limit) => {
    const posts = await Promise.all(files.docs.map(async p => {
        const evaluated = await parse(p.file);
        evaluated.slug = p.slug;
        evaluated.image = await getMedia(config.repo, evaluated.image, "gh-posts");
        evaluated.readingTime = Math.ceil(p.file.match(/\w+/g).length / 260);
        return evaluated;
    }))

    return {
        docs: posts,
        pages: files.pages
    }
}

const fetchPost = async (files, slug) => {
   const post = files.docs.find(f => f.slug === slug);    
   console.log(files, post, slug)
   const evaluated = await parse(post.file);
   evaluated.slug = post.slug;
   evaluated.image = await getMedia(config.repo, evaluated.image, "gh-posts");
   evaluated.readingTime = Math.ceil(post.file.match(/\w+/g).length / 260);
   return evaluated;
}

const postsLoader = (queryClient, page = 0, limit = 9) => async () => {  
    const files = await queryClient.fetchQuery(["files", "gh-posts"], () => getFiles(config.user, config.repo, "gh-posts", page, limit))
    return await queryClient.fetchInfiniteQuery(["posts"], () => fetchPosts(files, page, limit)); 
}

const postLoader = (queryClient) => async ({params}) => {
    const { slug } = params; 
    const files = await queryClient.fetchQuery(["files", "gh-posts"], () => getFiles(config.user, config.repo, "gh-posts", 0, 100))
    return await queryClient.fetchQuery(["post", slug], () => fetchPost(files, slug));
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

export { postsLoader, postLoader }
export default Posts;