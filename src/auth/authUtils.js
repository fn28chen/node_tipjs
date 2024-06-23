const JWT = require('jsonwebtoken');

/**
 * Asynchronously creates an access token and a refresh token using RSA private key for signing
 * and verifies the access token with the corresponding RSA public key.
 * 
 * @param {Object} payload - The payload to encode in the JWT.
 * @param {string} publicKey - The RSA public key for verifying the token.
 * @param {string} privateKey - The RSA private key for signing the token.
 * @returns {Promise<Object>} An object containing the access token and refresh token.
 */

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1d',
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7d',
    });

    JWT.verify(accessToken, publicKey, (error, decoded) => {
      if (error) {
        throw new Error('Access token verification failed');
      } else {
        console.log('Access token verified', decoded);
      }
     })

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return error;
  }
}

module.exports = {
  createTokenPair
};