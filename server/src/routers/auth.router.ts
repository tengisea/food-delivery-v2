import { Router } from "express";
import {
  requestResetPasswordController,
  signinController,
  signupController,
  verifyPasswordUserController,
  verifyUserController,
  resetPasswordController,
  refreshUserController,
} from "../controllers/user";
import { authenticateUser } from "../middlewares";

export const authRouter = Router();

authRouter.get("/refresh-user", authenticateUser, refreshUserController);
authRouter.post("/sign-in", signinController);
authRouter.post("/sign-up", signupController);
authRouter.get("/verify-user", verifyUserController);
authRouter.post("/reset-password-request", requestResetPasswordController);
authRouter.get("/verify-reset-password-request", verifyPasswordUserController);
authRouter.post("/reset-password", resetPasswordController);
