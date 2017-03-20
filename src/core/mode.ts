import { TextEditorCursorStyle } from 'vscode';
import { flatten } from '../utils/functional';
import { isString } from '../utils/type-guards';
import { Action, ActionResult } from './action';

export interface Hint {
    key: string,
    text: string
}

export interface KeyDefinition {
    key: string | string[],
    description: string,
    action: ActionResult
}

export interface ActionDefinition {
    key: string | string[],
    description: string,
    action: Action
}

export interface ModeProps {
     cursor: TextEditorCursorStyle,
     name: string,
}

// interfaces apparently can't implement other interfaces, so we have to do a bit of type trickery
export interface ModeConfig_ {
    keys: KeyDefinition[]
}
export type ModeConfig = ModeProps & ModeConfig_;

export interface Mode_ {
    hints: Hint[],
    handleKey(key: string): ActionResult
}
export type Mode = ModeProps & Mode_;


export function defineKey(key: string, description: string, action: ActionResult): KeyDefinition {
    return { key, description, action };
}

export function defineMode(config: Partial<ModeConfig>): Mode {
    const { cursor = TextEditorCursorStyle.Block, name = '?? Mode', keys = [] } = config;
    const keyMap: { [key:string]: Action } = flatten(keys.map(def => isString(def.key) ? [{ ...def, key: def.key }] : def.key.map(k => ({ ...def, key: k })))).reduce((acc, def) => ({ ...acc, [def.key]: def.action }), {});
    const hints = keys.map(def => ({ key: isString(def.key) ? def.key : def.key.join(', '), text: def.description }));

    return {
        cursor,
        name,
        hints,

        handleKey(key: string) {
            const action = keyMap[key];
            return action || {};
        }
    }
}