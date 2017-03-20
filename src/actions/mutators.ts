import { TextEditor, TextEditorEdit, TextDocument, Selection, Position } from 'vscode';
import { Mode } from '../core/mode';

type SelectionAction = (s: Selection) => (e: TextEditor) => Selection
type EditAction = (b: TextEditorEdit) => (e: TextEditor) => void;

export const selection = (action: SelectionAction) => 
    ({ action: (editor: TextEditor) => Promise.resolve(editor.selection = action (editor.selection) (editor)) });

export const edit = (action: EditAction) =>
    ({ action: (editor: TextEditor) => editor.edit(builder => action (builder) (editor)) });

export const mode = (mode: Mode) =>
    ({ state: { mode }});