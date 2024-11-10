import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import cors from "cors";

const app = express();
configDotenv();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/books", routes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
