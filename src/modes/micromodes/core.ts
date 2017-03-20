import { TextEditorCursorStyle } from 'vscode';
import { Action } from '../../core/action';
import { ActionDefinition, defineMode } from '../../core/mode';
import NormalMode from '../normal';

export const defineKey = (key: string | string[], description: string, action: Action) => ({ key, description, action });

export const defineMicroMode = (name: string, keys: ActionDefinition[]) => 
    defineMode({
        name,
        cursor: TextEditorCursorStyle.Block,
        keys: keys.map(({ key, description, action }) => ({ key, description, action: ({ action, state: { mode: NormalMode } }) })),
    });