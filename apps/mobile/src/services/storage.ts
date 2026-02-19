import EncryptedStorage from 'react-native-encrypted-storage';

const KEYS = {
  ACCESS_TOKEN: 'nexus_access_token',
  REFRESH_TOKEN: 'nexus_refresh_token',
  USER: 'nexus_user',
  BIOMETRIC_ENABLED: 'nexus_biometric_enabled',
} as const;

const storage = {
  async setItem(key: string, value: string): Promise<void> {
    await EncryptedStorage.setItem(key, value);
  },

  async getItem(key: string): Promise<string | null> {
    return (await EncryptedStorage.getItem(key)) ?? null;
  },

  async removeItem(key: string): Promise<void> {
    await EncryptedStorage.removeItem(key);
  },

  async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
    await EncryptedStorage.setItem(KEYS.ACCESS_TOKEN, accessToken);
    await EncryptedStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
  },

  async getTokens(): Promise<{ accessToken: string; refreshToken: string } | null> {
    const accessToken = await EncryptedStorage.getItem(KEYS.ACCESS_TOKEN);
    const refreshToken = await EncryptedStorage.getItem(KEYS.REFRESH_TOKEN);
    if (!accessToken || !refreshToken) return null;
    return { accessToken, refreshToken };
  },

  async clearTokens(): Promise<void> {
    await EncryptedStorage.removeItem(KEYS.ACCESS_TOKEN);
    await EncryptedStorage.removeItem(KEYS.REFRESH_TOKEN);
  },

  async saveUser(user: object): Promise<void> {
    await EncryptedStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  async getUser<T>(): Promise<T | null> {
    const raw = await EncryptedStorage.getItem(KEYS.USER);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  },

  async clearAll(): Promise<void> {
    await EncryptedStorage.clear();
  },

  async setBiometricEnabled(enabled: boolean): Promise<void> {
    await EncryptedStorage.setItem(KEYS.BIOMETRIC_ENABLED, String(enabled));
  },

  async isBiometricEnabled(): Promise<boolean> {
    const value = await EncryptedStorage.getItem(KEYS.BIOMETRIC_ENABLED);
    return value === 'true';
  },

  KEYS,
};

export default storage;
