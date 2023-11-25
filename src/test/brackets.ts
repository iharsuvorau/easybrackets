export function replaceBrackets(text: string, newClosingBracket: string) {
  const newOpeningBracket = getOpeningBracket(newClosingBracket);
  const newText = text.replace(/^[\{\(\[<'"`]|[\}\)\]>'"`]$/g, "");
  return `${newOpeningBracket}${newText}${newClosingBracket}`;
}

export function isClosingBracket(character: string) {
  return openingBracketMap.has(character);
}

const closingBracketMap = new Map([
  ["{", "}"],
  ["(", ")"],
  ["[", "]"],
  ["<", ">"],
  //   ['"', '"'],
  //   ["'", "'"],
  //   ["`", "`"],
]);

const openingBracketMap = new Map([
  ["}", "{"],
  [")", "("],
  ["]", "["],
  [">", "<"],
  //   ['"', '"'],
  //   ["'", "'"],
  //   ["`", "`"],
]);

function getClosingBracket(openingBracket: string) {
  return closingBracketMap.get(openingBracket) || "";
}

function getOpeningBracket(closingBracket: string) {
  return openingBracketMap.get(closingBracket) || "";
}
