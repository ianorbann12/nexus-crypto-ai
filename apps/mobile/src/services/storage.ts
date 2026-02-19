// Secure storage wrapper for sensitive data
// Uses react-native-encrypted-storage under the hood

const storage = {
  async setItem(key: string, value: string): Promise<void> {
    // TODO: Use EncryptedStorage.setItem(key, value)
  },
  async getItem(key: string): Promise<string | null> {
    // TODO: Use EncryptedStorage.getItem(key)
    return null;
  },
  async removeItem(key: string): Promise<void> {
    // TODO: Use EncryptedStorage.removeItem(key)
  },
};

export default storage;
