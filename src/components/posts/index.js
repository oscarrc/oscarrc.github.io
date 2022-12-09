import PostCard from "./PostCard";

const Posts = () => {
    return (
        <div className="flex w-three-quarter flex-col mx-auto gap-8">
            <PostCard />
            <span className="divider flex sm:hidden m-0"></span>
            <PostCard />
            <span className="divider flex sm:hidden m-0"></span>
            <PostCard />
        </div>
    )
}

export default Posts;