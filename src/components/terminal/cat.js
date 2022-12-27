import config from "../../config/github";
import { getFile } from "../../lib/github";

const project = async (queryClient, options) => {
    const help = [
        { text: `Shows the content of the specified file.`},
        { text: `Usage: cat <file path>`},
        { text: `Use 'ls' to get a list of available files and paths.`},       
        { text: <>Use '<em>cat -h</em>' to show this help</> }
    ];

    const notFound = [
        { text: `File on path ${options[0]} does not exist.`},
        { text: <>Use '<em>ls</em>' to get a list of available files and paths.</>}
    ]
    
    const parseFile = async (path, filename) => {
        console.log(path, filename)
        const file = await queryClient.fetchQuery([path, filename], () => getFile(config.user, config.repo, `gh-${path}`, filename));
        if(!file || file.includes("404")) return notFound;
        return file.split("\n").map(l => ({ text: l }))
    }

    if(!options.length || !options) return [{ text: "No file was specified"}]
    if(options.length === 1 && options[0] === "-h") return help;

    if(options.length === 1 && options[0][0] !== "-"){
        const opt = options[0].split("/");
        if(opt.length !== 2) return [{ text: "No such file exists"}]
        else return await parseFile(opt[0], opt[1]);
    }

    if(options.length > 1){
        return [
            ...((options.length > 1 || options[0] !== "-h") && [{ text: `Unrecoginized option ${options.join(" ")}`, classes: "text-error" }]),
            ...help
        ];
    }
}

export default project;