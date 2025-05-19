import { Router } from "express";
import { signinController, signupController, verifyUserController } from "../controllers/user";
import { resetPasswordController } from "../controllers/user/reset-password-request.controller";

export const authRouter= Router()

authRouter.post("/sign-up", signupController);
authRouter.get("/verify-user", verifyUserController)
authRouter.post("/sign-in", signinController)
authRouter.post("/reset-password-request", resetPasswordController)