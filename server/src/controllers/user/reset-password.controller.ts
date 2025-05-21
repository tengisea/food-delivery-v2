import { Request, Response } from "express";
import { UserModel } from "../../models";
import { encryptHash } from "../../utils";

type UserBody = { userId: string; password: string };

export const resetPasswordController = async (req: Request, res: Response) => {
  try {

    const { password } = req.body as UserBody;
    const token = (req.query.token) as { userId: string };

  const hashedPassword = encryptHash(password);
    await UserModel.findByIdAndUpdate(token, {
      password: hashedPassword,
    });

    res.status(201).send({ message: "Successfully changed the password" });
  } catch (error) {
    console.error("Error during resetting password:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
