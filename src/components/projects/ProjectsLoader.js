import { elementTransition, elementVariants } from "../../config/animation";

import { motion } from "framer-motion";

const ProjectsLoader = ({amount = 3}) => {
    return (
        <motion.div 
            className="w-three-quarter mx-auto grid grid-cols grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8"            
            initial="initial"
            animate="in"
            variants={elementVariants}
            transition={elementTransition}
        >
            {
                [...Array(amount).keys()].map( (i) => {
                    return (
                        <aside key={i} role="progressbar" aria-busy="true" className="mockup-code animate-pulse">
                            <div className="h-full w-full aspect-video">
                            </div>
                        </aside>
                    )
                })
            } 
        </motion.div>       
    )
}

export default ProjectsLoader;