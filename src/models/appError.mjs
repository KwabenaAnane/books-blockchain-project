export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    switch (statusCode) {
      case 400:
        this.status = 'Bad Request, information not found';
        break;
      case 401:
        this.status = 'Unauthorized, log in first';
        break;
      case 403:
        this.status = 'Unauthorized';
        break;
      case 404:
        this.status = 'Block not found';
        break;
      case statusCode.toString().startsWith('5'):
        this.status = 'Internal Server Error';
        break;
      default:
        this.status = 'Failed';
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
