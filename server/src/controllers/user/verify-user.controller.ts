import { UserModel } from "../../models";
import { Request, Response } from "express";
import { verifyToken } from "../../utils/jwt-utils";

export const verifyUserController = async (req: Request, res: Response) => {
  const token = String(req.query.token);

  const decodedtoken = verifyToken(token) as { userId: string };

  await UserModel.findByIdAndUpdate(decodedtoken.userId, {
    isVerified: true,
    ttl: Date.now() + 10 * 365 * 24 * 60 * 60 * 1000,
  }, {new: true});

  res.redirect(`${process.env.FRONTEND_ENDPOINT}/login`);
};
