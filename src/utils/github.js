const getFiles = async (branch, page, limit = 10) => {
    const files = await fetch(`https://api.github.com/repos/oscarrc/oscarrc.github.io/contents?ref=${branch}`).then( res => res.json());
    const page = files.slice(page, (page + 1)*limit);
    const result = [];

    for (const file of files) {
        const contents = await fetch(file.download_url);        
        result.push(contents)
    }

    return result;
}

const getRepoInfo = async (user, repo) => {
    return await fetch(`https://api.github.com/repos/${user}/${repo}`).then( res => res.json())
}

export {
    getFiles,
    getRepoInfo
}