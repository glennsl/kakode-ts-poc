import * as vscode from 'vscode';
import { TextEditor } from 'vscode';
import commands from '../commands';

export const command =
    ({ action: (e: TextEditor) => vscode.window.showQuickPick(commands, { placeHolder: ': command mode' }).then(item => item && item.action()) });