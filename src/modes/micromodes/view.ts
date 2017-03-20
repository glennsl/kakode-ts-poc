import * as vscode from 'vscode';
import { TextEditor, TextEditorCursorStyle, TextEditorRevealType, Range, Position } from 'vscode';
import { Action } from '../../core/action';
import NormalMode from '../normal';
import { defineMicroMode, defineKey } from './core';

const selectionCenter = (editor: TextEditor) => {
    const selection = editor.selection;
    const range = new Range(selection.start, selection.end);
    editor.revealRange(range, TextEditorRevealType.InCenter);
    return Promise.resolve();
}

const selectionTop = (editor: TextEditor) => {
    const lineNumber = editor.selection.start.line;
    vscode.commands.executeCommand('revealLine', { lineNumber, at: 'top' })
    return Promise.resolve();
}

const selectionBottom = (editor: TextEditor) => {
    const lineNumber = editor.selection.end.line;
    vscode.commands.executeCommand('revealLine', { lineNumber, at: 'bottom' })
    return Promise.resolve();
}

const scrollDown = (editor: TextEditor) => {
    vscode.commands.executeCommand('editorScroll', { to: 'down', by: 'line', value: 1 });
    return Promise.resolve();
}

const scrollUp = (editor: TextEditor) => {
    vscode.commands.executeCommand('editorScroll', { to: 'up', by: 'line', value: 1 });
    return Promise.resolve();
}

export default defineMicroMode('View Mode', [
    defineKey(['v', 'c'], 'center cursor', selectionCenter),
    defineKey('t', 'cursor on top', selectionTop),
    defineKey('b', 'cursor on bottom', selectionBottom),
    defineKey('j', 'scroll down', scrollDown),
    defineKey('k', 'scroll up', scrollUp),

    /*
    defineKey('m', 'center cursor (horizontal)', selectionCenterHorizontal),
    defineKey('h', 'scroll left', scrollLeft),
    defineKey('l', 'scroll right', scrollRight),
    */
]);