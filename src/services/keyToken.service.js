"use strict";

const { filter } = require("lodash");
const keyTokenModel = require("../models/keyToken.model");
const { Types } = require("mongoose");
class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
      // const publicKeyString = publicKey.toString();
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey: publicKeyString,
      // });
      // return tokens ? tokens.publicKey : null;

      const filter = { user: userId }, update = {
        publicKey,
        privateKey,
        refreshTokenUsed: [],
        refreshToken
      }, options = {
        upsert: true,
        new: true
      }
      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ user: Types.ObjectId(userId)}).lean();
  }

  static removeKeyById = async (id) => {
    return await keyTokenModel.remove(id);
  }
}

module.exports = KeyTokenService;
