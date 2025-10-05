// ===== SAMPLE DATA FOR TRAFFIC DASHBOARD COMPONENTS =====

// 1. METRIC CARD COMPONENT PROPS
const metricCardProps = [
  {
    title: "Total Vehicles",
    value: "15,847",
    change: "+12.5%",
    icon: "Car", // Lucide React icon
    trend: "up", // "up" or "down"
    color: "blue", // "blue", "green", "red", "yellow", "purple"
  },
  {
    title: "Average Speed",
    value: "42 mph",
    change: "-5.2%",
    icon: "Activity",
    trend: "down",
    color: "green",
  },
  {
    title: "Active Incidents",
    value: "8",
    change: "+2",
    icon: "AlertTriangle",
    trend: "up",
    color: "red",
  },
  {
    title: "Congestion Level",
    value: "68%",
    change: "+8.1%",
    icon: "TrendingUp",
    trend: "up",
    color: "yellow",
  },
  {
    title: "Routes Monitored",
    value: "24",
    change: "0",
    icon: "Navigation",
    trend: "up",
    color: "purple",
  },
];

// 2. TRAFFIC MAP COMPONENT PROPS
const trafficMapProps = {
  routes: [
    {
      id: "route1",
      name: "Highway 101 North",
      points: [
        { x: 100, y: 200 },
        { x: 150, y: 180 },
        { x: 200, y: 160 },
        { x: 280, y: 140 },
        { x: 350, y: 120 },
        { x: 420, y: 100 },
      ],
      congestionLevel: 85, // 0-100
      speed: 25, // mph
      incidents: 2, // number of incidents
      length: 12.5, // miles
      estimatedTime: 35, // minutes
    },
    {
      id: "route2",
      name: "Main Street East",
      points: [
        { x: 80, y: 300 },
        { x: 160, y: 290 },
        { x: 240, y: 280 },
        { x: 320, y: 270 },
        { x: 400, y: 260 },
        { x: 480, y: 250 },
      ],
      congestionLevel: 45,
      speed: 55,
      incidents: 0,
      length: 8.2,
      estimatedTime: 12,
    },
    {
      id: "route3",
      name: "Broadway Avenue",
      points: [
        { x: 200, y: 80 },
        { x: 210, y: 140 },
        { x: 220, y: 200 },
        { x: 230, y: 260 },
        { x: 240, y: 320 },
        { x: 250, y: 380 },
      ],
      congestionLevel: 65,
      speed: 35,
      incidents: 1,
      length: 6.8,
      estimatedTime: 18,
    },
    {
      id: "route4",
      name: "Oak Avenue",
      points: [
        { x: 50, y: 150 },
        { x: 120, y: 140 },
        { x: 190, y: 130 },
        { x: 260, y: 120 },
        { x: 330, y: 110 },
        { x: 400, y: 100 },
      ],
      congestionLevel: 30,
      speed: 65,
      incidents: 0,
      length: 9.5,
      estimatedTime: 10,
    },
    {
      id: "route5",
      name: "Industrial Boulevard",
      points: [
        { x: 300, y: 50 },
        { x: 320, y: 100 },
        { x: 340, y: 150 },
        { x: 360, y: 200 },
        { x: 380, y: 250 },
      ],
      congestionLevel: 75,
      speed: 28,
      incidents: 3,
      length: 15.2,
      estimatedTime: 42,
    },
  ],
  locations: [
    {
      id: 1,
      name: "Downtown Hub",
      x: 200,
      y: 250,
      type: "intersection", // "intersection", "highway", "zone", "landmark"
      congestion: 90, // 0-100
      vehicles: 450,
      capacity: 500,
      waitTime: 180, // seconds
      signalPhase: "green", // "red", "yellow", "green"
    },
    {
      id: 2,
      name: "Mall Junction",
      x: 350,
      y: 180,
      type: "intersection",
      congestion: 70,
      vehicles: 320,
      capacity: 400,
      waitTime: 90,
      signalPhase: "red",
    },
    {
      id: 3,
      name: "Airport Exit",
      x: 450,
      y: 120,
      type: "highway",
      congestion: 85,
      vehicles: 380,
      capacity: 450,
      waitTime: 150,
      signalPhase: "green",
    },
    {
      id: 4,
      name: "School Zone",
      x: 150,
      y: 320,
      type: "zone",
      congestion: 40,
      vehicles: 180,
      capacity: 300,
      waitTime: 30,
      signalPhase: "green",
    },
    {
      id: 5,
      name: "Hospital District",
      x: 280,
      y: 300,
      type: "zone",
      congestion: 60,
      vehicles: 250,
      capacity: 350,
      waitTime: 60,
      signalPhase: "yellow",
    },
    {
      id: 6,
      name: "Business Park",
      x: 400,
      y: 280,
      type: "zone",
      congestion: 55,
      vehicles: 220,
      capacity: 400,
      waitTime: 45,
      signalPhase: "green",
    },
    {
      id: 7,
      name: "University Campus",
      x: 120,
      y: 180,
      type: "landmark",
      congestion: 75,
      vehicles: 340,
      capacity: 420,
      waitTime: 120,
      signalPhase: "red",
    },
  ],
  incidents: [
    {
      id: 1,
      x: 280,
      y: 140,
      type: "accident", // "accident", "construction", "breakdown", "weather", "event"
      severity: "high", // "low", "medium", "high", "critical"
      description: "Multi-vehicle accident blocking 2 lanes",
      reportedAt: "2024-01-15T14:30:00Z",
      estimatedClearTime: "2024-01-15T16:00:00Z",
      affectedRoutes: ["route1", "route3"],
      responders: ["Police", "Fire Department", "Ambulance"],
    },
    {
      id: 2,
      x: 230,
      y: 260,
      type: "construction",
      severity: "medium",
      description: "Road construction - lane closure",
      reportedAt: "2024-01-15T06:00:00Z",
      estimatedClearTime: "2024-01-15T18:00:00Z",
      affectedRoutes: ["route3"],
      responders: ["Traffic Control"],
    },
    {
      id: 3,
      x: 350,
      y: 120,
      type: "breakdown",
      severity: "low",
      description: "Vehicle breakdown on shoulder",
      reportedAt: "2024-01-15T14:45:00Z",
      estimatedClearTime: "2024-01-15T15:15:00Z",
      affectedRoutes: ["route1"],
      responders: ["Tow Truck"],
    },
    {
      id: 4,
      x: 380,
      y: 250,
      type: "weather",
      severity: "medium",
      description: "Heavy rain causing reduced visibility",
      reportedAt: "2024-01-15T13:00:00Z",
      estimatedClearTime: "2024-01-15T17:00:00Z",
      affectedRoutes: ["route5"],
      responders: [],
    },
    {
      id: 5,
      x: 150,
      y: 320,
      type: "event",
      severity: "high",
      description: "School event - increased pedestrian traffic",
      reportedAt: "2024-01-15T14:00:00Z",
      estimatedClearTime: "2024-01-15T16:30:00Z",
      affectedRoutes: ["route2"],
      responders: ["Traffic Control"],
    },
  ],
  selectedRoute: "route1", // null or route id
  onRouteSelect: (routeId) => {
    console.log("Selected route:", routeId);
    // Function to handle route selection
  },
};

// 3. ROUTE DETAILS COMPONENT PROPS
const routeDetailsProps = {
  route: {
    id: "route1",
    name: "Highway 101 North",
    congestionLevel: 85,
    speed: 25,
    incidents: 2,
    length: 12.5,
    estimatedTime: 35,
    alternativeRoutes: ["route4", "route2"],
    historicalData: {
      averageSpeed: 45,
      peakHours: ["07:00", "08:00", "17:00", "18:00"],
      averageCongestion: 65,
    },
    sensors: [
      {
        id: "sensor1",
        location: "Mile 2.5",
        status: "active",
        lastReading: "2024-01-15T14:55:00Z",
      },
      {
        id: "sensor2",
        location: "Mile 5.8",
        status: "active",
        lastReading: "2024-01-15T14:55:00Z",
      },
      {
        id: "sensor3",
        location: "Mile 9.2",
        status: "maintenance",
        lastReading: "2024-01-15T12:30:00Z",
      },
    ],
  },
};

// 4. CHART DATA FOR RECHARTS COMPONENTS
const hourlyTrafficData = [
  {
    hour: "00:00",
    vehicles: 120,
    pedestrians: 45,
    congestion: 15,
    speed: 60,
    volume: 165,
    incidents: 0,
    co2Level: 20,
  },
  {
    hour: "02:00",
    vehicles: 80,
    pedestrians: 20,
    congestion: 8,
    speed: 65,
    volume: 100,
    incidents: 0,
    co2Level: 15,
  },
  {
    hour: "04:00",
    vehicles: 60,
    pedestrians: 15,
    congestion: 5,
    speed: 68,
    volume: 75,
    incidents: 0,
    co2Level: 12,
  },
  {
    hour: "06:00",
    vehicles: 350,
    pedestrians: 180,
    congestion: 45,
    speed: 45,
    volume: 530,
    incidents: 1,
    co2Level: 35,
  },
  {
    hour: "08:00",
    vehicles: 850,
    pedestrians: 320,
    congestion: 85,
    speed: 25,
    volume: 1170,
    incidents: 3,
    co2Level: 85,
  },
  {
    hour: "10:00",
    vehicles: 620,
    pedestrians: 280,
    congestion: 62,
    speed: 38,
    volume: 900,
    incidents: 1,
    co2Level: 62,
  },
  {
    hour: "12:00",
    vehicles: 720,
    pedestrians: 400,
    congestion: 70,
    speed: 32,
    volume: 1120,
    incidents: 2,
    co2Level: 70,
  },
  {
    hour: "14:00",
    vehicles: 680,
    pedestrians: 350,
    congestion: 65,
    speed: 35,
    volume: 1030,
    incidents: 1,
    co2Level: 65,
  },
  {
    hour: "16:00",
    vehicles: 780,
    pedestrians: 380,
    congestion: 75,
    speed: 30,
    volume: 1160,
    incidents: 2,
    co2Level: 75,
  },
  {
    hour: "18:00",
    vehicles: 920,
    pedestrians: 450,
    congestion: 92,
    speed: 22,
    volume: 1370,
    incidents: 4,
    co2Level: 92,
  },
  {
    hour: "20:00",
    vehicles: 580,
    pedestrians: 280,
    congestion: 58,
    speed: 42,
    volume: 860,
    incidents: 1,
    co2Level: 58,
  },
  {
    hour: "22:00",
    vehicles: 320,
    pedestrians: 150,
    congestion: 32,
    speed: 55,
    volume: 470,
    incidents: 0,
    co2Level: 32,
  },
];

// 5. WEEKLY DATA FOR ANALYTICS
const weeklyTrafficData = [
  {
    day: "Monday",
    volume: 12500,
    avgSpeed: 45,
    incidents: 8,
    congestion: 65,
    peakHour: "08:00",
    revenue: 15600,
    co2Emissions: 245,
  },
  {
    day: "Tuesday",
    volume: 13200,
    avgSpeed: 42,
    incidents: 12,
    congestion: 70,
    peakHour: "08:30",
    revenue: 16800,
    co2Emissions: 268,
  },
  {
    day: "Wednesday",
    volume: 13800,
    avgSpeed: 38,
    incidents: 15,
    congestion: 75,
    peakHour: "08:15",
    revenue: 17200,
    co2Emissions: 285,
  },
  {
    day: "Thursday",
    volume: 14200,
    avgSpeed: 35,
    incidents: 18,
    congestion: 80,
    peakHour: "08:00",
    revenue: 17800,
    co2Emissions: 298,
  },
  {
    day: "Friday",
    volume: 15800,
    avgSpeed: 32,
    incidents: 22,
    congestion: 88,
    peakHour: "07:45",
    revenue: 19500,
    co2Emissions: 325,
  },
  {
    day: "Saturday",
    volume: 11200,
    avgSpeed: 48,
    incidents: 6,
    congestion: 55,
    peakHour: "14:00",
    revenue: 12800,
    co2Emissions: 198,
  },
  {
    day: "Sunday",
    volume: 9800,
    avgSpeed: 52,
    incidents: 4,
    congestion: 45,
    peakHour: "15:30",
    revenue: 10200,
    co2Emissions: 165,
  },
];

// 6. VEHICLE TYPES DISTRIBUTION
const vehicleTypesData = [
  { name: "Cars", value: 65, count: 10465, color: "#3b82f6" },
  { name: "Trucks", value: 15, count: 2415, color: "#ef4444" },
  { name: "Motorcycles", value: 12, count: 1932, color: "#10b981" },
  { name: "Buses", value: 5, count: 805, color: "#f59e0b" },
  { name: "Emergency Vehicles", value: 2, count: 322, color: "#8b5cf6" },
  { name: "Others", value: 1, count: 161, color: "#6b7280" },
];

// 7. CHART.JS CONFIGURATION SAMPLE
const chartJsConfig = {
  type: "line",
  data: {
    labels: hourlyTrafficData.map((d) => d.hour),
    datasets: [
      {
        label: "Traffic Volume",
        data: hourlyTrafficData.map((d) => d.volume),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Average Speed",
        data: hourlyTrafficData.map((d) => d.speed),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        yAxisID: "y1",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Congestion Level",
        data: hourlyTrafficData.map((d) => d.congestion),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        yAxisID: "y2",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Real-time Traffic Analytics",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#374151",
        bodyColor: "#6b7280",
        borderColor: "#d1d5db",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time",
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: "#f3f4f6",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Vehicle Volume",
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: "#f3f4f6",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Speed (mph)",
          font: {
            weight: "bold",
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear",
        display: false,
        min: 0,
        max: 100,
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  },
};

// 8. INTERSECTION STATUS DATA
const intersectionStatusData = [
  {
    id: "int_001",
    name: "Main St & 1st Ave",
    coordinates: { lat: 40.7128, lng: -74.006 },
    traffic: 92,
    status: "Heavy",
    signalTiming: {
      northSouth: { green: 45, yellow: 5, red: 30 },
      eastWest: { green: 30, yellow: 5, red: 45 },
    },
    queueLength: 15, // vehicles
    waitTime: 180, // seconds
    throughput: 850, // vehicles per hour
    sensors: ["camera", "induction_loop", "radar"],
  },
  {
    id: "int_002",
    name: "Broadway & Oak St",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    traffic: 76,
    status: "Moderate",
    signalTiming: {
      northSouth: { green: 40, yellow: 5, red: 35 },
      eastWest: { green: 35, yellow: 5, red: 40 },
    },
    queueLength: 8,
    waitTime: 95,
    throughput: 650,
    sensors: ["camera", "pressure_pad"],
  },
  {
    id: "int_003",
    name: "Park Ave & 5th St",
    coordinates: { lat: 40.7831, lng: -73.9712 },
    traffic: 45,
    status: "Light",
    signalTiming: {
      northSouth: { green: 35, yellow: 5, red: 40 },
      eastWest: { green: 40, yellow: 5, red: 35 },
    },
    queueLength: 3,
    waitTime: 45,
    throughput: 320,
    sensors: ["induction_loop"],
  },
];

// 9. REAL-TIME SENSOR DATA
const sensorData = [
  {
    id: "sensor_001",
    type: "traffic_camera",
    location: { x: 200, y: 250, address: "Main St & 1st Ave" },
    status: "active",
    lastUpdate: "2024-01-15T14:59:30Z",
    data: {
      vehicleCount: 45,
      averageSpeed: 25,
      congestionLevel: 85,
      visibility: "good",
      weatherCondition: "clear",
    },
  },
  {
    id: "sensor_002",
    type: "induction_loop",
    location: { x: 350, y: 180, address: "Highway 101 Mile 5.2" },
    status: "active",
    lastUpdate: "2024-01-15T14:59:45Z",
    data: {
      vehicleCount: 120,
      averageSpeed: 55,
      congestionLevel: 45,
      vehicleClassification: {
        cars: 85,
        trucks: 25,
        motorcycles: 10,
      },
    },
  },
  {
    id: "sensor_003",
    type: "radar_detector",
    location: { x: 450, y: 120, address: "Airport Exit Ramp" },
    status: "maintenance",
    lastUpdate: "2024-01-15T12:30:00Z",
    data: {
      vehicleCount: 0,
      averageSpeed: 0,
      congestionLevel: 0,
      maintenanceNote: "Scheduled maintenance in progress",
    },
  },
];
export {
  metricCardProps,
  trafficMapProps,
  routeDetailsProps,
  hourlyTrafficData,
  weeklyTrafficData,
  vehicleTypesData,
  chartJsConfig,
  intersectionStatusData,
  sensorData,
};
