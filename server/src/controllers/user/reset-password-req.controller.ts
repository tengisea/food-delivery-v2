import { Request, Response } from "express";
import { UserModel } from "../../models";
import {
  generateNewToken,
  sendUserPasswordVerificationLink,
} from "../../utils";

type UserBody = { email: string };

export const requestResetPasswordController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body as UserBody;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      res.status(400).send({ message: "Email doesn't exist" });
      return;
    }

    const token = generateNewToken({ userId: existingUser._id });

    await sendUserPasswordVerificationLink(
      `${req.protocol}://${req.get(
        "host"
      )}/auth/verify-reset-password-request?token=${token}`,
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
