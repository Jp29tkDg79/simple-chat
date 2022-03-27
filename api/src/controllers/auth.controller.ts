import { Request, Response } from "express";

import { makeToken, makeHashedPassword } from "../utils/utils";

import User from "../models/user.model";

export const signin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(403).send({ message: "Existing user" });
  }

  const hashedPassword = await makeHashedPassword(password);
  const token = await makeToken(email);

  const user = await User.build({
    name,
    email,
    password: hashedPassword,
    token,
  });
  await user.save();

  res.status(201).send({ name: user.name, email: user.email, token: user.token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(403).send({ message: "Invalid credentials" });
    return;
  }

  const passwordMatch = await user.compare(password);
  if (!passwordMatch) {
    res.status(403).send({ message: "Entered password is unmatch!" });
    return;
  }

  res.status(201).send({ name: user.name, email: user.email, token: user.token });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).send({ message: "success" });
};
