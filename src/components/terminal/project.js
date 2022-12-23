import { config } from "../../config/github";
import { getFile } from "../../lib/github";

const project = async ({ queryClient, options }) => {
    const parsedOptions = options.split(" ");
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

    const getFile = async (filename) => {
        const file = await queryClient.fetchQuery(["project", filename], getFile(config.user, config.repo, "gh-projects", filename));
        if(!file) return notFound;
        return file
    }

    if(parsedOptions.length > 1 || parsedOptions[0] === "-h"){
        return [ ...(parsedOptions.length > 1 && { text: "Unrecognized Option" }), ...help ];
    }

    return await getFile(parsedOptions[0]);
}

export default project;