import axios from "axios";

export const getTrafficByLocation = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ message: "lat & lon are required" });
    }

    const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${lat},${lon}&key=${process.env.TOMTOM_API_KEY}`;

    const response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching traffic", error: err.message });
  }
};
