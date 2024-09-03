// src/express.d.ts

import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Add custom user property to the Request interface
    }
  }
}
