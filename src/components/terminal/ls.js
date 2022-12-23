import { config } from "../../config/github";
import { getFileList } from "../../lib/github";

const ls = async ({ queryClient, options }) => {
    const parsedOptions = options.split(" ");
    const branch = `gh-${parsedOptions[0]}`;
    const help = [
        { text: `List available specified content`},
        { text: `Usage: ls <content>`},
        { text: `Valid contents are 'posts' and 'projects'`},
        { text: `Use 'ls -h' to show this help`}
    ];
    
    if(parsedOptions.length > 1 || parsedOptions[0] === "-h" || !["posts", "projects"].includes(parsedOptions[0])){
        return [
            ...(!["posts", "projects"].includes(parsedOptions[0]) && { text: "Unrecognized option", classes: "text-error" }),
            ...help
        ];
    }else{
        const files = await queryClient.fetchQuery(["ls", branch], getFileList(config.user, config.repo, branch));
        return files.map(f => ({text: f.name}));
    }
}

export default ls;