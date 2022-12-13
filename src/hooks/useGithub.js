import { useCallback } from "react";

const useGithub = (user, repo) => {
    const baseUrl = `https://api.github.com/repos`;

    const getFiles = useCallback(async (repo, branch, page, limit = 10) => {
        const files = await fetch(`${baseUrl}/${user}/${repo}/contents?ref=${branch}`)
                            .then( async res => {
                                const temp = await res.json();
                                return temp.filter(i => i.type !== "dir" && i.name.substring(i.name.length - 4) === ".mdx")
                            });
                            
        const pageFiles = files.slice(page, (page + 1)*limit);
        
        const result = await Promise.all(pageFiles.map( async (file) => {
            return await fetch(file.download_url).then( async (res) => await res.text()); 
        }));
        
        return result;
    }, [baseUrl, user])

    const getMedia = (media, branch) => {
        return `https://raw.githubusercontent.com/oscarrc/${repo}/${branch}/${media}`
    }
    
    const getRepoInfo = async (repo) => {
        return await fetch(`https://api.github.com/repos/${user}/${repo}`).then( res => res.json())
    }

    return {
        getRepoInfo,
        getFiles,
        getMedia
    }
}

export default useGithub;