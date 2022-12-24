import config from "../../config/github";
import { getFile } from "../../lib/github";

const post = async (queryClient, options) => { 
    const help = [
        { text: `Retrieves and shows the specified post.`},
        { text: `Usage: post <slug>`},
        { text: `Use 'ls posts' to get a list of available slugs.`},        
        { text: `Use 'posts -h' to show this help`}
    ];
    const notFound = [
        { text: `Post with slug ${options[0]} does not exist.`},
        { text: `Use 'ls posts' to get a list of available slugs.`}
    ];

    const parseFile = async (filename) => {
        const file = await queryClient.fetchQuery(["post", filename], () => getFile(config.user, config.repo, "gh-posts", filename));
        if(!file) return notFound;
        return file.split("\n").map(l => ({ text: l }))
    }

    if(options.length > 1 || options[0] === "-h"){
        return [ ...(options.length > 1 ?? { text: "Unrecognized Option" }), ...help ];
    }

    return await parseFile(options[0]);
}

export default post;