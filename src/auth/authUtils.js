const JWT = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { findByUserId } = require("../services/keyToken.service");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1d",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7d",
    });

    JWT.verify(accessToken, publicKey, (error, decoded) => {
      if (error) {
        throw new Error("Access token verification failed");
      } else {
        console.log("Access token verified", decoded);
      }
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return error;
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  // Step 1: Check userId missing
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Missing userId");
  // Step 2: Get accessToken
  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found userId");
  // Step 3: verity Token
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Missing Access Token");
  // Step 4: Check user in dbs?
  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId) throw new AuthFailureError("Invalid userId");
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw new NotFoundError("Not found userId");
  }
});

module.exports = {
  createTokenPair,
  authentication
};
