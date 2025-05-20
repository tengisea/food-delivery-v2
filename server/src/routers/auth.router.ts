import { Router } from "express";
import {
  requestResetPasswordController,
  signinController,
  signupController,
  verifyPasswordUserController,
  verifyUserController,
  resetPasswordController,
} from "../controllers/user";

export const authRouter = Router();

authRouter.post("/sign-in", signinController);
authRouter.post("/sign-up", signupController);
authRouter.get("/verify-user", verifyUserController);
authRouter.post("/reset-password-request", requestResetPasswordController);
authRouter.get("/verify-reset-password-request", verifyPasswordUserController);
authRouter.post("/reset-password", resetPasswordController);
