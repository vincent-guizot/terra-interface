"use strict";

class HttpException extends Error {
  constructor(message, status = 500) {
    super(message);
    this.message = message;
    this.status = status;
    this.name = this.constructor.name;
  }
}
class NotFoundException extends HttpException {
  constructor(message = 'Resource Not Found') {
    super(message, 404);
  }
}
class BadRequestException extends HttpException {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}
export { HttpException };
export { NotFoundException };
export { BadRequestException };
