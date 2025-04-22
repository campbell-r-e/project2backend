import 'express';

declare module 'express' {
  export interface Request {
    user?: {
      id: string;
      username: string;
      // add any other fields you put in the JWT
    };
  }
}