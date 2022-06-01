export const setStringItemAsyncStore = async (
  keyIdentifier: string,
  keyValue: string,
) => {
  localStorage.setItem(keyIdentifier, keyValue);
};

export const getStringItemAsyncStore = async (key: string) =>
  localStorage.getItem(key);

export const storeLocalObjectData = async (
  keyIdentifier: string,
  objValue: Record<string, unknown>,
) => {
  const jsonValue = JSON.stringify(objValue);
  localStorage.setItem(keyIdentifier, jsonValue);
};

export enum AsyncStorageKeys {
  USER_TOKEN_KEY_STORE = "USER_TOKEN_KEY_STORE",
  REFETCH_CARDS_KEY_STORE = "REFETCH_CARDS_KEY_STORE",
  USER_LEGAL_ID_KEY_STORE = "USER_LEGAL_ID_KEY_STORE",
  USER_EMAIL_KEY_STORE = "USER_EMAIL_KEY_STORE",
  PLAN_EXPIRED_STORE = "PLAN_EXPIRED_STORE",
}
