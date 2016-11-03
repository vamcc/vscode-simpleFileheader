// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');

function padNum(n) {
    return n > 9 ? n : '0' + n
}

// Get current date format yyyy/mm/dd hh:mm
function getDate(date) {
    var date = date || new Date(),
        year = date.getFullYear(),
        month = padNum(date.getMonth() + 1),
        day = padNum(date.getDate()),
        hour  = padNum(date.getHours()),
        min = padNum(date.getMinutes())
    return `${year}/${month}/${day} ${hour}:${min}`
}

function createHeader() {
    const config = vscode.workspace.getConfiguration('fileheader')
    return `/**
 * Created by ${config.Author} on ${getDate()}
 * ${config.Description}
 */
`
}

function insertSth(text) {
    const editor = vscode.window.activeTextEditor;
    editor.edit(editBuilder => {
        try {
            editBuilder.insert(new vscode.Position(0,0), text)
        } catch(e) {
            console.error(e)
        } 
    })
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "fileheader" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    const commands = [
        vscode.commands.registerCommand('extension.simpleFileheader', () => {
            insertSth(createHeader())
        })
    ]

    context.subscriptions.push(...commands);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;