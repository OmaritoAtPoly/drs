const regexValidation = {
  oneLowerCaseLetter: /^(?=.*?[A-Z])/,
  oneUpperCaseLetter: /^(?=.*?[a-z])/,
  oneDigit: /^(?=.*?[0-9])/,
  url: /^(https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$)/,
};

export const phoneRegExp = /^\+?(?:[0-9]●?){3,19}[0-9]$/; // this regular expresion just allow a number between 4 and 20 digits.
export const prefiXRegExp = /^\+?(?:[0-9]●?){0,4}[0-9]$/; // this regular expresion just allow a number between 1 and 5 digits.
export default regexValidation;
