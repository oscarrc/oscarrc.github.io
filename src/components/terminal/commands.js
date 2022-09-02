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
        { text: <>&emsp; - clear &emsp;&emsp; clears the screen </> },
        { text: <>&emsp; - exit &emsp;&emsp; closes the terminal </> },
        { text: <>&emsp; - help &emsp;&emsp; shows this menu </> },
        { text: <>&emsp; - history &emsp;&emsp; shows a history of used commands </> }
    ]
}

const commands = (command, options) => {
    return cmds[command] || cmds["error"];
}
    
export default commands;
    