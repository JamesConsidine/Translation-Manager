'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { AddTranslation } from './translationStuff';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "translation-manager" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.addTranslation', async () => {
        // The code you place here will be executed every time your command is executed

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        const splitFileName = editor.document.fileName.split('.') || [];

        if(isValidFile(splitFileName)){
            const docLineCount = editor.document.lineCount - 1;
            const lastCharIndex = editor.document.lineAt(docLineCount).text.length;

            const contents = JSON.parse(editor.document.getText());

            const input = await vscode.window.showInputBox();
            
            if (input){
                try {
                    AddTranslation(contents, input);
        
                    replaceContent(editor, docLineCount, lastCharIndex, contents);
                } catch (error) {
                    vscode.window.showErrorMessage(error.message);
                }
            }
        }
        else {
            vscode.window.showErrorMessage('Translations can only be added to files with a filename ending in .translation.json (case insensitvie)');
        }
    });

    context.subscriptions.push(disposable);
}

function isValidFile(splitFileName: string[]) {
    return splitFileName[splitFileName.length - 1].toUpperCase() === 'JSON' &&
        splitFileName[splitFileName.length - 2].toUpperCase() === 'TRANSLATIONS';
}

function replaceContent(
    editor: vscode.TextEditor, 
    docLineCount: number, 
    lastCharIndex: number, 
    contents: any
) {
    editor.edit((editBuilder) => {
        editBuilder.replace(
            new vscode.Range(
                new vscode.Position(0, 0), 
                new vscode.Position(docLineCount, lastCharIndex)
            ), 
            JSON.stringify(contents, null, 4));
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}