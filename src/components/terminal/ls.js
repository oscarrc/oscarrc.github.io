import config from "../../config/github";
import { getFileList } from "../../lib/github";
import folders from "../../config/folders";

const ls = async (queryClient, dir, options) => {    
    const branch = `gh-${options?.[0] || dir}`;
    const help = [
        { text: `List available content`},
        { text: `Usage: ls <path>`},
        { text: `Valid paths are none, 'posts' and 'projects'`},
        { text: <>Use '<em>ls -h</em>' to show this help</>}
    ];

    const getFiles = async () => {
        const files = await queryClient.fetchQuery(["ls", branch], () => getFileList(config.user, config.repo, branch));
        return files.map(f => ({text: f.name}));
    }

    if(!options.length && !dir) return folders.map(a => ({text: a}));
    if(options.length === 1 && options[0] === "-h") return help;    
    if(options.length > 1 || (options?.[0] !== "-h" && options?.[0]?.[0] === "-" )){
        return [
            { text: `Unrecoginized option ${options.join(" ")}`, classes: "text-error" },
            ...help
        ]
    }
    if(
        (dir && !options.length && folders.includes(dir)) ||
        (options.length && !dir && folders.includes(options[0]))
    ) return await getFiles();
    
    
    if(!folders.includes(options[0]) || !folders.includes(dir) || (options && dir)){
        return [{ text: `No such path ${dir && `${dir}/`}${options.join("/")}`, classes: "text-error" }];
    } 
}

export default ls;