import { ActionResult } from '../core/action';
import { State } from '../core/state';

interface ModeHandler {
    handleKey(key: string): ActionResult
}

export function handleKey(state: State, key: string): ActionResult {
    return state.mode.handleKey(key);
}