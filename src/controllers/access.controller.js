"use strict";

const AccessService = require("../services/access.service");
const { OK, CREATED } = require("../core/success.response");

class AccessController {
  login = async (req, res, next) => {
    new OK({
      message: "User logged in successfully",
      metadata: await AccessService.login(req.body),
      options: {
        limit: 10,
      }
    }).send(res);
  }
  signUp = async (req, res, next) => {
    new CREATED({
      message: "User created successfully",
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      }
    }).send(res);
  };
  logout = async (req, res, next) => {
    new OK({
      message: "User logged out successfully",
      metadata: await AccessService.logout(req.keyStore),
      options: {
        limit: 10,
      }
    }).send(res);
  };
  refreshToken = async (req, res, next) => {
    new OK({
      message: "User refreshed token successfully",
      metadata: await AccessService.handlerRefreshToken(req.body),
      options: {
        limit: 10,
      }
    }).send(res);
  }
}

module.exports = new AccessController();
