from flask import Flask, request, jsonify
from traffic_model import predict_traffic

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    junction = data.get("junction")

    if not junction:
        return jsonify({"error": "Junction not provided"}), 400

    try:
        result = predict_traffic(junction)
        return jsonify({
            "junction": junction,
            "predictedVehicles": int(result)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001)
