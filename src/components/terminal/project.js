import config from "../../config/github";
import { getFile } from "../../lib/github";

const project = async (queryClient, options) => {
    const help = [
        { text: `Retrieves and shows the specified project.`},
        { text: `Usage: project <slug>`},
        { text: `Use 'ls projects' to get a list of available slugs.`},       
        { text: <>Use '<em>projects -h</em>' to show this help</> }
    ];
    const notFound = [
        { text: `Project with slug ${options[0]} does not exist.`},
        { text: <>Use '<em>ls projects</em>' to get a list of available slugs.</>}
    ]

    const parseFile = async (filename) => {
        const file = await queryClient.fetchQuery(["project", filename], () => getFile(config.user, config.repo, "gh-projects", filename));
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

export default project;