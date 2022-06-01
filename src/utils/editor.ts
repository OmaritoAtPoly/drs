// eslint-disable-next-line import/prefer-default-export
export const extractText = (formattedText: string | undefined) => {
  if (formattedText) {
    const value = JSON.parse(formattedText);
    return value.blocks[0].text;
  }
  return "";
};
