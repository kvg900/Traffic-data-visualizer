import express from "express";
import { getTrafficByLocation } from "../controllers/tomtomController.js";

const router = express.Router();

router.get("/live", getTrafficByLocation);

export default router;
