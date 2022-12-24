import themes from "../../config/themes";

const theme = (toggle, options) => {
    const availableThemes = themes.map(t => t.name);
    let result = []

    if(!availableThemes.includes(options[0]) && options[0] !== "-h") result.push({ text: `Unrecognized theme ${options[0]}`})
    else if(options[0] === "-h") result = [...result, { text: 'Usage: theme <theme_name>'}, { text: `Valid themes are ${availableThemes.join(', ')}`}]
    else {
        toggle(options[0]);
        result.push({ text: `Theme ${options[0]} set`})
    }

    return result;
}

export default theme;