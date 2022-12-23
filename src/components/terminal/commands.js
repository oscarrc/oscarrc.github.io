const cmds = {
    welcome: [
        { text: <>Hi, my name is <strong>Oscar</strong></> },
        { text: <>And I do web development</> },
        { text: "--------------------------------------------------------------" },
        { text: <>Type <i>help</i> for available commands or <i>exit</i> to close the terminal</> }
    ],
    error: [
        {
            text: "Unrecognized command",
            classes: "text-error"
        },
        {
            text: <>Type <i>help</i> for a list of available commands</>
        }
    ],
    help: [
        { text: <>Available commands</> },
        { text: <>&emsp;- about: who am i? </> },
        { text: <>&emsp;- post: retrieve and read one of my articles </> },
        { text: <>&emsp;- project: retrieve and take a look to any of my projects </> },
        { text: <>&emsp;- ls: list available content from posts or projects </> },
        { text: <>---------------------------------------------</> },
        { text: <>&emsp;- clear: clears the screen </> },
        { text: <>&emsp;- exit: closes the terminal </> },
        { text: <>&emsp;- help: shows this menu </> },
        { text: <>&emsp;- history: shows a history of used commands </> },
        { text: <>&emsp;- theme: changes the theme </> },
        { text: <></> },
        { text: <>Use '&lt;command&gt; -h' to see help for any specific command</> },
    ]
}

const commands = (command, options) => {
    return cmds[command] || cmds["error"];
}
    
export default commands;
    