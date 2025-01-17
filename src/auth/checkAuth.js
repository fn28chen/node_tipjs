'use strict'
const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const { findById } = require("../services/apiKey.service");

const apiKey = async(req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden 1'
            });
        }

        const objKey = await findById(key);
        if(!objKey) {
            return res.status(403).json({
                message: 'Forbidden 2'
            });
        }
        req.objKey = objKey;
        next();
    } catch (error) {
        
    }
}

const permission = (permissions) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission denied'
            });
        }
        console.log(`Permissions: `, req.objKey.permissions);
        const validPermission = req.objKey.permissions.includes(permissions);
        if (!validPermission) {
            return res.status(403).json({
                message: 'Permission denied'
            });
        }
        return next();
    }
}

const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

module.exports = {
    apiKey,
    permission,
    asyncHandler
}