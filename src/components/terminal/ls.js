import config from "../../config/github";
import { getFileList } from "../../lib/github";

const ls = async (queryClient, dir, options) => {    
    const branch = `gh-${options[0]}`;
    const help = [
        { text: `List available content`},
        { text: `Usage: ls <path>`},
        { text: `Valid paths are none, 'posts' and 'projects'`},
        { text: <>Use '<em>ls -h</em>' to show this help</>}
    ];

    if(!options.length || !options) return [{ text: "posts" },{ text: "projects" }];    
    if(options.length === 1 && options[0] === "-h") return help;
    
    if(["posts", "projects"].includes(options[0]) && options.length === 1 ) {
        const files = await queryClient.fetchQuery(["ls", branch], () => getFileList(config.user, config.repo, branch));
        return files.map(f => ({text: f.name}));
    }

    if(options.length > 1 || (options[0] !== "-h" && options[0][0] === "-" )) return [
        { text: `Unrecoginized option ${options.join(" ")}`, classes: "text-error" },
        ...help
    ]
    
    if(!["posts", "projects"].includes(options[0])){
        return [{ text: `No such path ${options.join(" ")}`, classes: "text-error" }];
    } 
}

export default ls;