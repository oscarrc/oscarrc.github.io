import config from "../../config/github";
import { getFile } from "../../lib/github";

const about = async (queryClient, options) => {   
    const help = [
        { text: `Shows info about the developer`},
        { text: `Usage: about`},
        { text: `Use 'about -h' to show this help`}
    ];
    const notFound = [
        { text: `Post with slug ${options[0]} does not exist.`},
        { text: `Use 'ls posts' to get a list of available slugs.`}
    ];

    const parseFile = async (filename) => {
        const file = await queryClient.fetchQuery(["about"], () => getFile(config.user, config.user, "master", "README.md"));
        if(!file) return notFound;
        return file.split("\n").map(l => ({ text: l }))
    }

    if(options.length > 1 || options[0] === "-h"){
        return [ ...(options.length > 1 && { text: "Unrecognized Option" }), ...help ];
    }

    return await parseFile(options[0]);
}

export default about;