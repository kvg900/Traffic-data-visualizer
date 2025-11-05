// src/routes/trafficRoutes.js
import express from "express";
import {
  getAllTrafficData,
  getTrafficByJunction,
  getAllJunctions,
  getTrafficSummary,
  getTrafficTrend,
  // predictTraffic,
} from "../controllers/trafficController.js";

const router = express.Router();

router.get("/all", getAllTrafficData);
router.get("/junctions", getAllJunctions);
router.get("/summary", getTrafficSummary);

router.get("/trend/:junction", getTrafficTrend);
// router.get("/predict/:junction", predictTraffic);
router.get("/:junction", getTrafficByJunction);

export default router;
