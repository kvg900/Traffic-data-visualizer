// src/controllers/trafficController.js
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import csv from "csv-parser";
// import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvPath = path.join(__dirname, "../dataset/traffic.csv");

export const getAllTrafficData = async (req, res) => {
  try {
    const results = [];
    fs.createReadStream("src/dataset/traffic.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        res.status(200).json(results);
      });
  } catch (error) {
    res.status(500).json({ message: "Error reading CSV", error });
  }
};

export const getTrafficByJunction = async (req, res) => {
  const { junction } = req.params;

  try {
    const results = [];
    fs.createReadStream("src/dataset/traffic.csv")
      .pipe(csv())
      .on("data", (data) => {
        // Normalize keys (handle spaces or casing)
        const cleanKeys = Object.fromEntries(
          Object.entries(data).map(([k, v]) => [
            k.trim().toLowerCase(),
            v.trim(),
          ])
        );

        if (cleanKeys.junction === junction.trim()) {
          results.push(cleanKeys);
        }
      })
      .on("end", () => {
        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: `No data found for junction ${junction}` });
        }
        res.status(200).json(results);
      });
  } catch (error) {
    res.status(500).json({ message: "Error reading CSV", error });
  }
};

//this is now working khush rhoo
export const getAllJunctions = async (req, res) => {
  try {
    const junctions = new Set();

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (data) => {
        if (data["Junction"]) junctions.add(data["Junction"].trim());
      })
      .on("end", () => {
        const list = Array.from(junctions);
        if (list.length === 0) {
          return res.status(404).json({ message: "No junctions found" });
        }
        res.status(200).json({ junctions: list });
      })
      .on("error", (err) => {
        console.error("CSV read error:", err);
        res
          .status(500)
          .json({ message: "Error reading CSV file", error: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//this is now working khush rhooo     Problem- dono m routing ke order m dikkat thi :juntions vala route last m ana tha order fix hua and done
export const getTrafficSummary = async (req, res) => {
  try {
    let total = 0,
      count = 0,
      max = 0,
      min = Infinity;

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (data) => {
        const vehicles = Number(data["Vehicles"]);
        if (!isNaN(vehicles)) {
          total += vehicles;
          count++;
          if (vehicles > max) max = vehicles;
          if (vehicles < min) min = vehicles;
        }
      })
      .on("end", () => {
        if (count === 0) {
          return res.status(404).json({ message: "No valid data found" });
        }

        const avg = total / count;
        res.status(200).json({
          average: avg.toFixed(2),
          max,
          min,
          totalRecords: count,
        });
      })
      .on("error", (err) => {
        console.error("CSV read error:", err);
        res
          .status(500)
          .json({ message: "Error reading CSV", error: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: "Unexpected error", error: err.message });
  }
};

//this is working
export const getTrafficTrend = async (req, res) => {
  const { junction } = req.params;
  const results = [];

  fs.createReadStream("src/dataset/traffic.csv")
    .pipe(csv())
    .on("data", (data) => {
      if (!junction || data["Junction"] === junction) {
        results.push({
          time: data["DateTime"],
          vehicles: Number(data["Vehicles"]),
        });
      }
    })
    .on("end", () => {
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: `No data found for junction ${junction}` });
      }
      res.status(200).json(results);
    })
    .on("error", (err) =>
      res.status(500).json({ message: "Error reading CSV", err })
    );
};

//this is working
// export const predictTraffic = async (req, res) => {
//   const { junction } = req.params;
//   const points = [];

//   fs.createReadStream("src/dataset/traffic.csv")
//     .pipe(csv())
//     .on("data", (data) => {
//       if (data["Junction"] === junction) {
//         const date = new Date(data["DateTime"]);
//         const vehicles = Number(data["Vehicles"]);
//         if (!isNaN(date.getTime()) && !isNaN(vehicles)) {
//           points.push({ x: date.getTime(), y: vehicles });
//         }
//       }
//     })
//     .on("end", () => {
//       if (points.length < 2)
//         return res.status(400).json({ message: "Not enough data to predict." });

//       const n = points.length;
//       const sumX = points.reduce((a, p) => a + p.x, 0);
//       const sumY = points.reduce((a, p) => a + p.y, 0);
//       const sumXY = points.reduce((a, p) => a + p.x * p.y, 0);
//       const sumX2 = points.reduce((a, p) => a + p.x * p.x, 0);

//       const b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
//       const a = (sumY - b * sumX) / n;

//       const nextHour = points[points.length - 1].x + 3600 * 1000;
//       const predicted = a + b * nextHour;

//       res.status(200).json({
//         predictedVehicles: Math.round(predicted),
//         junction,
//       });
//     })
//     .on("error", (err) =>
//       res.status(500).json({ message: "Error processing CSV", err })
//     );
// };
// export const predictTraffic = async (req, res) => {
//   const { junction } = req.params;

//   try {
//     const response = await axios.get(
//       `http://localhost:5001/predict?junction=${junction}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: "ML service error", error: error.message });
//   }
// };
