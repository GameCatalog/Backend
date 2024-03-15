import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Token not provided' });

  verify(token, process.env.JWT_SECRET as any, (err: any, decoded: any) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    if(decoded) {
      console.log(decoded)
      req.userId = decoded.userId as string
      next();
    }
  });
};

export { verifyToken }