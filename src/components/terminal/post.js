import config from "../../config/github";
import { getFile } from "../../lib/github";

const post = async (queryClient, options) => { 
    const help = [
        { text: `Retrieves and shows the specified post.`},
        { text: `Usage: post <slug>`},
        { text: `Use 'ls posts' to get a list of available slugs.`},        
        { text: <>Use '<em>posts -h</em>' to show this help</> }
    ];
    const notFound = [
        { text: `Post with slug ${options[0]} does not exist.`},
        { text: <>Use '<em>ls posts</em>' to get a list of available slugs.</>}
    ];

    const parseFile = async (filename) => {
        const file = await queryClient.fetchQuery(["post", filename], () => getFile(config.user, config.repo, "gh-posts", filename));
        if(!file || file.includes("404")) return notFound;
        return file.split("\n").map(l => ({ text: l }))
    }

    if(options.length > 1 || options[0] === "-h" || options[0][0] === "-"){
        return [
            ...((options.length > 1 || options[0] !== "-h") && [{ text: `Unrecoginized option ${options.join(" ")}`, classes: "text-error" }]),
            ...help
        ];
    }

    return await parseFile(options[0]);
}

export default post;