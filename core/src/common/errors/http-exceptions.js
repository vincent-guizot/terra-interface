"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = exports.NotFoundException = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, status = 500) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = this.constructor.name;
    }
}
exports.HttpException = HttpException;
class NotFoundException extends HttpException {
    constructor(message = 'Resource Not Found') {
        super(message, 404);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends HttpException {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}
exports.BadRequestException = BadRequestException;
