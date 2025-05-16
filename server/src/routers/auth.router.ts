import { Router } from "express";
import { signinController, signupController, verifyUserController } from "../controllers/user";

export const authRouter= Router()

authRouter.post("/sign-up", signupController);
authRouter.get("/verify-user", verifyUserController)
authRouter.post("/sign-in", signinController)