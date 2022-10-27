import { config } from "dotenv";
config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { authUser } from "./middlewares";

const userRouter = require("./routes/UserRoute");
const options = { origin: process.env.REQUEST_URL };

const app = express();
app.use(cors(options));
app.use(morgan("tiny")); // Debug
app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  console.log(res.locals.user);
  res.send("Hello from Backend!");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
