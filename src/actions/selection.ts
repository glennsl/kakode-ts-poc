import { TextEditor, TextEditorEdit, TextDocument, Selection, Position } from 'vscode';
import { categorizeChar, isOnBoundary, isPunctuation, isWhitespace, isWord } from '../core/text';
import { DocumentIterator } from '../core/iterator';

export const move = (v: number) => (h: number) =>
    (selection: Selection) => (editor: TextEditor) => {
        const p = selection.active.translate (v, h);
        return new Selection (p, p)
    }

export const moveUp = move (-1) (0);
export const moveDown = move (1) (0);
export const moveLeft = move (0) (-1);
export const moveRight = move (0) (1);

export const selectToNextWord = (selection: Selection) => (editor: TextEditor) => {
    const iterator = DocumentIterator(editor.document, editor.selection.active);

    if (iterator.isEof())
        return selection;

    if (isOnBoundary(iterator))
        iterator.advance();

    while (iterator.isEol())
        iterator.advance();

    const start = iterator.pos();
    iterator.advance();

    if (iterator.current().map(isPunctuation).isSome())
        iterator.advanceWhile(isPunctuation);
    else
        iterator.advanceWhile(isWord);
    
    iterator.advanceWhile(isWhitespace);

    return new Selection(start, iterator.pos());
}

export const selectToNextWordEnd = (selection: Selection) => (editor: TextEditor) => {
    const iterator = DocumentIterator(editor.document, editor.selection.active);

    if (iterator.isEof())
        return selection;

    if (isOnBoundary(iterator))
        iterator.advance();

    while (iterator.isEol())
        iterator.advance();

    const start = iterator.pos();
    iterator.advance();

    iterator.advanceWhile(isWhitespace);

    if (iterator.current().map(isPunctuation).isSome())
        iterator.advanceWhile(isPunctuation);
    else
        iterator.advanceWhile(isWord);

    return new Selection(start, iterator.pos());
}

export const selectToPreviousWord = (selection: Selection) => (editor: TextEditor) => {
    const iterator = DocumentIterator(editor.document, editor.selection.active);

    if (iterator.isBof())
        return selection;

    iterator.retreat();
    if (!isOnBoundary(iterator))
        iterator.advance();

    while (iterator.isEol())
        iterator.retreat();

    const end = iterator.pos();

    iterator.retreatWhile(isWhitespace);

    if (iterator.current().map(isPunctuation).isSome())
        iterator.retreatWhile(isPunctuation);
    else
        iterator.retreatWhile(isWord);
    

    return new Selection(iterator.pos(), end);
}

export const selectLine = (selection: Selection) => (editor: TextEditor) => {
    const cursor = editor.selection.active;
    const line = editor.document.lineAt(cursor).text;
    return new Selection(cursor.with(undefined, 0), cursor.with(undefined, line.length))
}

export const selectAll = (selection: Selection) => (editor: TextEditor) => {
    const lastLineIndex = editor.document.lineCount - 1;
    const start = new Position(0, 0);
    const end = new Position(lastLineIndex, editor.document.lineAt(lastLineIndex).text.length);
    return new Selection(start, end);
}