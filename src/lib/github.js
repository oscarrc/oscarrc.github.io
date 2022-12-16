const baseUrl = `https://api.github.com/repos`;

const getMedia = (repo, media, branch) => {
    return `https://raw.githubusercontent.com/oscarrc/${repo}/${branch}/${media}`
}

const getRepoInfo = async (user, repo) => {
    return await fetch(`https://api.github.com/repos/${user}/${repo}`).then( res => res.json())
}

const getFiles = async (user, repo, branch, page, limit = 10) => {
    const files = await fetch(`${baseUrl}/${user}/${repo}/contents?ref=${branch}`)
                        .then( async res => {
                            const temp = await res.json();
                            return temp.filter(i => i.type !== "dir" && i.name.substring(i.name.length - 4) === ".mdx")
                        });
                      
    const pageFiles = files.slice(page, (page + 1)*limit);
    const lastPage = Math.ceil((files.length / limit)) - 1;
    
    const result = await Promise.all(pageFiles.map( async (file) => {
        return await fetch(file.download_url).then( async (res) => {
            return {
                file: await res.text(),
                slug: file.name
            }
        }); 
    }));
    
    return {
        docs: result,
        pages: {
            current: page,
            last: (files.length / limit) - 1,
            next: page < lastPage ? page + 1 : undefined,
            prev: page > 0 ? page - 1 : undefined
        }
    };
}

export { getFiles, getRepoInfo, getMedia }