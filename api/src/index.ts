import mongoose from "mongoose";

import app from "./app";

const PORT = process.env.PORT || 5100;

const start = async () => {
  if (
    !process.env.MONGO_URI ||
    !process.env.MONGO_CLIENT ||
    !process.env.MONGO_CLIENT_PASSWORD
  ) {
    throw new Error("MongoDB env config setting must be defined!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      user: process.env.MONGO_CLIENT,
      pass: process.env.MONGO_CLIENT_PASSWORD,
    });
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Listening on port on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
