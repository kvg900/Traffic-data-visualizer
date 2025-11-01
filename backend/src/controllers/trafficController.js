import fs from "fs";
import csv from "csv-parser";

export const getAllTraffic = async (req, res) => {
  const results = [];
  fs.createReadStream("dataset/traffic.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.json(results.slice(0, 50)); // send first 50 for demo
    });
};
