import * as vscode from 'vscode';
import { TextEditorCursorStyle } from 'vscode';
import { KeyMap } from './core';
import { Action, ActionResult, combine } from '../core/action';
import { KeyDefinition, defineMode, defineKey } from '../core/mode';
import { selection, edit, mode } from '../actions/mutators';
import { move, moveUp, moveDown, moveLeft, moveRight, selectToNextWord, selectToNextWordEnd, selectToPreviousWord, selectLine, selectAll } from '../actions/selection';
import { erase, insertLineAbove, insertLineBelow } from '../actions/edit';
import { undo } from '../actions/history';
import { command } from '../actions/command';
import ReplaceMode from './micromodes/replace';
import ViewMode from './micromodes/view';
import InsertMode from './insert';

const keys: KeyDefinition[] = [

    // Move cursor
    defineKey('h', '', selection (moveLeft)),
    defineKey('j', '', selection (moveDown)),
    defineKey('k', '', selection (moveUp)),
    defineKey('l', '', selection (moveRight)),
    /*
    'g': goto (micromode)

    '&': // align selection cursors
    */

    // Select
    defineKey('w', '', selection (selectToNextWord)),
    defineKey('e', '', selection (selectToNextWordEnd)),
    defineKey('b', '', selection (selectToPreviousWord)),
    defineKey('x', '', selection (selectLine)),
    defineKey('%', '', selection (selectAll)),
    /*
    'm': // select to matching character (micromode)

    '[': // select to object start
    ']': // select to object end

    ';': // reduce selections to cursor
    ' ': // reduce selections to main selection

    '\': // rotate main selection

    'C': // copy selection on next lines

    'z': // restore selections from register
    'Z': // save selections to register
    */


    // Extend selection
    /*
    'H':
    'J':
    'K':
    'L':

    'W':
    'E':
    'B':
    'X':
    'M':

    '{': // extend to object start
    '}': // extend to object end

    'G':
*/
    // Edit
    defineKey('d', '', edit (erase)),
    defineKey('r', '', mode (ReplaceMode)),

    /*
    'c': // change

    '<': // deindent
    '>': // indent

    '`': // convert selections to lower case
    '~': // convert selections to upper case

    '@': // convert tabs to spaces in selections
    */

    // History
    defineKey('u', '', undo),
    /*
    'U': // redo
    '.': // repeat
    */

    // View
    defineKey('v', '', mode (ViewMode)),
    /*
    'V': // move view (locked)
    */

    // Clipboard
    /*
    'y': // yank selection
    'p': // paste after selection
    'P': // paste before selection
    'R': // replace selection with yanked
    */

    // Search-ish
    /*
    '/': // select next regex match (submode)
    '?': // extend with next regex match (submode)
    's': // select regex matches in selection (submode)
    'S': // split selected text on regex matches (submode)

    'n': // select next match from current search pattern
    'N': // extend next match from current search pattern
    '*': // set current search pattern to main selection

    '|': // pipe each selection through filter and replace with output (submode)
    */

    // Macro
    /*
    'q': replay current macro,
    'Q': start or end macro recording
    */

    // Modes
    defineKey('i', '', mode (InsertMode)),
    defineKey('o', 'insert on new line below', combine (edit (insertLineBelow), selection (moveDown), mode (InsertMode))),
    defineKey('O', 'insert on new line above', combine (edit (insertLineAbove), selection (moveUp), mode (InsertMode))),

    defineKey(':', '', command)
    /*
    'I': // insert at beginning of line
    'a': // insert after selection
    'A': // insert at end of line
    
    // Submodes
    '!': // insert output of command
    '$': // pipe each selection through shell command and keep the ones whose command succeed
    */
]

export default defineMode({
    name: 'Normal Mode',
    keys
});