import express from "express"

import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from 'cors'

import connectMongoDB from "./db/mongoose.js"

import listRoutes from "./routes/lists.route.js"
import tasksRoute from "./routes/tasks.route.js";


dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use("/api/lists", listRoutes);
app.use("/api/lists", tasksRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})


