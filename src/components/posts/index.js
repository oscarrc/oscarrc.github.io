import { Await, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useMemo } from "react";
import { getFiles, getMedia } from "../../lib/github"
import { useInfiniteQuery, useQueryClient } from "react-query";

import PostCard from "./PostCard";
import PostsLoader from "./PostsLoader";
import config from "../../config/github"
import { parse } from "../../lib/mdx";
import { useInView } from "react-intersection-observer";

const parsePost = async (post) => {
    const parsed = await parse(post.file);
    parsed.slug = post.slug;
    parsed.image = await getMedia(config.user, config.repo, parsed.image, "gh-posts");
    parsed.readingTime = Math.ceil(post.file.match(/\w+/g).length / 260);
    return parsed;
}

const getPosts = async (files) => {
    const posts = await Promise.all(files.docs.map(async p => await parsePost(p) ))
    return { docs: posts, pages: files.pages }
}

const getPost = async (files, slug) => {
   const post = files.docs.find(f => f.slug === slug);  
   if(!post) return false;
   return await parsePost(post);
}

const postsLoader = (queryClient, page = 0, limit = 9) => async () => {  
    const files = await queryClient.fetchQuery(["gh-posts", page, limit], () => getFiles(config.user, config.repo, "gh-posts", page, limit));
    
    if(!files) return [];    
    return await queryClient.fetchInfiniteQuery(["posts"], () => getPosts(files)); 
}

const postLoader = (queryClient) => async ({params}) => {
    const { slug } = params; 
    const files = await queryClient.fetchQuery(["gh-posts"], () => getFiles(config.user, config.repo, "gh-posts"));
    const post = await queryClient.fetchQuery(["post", slug], () => getPost(files, slug));

    if(!post) throw new Response("Not Found", { status: 404, statusText: "Post not found" });
    return post;
}

const Posts = ({ limit = 9, infinite}) => {
    const queryClient = useQueryClient();
    const { 
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,        
        data:posts 
    } = useInfiniteQuery(["posts", limit], async ({pageParam = 0}) => {
        const files = await queryClient.fetchQuery(["gh-posts", pageParam, limit], () => getFiles(config.user, config.repo, "gh-posts", pageParam, limit));
        return getPosts(files)
    }, {
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
        if (infinite && hasNextPage && loadNext && !isFetchingNextPage) fetchNextPage();
    }, [infinite, hasNextPage, loadNext, isFetchingNextPage, fetchNextPage])

    return (
        <Suspense fallback={<PostsLoader amount={limit} />}>
            <div className="flex w-three-quarter flex-col mx-auto gap-8">
                <Await resolve={posts} children={children} />
                { infinite && <aside ref={next} /> }
            </div>
        </Suspense>
    )
}

export { postsLoader, postLoader }
export default Posts;