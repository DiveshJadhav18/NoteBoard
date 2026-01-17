import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import notesRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleWare
if (process.env.NODE_ENV !== "production") {
 app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);   
}

app.use(express.json()); //this middleware parse json bodies

//simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`Req method : ${req.method} & Req URL: ${req.url}`);
//     next();
// });

if (process.env.NODE_ENV === "production") {
  app.use("/api/notes", rateLimiter, notesRoutes);
} else {
  app.use("/api/notes", notesRoutes);
}


if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend", "dist", "index.html")
  );
});

}

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is listening on ${port}`);
    });
});
