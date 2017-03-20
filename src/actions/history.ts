import * as vscode from 'vscode';
import { TextEditor } from 'vscode';

export const undo = ({ action: (e: TextEditor) => vscode.commands.executeCommand('undo') });