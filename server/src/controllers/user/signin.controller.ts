import { Request, Response } from "express";
import { UserModel } from "../../models";
import { generateNewToken} from "../../utils";
import { compare } from "bcryptjs";

export const signinController = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      res.status(400).send({ message: "User not found with this email." });
      return;
    }

    const isPasswordCorrect = compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).send({ message: "Email or password is incorrect" });
      return;
    }

    const accessToken = generateNewToken({ userId: user._id });

    res
      .status(200)
      .json({ message: "Succesfully loged In.", token: accessToken, user });
  } catch (error) {
    console.error("Error during sign-in:", error);

    res
      .status(500)
      .json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown Error.",
      });
  }
};
