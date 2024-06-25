"use strict";

const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ResponseStatusCode = {
  OK: "Success",
  CREATED: "Created",
};

class SuccessResponse {
  constructor({ message, statusCode, responseStatusCode, metadata = {} }) {
    this.message = !message ? responseStatusCode : message;
    this.status = statusCode;
    this.response = responseStatusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({
      message,
      metadata,
      statusCode: StatusCode.OK,
      responseStatusCode: ResponseStatusCode.OK,
    });
  }

}

class CREATED extends SuccessResponse {
  constructor({ message, metadata, options = {}}) {
    super({
      message,
      metadata,
      statusCode: StatusCode.CREATED,
      responseStatusCode: ResponseStatusCode.CREATED,
    });
    this.options = options;
  }

}

module.exports = {
    OK,
    CREATED,
}