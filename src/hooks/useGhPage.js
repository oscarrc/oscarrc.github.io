import * as runtime from "react/jsx-runtime";

import { createContext, useContext, useState } from 'react'

import { evaluate } from "@mdx-js/mdx";
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const GHPageContext = createContext();

const GHPageProvider = ({ children }) => {
    const baseUrl = `https://api.github.com/repos`;
    const [ posts, setPosts ] = useState([]);
    const [ projects, setProjects ] = useState([]);
    
    const parseContent = async (data) => {
        const evaluated = await evaluate(data, { ...runtime, remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] });
        return evaluated;
    }

    const getFiles = async () => {}
    const getMedia = async () => {}
    const getRepoInfo = async () => {}

    const getPosts = async (page = 0, limit = 10) => {
        const pagePosts = posts.slice(page, (page + 1)*limit);

        const result = await Promise.all(pagePosts.map( async (file) => {
            return await fetch(file.download_url).then( async (res) => await res.text()); 
        }));

        const parsed = await Promise.all(posts.map(async p => {
            const evaluated = await parseContent(p);
            evaluated.image = await getMedia(evaluated.image, "gh-posts");
            return evaluated;
        }))

        return parsed
    }

    const getProjects = async (page = 0, limit = 10) => {
        const pageProjects = projects.slice(page, (page + 1)*limit);

        const result = await Promise.all(pageProjects.map( async (file) => {
            return await fetch(file.download_url).then( async (res) => await res.text()); 
        }));

        return result
    }
    
    return (
        <GHPageContext.Provider 
            value={{
                getPosts,
                getProjects
            }}
        >
            { children }
        </GHPageContext.Provider>
    )
}

const useGHPage = () => {
    const context = useContext(GHPageContext);
    if(context === undefined) throw new Error("useGHPage must be used within a GHPageProvider")
    return context;
}

export { GHPageProvider, useGHPage };