import { config } from "../../config/github";
import { getFile } from "../../lib/github";

const post = async ({ queryClient, options }) => {
    const parsedOptions = options.split(" ");
    const help = [
        { text: `Retrieves and shows the specified post.`},
        { text: `Usage: post <slug>`},
        { text: `Use 'ls posts' to get a list of available slugs.`},        
        { text: `Use 'posts -h' to show this help`}
    ];
    const notFound = [
        { text: `Post with slug ${parsedOptions[0]} does not exist.`},
        { text: `Use 'ls posts' to get a list of available slugs.`}
    ];

    const getFile = async (filename) => {
        const file = await queryClient.fetchQuery(["post", filename], getFile(config.user, config.repo, "gh-posts", filename));
        if(!file) return notFound;
        return file
    }

    if(parsedOptions.length > 1 || parsedOptions[0] === "-h"){
        return [ ...(parsedOptions.length > 1 && { text: "Unrecognized Option" }), ...help ];
    }

    return await getFile(parsedOptions[0]);
}

export default post;