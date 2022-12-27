import config from "../../config/github";
import { getFile } from "../../lib/github";

const whoami = async (queryClient, dir, options) => {   
    const help = [
        { text: `Shows info about the developer`},
        { text: `Usage: whoami`},
        { text: <>Use '<em>whoami -h</em>' to show this help</>}
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
        let result = [...help];
        if(options.length > 1) result[0] = { text: `Unrecognized option ${options.join(" ")}` };
        return result;
    }

    return await parseFile(options[0]);
}

export default whoami;