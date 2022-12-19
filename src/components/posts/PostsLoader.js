const PostsLoader = ({ amount = 3 }) => {
    return (
        <div className="flex w-three-quarter flex-col mx-auto gap-8">
            {
                [...Array(amount).keys()].map( (i) => {
                    return (
                        <aside key={i} role="progressbar" aria-busy="true" className="card card-side pointer w-full">
                            <div className="hidden sm:flex">
                                <div className="w-40 h-40 aspect-square hidden md:flex overflow-hidden animate-pulse bg-primary">
                                </div>
                            </div>
                            <div className="card-body gap-4 p-0 pl-0 sm:pl-8">
                                <div className="card-content flex flex-col flex-1 gap-2">
                                    <span className="card-title animate-pulse h-6 w-[75%] bg-primary"></span>
                                    <div className="flex flex-col gap-2">
                                        <div className="animate-pulse w-full h-4 w-full bg-primary"></div>
                                        <div className="animate-pulse w-full h-4 w-full bg-primary"></div>
                                        <div className="animate-pulse w-full h-4 w-[75%] bg-primary"></div>
                                    </div>
                                </div>                    
                                <div className="card-actions ml-auto animate-pulse h-6 w-48 bg-primary"></div>
                            </div>
                        </aside>
                    )
                })
            }
        </div>
    )
}

export default PostsLoader;