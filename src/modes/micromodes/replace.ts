import { TextEditor, TextEditorCursorStyle, Range, Position } from 'vscode';
import { Action } from '../../core/action';
import NormalMode from '../normal';

export default {
    name: 'Replace Mode',
    cursor: TextEditorCursorStyle.Block,
    hints: [],

    handleKey(key: string) {
        return {
            action: (editor: TextEditor) =>
                editor.edit(b => 
                    editor.selections.forEach(s => {
                        for (let i = s.start.line; i <= s.end.line; i++)  {
                            const start = i === s.start.line ? s.start.character : 0;
                            let end = i === s.end.line ? s.end.character : editor.document.lineAt(i).text.length;
                            if (start === end)
                                end++;
                            const range = new Range(new Position(i, start), new Position(i, end));
                            const length = end - start;
                            b.replace(range, key.repeat(length));
                        }
                    })
                ),
            state: { mode: NormalMode }
        }
    }
}