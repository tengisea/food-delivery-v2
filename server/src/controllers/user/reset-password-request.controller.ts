import { Request, Response } from "express";
import { UserModel } from "../../models";
import { generateNewToken, encryptHash, sendUserVerificationLink, sendUserPasswordVerificationLink } from "../../utils";

type UserBody = { email: string; password: string };

export const resetPasswordController = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserBody;

  const existingUser = await UserModel.findOne({ email });

  if(!existingUser) {
    res.status(400).send({ message: "Email doesn't exist" });
    return;
  }

  const hashedPassword = encryptHash(password);

  const { _id } = await UserModel.create({
    email,
    password: hashedPassword,
  });

  const token = generateNewToken({ userId: _id})

  await sendUserPasswordVerificationLink(`${req.protocol}://${req.get("host")}/auth/verify-user?token=${token}`, email)

  res.status(201).send({ message: "Success" });
};
