import { Router } from "express";
import { Login, Register } from "../controllers/auth.controller.js";

const authRouter = Router();

//-> api/v1/auth
authRouter.post("/login", Login);

authRouter.post("/register", Register);

export default authRouter;