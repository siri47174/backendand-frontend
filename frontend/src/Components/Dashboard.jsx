// import React from "react";
// const Dashboard = () => {
//     return (
//   <div className="ml-64 p-5 w-[calc(100%-250px)] bg-white min-h-screen">
//   <div className="bg-black text-white p-5 text-center text-lg rounded mb-5">Fleet Management Dashboard</div>
//   <div className="grid grid-cols-2 gap-5">
//   <div className="p-5 border border-gray-300 rounded text-center font-bold cursor-pointer hover:bg-black hover:text-yellow-400">Vehicle Tracking</div>
//   <div className="p-5 border border-gray-300 rounded text-center font-bold cursor-pointer hover:bg-black hover:text-yellow-400">Driver Management</div>
//   </div>
//   <button className="block w-full p-3 mt-5 bg-black text-white rounded cursor-pointer hover:bg-yellow-400 hover:text-black">Manage Fleet</button>
//   </div>
//     );
//   };
//   export default Dashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "./config";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalDrivers: 0,
    activeTrips: 0,
    pendingLeaves: 0,
    totalExpenses: 0,
    pendingInvoices: 0,
  });

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
    innerPad: { padding: "24px 20px" },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#000",
      borderBottom: "2px solid #FFC107",
      paddingBottom: "6px",
      marginBottom: "16px",
      marginTop: "10px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
      marginBottom: "32px",
    },
    statCard: (bg) => ({
      padding: "18px 20px",
      borderRadius: "6px",
      backgroundColor: bg,
      border: "1.5px solid #000",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    }),
    statValue: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#000",
    },
    statLabel: {
      fontSize: "13px",
      color: "#555",
      fontWeight: "bold",
    },
    quickGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "14px",
      marginBottom: "32px",
    },
    quickCard: {
      padding: "18px 20px",
      border: "1.5px solid #000",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#000",
      backgroundColor: "#fff",
      textAlign: "center",
      transition: "all 0.2s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
    },
    quickIcon: {
      fontSize: "28px",
    },
    alertsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "14px",
    },
    alertCard: (border) => ({
      padding: "14px 16px",
      borderRadius: "6px",
      border: `2px solid ${border}`,
      backgroundColor: "#fff",
    }),
    alertTitle: (color) => ({
      fontWeight: "bold",
      fontSize: "14px",
      color: color,
      marginBottom: "6px",
    }),
    alertText: {
      fontSize: "13px",
      color: "#555",
    },
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [vehicles, drivers, trips, leaves] = await Promise.allSettled([
          axios.get(`${API_BASE_URL}/onboarding/all-vehicles`),
          axios.get(`${API_BASE_URL}/onboarding/all-drivers`),
          axios.get(`${API_BASE_URL}/trip/trip-sheet`),
          axios.get(`${API_BASE_URL}/leave/all`),
        ]);
        setStats({
          totalVehicles: vehicles.value?.data?.length || 0,
          totalDrivers: drivers.value?.data?.length || 0,
          activeTrips: trips.value?.data?.filter(t => t.status === "In Transit")?.length || 0,
          pendingLeaves: leaves.value?.data?.filter(l => l.status === "Pending")?.length || 0,
          totalExpenses: 0,
          pendingInvoices: 0,
        });
      } catch (e) {
        console.log("Stats fetch error:", e);
      }
    };
    fetchStats();
  }, []);

  const quickLinks = [
    { icon: "🚛", label: "Vehicle Onboarding", path: "/driver-onboarding" },
    { icon: "👤", label: "Driver Onboarding", path: "/vehicle-onboarding" },
    { icon: "📋", label: "Trip Sheet", path: "/trip-sheet" },
    { icon: "📍", label: "Live Tracking", path: "/live-fleet-tracking" },
    { icon: "💰", label: "Expenses", path: "/expenses" },
    { icon: "🧾", label: "Invoices", path: "/invoices" },
    { icon: "📄", label: "Agreements", path: "/agreements" },
    { icon: "📊", label: "GST Filing", path: "/gst-file" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>FLEET MANAGEMENT DASHBOARD</div>

      <div style={styles.innerPad}>

        {/* Stats */}
        <div style={styles.sectionTitle}>Overview</div>
        <div style={styles.statsGrid}>
          <div style={styles.statCard("#fff8e1")}>
            <div style={styles.statValue}>{stats.totalVehicles}</div>
            <div style={styles.statLabel}>🚛 Total Vehicles</div>
          </div>
          <div style={styles.statCard("#e8f5e9")}>
            <div style={styles.statValue}>{stats.totalDrivers}</div>
            <div style={styles.statLabel}>👤 Total Drivers</div>
          </div>
          <div style={styles.statCard("#e3f2fd")}>
            <div style={styles.statValue}>{stats.activeTrips}</div>
            <div style={styles.statLabel}>🗺️ Active Trips</div>
          </div>
          <div style={styles.statCard("#fce4ec")}>
            <div style={styles.statValue}>{stats.pendingLeaves}</div>
            <div style={styles.statLabel}>📅 Pending Leaves</div>
          </div>
          <div style={styles.statCard("#f3e5f5")}>
            <div style={styles.statValue}>{stats.totalExpenses}</div>
            <div style={styles.statLabel}>💸 Total Expenses</div>
          </div>
          <div style={styles.statCard("#fff3e0")}>
            <div style={styles.statValue}>{stats.pendingInvoices}</div>
            <div style={styles.statLabel}>🧾 Pending Invoices</div>
          </div>
        </div>

        {/* Quick Links */}
        <div style={styles.sectionTitle}>Quick Access</div>
        <div style={styles.quickGrid}>
          {quickLinks.map((item) => (
            <div
              key={item.label}
              style={styles.quickCard}
              onClick={() => window.location.href = item.path}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#FFC107";
                e.currentTarget.style.borderColor = "#000";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.borderColor = "#000";
              }}
            >
              <span style={styles.quickIcon}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div style={styles.sectionTitle}>System Alerts</div>
        <div style={styles.alertsGrid}>
          <div style={styles.alertCard("#FFC107")}>
            <div style={styles.alertTitle("#b8860b")}>⚠️ Document Expiry</div>
            <div style={styles.alertText}>
              Check vehicle documents for upcoming expiry dates. Navigate to Vehicle → Documents to review.
            </div>
          </div>
          <div style={styles.alertCard("#4caf50")}>
            <div style={styles.alertTitle("#2e7d32")}>✅ System Status</div>
            <div style={styles.alertText}>
              All systems operational. Backend connected and running on port 5001.
            </div>
          </div>
          <div style={styles.alertCard("#2196f3")}>
            <div style={styles.alertTitle("#1565c0")}>ℹ️ Pending Actions</div>
            <div style={styles.alertText}>
              Review pending leave requests and unpaid invoices in their respective sections.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;