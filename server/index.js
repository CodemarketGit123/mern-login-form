import express, { json } from "express";
import mongoose from "mongoose";
import cors from 'cors'
import "dotenv/config";
import EnquiryRoutes from "./Routes/EnquiryRoutes.js";
import ProductRouter from "./Routes/ProductRouter.js";
const app = express();
import bodyParser from 'body-parser';

//Middleware
app.use(express.json()); 
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/", EnquiryRoutes);
app.use("/api", ProductRouter);

 
//MongoDb Connection
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected Success!");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

app.listen(process.env.PORT || 2000);
