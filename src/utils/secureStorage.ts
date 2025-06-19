/**
 * Secure Storage Utility
 * Provides encrypted localStorage functionality for sensitive data
 */

// Simple encryption/decryption using base64 and XOR cipher
// Note: For production, use a more robust encryption library like crypto-js
class SecureStorage {
  private static readonly SECRET_KEY = 'opengateway_secure_key_2024';

  /**
   * Encrypt data using XOR cipher with base64 encoding
   */
  private static encrypt(data: string): string {
    const key = this.SECRET_KEY;
    let encrypted = '';
    
    for (let i = 0; i < data.length; i++) {
      const keyChar = key.charCodeAt(i % key.length);
      const dataChar = data.charCodeAt(i);
      encrypted += String.fromCharCode(dataChar ^ keyChar);
    }
    
    return btoa(encrypted); // Base64 encode
  }

  /**
   * Decrypt data using XOR cipher with base64 decoding
   */
  private static decrypt(encryptedData: string): string {
    try {
      const key = this.SECRET_KEY;
      const encrypted = atob(encryptedData); // Base64 decode
      let decrypted = '';
      
      for (let i = 0; i < encrypted.length; i++) {
        const keyChar = key.charCodeAt(i % key.length);
        const encryptedChar = encrypted.charCodeAt(i);
        decrypted += String.fromCharCode(encryptedChar ^ keyChar);
      }
      
      return decrypted;
    } catch (error) {
      console.error('Failed to decrypt data:', error);
      return '';
    }
  }

  /**
   * Securely store data in localStorage with encryption
   */
  static setItem(key: string, value: string): void {
    try {
      const encryptedValue = this.encrypt(value);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Failed to store encrypted data:', error);
    }
  }

  /**
   * Securely retrieve data from localStorage with decryption
   */
  static getItem(key: string): string | null {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
      
      return this.decrypt(encryptedValue);
    } catch (error) {
      console.error('Failed to retrieve encrypted data:', error);
      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear all items from localStorage
   */
  static clear(): void {
    localStorage.clear();
  }

  /**
   * Check if localStorage is available
   */
  static isAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, 'test');
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}

export default SecureStorage;