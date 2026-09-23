import { Router } from "express";
import { getMe, refresh, register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register)
authRouter.get("/me", getMe)
authRouter.get("/refresh", refresh)

export default authRouter;