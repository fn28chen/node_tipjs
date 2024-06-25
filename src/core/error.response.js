'use strict'

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
}

const ResponseStatusCode = {
    FORBBIDDEN: 'Bad request',
    CONFLICT: 'Conflict Error',
}

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class ConflictRquestError extends ErrorResponse {
    constructor(message = ResponseStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ResponseStatusCode.FORBBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRquestError,
    BadRequestError,
}