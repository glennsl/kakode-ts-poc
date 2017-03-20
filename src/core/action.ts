import { TextEditor } from 'vscode';
import { State } from './state';

export type Action = (e: TextEditor) => Thenable<any>;

export interface ActionResult {
    action?: Action,
    state?: State
}


function combineActions(a: Action | undefined, b: Action | undefined): Action | undefined {
    if (a)
        if (b)
            return e => a(e).then(() => b(e));
        else
            return a;
    else
        return b;
}

export function combine(first: ActionResult, ...rest: ActionResult[]): ActionResult {
    return rest.reduce((acc, next) => ({ ...acc, ...next, action: combineActions(acc.action, next.action) }), first);
}