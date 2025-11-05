import express from "express";
import cookieParser from "cookie-parser";
import trafficRoutes from "./routes/trafficRoutes.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Implementing security practices to handle the various types and forms of requests incoming from frontend

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //extended means object ke andar object use kar skte ho
// base test route
app.get("/", (req, res) => {
  res.send("Traffic App Backend Working 🚦");
});

// traffic routes
app.use("/api/traffic", trafficRoutes);
app.use(express.static("public"));
app.use(cookieParser());

export { app };
