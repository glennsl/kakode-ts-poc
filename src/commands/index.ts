import * as vscode from 'vscode';
import { flatten } from '../utils/functional';

function defineCommand(commands: string[], description: string, action: () => void) {
    return commands.map(label => ({ label, description, action }));
}

export default flatten([
    defineCommand(['edit', 'e'], 'find and open file',
        () => vscode.commands.executeCommand('workbench.action.quickOpen')),

/* brokem, alias 'edit' command?
    defineCommand(['buffer', 'b'], 'find and open tab',
        () => {
            const openEditors = vscode.window.visibleTextEditors;
            const items = openEditors.map(editor => ({ editor, label: editor.document.fileName, description: editor.document.fileName }));
            vscode.window.showQuickPick(items).then(item => item && item.editor.show());
        }),
*/

    defineCommand(['buffernext', 'bn'], 'switch to next tab',
        () => vscode.commands.executeCommand('workbench.action.nextEditor')),

    defineCommand(['bufferprev', 'bp'], 'switch to previous tab',
        () => vscode.commands.executeCommand('workbench.action.previousEditor')),

    defineCommand(['delbuf', 'db'], 'close tab',
        () => vscode.commands.executeCommand('workbench.action.closeActiveEditor')),

    defineCommand(['write', 'w'], 'save current file',
        () => vscode.commands.executeCommand('workbench.action.files.save')),

    defineCommand(['writeall', 'wa'], 'save all files',
        () => vscode.commands.executeCommand('workbench.action.files.saveAll')),

    defineCommand(['writeas'], 'save current file as',
        () => vscode.commands.executeCommand('workbench.action.files.saveAs')),

    defineCommand(['quit', 'q'], 'exit vscode',
        () => vscode.commands.executeCommand('workbench.action.quit')),

    defineCommand(['wq'], 'save current file and quit',
        () => vscode.commands.executeCommand('workbench.action.files.save') && vscode.commands.executeCommand('workbench.action.quit')),

    defineCommand(['waq'], 'save all files and quit',
        () => vscode.commands.executeCommand('workbench.action.saveAll') && vscode.commands.executeCommand('workbench.action.quit')),
]);