import express from "express";
import { getAllTraffic } from "../controllers/trafficController.js";

const router = express.Router();
router.get("/all", getAllTraffic);
export default router;
