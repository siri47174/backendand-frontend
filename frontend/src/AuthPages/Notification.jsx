// import { useState, useRef, useEffect } from "react";

// export default function Notification() {
//   const [search, setSearch] = useState("");
//   const [alertType, setAlertType] = useState("All");
//   const [alerts, setAlerts] = useState([]);

//   const alertOptions = ["All", "Stop Now", "Visit Soon", "Driver Alerts", "Fuel Drain", "Fuel Refill", "Over Speeding"];

//   const handleSearch = () => {
//     setAlerts([]); // Replace with fetched data
//   };

//   return (
//     <div className="container">
//       <button className="back-button">← Back</button>
//       <h2 className="title">My Notifications</h2>

//       <div className="button-group">
//         <button className="primary-button">Eicher Live+ (0)</button>
//         <button className="outline-button">After Market (0)</button>
//         <button className="outline-button">Payments (0)</button>
//         <button className="outline-button">Consent (0)</button>
//       </div>

//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Enter Reg No./Chassis No."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="input-field"
//         />
//         <select value={alertType} onChange={(e) => setAlertType(e.target.value)} className="dropdown">
//           {alertOptions.map((option) => (
//             <option key={option} value={option}>{option}</option>
//           ))}
//         </select>
//         <button onClick={handleSearch} className="submit-button">Submit</button>
//       </div>

//       <div className="card">
//         <div className="card-content">
//           <p className="alert-title">Showing {alerts.length} Alerts</p>
//           {alerts.length === 0 ? (
//             <p className="no-alerts">No Alerts Generated!</p>
//           ) : (
//             alerts.map((alert, index) => <p key={index}>{alert}</p>)
//           )}
//         </div>
//       </div>

//       {/* Embedded CSS */}
//       <style>
//         {`
//           .container {
//             padding: 24px;
//             max-width: 700px;
//             margin: auto;
//             font-family: Arial, sans-serif;
//           }

//           .back-button {
//             background: none;
//             border: none;
//             color: red;
//             font-size: 16px;
//             cursor: pointer;
//             margin-bottom: 16px;
//           }

//           .title {
//             font-size: 24px;
//             font-weight: bold;
//             margin-bottom: 16px;
//           }

//           .button-group {
//             display: flex;
//             gap: 12px;
//             margin-bottom: 24px;
//           }

//           .primary-button {
//             background-color: blue;
//             color: white;
//             padding: 8px 16px;
//             border-radius: 4px;
//             border: none;
//             cursor: pointer;
//           }

//           .outline-button {
//             background: none;
//             border: 1px solid gray;
//             padding: 8px 16px;
//             border-radius: 4px;
//             cursor: pointer;
//           }

//           .search-container {
//             display: flex;
//             gap: 12px;
//             align-items: center;
//             margin-bottom: 24px;
//           }

//           .input-field {
//             flex: 1;
//             padding: 8px;
//             border: 1px solid gray;
//             border-radius: 4px;
//           }

//           .dropdown {
//             width: 160px;
//             padding: 8px;
//             border: 1px solid gray;
//             border-radius: 4px;
//           }

//           .submit-button {
//             background-color: red;
//             color: white;
//             padding: 8px 16px;
//             border-radius: 4px;
//             border: none;
//             cursor: pointer;
//           }

//           .card {
//             border: 1px solid #ddd;
//             border-radius: 8px;
//             padding: 16px;
//             background-color: white;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//           }

//           .card-content {
//             font-size: 16px;
//           }

//           .alert-title {
//             font-size: 18px;
//             font-weight: bold;
//             margin-bottom: 8px;
//           }

//           .no-alerts {
//             color: gray;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";

export default function Notification() {
  const [search, setSearch] = useState("");
  const [alertType, setAlertType] = useState("All");
  const [alerts, setAlerts] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef([]);

//   const alertOptions = ["All", "Stop Now", "Visit Soon", "Driver Alerts", "Fuel Drain", "Fuel Refill", "Over Speeding"];

const alertOptions = {
    "Eicher Live+": [
      "All", "Stop Now", "Visit Soon", "Driver Alerts", "Fuel Drain", "Fuel Refill",
      "Over Speeding", "Over Stoppage", "Geofence Entry", "Geofence Exit", "Route Deviation",
      "Harsh Braking", "Excessive Idling", "Harsh Acceleration", "Low SOC"
    ],
    "After Market": ["All", "Breakdown", "Service"],
    "Payments": ["All", "AMC", "Insurance", "Eicher Live+"],
    "Consent": ["All", "Telematics", "Opspod"]
  };
  const tabs = ["Eicher Live+", "After Market", "Payments", "Consent"];

  const handleSearch = () => {
    setAlerts([]); // Replace with fetched data
  };

  const handleClick = (index) => {
    setActiveIndex(index);
    setAlertType("All");
    tabsRef.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  return (
    <div className="container" style={{ marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" }}>
      <h2 className="sendo-heading">Notifications</h2>
      <h2 className="title">My Notifications</h2>

      {/* Scrollable Tab Navigation */}
      <div className="tab-container">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleClick(index)}
              className={`tab-button ${activeIndex === index ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Moving Indicator */}
        <div
          className="indicator"
          style={{
            width: tabsRef.current[activeIndex]?.offsetWidth || 0,
            transform: `translateX(${tabsRef.current[activeIndex]?.offsetLeft || 0}px)`,
          }}
        />
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Reg No./Chassis No."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field"
        />
        <select value={alertType} onChange={(e) => setAlertType(e.target.value)} className="dropdown">
        {alertOptions[tabs[activeIndex]].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button onClick={handleSearch} className="submit-button">Submit</button>
      </div>

      <div className="card">
        <div className="card-content">
          <p className="alert-title">Showing {alerts.length} Alerts</p>
          {alerts.length === 0 ? (
            <p className="no-alerts">No Alerts Generated!</p>
          ) : (
            alerts.map((alert, index) => <p key={index}>{alert}</p>)
          )}
        </div>
      </div>

      {/* Embedded CSS */}
      <style>
        {`
          .container {
            padding: 24px;
            max-width: 900px;
            margin: auto;
            font-family: Arial, sans-serif;
            margin-left:24rem;
          }

          .back-button {
            background: none;
            border: none;
            color: red;
            font-size: 16px;
            cursor: pointer;
            margin-bottom: 16px;
          }

          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 16px;
          }

          /* Scrollable Tabs */
          .tab-container {
            position: relative;
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 8px;
            border-bottom: 2px solid #ddd;
            margin-bottom: 20px;
          }

          .tabs {
            display: flex;
            gap: 16px;
          }

          .tab-button {
            background: none;
            border: none;
            padding: 12px 16px;
            font-size: 16px;
            cursor: pointer;
            color: gray;
            transition: color 0.3s ease-in-out;
          }

          .tab-button.active {
            color: blue;
            font-weight: bold;
          }

          .indicator {
            position: absolute;
            bottom: 0;
            height: 3px;
            background-color: blue;
            transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
          }

          .search-container {
            display: flex;
            gap: 12px;
            align-items: center;
            margin-bottom: 24px;
          }

          .input-field {
            flex: 1;
            padding: 8px;
            border: 1px solid gray;
            border-radius: 4px;
          }

          .dropdown {
            width: 160px;
            padding: 8px;
            max-height: 150px; 
            overflow-y: auto;
            border: 1px solid gray;
            border-radius: 4px;
          }

          .submit-button {
            background-color: red;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
          }

          .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .card-content {
            font-size: 16px;
          }

          .alert-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
          }

          .no-alerts {
            color: gray;
          }
        `}
      </style>
    </div>
  );
}
