import { TextEditor, TextEditorEdit, TextDocument, Selection, Position } from 'vscode';

export const erase = (builder: TextEditorEdit) => (editor: TextEditor) =>
    builder.delete(editor.selection);

export const insertLineAbove = (builder: TextEditorEdit) => (editor: TextEditor) =>
    builder.insert(new Position(editor.selection.start.line, 0), '\n');

export const insertLineBelow = (builder: TextEditorEdit) => (editor: TextEditor) =>
    builder.insert(new Position(editor.selection.start.line + 1, 0), '\n');