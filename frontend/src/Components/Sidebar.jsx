
// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
//   const [openSubmenu, setOpenSubmenu] = useState(null);

//   useEffect(() => {
//     const checkScreenSize = () => setIsSmallScreen(window.innerWidth <= 768);
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const toggleSubmenu = (menu) => {
//     setOpenSubmenu((prevMenu) => (prevMenu === menu ? null : menu));
//   };

//   const closeSidebarOnMobile = () => {
//     if (isSmallScreen) setIsSidebarOpen(false);
//   };

//   const renderSubmenu = (menu, links) => (
//     <ul style={{ ...styles.innerDropdown, display: openSubmenu === menu ? 'block' : 'none' }}>
//       {links.map(({ to, label }) => (
//         <NavLink key={to} to={to} style={styles.link} onClick={closeSidebarOnMobile}>
//           {label}
//         </NavLink>
//       ))}
//     </ul>
//   );

//   return (
//     <div style={{ ...styles.sidebar, display: isSidebarOpen ? "block" : "none" }}>
//       {/* Dashboard */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('dashboard')}>Dashboard</h3>
//       {renderSubmenu('dashboard', [
//         { to: '/home', label: 'Home' },
//         { to: '/dashboard-reports', label: 'Reports' },
//       ])}

//       {/* Vehicle Management */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('vehicle')}>Vehicle Management</h3>
//       {renderSubmenu('vehicle', [
//         { to: '/vehicle-documents', label: 'Documents' },
//         { to: '/live-fleet-tracking', label: 'Live Fleet Tracking' },
//         { to: '/diesel', label: 'Diesel' },
//         { to: '/expenses', label: 'Expenses' },
//         { to: '/oil-service', label: 'Oil Service' },
//         { to: '/spare-parts', label: 'Spare Parts' },
//         { to: '/vehicle-type', label: 'Vehicle Tyre' },
//         { to: '/vehicle-onboarding', label: 'Onboarding' },
//       ])}

//       {/* Driver Management */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('driver-management')}>Driver Management</h3>
//       {renderSubmenu('driver-management', [
//         { to: '/driver-management', label: 'Overview' },
//         { to: '/driver-onboarding', label: 'Onboarding' },
//         { to: '/driver-onboarding-shift', label: 'Driver Shift' },
//         { to: '/driver-deduction', label: 'Deduction' },
//         { to: '/driver-advance', label: 'Advance' },
//         { to: '/driver-salary', label: 'Salary' },
//         {to:'/driver-leave-admin', label:'Driver Leave Requests'},
//         { to: '/driver-timeSheet', label: 'Driver Time Sheet' },
//         { to: '/driver-attendance-approval',label:"Driver Attendance"},
//         { to: '/attendance-records',label:"Driver Records"},
//         { to: '/driver-liveTracking', label: 'Driver Live Tracking' },
//         { to: '/vehicle-GPSIntegration', label: 'Vehicle GPS Integration' },
//         { to: '/driver-vehicleTracking', label: 'Driver Vehicle Tracking' },
    
//       ])}
//         {/* Vendor Management */}
//         <h3 style={styles.header} onClick={() => toggleSubmenu('vendor-management')}>Vendor Management</h3>
//       {renderSubmenu('vendor-management', [
//         { to: '/vendor-management', label: 'Overview' },
//         { to: '/vendor-onboarding', label: 'Onboarding' },
//         { to: '/advance', label: 'Advance' },
//         { to: '/deduction', label: 'Deductions' },
//         { to: '/payment', label: 'Payment' },
//         { to: '/trip-sheet', label: 'Trip Sheet' },
//       ])}

//       {/* Customer Management */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('customer-management')}>Customer Management</h3>
//       {renderSubmenu('customer-management', [
//         { to: '/customer-management', label: 'Overview' },
//         { to: '/agreement', label: 'Agreement' },
//         { to: '/gst-file', label: 'GST File' },
//         { to: '/invoice', label: 'Invoice' },
//         { to: '/mis', label: 'MIS' },
//         { to: '/customer-onboarding', label: 'Onboarding' },
//         { to: '/payment-status', label: 'Payment Status' },
//       ])}

//       {/* Expense Management */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('expense-management')}>Expense Management</h3>
//       {renderSubmenu('expense-management', [
//         { to: '/expenses-management', label: 'Overview' },
//         { to: '/vehicle-expenses', label: 'Vehicle Expenses' },
//         { to: '/others', label: 'Other Expenses' },
//       ])}

//       {/* CRM */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('crm')}>CRM</h3>
//       {renderSubmenu('crm', [
//         { to: '/customer-management', label: 'Customer Management' },
//         { to: '/leads-opportunities', label: 'Leads & Opportunities' },
//         { to: '/sales-tracking', label: 'Sales Tracking' },
//       ])}

//       {/* Financial */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('financial')}>Financial</h3>
//       {renderSubmenu('financial', [
//         { to: '/invoice-generation', label: 'Invoice Generation' },
//         { to: '/payslip-management', label: 'Payslip Management' },
//         { to: '/expense-tracking', label: 'Expense Tracking' },
//       ])}

    

//       {/* Help & Support */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('help-support')}>Help & Support</h3>
//       {renderSubmenu('help-support', [
//         { to: '/help-support', label: 'Support' },
//       ])}

//       {/* My Subscriptions */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('subscriptions')}>My Subscriptions</h3>
//       {openSubmenu === 'subscriptions' && <div>No Submenu Available</div>}
//     </div>
//   );
// };
// const styles = {
//   sidebar: {
//     width: "250px",
//     height: "100%",
//     backgroundColor: "black",
//     color: "white",
//     position: "absolute",
//     top: "140px",
//     left: "0",
//     overflowY: "auto",
//     padding: "10px",
//   },
//   header: {
//     textAlign: "center",
//     textTransform: "uppercase",
//     backgroundColor: "#FFC107",
//     color: "black",
//     padding: "8px",
//     marginBottom: "10px",
//     cursor:"pointer",
//   },
//   list: {
//     listStyle: "none",
//     padding: "0",
//   },
//   listItem: {
//     color: "white",
//     padding: "10px",
//     textDecoration: "none",
//     display: "block",
//     cursor: "pointer",
//   },
//   dropdownMenu: {
//     backgroundColor: "#333",
//     paddingLeft: "20px",
//     marginTop: "5px",
//   },
//   link: {
//     color: "white",
//     textDecoration: "none",
//     display: "block",
//     padding: "5px 0",
//   },
// };


// export default Sidebar;


// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
 
// const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
//   const [openSubmenu, setOpenSubmenu] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
 
//   useEffect(() => {
//     const checkScreenSize = () => setIsSmallScreen(window.innerWidth <= 768);
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);
 
//   const toggleSubmenu = (menu) => {
//     setOpenSubmenu((prevMenu) => (prevMenu === menu ? null : menu));
//   };
 
//   const closeSidebarOnMobile = () => {
//     if (isSmallScreen) setIsSidebarOpen(false);
//   };
 
//   const renderSubmenu = (menu, links) => (
//     <ul style={{ ...styles.innerDropdown, display: openSubmenu === menu ? 'block' : 'none' }}>
//       {links.map(({ to, label }) => (
//         <NavLink key={to} to={to} style={styles.link} onClick={closeSidebarOnMobile}>
//           {label}
//         </NavLink>
//       ))}
//     </ul>
//   );
 
//   return (
    
 
//     <div style={{ ...styles.sidebar, display: isSidebarOpen ? "block" : "none" }}>
//       {/* Dashboard */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('dashboard')}>Dashboard</h3>
//       {renderSubmenu('dashboard', [
//         { to: '/home', label: 'Home' },
//         { to: '/my-profile', label: 'My Profile' },
//         { to: '/notification', label: 'Notifications' },
//         { to: '/my-requests', label: 'My Requests' },
//       ])}

//       {/* Vehicle Management */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('vehicle')}>Vehicle Management</h3>
//       {renderSubmenu('vehicle', [
//         { to: '/vehicle-management', label: 'Overview' },
//         { to: '/vehicle-onboarding', label: 'Onboarding' },
//         { to: '/vehicle-documents', label: 'Documents' },
//         { to: '/live-fleet-tracking', label: 'Live Fleet Tracking' },
//         { to: '/truck-maintenance', label: 'Truck Maintenance' },
//         { to: '/diesel', label: 'Diesel' },
//         { to: '/oil-service', label: 'Oil Service' },
//         { to: '/spare-parts', label: 'Spare Parts' },
//         { to: '/vehicle-type', label: 'Vehicle Tyre' },
//         { to: '/expenses', label: 'Expenses' },
//       ])}

//       {/* Driver Management */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('driver-management')}>Driver Management</h3>
//       {renderSubmenu('driver-management', [
//         { to: '/driver-management', label: 'Overview' },
//         { to: '/driver-onboarding', label: 'Onboarding' },
//         { to: '/driver-attendance-approval', label: 'Attendance' },
//         { to: '/attendance-records', label: 'Attendance Records' },
//         { to: '/driver-leave-admin', label: 'Leave Requests' },
//         { to: '/driver-advance', label: 'Advance' },
//         { to: '/driver-deduction', label: 'Deduction' },
//         { to: '/driver-salary', label: 'Salary' },
//         { to: '/driver-timeSheet', label: 'Time Sheet' },
//         { to: '/driver-onboarding-shift', label: 'Driver Shift' },
//         { to: '/driver-liveTracking', label: 'Live Tracking' },
//         { to: '/driver-vehicleTracking', label: 'Vehicle Tracking' },
//         { to: '/vehicle-GPSIntegration', label: 'GPS Integration' },
//       ])}

//       {/* Vendor Management */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('vendor-management')}>Vendor Management</h3>
//       {renderSubmenu('vendor-management', [
//         { to: '/vendor-management', label: 'Overview' },
//         { to: '/vendor-onboarding', label: 'Onboarding' },
//         { to: '/trip-sheet', label: 'Trip Sheet' },
//         { to: '/advance', label: 'Advance' },
//         { to: '/deduction', label: 'Deductions' },
//         { to: '/payment', label: 'Payment' },
//       ])}

//       {/* Customer Management */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('customer-management')}>Customer Management</h3>
//       {renderSubmenu('customer-management', [
//         { to: '/customer-management', label: 'Overview' },
//         { to: '/customer-onboarding', label: 'Onboarding' },
//         { to: '/agreement', label: 'Agreement' },
//         { to: '/invoice', label: 'Invoice' },
//         { to: '/gst-file', label: 'GST Filing' },
//         { to: '/payment-status', label: 'Payment Status' },
//         { to: '/mis', label: 'MIS Reports' },
//       ])}

//       {/* Expense Management */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('expense-management')}>Expense Management</h3>
//       {renderSubmenu('expense-management', [
//         { to: '/expenses-management', label: 'Overview' },
//         { to: '/vehicle-expenses', label: 'Vehicle Expenses' },
//         { to: '/others', label: 'Other Expenses' },
//       ])}

//       {/* Help & Support */}
//       <h3 style={styles.header} onClick={() => toggleSubmenu('help-support')}>Help & Support</h3>
//       {renderSubmenu('help-support', [
//         { to: '/help-support', label: 'Help & Support' },
//         { to: '/my-requests', label: 'My Requests' },
//       ])}
//     </div>
//   );
// };
// const styles = {
//   sidebar: {
//     width: "250px",
//     height: "calc(100vh - 70px)",
//     backgroundColor: "#111",
//     color: "white",
//     position: "fixed",
//     top: "70px",
//     left: "0",
//     overflowY: "auto",
//     padding: "10px",
//     zIndex: 900,
//     boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
//   },
//   innerDropdown: {
//     listStyle: "none",
//     padding: "4px 0 4px 12px",
//     margin: 0,
//     backgroundColor: "#1a1a1a",
//     borderLeft: "3px solid #FFC107",
//     marginBottom: "6px",
//   },
//   header: {
//     textAlign: "center",
//     textTransform: "uppercase",
//     backgroundColor: "#FFC107",
//     color: "black",
//     padding: "8px",
//     marginBottom: "10px",
//     cursor:"pointer",
//   },
//   list: {
//     listStyle: "none",
//     padding: "0",
//   },
//   listItem: {
//     color: "white",
//     padding: "10px",
//     textDecoration: "none",
//     display: "block",
//     cursor: "pointer",
//   },
//   dropdownMenu: {
//     backgroundColor: "#333",
//     paddingLeft: "20px",
//     marginTop: "5px",
//   },
//   link: {
//     color: "white",
//     textDecoration: "none",
//     display: "block",
//     padding: "5px 0",
//   },
// };
 
 
// export default Sidebar;
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu((prev) => (prev === menu ? null : menu));
  };

  const closeSidebarOnMobile = () => {
    if (isSmallScreen) setIsSidebarOpen(false);
  };

  const styles = {
    sidebar: {
      width: "250px",
      height: "calc(100vh - 70px)",
      backgroundColor: "#111",
      color: "white",
      position: "fixed",
      top: "70px",
      left: "0",
      overflowY: "auto",
      padding: "10px 0",
      zIndex: 900,
      boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
      display: isSidebarOpen ? "block" : "none",
    },
    header: {
      textAlign: "center",
      textTransform: "uppercase",
      backgroundColor: "#FFC107",
      color: "#000",
      padding: "10px 14px",
      marginBottom: "0",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      letterSpacing: "0.5px",
      userSelect: "none",
    },
    submenu: {
      listStyle: "none",
      padding: "4px 0 8px 0",
      margin: "0 0 4px 0",
      backgroundColor: "#1a1a1a",
      borderLeft: "3px solid #FFC107",
    },
    link: {
      color: "#ffffff",
      textDecoration: "none",
      display: "block",
      padding: "7px 16px",
      fontSize: "13px",
      fontWeight: "normal",
      transition: "background 0.15s",
    },
  };

  const renderSubmenu = (menu, links) => (
    <ul style={{ ...styles.submenu, display: openSubmenu === menu ? "block" : "none" }}>
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={closeSidebarOnMobile}
          style={({ isActive }) => ({
            ...styles.link,
            backgroundColor: isActive ? "#FFC107" : "transparent",
            color: isActive ? "#000" : "#ffffff",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          {label}
        </NavLink>
      ))}
    </ul>
  );

  return (
    <div style={styles.sidebar}>

      {/* Dashboard */}
      <h3 style={styles.header} onClick={() => toggleSubmenu("dashboard")}>
        Dashboard
      </h3>
      {renderSubmenu("dashboard", [
        { to: "/home", label: "Home" },
        { to: "/my-profile", label: "My Profile" },
        { to: "/notification", label: "Notifications" },
        { to: "/my-requests", label: "My Requests" },
      ])}

      {/* Vehicle Management */}
      <h3 style={styles.header} onClick={() => toggleSubmenu("vehicle")}>
        Vehicle Management
      </h3>
      {renderSubmenu("vehicle", [
        { to: "/vehicle-management", label: "Overview" },
        { to: "/vehicle-onboarding", label: "Onboarding" },
        { to: "/vehicle-documents", label: "Documents" },
        { to: "/live-fleet-tracking", label: "Live Fleet Tracking" },
        { to: "/truck-maintenance", label: "Truck Maintenance" },
        { to: "/diesel", label: "Diesel" },
        { to: "/oil-service", label: "Oil Service" },
        { to: "/spare-parts", label: "Spare Parts" },
        { to: "/vehicle-type", label: "Vehicle Tyre" },
        { to: "/expenses", label: "Expenses" },
      ])}

      {/* Driver Management */}
      <h3 style={styles.header} onClick={() => toggleSubmenu("driver-management")}>
        Driver Management
      </h3>
      {renderSubmenu("driver-management", [
        { to: "/driver-management", label: "Overview" },
        { to: "/driver-onboarding", label: "Onboarding" },
        { to: "/driver-attendance-approval", label: "Attendance" },
        { to: "/attendance-records", label: "Attendance Records" },
        { to: "/driver-leave-admin", label: "Leave Requests" },
        { to: "/driver-advance", label: "Advance" },
        { to: "/driver-deduction", label: "Deduction" },
        { to: "/driver-salary", label: "Salary" },
        { to: "/driver-timeSheet", label: "Time Sheet" },
        { to: "/driver-onboarding-shift", label: "Driver Shift" },
        { to: "/driver-liveTracking", label: "Live Tracking" },
        { to: "/driver-vehicleTracking", label: "Vehicle Tracking" },
        { to: "/vehicle-GPSIntegration", label: "GPS Integration" },
      ])}

      {/* Vendor Management */}
      <h3 style={styles.header} onClick={() => toggleSubmenu("vendor-management")}>
        Vendor Management
      </h3>
      {renderSubmenu("vendor-management", [
        { to: "/vendor-management", label: "Overview" },
        { to: "/vendor-onboarding", label: "Onboarding" },
        { to: "/trip-sheet", label: "Trip Sheet" },
        { to: "/advance", label: "Advance" },
        { to: "/deduction", label: "Deductions" },
        { to: "/payment", label: "Payment" },
      ])}

      {/* Customer Management */}
      <h3 style={styles.header} onClick={() => toggleSubmenu("customer-management")}>
        Customer Management
      </h3>
      {renderSubmenu("customer-management", [
        { to: "/customer-management", label: "Overview" },
        { to: "/customer-onboarding", label: "Onboarding" },
        { to: "/agreement", label: "Agreement" },
        { to: "/invoice", label: "Invoice" },
        { to: "/gst-file", label: "GST Filing" },
        { to: "/payment-status", label: "Payment Status" },
        { to: "/mis", label: "MIS Reports" },
      ])}

      {/* Expense Management */}
      <h3 style={styles.header} onClick={() => toggleSubmenu("expense-management")}>
        Expense Management
      </h3>
      {renderSubmenu("expense-management", [
        { to: "/expenses-management", label: "Overview" },
        { to: "/vehicle-expenses", label: "Vehicle Expenses" },
        { to: "/others", label: "Other Expenses" },
      ])}

      {/* Help & Support */}
      <h3 style={styles.header} onClick={() => toggleSubmenu("help-support")}>
        Help & Support
      </h3>
      {renderSubmenu("help-support", [
        { to: "/help-support", label: "Help & Support" },
        { to: "/my-requests", label: "My Requests" },
      ])}

    </div>
  );
};

export default Sidebar;