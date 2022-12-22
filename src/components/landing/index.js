import config from "../../config/github"
import { getFile } from "../../lib/github"
import { parse } from "../../lib/mdx";
import { useLoaderData } from "react-router-dom";
import { useMemo } from "react";

const aboutLoader = async (queryClient) => {
    return await queryClient.fetchQuery(["about"], async () => {
        const file = await getFile(config.user, config.user, "master", "README.md");
        const result = await parse(file);
        return result;
    })
}

const About = () => {
    const data = useLoaderData();

    const Content = useMemo(()=>{
        if(!data?.about) return;
        return data?.about?.default;
    }, [data]);
    
    const components = {
        ul: ({ children }) => <ul className="ml-8 grid gird-cols-1 sm:grid-cols-2 overflow-hidden">{children}</ul>,
        ol: ({ children }) => <ol className="ml-8 grid gird-cols-1 sm:grid-cols-2 overflow-hidden">{children}</ol>,
        li: ({ children }) => <li className="list-none">&gt; {children}</li>
    }
    
    return (
        <div className="flex flex-col relative gap-4 prose max-w-full about">
            { Content && <Content components={components} /> }
        </div>
    );
}

export { aboutLoader }
export default About;