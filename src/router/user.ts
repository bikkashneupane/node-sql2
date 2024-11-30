import express, { NextFunction, Request, Response } from "express";
import { addUser, getUsers } from "../models/user";
import { User } from "../interface/User";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsers();
    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password }: User = req.body;

    const result = await addUser({ firstName, lastName, email, password });
    result.success
      ? res.status(201).json({ message: "User Created" })
      : res.status(400).json({ message: result.message });
  } catch (error: any) {
    // Handle MySQL error for duplicate entry
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({
        message: "Email already in use. Please choose a different email.",
      });
    }

    console.error("Error creating user:", error);
    next(error);
  }
});

export default router;
