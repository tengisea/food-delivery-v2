import { Request, Response } from "express";
import { UserModel } from "../../models";
import { generateNewToken, encryptHash, sendUserPasswordVerificationLink } from "../../utils";

type UserBody = { email: string; password: string };

export const resetPasswordController = async (req: Request, res: Response) => {
try {
  const { email } = req.body as UserBody;

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    res.status(400).send({ message: "Email doesn't exist" });
    return;
  }

  const { _id } = await UserModel.create({
    email
  });

  const token = generateNewToken({ userId: _id });

  await sendUserPasswordVerificationLink(
    `${req.protocol}://${req.get("host")}/auth/verify-password?token=${token}`,
    email
  );

  res.status(201).send({ message: "Success", email });
} catch (error) {
  console.error("Error during resetting password:", error);

  res.status(500).json({
    message: "Internal server error",
    error: error instanceof Error ? error.message : "Unknown Error.",
  });
}
};
