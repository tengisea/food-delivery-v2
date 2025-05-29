import { NextFunction, Request, Response } from "express";

export const authorization =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.params;

    try {
      if (roles.includes(role)) {
        next();
      } else {
        res.status(400).send({ message: "Available for only admins" });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error",
        error: error instanceof Error ? error.message : "unknown error",
      });
    }
  };
