export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number = 400,
    public details?: unknown,
  ) {
    super(message);
  }
}

export const ValidationError = (msg: string, details?: unknown) =>
  new AppError('VALIDATION_ERROR', msg, 400, details);

export const NotFoundError = (msg = 'Resource not found') =>
  new AppError('NOT_FOUND', msg, 404);

export const ConflictError = (msg: string) =>
  new AppError('CONFLICT', msg, 409);

export const BusinessRuleError = (msg: string) =>
  new AppError('BUSINESS_RULE', msg, 422);