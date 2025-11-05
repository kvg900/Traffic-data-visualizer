// New ML routes
import express from "express";
import { getMLPrediction } from "../controllers/mlController.js";

const router = express.Router();

// Example: GET /api/traffic/ml/1
router.get("/ml/:junction", getMLPrediction);

export default router;
