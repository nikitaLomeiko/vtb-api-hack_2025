import CryptoJS from 'crypto-js'

export class TokenCrypto {
  constructor(secretKey) {
    this.secretKey = secretKey
  }

  encryptToken(token) {
    try {
      return CryptoJS.AES.encrypt(token, this.secretKey).toString()
    } catch (error) {
      console.error('Encryption error:', error)
      return null
    }
  }

  decryptToken(encryptedToken) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, this.secretKey)
      return bytes.toString(CryptoJS.enc.Utf8)
    } catch (error) {
      console.error('Decryption error:', error)
      return null
    }
  }
}
