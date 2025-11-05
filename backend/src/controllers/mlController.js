// For ML API calls
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const mlServiceUrl = process.env.ML_SERVICE_URL;

// export const getMLPrediction = async (req, res) => {
//   const { junction } = req.params;

//   try {
//     const response = await axios.get(
//       `${mlServiceUrl}/predict?junction=${junction}`,
//       {
//         timeout: 5000, // 5 sec timeout
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Prediction fetched successfully",
//       data: response.data,
//     });
//   } catch (error) {
//     console.error("❌ Error connecting to ML Service:", error.message);

//     res.status(502).json({
//       success: false,
//       message: "Failed to fetch prediction from ML service",
//       error: error.message,
//     });
//   }
// };
// simple in-memory cache (optional)
const cache = {};

export const getMLPrediction = async (req, res) => {
  const { junction } = req.params;

  if (cache[junction]) {
    console.log(`⚡ Serving cached prediction for junction ${junction}`);
    return res.status(200).json(cache[junction]);
  }

  try {
    const response = await axios.get(
      `${mlServiceUrl}/predict?junction=${junction}`,
      {
        timeout: 5000,
      }
    );

    const result = {
      success: true,
      message: "Prediction fetched successfully",
      data: response.data,
    };

    cache[junction] = result; // store for reuse
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ ML Service Error:", error.message);
    res.status(502).json({
      success: false,
      message: "Failed to fetch prediction from ML service",
      error: error.message,
    });
  }
};
