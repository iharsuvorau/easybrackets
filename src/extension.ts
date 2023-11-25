import * as vscode from "vscode";
import { isClosingBracket, replaceBrackets } from "./test/brackets";

export function activate(context: vscode.ExtensionContext) {
  let replaceBrackets = vscode.commands.registerCommand("type", async (args) => {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const typedCharacter = args?.text;

    if (
      typedCharacter &&
      isClosingBracket(typedCharacter) &&
      editor.selections.some((selection) => !selection.isEmpty)
    ) {
      await replaceBracketsInSelections(editor, typedCharacter);
    } else {
      vscode.commands.executeCommand("default:type", { text: typedCharacter });
    }
  });

  context.subscriptions.push(replaceBrackets);
}

export function deactivate() {}

async function replaceBracketsInSelections(editor: vscode.TextEditor, typedCharacter: string) {
  await editor
    .edit((editBuilder) => {
      editor.selections.forEach((selection) => {
        if (!selection || selection.isEmpty) {
          return;
        }
        let text = editor.document.getText(selection);
        const newText = replaceBrackets(text, typedCharacter);
        editBuilder.replace(selection, newText);
      });
    })
    .then(() => {
      // include the new brackets into selection and move cursor to the end of the selection
      editor.selections = editor.selections.map((selection) => {
        const newSelection = new vscode.Selection(
          selection.start.line,
          selection.start.character,
          selection.end.line,
          selection.end.character + 1
        );
        return newSelection;
      });
    });
}
