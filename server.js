import exrpress from "express";
import dotenv from "dotenv";
import Color from "colors";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./Config/db.js";
import employeRouter from "./Routes/Employe.routes.js";
import { Server } from "socket.io";
import http from "http";

//initialisation d'expreess app
const application = exrpress();
const server = http.createServer(application);
// const io = socketIo(server);
const io = new Server(server);
//configuration dotenv
dotenv.config();

application.use(exrpress.json());
application.use(morgan("dev"));
application.use(cors());
const Port = process.env.PORT || 5080;
//connect data base
connectDb();

application.use("/employees", employeRouter);

server.listen(Port, () => {
  console.log(
    `server runing in port ${process.env.PORT} on ${process.env.MODE_DEV}`
      .bgMagenta.yellow
  );
});
