const getFiles = async (branch, page, limit = 10) => {
    const files = await fetch(`https://api.github.com/repos/oscarrc/oscarrc.github.io/contents?ref=${branch}`)
                        .then( async res => {
                            let temp = await res.json();
                            return temp.filter(i => i.name.substring(i.name.length - 4) === ".mdx")
                        });
                        
    const pageFiles = files.slice(page, (page + 1)*limit);

    const result = await Promise.all(pageFiles.map( async (file) => {
        return await fetch(file.download_url).then( res => res.text()); 
    }));
    
    return result;
}

const getRepoInfo = async (user, repo) => {
    return await fetch(`https://api.github.com/repos/${user}/${repo}`).then( res => res.json())
}

export {
    getFiles,
    getRepoInfo
}