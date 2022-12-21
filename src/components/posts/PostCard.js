import { AnimatePresence, motion } from 'framer-motion';
import { elementTransition, elementVariants } from "../../config/animation";

import { AiOutlineCalendar } from 'react-icons/ai';
import { IoIosTimer } from 'react-icons/io';

const PostCard = ({ title, excerpt, image, date, readingTime, onClick }) => { 
    return (
        <AnimatePresence>
            <motion.div 
                className="card card-side pointer w-full"
                role="button" 
                onClick={ onClick } 
                key={title}
                initial="initial"
                animate="in"
                exit="out"
                variants={elementVariants}
                transition={elementTransition}
            >
                <div className="hidden sm:flex">
                    <figure className="w-40 h-40 aspect-square hidden md:flex overflow-hidden">
                        <img className="object-cover h-full w-full" src={image} alt={`${title}`} />
                    </figure>
                </div>
                <div className="card-body gap-4 p-0 pl-0 sm:pl-8">
                    <div className="card-content flex-1">
                        <h2 className="card-title">{ title }</h2>
                        <p className="line-clamp-4">{ excerpt }</p>
                    </div>                    
                    <div className="card-actions justify-end">
                        <span className="flex items-center gap-1"><AiOutlineCalendar /> { date }</span>
                        <span className="divider divider-horizontal mx-0"></span>                    
                        <span className="flex items-center gap-1"><IoIosTimer /> {readingTime} min</span>                                       
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default PostCard