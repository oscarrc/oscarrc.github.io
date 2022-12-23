const baseUrl = `https://api.github.com/repos`;

const getMedia = (user, repo, media, branch) => {
    return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${media}`
}

const getRepoInfo = async (user, repo) => {
    return await fetch(`https://api.github.com/repos/${user}/${repo}`).then( res => res.json())
}

const getFile = async (user, repo, branch, filename) => {
    const file = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${filename}`);
    return await file.text();
}

const getFileList = async (user, repo, branch) => {
    const files = await fetch(`${baseUrl}/${user}/${repo}/contents?ref=${branch}`) 
                        .then( async res => {
                            const temp = await res.json();
                            return temp.filter(i => i.type !== "dir" && i.name.substring(i.name.length - 4) === ".mdx")
                        });

    return files;
}

const getFiles = async (user, repo, branch, page, limit) => {
    const files = await getFileList(user, repo, branch);                      
    const pageFiles = !isNaN(page) && limit ? files.slice(page, (page + 1)*limit) : files;
    const lastPage = !isNaN(page) && limit ? Math.ceil((files.length / limit)) - 1 : undefined;
    
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
            last: Math.ceil((files.length / limit) - 1),
            next: page < lastPage ? page + 1 : undefined,
            prev: page > 0 ? page - 1 : undefined
        }
    };
}

export { getFiles, getFile, getFileList, getRepoInfo, getMedia }