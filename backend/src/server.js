import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import notesRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

//middleWare
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json()); //this middleware parse json bodies

//simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`Req method : ${req.method} & Req URL: ${req.url}`);
//     next();
// });

app.use("/api/notes", rateLimiter, notesRoutes);

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is listening on ${port}`);
    });
});
