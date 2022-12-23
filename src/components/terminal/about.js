import { config } from "../../config/github";
import { getFile } from "../../lib/github";

const about = async ({ queryClient, options }) => {
    const parsedOptions = options.split(" ");
   
    const help = [
        { text: `Shows info about the developer`},
        { text: `Usage: about`},
        { text: `Use 'about -h' to show this help`}
    ];

    if(parsedOptions.length > 0 || parsedOptions[0] === "-h"){
        return [
            ...(parsedOptions.length > 0  && { text: "Unrecognized option", classes: "text-error" }),
            ...help
        ];
    }else{
        const file = await queryClient.fetchQuery(["about"], getFile(config.user, config.user, "master", "README.md"));
        return file;
    }
}

export default about;