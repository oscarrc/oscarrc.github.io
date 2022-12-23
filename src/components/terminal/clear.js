const clear = (doClear, options) => {
    const parsedOptions = options.split(" ");
    let result = [];

    if(!options) doClear();
    if(parsedOptions[0] && parsedOptions[0] !== "-h") result.push({ text: `Unrecognized option ${parsedOptions[0]}`})
    if(parsedOptions[0] && parsedOptions[0] === "-h") result.push({ text: `Clears the screen`})
}

export default clear;