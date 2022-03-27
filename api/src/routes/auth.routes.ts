import express from "express";

import * as authControllers from "../controllers/auth.controller";

const router = express.Router();

router.post("/signin", authControllers.signin);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);

export default router;
