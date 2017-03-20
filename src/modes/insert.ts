import * as vscode from 'vscode';
import { TextEditor, TextEditorCursorStyle } from 'vscode';

export default {
    name: 'Insert Mode',
    cursor: TextEditorCursorStyle.Line,
    hints: [],

    handleKey(key: string) {
        vscode.commands.executeCommand('default:type', { text: key });
        return {};
    }
}