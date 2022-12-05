import { AiOutlineCalendar } from 'react-icons/ai';
import { IoIosTimer } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
    const navigate = useNavigate();

    return (
        <div role="button" onClick={ () => navigate(`/blog/${ post?.slug ? post.slug : '' }`) } className="card card-side pointer w-full bg-base-100 shadow-xl">
            <figure class="w-24 h-24">
                <img src="https://placeimg.com/192/192/people" alt="test" />
            </figure>
            <div className="card-body gap-4 p-0 pl-8">
                <div className="card-content">
                    <h2 className="card-title">New movie is released!</h2>
                    <p>Click the button to watch on Jetflix app.</p>   
                </div>                    
                <div className="card-actions justify-end pt-4">
                    <span className="flex items-center gap-1"><AiOutlineCalendar /> 10/08/2022</span>
                    <span className="divider divider-horizontal mx-0"></span>                    
                    <span className="flex items-center gap-1"><IoIosTimer /> 5 min</span>                                       
                </div>
            </div>
        </div>
    )
}

export default PostCard