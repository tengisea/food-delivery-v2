import { connect } from "mongoose";

export const connectDatabase = async () => {
  const dbConnectionString = process.env.MDB_CONNECTION_URL;

  if (!dbConnectionString) throw new Error("failed to connect to the MongoDB");

  try {
    await connect(dbConnectionString);
    console.log("Succeesfully connected to the MongoDB");
  } catch (error) {
    console.error(error instanceof Error && error.message);
  }
};
