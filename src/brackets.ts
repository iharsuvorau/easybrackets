export function replaceBrackets(text: string, newClosingBracket: string) {
  const newOpeningBracket = getOpeningBracket(newClosingBracket);
  const newText = text.replace(/^[\{\(\[<'"`]|[\}\)\]>'"`]$/g, "");
  return `${newOpeningBracket}${newText}${newClosingBracket}`;
}

export function replaceQuotes(text: string, newQuote: string) {
  const newText = text.replace(/^['"`]|['"`]$/g, "");
  return `${newQuote}${newText}${newQuote}`;
}

export function isClosingBracket(character: string) {
  return closingToOpeningBracketMap.has(character);
}

export function isQuote(character: string) {
  return quotes.includes(character);
}

const openingToClosingBracketMap = new Map([
  ["{", "}"],
  ["(", ")"],
  ["[", "]"],
  ["<", ">"],
]);

const closingToOpeningBracketMap = new Map([
  ["}", "{"],
  [")", "("],
  ["]", "["],
  [">", "<"],
]);

const quotes = ["'", '"', "`"];

function getClosingBracket(openingBracket: string) {
  return openingToClosingBracketMap.get(openingBracket) || "";
}

function getOpeningBracket(closingBracket: string) {
  return closingToOpeningBracketMap.get(closingBracket) || "";
}
