// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { KnightDevProvider } from "./providers/KnightDevProvider";
import delay from "delay";
/*
Built using https://github.com/microsoft/vscode-webview-ui-toolkit

Inspired by
https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/default/weather-webview
https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/frameworks/hello-world-react-cra

*/
let outputChannel;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log('Congratulations, your extension "knight-dev" is now active!')
    outputChannel = vscode.window.createOutputChannel("Knight Dev");
    context.subscriptions.push(outputChannel);
    outputChannel.appendLine("Knight Dev extension activated");
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    // const disposable = vscode.commands.registerCommand("knight-dev.helloWorld", () => {
    // 	// The code you place here will be executed every time your command is executed
    // 	// Display a message box to the user
    // 	vscode.window.showInformationMessage("Hello World from knight-dev!")
    // })
    // context.subscriptions.push(disposable)
    const sidebarProvider = new KnightDevProvider(context, outputChannel);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(KnightDevProvider.sideBarId, sidebarProvider, {
        webviewOptions: { retainContextWhenHidden: true },
    }));
    context.subscriptions.push(vscode.commands.registerCommand("knight-dev.plusButtonTapped", async () => {
        outputChannel.appendLine("Plus button tapped");
        await sidebarProvider.clearTask();
        await sidebarProvider.postStateToWebview();
        await sidebarProvider.postMessageToWebview({ type: "action", action: "chatButtonTapped" });
    }));
    const openKnightDevInNewTab = async () => {
        outputChannel.appendLine("Opening Knight Dev in new tab");
        // (this example uses webviewProvider activation event which is necessary to deserialize cached webview, but since we use retainContextWhenHidden, we don't need to use that event)
        // https://github.com/microsoft/vscode-extension-samples/blob/main/webview-sample/src/extension.ts
        const tabProvider = new KnightDevProvider(context, outputChannel);
        //const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined
        const lastCol = Math.max(...vscode.window.visibleTextEditors.map((editor) => editor.viewColumn || 0));
        // Check if there are any visible text editors, otherwise open a new group to the right
        const hasVisibleEditors = vscode.window.visibleTextEditors.length > 0;
        if (!hasVisibleEditors) {
            await vscode.commands.executeCommand("workbench.action.newGroupRight");
        }
        const targetCol = hasVisibleEditors ? Math.max(lastCol + 1, 1) : vscode.ViewColumn.Two;
        const panel = vscode.window.createWebviewPanel(KnightDevProvider.tabPanelId, "Knight Dev", targetCol, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [context.extensionUri],
        });
        // TODO: use better svg icon with light and dark variants (see https://stackoverflow.com/questions/58365687/vscode-extension-iconpath)
        panel.iconPath = {
            light: vscode.Uri.joinPath(context.extensionUri, "icons", "robot_panel_light.png"),
            dark: vscode.Uri.joinPath(context.extensionUri, "icons", "robot_panel_dark.png"),
        };
        tabProvider.resolveWebviewView(panel);
        // Lock the editor group so clicking on files doesn't open them over the panel
        await delay(100);
        await vscode.commands.executeCommand("workbench.action.lockEditorGroup");
    };
    context.subscriptions.push(vscode.commands.registerCommand("knight-dev.popoutButtonTapped", openKnightDevInNewTab));
    context.subscriptions.push(vscode.commands.registerCommand("knight-dev.openInNewTab", openKnightDevInNewTab));
    context.subscriptions.push(vscode.commands.registerCommand("knight-dev.settingsButtonTapped", () => {
        //const message = "knight-dev.settingsButtonTapped!"
        //vscode.window.showInformationMessage(message)
        sidebarProvider.postMessageToWebview({ type: "action", action: "settingsButtonTapped" });
    }));
    context.subscriptions.push(vscode.commands.registerCommand("knight-dev.historyButtonTapped", () => {
        sidebarProvider.postMessageToWebview({ type: "action", action: "historyButtonTapped" });
    }));
    /*
    We use the text document content provider API to show the left side for diff view by creating a virtual document for the original content. This makes it readonly so users know to edit the right side if they want to keep their changes.

    - This API allows you to create readonly documents in VSCode from arbitrary sources, and works by claiming an uri-scheme for which your provider then returns text contents. The scheme must be provided when registering a provider and cannot change afterwards.
    - Note how the provider doesn't create uris for virtual documents - its role is to provide contents given such an uri. In return, content providers are wired into the open document logic so that providers are always considered.
    https://code.visualstudio.com/api/extension-guides/virtual-documents
    */
    const diffContentProvider = new (class {
        provideTextDocumentContent(uri) {
            return Buffer.from(uri.query, "base64").toString("utf-8");
        }
    })();
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider("knight-dev-diff", diffContentProvider));
    // URI Handler
    const handleUri = async (uri) => {
        const path = uri.path;
        const query = new URLSearchParams(uri.query.replace(/\+/g, "%2B"));
        const visibleProvider = KnightDevProvider.getVisibleInstance();
        if (!visibleProvider) {
            return;
        }
        switch (path) {
            case "/openrouter": {
                const code = query.get("code");
                if (code) {
                    await visibleProvider.handleOpenRouterCallback(code);
                }
                break;
            }
            default:
                break;
        }
    };
    context.subscriptions.push(vscode.window.registerUriHandler({ handleUri }));
}
// This method is called when your extension is deactivated
export function deactivate() {
    outputChannel.appendLine("Knight Dev extension deactivated");
}
//# sourceMappingURL=extension.js.map