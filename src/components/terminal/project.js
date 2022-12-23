import { getFile, getFileList } from "../../lib/github";

import { config } from "../../config/github";

const project = async ({ queryClient, options }) => {
    const parsedOptions = options.split(" ");
    const files = await queryClient.fetchQuery(["ls", "gh-projects"], getFileList(config.user, config.repo, "gh-projects"));

    const help = [
        { text: `Retrieves and shows the specified project.`},
        { text: `Usage: project <slug>`},
        { text: `Use 'ls projects' to get a list of available slugs.`},
        { text: `Use 'projects -h' to show this help`}
    ];
    const notFound = [
        { text: `Project with slug ${parsedOptions[0]} does not exist.`},
        { text: `Use 'ls projects' to get a list of available slugs.`}
    ]

    if(parsedOptions.length > 1 || parsedOptions[0] === "-h"){
        return [ ...(parsedOptions.length > 1 && { text: "Unrecognized Option" }), ...help ];
    }

    if(!files.map(f => f.name).includes(parsedOptions[0])) return notFound;

    return await queryClient.fetchQuery([parsedOptions[0]], getFile(config.user, config.repo, "gh-projects", parsedOptions[0]));
}

export default project;