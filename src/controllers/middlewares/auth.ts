import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token: any = req.headers["access-token"];
    if (!token) return res.status(401).json({ message: "로그인 되어있지 않음" });
    jwt.verify(token, req.app.get("jwt-secret"), (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: "로그인 되어있지 않음" });
      (<any>req).decoded = decoded;
      next();
    });
  };