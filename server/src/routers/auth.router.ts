import { Router } from "express";
import { signupController } from "../controllers/user";

export const authRouter= Router()

authRouter.post("/sign-up", signupController);