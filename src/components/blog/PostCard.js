import { AiOutlineCalendar } from 'react-icons/ai';
import { IoIosTimer } from 'react-icons/io';

const PostCard = () => {
    return (
        <div role="button" className="card pointer w-full bg-base-100 shadow-xl border-secondary !border-t-4 !border-t-secondary bordered">
            <div className="card-body p-4">
                <div className="flex gap-4">
                    <div class="avatar">
                        <div class="rounded">
                            <img src="https://placeimg.com/192/192/people" alt="icon" />
                        </div>
                    </div>
                    <div>
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
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