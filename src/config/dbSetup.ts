import mongoose from "mongoose";

export async function setupDb(host: string) {
  try {
    await mongoose.connect(host);
    console.log("Database successfully connected");
  } catch (e) {
    console.error("Cannot provide the mongo database");
    throw e;
  }
}
