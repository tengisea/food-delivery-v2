import { UserModel } from "../../models";
import { Request, Response } from "express";
import { verifyToken } from "../../utils/jwt-utils";

export const verifyPasswordUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const token = String(req.query.token);

    const decodedtoken = verifyToken(token) as { userId: string };

    const user = await UserModel.findById(decodedtoken.userId);

    if (!user) res.status(400).send({ message: "Bad request" });

    res.redirect(
      `${process.env.FRONTEND_ENDPOINT}/reset-password?token=${decodedtoken.userId}`
    );
  } catch (error) {
    console.error("Error during resetting password:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
