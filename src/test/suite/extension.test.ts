import * as assert from "assert";

import * as vscode from "vscode";
import { replaceBrackets, replaceQuotes } from "../brackets";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Replace brackets", () => {
    assert.strictEqual(replaceBrackets("(foo)", "}"), "{foo}");
    assert.strictEqual(replaceBrackets("{foo}", ")"), "(foo)");
    assert.strictEqual(replaceBrackets("(foo)", "]"), "[foo]");
    assert.strictEqual(replaceBrackets("{foo}", ">"), "<foo>");
  });

  test("Replace quotes", () => {
    assert.strictEqual(replaceQuotes("'foo'", '"'), '"foo"');
    assert.strictEqual(replaceQuotes('"foo"', "'"), "'foo'");
    assert.strictEqual(replaceQuotes("`foo`", '"'), '"foo"');
  });
});
