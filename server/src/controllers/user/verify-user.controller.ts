import { UserModel } from "../../models";
import { Request, Response } from "express";
import { verifyToken } from "../../utils/jwt-utils";

export const verifyUserController = async (req: Request, res: Response) => {
  try {
    const token = String(req.query.token);

    const decodedtoken = verifyToken(token) as { userId: string };

    await UserModel.findByIdAndUpdate(
      decodedtoken.userId,
      {
        isVerified: true,
        ttl: Date.now() + 10 * 365 * 24 * 60 * 60 * 1000,
      },
      { new: true }
    );

    res.redirect(`${process.env.FRONTEND_ENDPOINT}/login`);
  } catch (error) {
    console.error("Error during resetting password:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
