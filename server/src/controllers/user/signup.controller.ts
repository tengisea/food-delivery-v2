import { Request, Response } from "express";

type UserBody = { email: string; password: string };

export const signupController = async (req: Request, res:Response) => {
    const {email, password} = req.body as UserBody

    if(!email || !password) {
        res.status(400).send({message: "Email or Password is empty"})
    }

    res.status(201).send({message: "Success"})
};
