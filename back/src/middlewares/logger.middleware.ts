import { NextFunction, Request, Response } from 'express';

export function LoggerGlobalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  console.log(`[${date} - ${time}] ${req.method} ${req.originalUrl}`);

  next();
}
