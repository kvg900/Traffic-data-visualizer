import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

def predict_traffic(junction):
    # Load dataset
    df = pd.read_csv("../backend/src/dataset/traffic.csv")

    # Filter by junction
    df = df[df["Junction"] == int(junction)]
    if df.empty:
        raise Exception("No data found for this junction")

    # Prepare features
    df["DateTime"] = pd.to_datetime(df["DateTime"])
    df = df.sort_values("DateTime")

    # Convert datetime to timestamp (X)
    X = df["DateTime"].map(datetime.timestamp).values.reshape(-1, 1)
    y = df["Vehicles"].values

    if len(X) < 2:
        raise Exception("Not enough data for prediction")

    # Train linear regression model
    model = LinearRegression()
    model.fit(X, y)

    # Predict for next hour
    next_time = df["DateTime"].iloc[-1] + timedelta(hours=1)
    next_timestamp = datetime.timestamp(next_time)
    prediction = model.predict([[next_timestamp]])

    return round(prediction[0])
