import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Car,
  Users,
  MapPin,
  Clock,
  BarChart3,
  Activity,
  Navigation,
  AlertTriangle,
  Route,
} from "lucide-react";

// Sample traffic data
const hourlyTraffic = [
  { hour: "00:00", vehicles: 120, pedestrians: 45, congestion: 15 },
  { hour: "02:00", vehicles: 80, pedestrians: 20, congestion: 8 },
  { hour: "04:00", vehicles: 60, pedestrians: 15, congestion: 5 },
  { hour: "06:00", vehicles: 350, pedestrians: 180, congestion: 45 },
  { hour: "08:00", vehicles: 850, pedestrians: 320, congestion: 85 },
  { hour: "10:00", vehicles: 620, pedestrians: 280, congestion: 62 },
  { hour: "12:00", vehicles: 720, pedestrians: 400, congestion: 70 },
  { hour: "14:00", vehicles: 680, pedestrians: 350, congestion: 65 },
  { hour: "16:00", vehicles: 780, pedestrians: 380, congestion: 75 },
  { hour: "18:00", vehicles: 920, pedestrians: 450, congestion: 92 },
  { hour: "20:00", vehicles: 580, pedestrians: 280, congestion: 58 },
  { hour: "22:00", vehicles: 320, pedestrians: 150, congestion: 32 },
];

const weeklyData = [
  { day: "Mon", volume: 12500, avgSpeed: 45, incidents: 8 },
  { day: "Tue", volume: 13200, avgSpeed: 42, incidents: 12 },
  { day: "Wed", volume: 13800, avgSpeed: 38, incidents: 15 },
  { day: "Thu", volume: 14200, avgSpeed: 35, incidents: 18 },
  { day: "Fri", volume: 15800, avgSpeed: 32, incidents: 22 },
  { day: "Sat", volume: 11200, avgSpeed: 48, incidents: 6 },
  { day: "Sun", volume: 9800, avgSpeed: 52, incidents: 4 },
];

const vehicleTypes = [
  { name: "Cars", value: 65, color: "#3b82f6" },
  { name: "Trucks", value: 15, color: "#ef4444" },
  { name: "Motorcycles", value: 12, color: "#10b981" },
  { name: "Buses", value: 5, color: "#f59e0b" },
  { name: "Others", value: 3, color: "#8b5cf6" },
];

// Traffic locations with congestion data
const trafficLocations = [
  {
    id: 1,
    name: "Main St & 1st Ave",
    lat: 40.7589,
    lng: -73.9851,
    congestion: 92,
    status: "Heavy",
    incidents: 2,
  },
  {
    id: 2,
    name: "Broadway & Oak St",
    lat: 40.7614,
    lng: -73.9776,
    congestion: 76,
    status: "Moderate",
    incidents: 0,
  },
  {
    id: 3,
    name: "Park Ave & 5th St",
    lat: 40.7505,
    lng: -73.9934,
    congestion: 45,
    status: "Light",
    incidents: 0,
  },
  {
    id: 4,
    name: "Highway 101 & Exit 12",
    lat: 40.7282,
    lng: -74.0776,
    congestion: 88,
    status: "Heavy",
    incidents: 1,
  },
  {
    id: 5,
    name: "Center St & Mall Dr",
    lat: 40.7831,
    lng: -73.9712,
    congestion: 63,
    status: "Moderate",
    incidents: 0,
  },
  {
    id: 6,
    name: "West Side Highway",
    lat: 40.7505,
    lng: -74.0134,
    congestion: 78,
    status: "Heavy",
    incidents: 1,
  },
  {
    id: 7,
    name: "FDR Drive & E 14th St",
    lat: 40.7335,
    lng: -73.9857,
    congestion: 82,
    status: "Heavy",
    incidents: 0,
  },
];

// Traffic routes with congestion levels
const trafficRoutes = [
  {
    id: "route1",
    name: "Main Highway Route",
    coordinates: [
      [40.7589, -73.9851],
      [40.7614, -73.9776],
      [40.7505, -73.9934],
      [40.7282, -74.0776],
    ],
    congestion: 85,
    status: "Heavy",
    color: "#ef4444",
  },
  {
    id: "route2",
    name: "Downtown Circuit",
    coordinates: [
      [40.7831, -73.9712],
      [40.7505, -74.0134],
      [40.7335, -73.9857],
      [40.7589, -73.9851],
    ],
    congestion: 65,
    status: "Moderate",
    color: "#f59e0b",
  },
  {
    id: "route3",
    name: "Express Lane",
    coordinates: [
      [40.7614, -73.9776],
      [40.7831, -73.9712],
      [40.7505, -74.0134],
    ],
    congestion: 35,
    status: "Light",
    color: "#10b981",
  },
];

const MetricCard = ({ title, value, change, icon: Icon, trend }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <div
          className={`flex items-center mt-2 text-sm ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {change}
        </div>
      </div>
      <div
        className={`p-3 rounded-full ${
          trend === "up" ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        />
      </div>
    </div>
  </div>
);

// Interactive Map Component
const TrafficMap = ({
  locations,
  routes,
  selectedLocation,
  onLocationSelect,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const routesRef = useRef([]);

  useEffect(() => {
    // Load Leaflet CSS and JS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
      document.head.appendChild(link);
    }

    if (!window.L) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      if (mapRef.current && window.L) {
        // Initialize map centered on NYC
        mapInstanceRef.current = window.L.map(mapRef.current).setView(
          [40.7589, -73.9851],
          12
        );

        // Add tile layer
        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "© OpenStreetMap contributors",
          }
        ).addTo(mapInstanceRef.current);

        // Add traffic routes
        routes.forEach((route) => {
          const polyline = window.L.polyline(route.coordinates, {
            color: route.color,
            weight: 8,
            opacity: 0.8,
          }).addTo(mapInstanceRef.current);

          polyline.bindPopup(`
            <div class="p-2">
              <h3 class="font-semibold text-gray-900">${route.name}</h3>
              <p class="text-sm text-gray-600">Congestion: ${
                route.congestion
              }%</p>
              <p class="text-sm">Status: <span class="font-medium ${
                route.status === "Heavy"
                  ? "text-red-600"
                  : route.status === "Moderate"
                  ? "text-yellow-600"
                  : "text-green-600"
              }">${route.status}</span></p>
            </div>
          `);

          routesRef.current.push(polyline);
        });

        // Add traffic location markers
        locations.forEach((location) => {
          const markerColor =
            location.congestion > 80
              ? "#ef4444"
              : location.congestion > 50
              ? "#f59e0b"
              : "#10b981";

          const customIcon = window.L.divIcon({
            className: "custom-marker",
            html: `
              <div style="
                background-color: ${markerColor};
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 10px;
              ">
                ${location.incidents > 0 ? "!" : ""}
              </div>
            `,
            iconSize: [26, 26],
            iconAnchor: [13, 13],
          });

          const marker = window.L.marker([location.lat, location.lng], {
            icon: customIcon,
          }).addTo(mapInstanceRef.current);

          marker.bindPopup(`
            <div class="p-3 min-w-[200px]">
              <h3 class="font-semibold text-gray-900 mb-2">${location.name}</h3>
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Congestion:</span>
                  <span class="text-sm font-medium">${
                    location.congestion
                  }%</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Status:</span>
                  <span class="text-sm font-medium ${
                    location.status === "Heavy"
                      ? "text-red-600"
                      : location.status === "Moderate"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }">${location.status}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Incidents:</span>
                  <span class="text-sm font-medium">${location.incidents}</span>
                </div>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  class="h-2 rounded-full ${
                    location.congestion > 80
                      ? "bg-red-500"
                      : location.congestion > 50
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }"
                  style="width: ${location.congestion}%"
                ></div>
              </div>
            </div>
          `);

          marker.on("click", () => {
            onLocationSelect?.(location);
          });

          markersRef.current.push(marker);
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
      routesRef.current = [];
    };
  }, [locations, routes, onLocationSelect]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg"
      style={{ minHeight: "500px" }}
    />
  );
};

const TrafficDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Navigation className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Traffic Analytics
                </h1>
                <p className="text-sm text-gray-600">
                  Real-time traffic monitoring with interactive maps
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "map", label: "Live Map", icon: MapPin },
            { id: "routes", label: "Routes", icon: Route },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Vehicles"
                value="15,847"
                change="+12.5%"
                icon={Car}
                trend="up"
              />
              <MetricCard
                title="Average Speed"
                value="42 mph"
                change="-5.2%"
                icon={Activity}
                trend="down"
              />
              <MetricCard
                title="Active Incidents"
                value="4"
                change="+2"
                icon={AlertTriangle}
                trend="up"
              />
              <MetricCard
                title="Congestion Level"
                value="68%"
                change="+8.1%"
                icon={TrendingUp}
                trend="up"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Hourly Traffic Volume
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hourlyTraffic}>
                    <defs>
                      <linearGradient
                        id="colorVehicles"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="hour" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="vehicles"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorVehicles)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Vehicle Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={vehicleTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      stroke="none"
                    >
                      {vehicleTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {vehicleTypes.map((type, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: type.color }}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {type.name} ({type.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "map" && (
          <div className="space-y-6">
            {/* Map Controls */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Live Traffic Map
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Light</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Moderate</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Heavy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map and Info Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <TrafficMap
                  locations={trafficLocations}
                  routes={trafficRoutes}
                  selectedLocation={selectedLocation}
                  onLocationSelect={handleLocationSelect}
                />
              </div>

              {/* Location Info Panel */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Traffic Locations
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {trafficLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedLocation?.id === location.id
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                      onClick={() => handleLocationSelect(location)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {location.name}
                        </h4>
                        {location.incidents > 0 && (
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Congestion: {location.congestion}%</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            location.status === "Heavy"
                              ? "bg-red-100 text-red-800"
                              : location.status === "Moderate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {location.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className={`h-1.5 rounded-full ${
                            location.congestion > 80
                              ? "bg-red-500"
                              : location.congestion > 50
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${location.congestion}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "routes" && (
          <div className="space-y-6">
            {/* Route Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Route Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trafficRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        {route.name}
                      </h4>
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: route.color }}
                      ></div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Congestion:</span>
                        <span className="font-medium">{route.congestion}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span
                          className={`font-medium ${
                            route.status === "Heavy"
                              ? "text-red-600"
                              : route.status === "Moderate"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {route.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${route.congestion}%`,
                            backgroundColor: route.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Route Map */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  Route Visualization
                </h3>
              </div>
              <TrafficMap
                locations={trafficLocations}
                routes={trafficRoutes}
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
              />
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Weekly Traffic Analysis
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="volume"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="Volume"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Average Speed Trends
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgSpeed"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                      name="Avg Speed (mph)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Weekly Incidents
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar
                      dataKey="incidents"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                      name="Incidents"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficDashboard;
