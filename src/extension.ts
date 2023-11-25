import * as vscode from "vscode";
import { isClosingBracket, isQuote, replaceBrackets, replaceQuotes } from "./test/brackets";

export function activate(context: vscode.ExtensionContext) {
  let replaceBracketsDisposable = vscode.commands.registerCommand("type", async (args) => {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const typedCharacter = args?.text;

    if (typedCharacter && editor.selections.some((selection) => !selection.isEmpty)) {
      if (isClosingBracket(typedCharacter)) {
        await replaceBracketsInSelections(editor, typedCharacter, replaceBrackets);
      } else if (isQuote(typedCharacter)) {
        await replaceBracketsInSelections(editor, typedCharacter, replaceQuotes);
      } else {
        vscode.commands.executeCommand("default:type", { text: typedCharacter });
      }
    } else {
      vscode.commands.executeCommand("default:type", { text: typedCharacter });
    }
  });

  context.subscriptions.push(replaceBracketsDisposable);
}

export function deactivate() {}

async function replaceBracketsInSelections(
  editor: vscode.TextEditor,
  typedCharacter: string,
  modify: (text: string, char: string) => string
) {
  await editor
    .edit((editBuilder) => {
      editor.selections.forEach((selection) => {
        if (!selection || selection.isEmpty) {
          return;
        }
        let text = editor.document.getText(selection);
        const newText = modify(text, typedCharacter);
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
          selection.end.character + (isQuote(typedCharacter) ? 0 : 1)
        );
        return newSelection;
      });
    });
}
