export const passwordLength = (password: string) => password.length > 8;

export const oneLowerLetter = (password: string) => /[a-z]/.test(password);

export const oneUpperLetter = (password: string) => /[A-Z]/.test(password);

export const onNumber = (password: string) => password.match(/\d/);

export const onlyNumbers = (value: string) => /^[0-9]+$/.test(value);
