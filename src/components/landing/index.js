import { Await, useLoaderData } from "react-router-dom";

import { Suspense } from "react";
import config from "../../config/github"
import { getFile } from "../../lib/github"
import { parse } from "../../lib/mdx";

const aboutLoader = async (queryClient) => {
    return await queryClient.fetchQuery(["about"], async () => {
        const file = await getFile(config.user, config.user, "master", "README.md");
        const result = await parse(file);
        return result;
    })
}

const About = () => {
    const data = useLoaderData();
    const Content = data.about?.default;
    const components = {
        ul: ({ children }) => <ul className="ml-8 grid gird-cols-1 sm:grid-cols-2 overflow-hidden">{children}</ul>,
        ol: ({ children }) => <ol className="ml-8 grid gird-cols-1 sm:grid-cols-2 overflow-hidden">{children}</ol>,
        li: ({ children }) => <li className="list-none">&gt; {children}</li>
    }
    
    return (
        <Suspense>
            <div className="flex flex-col relative gap-4 prose max-w-full about">
                <Await resolve={data} children={<Content components={components} />} />
            </div>
        </Suspense>
    );
}

export { aboutLoader }
export default About;