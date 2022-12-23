import themes from "daisyui/src/colors/themes";

const theme = (toggle, options) => {
    const availableThemes = themes.map(t => t.name);
    const parsedOptions = options.split(" ");
    let result = []

    if(!availableThemes.includes(parsedOptions[0]) && parsedOptions[0] !== "-h") result.push({ text: `Unrecognized theme ${parsedOptions[0]}`})
    if(parsedOptions[0] === "-h") result = [...result, { text: 'Usage: theme <theme_name>'}, { text: `Valid themes are ${themes.join(', ')}`}]
    else {
        toggle(parsedOptions[0]);
        result.push({ text: `Theme ${parsedOptions[0]} set`})
    }

    return result;
}

export default theme;