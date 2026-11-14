export class HttpException extends Error {
  constructor(public message: string, public status: number = 500) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Resource Not Found') {
    super(message, 404);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
  }
}
