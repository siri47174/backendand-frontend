// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import API_BASE_URL from "../config";

// // import React, { useEffect, useState, useRef } from "react";
// // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // import L from "leaflet";
// // import io from "socket.io-client";
// // import "leaflet/dist/leaflet.css";

// // // Initialize Socket.io
// // const socket = io(API_BASE_URL);

// // const LiveFleetTracking = () => {
// //   const [vehicles, setVehicles] = useState([]);
// //   const vehiclesRef = useRef([]);

// //   useEffect(() => {
// //     socket.on("connect", () => {
// //       console.log("Connected to socket server");
// //     });

// //     socket.on("locationUpdate", (data) => {
// //       console.log("Received location update:", data);
// //       vehiclesRef.current = data;
// //       setVehicles([...data]); // Update state efficiently
// //     });

// //     socket.on("disconnect", () => {
// //       console.log("Disconnected from socket server");
// //     });

// //     return () => socket.off("locationUpdate");
// //   }, []);

// //   // Custom marker icons based on speed
// //   const getVehicleIcon = (speed) => {
// //     return new L.Icon({
// //       iconUrl:
// //         speed > 60
// //           ? "https://cdn-icons-png.flaticon.com/512/3068/3068321.png"
// //           : "https://cdn-icons-png.flaticon.com/512/149/149059.png",
// //       iconSize: [30, 30],
// //       iconAnchor: [15, 30],
// //     });
// //   };

// //   // Inline CSS styles
// //   const styles = {
// //     container: {
// //       height: "100vh",
// //       width: "80vw",
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       paddingLeft: "20rem", // Shift everything right
// //     },
// //     map: {
// //       height: "90vh",
// //       width: "90vw",
// //       borderRadius: "10px",
// //       border: "2px solid #333",
// //       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
// //       marginLeft:"6rem"
// //     },
// //   };

// //   return (
// //     <div style={styles.container}>

// //       <MapContainer
// //         center={[20.5937, 78.9629]}
// //         zoom={5}
// //         style={styles.map}
// //       >
// //         <TileLayer
// //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           attribution='&copy;  <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// //         />
// //         {vehicles.map((vehicle) => (
// //           <Marker
// //             key={vehicle.id}
// //             position={[vehicle.lat, vehicle.lng]}
// //             icon={getVehicleIcon(vehicle.speed)}
// //           >
// //             <Popup>
// //               <b>Vehicle ID:</b> {vehicle.id} <br />
// //               <b>Speed:</b> {vehicle.speed} km/h
// //             </Popup>
// //           </Marker>
// //         ))}
// //       </MapContainer>
// //     </div>
// //   );
// // };

// // export default LiveFleetTracking;
// // import React, { useEffect, useState, useRef } from "react";
// // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // import L from "leaflet";
// // import io from "socket.io-client";
// // import "leaflet/dist/leaflet.css";

// // // Initialize Socket.io
// // const socket = io(API_BASE_URL);

// // const LiveFleetTracking = () => {
// //   const [vehicles, setVehicles] = useState([]);
// //   const vehiclesRef = useRef([]);

// //   useEffect(() => {
// //     // Fetch initial vehicle locations from backend instead of external API
// //     fetch(API_BASE_URL + "/fetch-locations")
// //     .then((response) => response.json())
// //     .then((data) => {
// //       console.log("Backend Response:", data);
// //       if (Array.isArray(data)) {
// //         vehiclesRef.current = data;
// //         setVehicles(data);
// //       } else {
// //         console.error("Invalid data format from backend");
// //       }
// //     })
// //     .catch((error) =>
// //       console.error("Error fetching initial locations from backend:", error)
// //     );
  
// //     // Socket events
// //     socket.on("connect", () => {
// //       console.log("Connected to socket server");
// //     });

// //     socket.on("locationUpdate", (data) => {
// //       console.log("Received location update:", data);
// //       if (Array.isArray(data)) {
// //         vehiclesRef.current = data;
// //         setVehicles([...data]);
// //       } else {
// //         console.error("Invalid socket data format");
// //       }
// //     });
    
// //     socket.on("disconnect", () => {
// //       console.log("Disconnected from socket server");
// //     });

// //     return () => {
// //       socket.off("locationUpdate");
// //     };
// //   }, []);

// //   // Custom marker icons based on speed
// //   const getVehicleIcon = (speed) => {
// //     return new L.Icon({
// //       iconUrl:
// //         speed > 60
// //           ? "https://cdn-icons-png.flaticon.com/512/3068/3068321.png"
// //           : "https://cdn-icons-png.flaticon.com/512/149/149059.png",
// //       iconSize: [30, 30],
// //       iconAnchor: [15, 30],
// //     });
// //   };

// //   // Styles
// //   const styles = {
// //     container: {
// //       height: "100vh",
// //       width: "80vw",
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       paddingLeft: "20rem",
// //     },
// //     map: {
// //       height: "90vh",
// //       width: "90vw",
// //       borderRadius: "10px",
// //       border: "2px solid #333",
// //       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
// //     },
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <MapContainer center={[28.6139, 77.209]} zoom={5} style={styles.map}>
// //         <TileLayer
// //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// //         />
// //        {vehicles.map((vehicle, index) =>
// //   Number.isFinite(vehicle.latitude) &&
// //   Number.isFinite(vehicle.longitude) ? (
// //     <Marker
// //       key={index}
// //       position={[vehicle.latitude, vehicle.longitude]}
// //       icon={getVehicleIcon(vehicle.speed || 0)}
// //     >
// //       <Popup>
// //         <b>Vehicle Number:</b> {vehicle.vehicleNumber} <br />
// //         <b>Speed:</b> {vehicle.speed || 0} km/h
// //       </Popup>
// //     </Marker>
// //   ) : null
// // )}

// //       </MapContainer>
// //     </div>
// //   );
// // };

// // export default LiveFleetTracking;

// const LiveFleetTracking = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [stoppedCount, setStoppedCount] = useState(0);
//   const [movingCount, setMovingCount] = useState(0);


//   useEffect(() => {
//     fetch(API_BASE_URL + "/vehicle/fetch-locations")
//       .then((response) => {
//         if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Vehicle Data:", data);
//         if (Array.isArray(data) && data.length > 0) {
//           setVehicles(data);
//           const stopped = data.filter((vehicle) => Number(vehicle.speed) === 0).length;
//           const moving = data.filter((vehicle) => Number(vehicle.speed) > 0).length;
//           console.log("Stopped:", stopped, "Moving:", moving);
          
//           setStoppedCount(stopped);
//           setMovingCount(moving);
//           localStorage.setItem("stoppedCount", stopped);
//           localStorage.setItem("movingCount", moving);
//         } else {
//           console.error("No vehicle data found.");
//         }
//       })
//       .catch((error) => console.error("Error fetching locations:", error));
//   },[setStoppedCount, setMovingCount]);

//   const getVehicleIcon = (speed) =>
//     new L.Icon({
//       iconUrl:
//         speed > 60
//           ? "https://cdn-icons-png.flaticon.com/512/3068/3068321.png"
//           : "https://cdn-icons-png.flaticon.com/512/149/149059.png",
//       iconSize: [30, 30],
//       iconAnchor: [15, 30],
//     });

//   return (
//     <div className="sendo-page">
//       <h2 className="sendo-heading">Live Fleet Tracking</h2>
//     <MapContainer center={[28.6139, 77.209]} zoom={5} style={{ height: "calc(100vh - 0px)", width: "100%" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {vehicles.map((vehicle, index) =>
//         vehicle.latitude && vehicle.longitude ? (
//           <Marker
//             key={index}
//             position={[vehicle.latitude, vehicle.longitude]}
//             icon={getVehicleIcon(vehicle.speed)}
//           >
//             <Popup>
//               <b>Vehicle Number:</b> {vehicle.vehicleNumber} <br />
//               <b>Speed:</b> {vehicle.speed || 0} km/h <br />
//               <b>Location:</b> {vehicle.location}
//             </Popup>
//           </Marker>
//         ) : null
//       )}
//     </MapContainer>
//   </div>
//   );
// };

// export default LiveFleetTracking;
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import API_BASE_URL from "../config";

const LiveFleetTracking = () => {
  const [vehicles, setVehicles] = useState([]);
  const [stoppedCount, setStoppedCount] = useState(0);
  const [movingCount, setMovingCount] = useState(0);

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      marginLeft: "278px",
      backgroundColor: "white",
      marginRight: "10px",
      color: "black",
      minHeight: "calc(100vh - 70px)",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    },
    pageHeader: {
      backgroundColor: "#FFC107",
      color: "#000",
      padding: "16px 20px",
      fontWeight: "bold",
      fontSize: "22px",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    statsRow: {
      display: "flex",
      gap: "16px",
      padding: "14px 20px",
      backgroundColor: "#fff",
      borderBottom: "1px solid #f0f0f0",
    },
    statCard: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "#f9f9f9",
      border: "1.5px solid #000",
      borderRadius: "6px",
      padding: "10px 20px",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#000",
    },
    statDot: (color) => ({
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: color,
      display: "inline-block",
    }),
    mapWrapper: {
      padding: "16px 20px",
    },
    mapContainer: {
      height: "calc(100vh - 220px)",
      width: "100%",
      borderRadius: "6px",
      border: "1.5px solid #000",
      overflow: "hidden",
    },
  };

  useEffect(() => {
    fetch(API_BASE_URL + "/vehicle/fetch-locations")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setVehicles(data);
          const stopped = data.filter((v) => Number(v.speed) === 0).length;
          const moving = data.filter((v) => Number(v.speed) > 0).length;
          setStoppedCount(stopped);
          setMovingCount(moving);
          localStorage.setItem("stoppedCount", stopped);
          localStorage.setItem("movingCount", moving);
        } else {
          console.error("No vehicle data found.");
        }
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  const getVehicleIcon = (speed) =>
    new L.Icon({
      iconUrl:
        speed > 0
          ? "https://cdn-icons-png.flaticon.com/512/3068/3068321.png"
          : "https://cdn-icons-png.flaticon.com/512/149/149059.png",
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>LIVE FLEET TRACKING</div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <span style={styles.statDot("#28a745")}></span>
          Moving: {movingCount}
        </div>
        <div style={styles.statCard}>
          <span style={styles.statDot("#dc3545")}></span>
          Stopped: {stoppedCount}
        </div>
        <div style={styles.statCard}>
          <span style={styles.statDot("#FFC107")}></span>
          Total: {vehicles.length}
        </div>
      </div>

      <div style={styles.mapWrapper}>
        <div style={styles.mapContainer}>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {vehicles.map((vehicle, index) =>
              vehicle.latitude && vehicle.longitude ? (
                <Marker
                  key={index}
                  position={[vehicle.latitude, vehicle.longitude]}
                  icon={getVehicleIcon(vehicle.speed || 0)}
                >
                  <Popup>
                    <div style={{ fontSize: "13px", lineHeight: "1.6" }}>
                      <b>Vehicle Number:</b> {vehicle.vehicleNumber} <br />
                      <b>Speed:</b> {vehicle.speed || 0} km/h <br />
                      <b>Status:</b>{" "}
                      <span
                        style={{
                          color: vehicle.speed > 0 ? "#28a745" : "#dc3545",
                          fontWeight: "bold",
                        }}
                      >
                        {vehicle.speed > 0 ? "Moving" : "Stopped"}
                      </span>
                      <br />
                      {vehicle.location && (
                        <>
                          <b>Location:</b> {vehicle.location}
                        </>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default LiveFleetTracking;