import * as vscode from 'vscode';
import { StatusBarAlignment, QuickPickItem } from 'vscode';
import * as mode from './modes';
import NormalMode from './modes/normal';
import { State } from './core/state';

const initialState: State = {
   mode: NormalMode
}

interface Command_ {
    action: () => void
}
type Command = Command_ & QuickPickItem;


const clippy = [
    ' ╭──╮   ',
    ' │  │   ',
    ' @  @  ╭',
    ' ││ ││ │',
    ' ││ ││ ╯',
    ' │╰─╯│  ',
    ' ╰───╯  ',
    '        '
];

function formatClippy(lines: string[]): string {
    if (lines.length === 0)
        return '';

    const lineCount = Math.max(lines.length, clippy.length - 1);
    return [...Array(lineCount).keys()].map(n => `${clippy[Math.min(n, clippy.length)]}| ${lines[n] || ''}`).join('\n');
}

class ModeMachine {
    private _state = initialState;
    private _modeIndicator: vscode.StatusBarItem;
    private _hints: vscode.StatusBarItem;
    private _clippy: vscode.OutputChannel;

    constructor() {
        this._modeIndicator = vscode.window.createStatusBarItem(StatusBarAlignment.Left, 20);
        this._modeIndicator.show();

        this._hints = vscode.window.createStatusBarItem(StatusBarAlignment.Left, 10);
        this._hints.text = 'Test';
        this._hints.command = 'kak.openClippy';
        this._hints.show();

        this._clippy = vscode.window.createOutputChannel('clippy');
        vscode.commands.registerCommand('kak.openClippy', () => this._clippy.show());

        this.sync();
    }

    handleKey(key: string) {
        const editor = vscode.window.activeTextEditor;

        if (!editor)
            return;

        try {
            const result = mode.handleKey(this._state, key);

            if (result.action)
                result.action(editor);

            if (result.state) {
                this._state = result.state;
                this.sync();
            }

        } catch (err) {
            console.error(err);
        }
    }

    escape() {
        this._state = {
            ...this._state,
            mode: NormalMode
        };
        this.sync();
    }

    sync() {
        const mode = this._state.mode;

        if (vscode.window.activeTextEditor)
            vscode.window.activeTextEditor.options.cursorStyle = mode.cursor;

        this._modeIndicator.text = `-- ${mode.name.toUpperCase()} --`;

        const formattedHints = mode.hints.filter(_ => !!_.text).map(hint => `${hint.key}: ${hint.text}`);
        this._hints.text = this._hints.tooltip = formattedHints.join('; ');
        this._clippy.clear();
        this._clippy.append(formatClippy(formattedHints));
    }
}

export function activate(context: vscode.ExtensionContext) {

    const modeMachine = new ModeMachine();

    const disposables = [
        vscode.window.onDidChangeActiveTextEditor(() => modeMachine.sync()),
        vscode.commands.registerCommand('type', ({ text }) => modeMachine.handleKey(text)),
        vscode.commands.registerCommand('kak.escape', () => modeMachine.escape()),
    ];

    disposables.forEach(_ => context.subscriptions.push(_));
}