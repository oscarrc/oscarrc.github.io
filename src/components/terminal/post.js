import { getFile, getFileList } from "../../lib/github";

import { config } from "../../config/github";

const post = async ({ queryClient, options }) => {
    const parsedOptions = options.split(" ");
    const files = await queryClient.fetchQuery(["ls", "gh-projects"], getFileList(config.user, config.repo, "gh-posts"));
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

    if(parsedOptions.length > 1 || parsedOptions[0] === "-h"){
        return [ ...(parsedOptions.length > 1 && { text: "Unrecognized Option" }), ...help ];
    }

    if(!files.map(f => f.name).includes(parsedOptions[0])) return notFound;

    return await queryClient.fetchQuery([parsedOptions[0]], getFile(config.user, config.repo, "gh-posts", parsedOptions[0]));
}

export default post;