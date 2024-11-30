import express, { NextFunction, Request, Response } from "express";
import { createUserTable } from "./src/models/user";
import userRouter from "./src/router/user";

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Server alive");
});

(async () => {
  try {
    await createUserTable();
    app.listen(8000, () => {
      console.log("Server started at port: 8000");
    });
  } catch (error) {
    console.log("Failed to initialised the db: ", error);
  }
})();
