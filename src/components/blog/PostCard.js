import { AiOutlineCalendar } from 'react-icons/ai';
import { IoIosTimer } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
    const navigate = useNavigate();

    return (
        <div role="button" onClick={ () => navigate(`/blog/${ post?.slug ? post.slug : '' }`) } className="card card-side pointer w-full bg-base-100">
            <figure className="w-36 h-36 aspect-square">
                <img className="h-full w-auto" src="https://placeimg.com/192/192/people" alt="test" />
            </figure>
            <div className="card-body gap-4 p-0 pl-8">
                <div className="card-content">
                    <h2 className="card-title">New movie is released!</h2>
                    <p>Ut anim est aliquip sunt laborum pariatur sint nulla irure. Ea occaecat sunt voluptate eiusmod eiusmod ea magna id labore deserunt minim. Culpa non proident duis ipsum fugiat duis id consequat consectetur quis. Lorem fugiat veniam ullamco consectetur sint ipsum laboris cillum incididunt labore sunt. Ullamco in quis Lorem reprehenderit. Anim velit voluptate cillum cillum labore enim laborum est sunt dolore.</p>   
                </div>                    
                <div className="card-actions justify-end">
                    <span className="flex items-center gap-1"><AiOutlineCalendar /> 10/08/2022</span>
                    <span className="divider divider-horizontal mx-0"></span>                    
                    <span className="flex items-center gap-1"><IoIosTimer /> 5 min</span>                                       
                </div>
            </div>
        </div>
    )
}

export default PostCard