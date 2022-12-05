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
        { text: <>&emsp;- blog: what I've written about? </> },
        { text: <>&emsp;- projects: what I've made? </> },
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
    