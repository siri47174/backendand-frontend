// // import React, { useState } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import "./App.css"; // Import CSS file
// // import { useEffect } from "react";
// // import Sidebar from "./Components/Sidebar";

// // const Navbar = () => {
// //   const location = useLocation();
// //   const [openDropdown, setOpenDropdown] = useState(null);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth <= 768);
// //       if (window.innerWidth > 768) {
// //         setIsSidebarOpen(true); // Keep sidebar open on larger screens
// //       } else {
// //         setIsSidebarOpen(false);
// //       }
// //     };

// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const toggleSidebar = () => {
// //     if (isMobile) {
// //       setIsSidebarOpen((prev) => !prev);
// //     }
// //   };

// //   const toggleDropdown = (menu) => {
// //     setOpenDropdown(openDropdown === menu ? null : menu);
// //   };
// //   const handleDropdownItemClick = () => {
// //     setOpenDropdown(null);
// //     setIsMobileMenuOpen(false); // Optional: Close mobile menu as well
// //   };
// //   const toggleMobileMenu = () => {
// //     setIsMobileMenuOpen(!isMobileMenuOpen);
// //   };

// //   return (
// //     <>
// //     <nav className="nav-bar">
// //       {/* Logo */}
// //       <div className="logo" onClick={toggleSidebar} style={{ cursor: "pointer" }}>
// //           <img src="https://sendonow.com/Images/Logo.png" alt="Sendo Logo" />
// //         </div>
// //       {/* Hamburger Menu Button */}
// //       <div className="menu-toggle" onClick={toggleMobileMenu}>
// //         ☰
// //       </div>

// //       {/* Navigation Links with Dropdowns */}
// // <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
// //   {/* Vehicle Management */}
// //   <div className="dropdown">
// //     <button onClick={() => toggleDropdown("vehicle")}>Vehicle Management</button>
// //     {openDropdown === "vehicle" && (
// //       <div className="dropdown-menu">
// //         <Link to="/vehicle-documents" onClick={handleDropdownItemClick}>Documents</Link>
// //         <Link to="/live-fleet-tracking"onClick={handleDropdownItemClick}>Live Fleet Tracking</Link>
// //         <Link to="/diesel"onClick={handleDropdownItemClick}>Diesel</Link>
// //         <Link to="/expenses"onClick={handleDropdownItemClick}>Expenses</Link>
// //         <Link to="/oil-service"onClick={handleDropdownItemClick}>Oil Service</Link>
// //         <Link to="/spare-parts"onClick={handleDropdownItemClick}>Spare Parts</Link>
// //         <Link to="/vehicle-type"onClick={handleDropdownItemClick}>Vehicle Tyre</Link>
// //         <Link to="/vehicle-onboarding"onClick={handleDropdownItemClick}>Onboarding</Link>

// //       </div>
// //     )}
// //   </div>

// //         {/* Driver Management */}
// //         <div className="dropdown">
// //           <button onClick={() => toggleDropdown("driver")}>Driver Management</button>
// //           {openDropdown === "driver" && (
// //             <div className="dropdown-menu">
// //               <Link to="/driver-management" onClick={handleDropdownItemClick}>Overview</Link>
// //               <Link to="/driver-onboarding" onClick={handleDropdownItemClick}>Onboarding</Link>
// //               <Link to="/driver-deduction" onClick={handleDropdownItemClick}>Deduction</Link>
// //               <Link to="/driver-advance" onClick={handleDropdownItemClick}>Advance</Link>
// //               <Link to="/driver-salary" onClick={handleDropdownItemClick}>Salary</Link>
// //               <Link to="/driver-timeSheet" onClick={handleDropdownItemClick}>Driver Time Sheet</Link>
// //               <Link to="/driver-attendance" onClick={handleDropdownItemClick}>Driver Attendance</Link>
// //               <Link to="/driver-liveTracking" onClick={handleDropdownItemClick}>Driver Live Tracking</Link>
// //               <Link to="/vehicle-GPSIntegration" onClick={handleDropdownItemClick}>Vehicle GPS Integration</Link>
// //               <Link to="driver-vehicleTracking" onClick={handleDropdownItemClick}>Driver Vehicle Tracking</Link>
// //             </div>
// //           )}
// //         </div>

// //         {/* Expense Management */}
// //         <div className="dropdown">
// //           <button onClick={() => toggleDropdown("expense")}>Expense Management</button>
// //           {openDropdown === "expense" && (
// //             <div className="dropdown-menu">
// //               <Link to="/expenses-management" onClick={handleDropdownItemClick}>Overview</Link>
// //               <Link to="/vehicle-expenses"onClick={handleDropdownItemClick}>Vehicle Expenses</Link>
// //               <Link to="/others" onClick={handleDropdownItemClick}>Other Expenses</Link>
// //             </div>
// //           )}
// //         </div>

// //         {/* Vendor Management */}
// //         <div className="dropdown">
// //           <button onClick={() => toggleDropdown("vendor")}>Vendor Management</button>
// //           {openDropdown === "vendor" && (
// //             <div className="dropdown-menu">
// //               <Link to="/vendor-management" onClick={handleDropdownItemClick}>Overview</Link>
// //               <Link to="/vendor-onboarding" onClick={handleDropdownItemClick}>Onboarding</Link>
// //               <Link to="/advance" onClick={handleDropdownItemClick}>Advance</Link>
// //               <Link to="/deduction" onClick={handleDropdownItemClick}>Deductions</Link>
// //               <Link to="/payment" onClick={handleDropdownItemClick}>Payment</Link>
// //               <Link to="/trip-sheet" onClick={handleDropdownItemClick}>Trip Sheet</Link>
// //             </div>
// //           )}
// //         </div>

// //         {/* Customer Management */}
// //         <div className="dropdown">
// //           <button onClick={() => toggleDropdown("customer")}>Customer Management</button>
// //           {openDropdown === "customer" && (
// //             <div className="dropdown-menu">
// //               <Link to="/customer-management" onClick={handleDropdownItemClick}>Overview</Link>
// //               <Link to="/agreement" onClick={handleDropdownItemClick}>Agreement</Link>
// //               <Link to="/gst-file" onClick={handleDropdownItemClick}>GST File</Link>
// //               <Link to="/invoice"onClick={handleDropdownItemClick}>Invoice</Link>
// //               <Link to="/mis"onClick={handleDropdownItemClick}>MIS</Link>
// //               <Link to="/customer-onboarding"onClick={handleDropdownItemClick}>Onboarding</Link>
// //               <Link to="/payment-status"onClick={handleDropdownItemClick}>Payment Status</Link>

// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //     <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

// //     </>
// //   );
// // };

// // export default Navbar;

// // import React, { useState } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import "./App.css"; // Import CSS file
// // import { useEffect } from "react";
// // import Sidebar from "./Components/Sidebar";
// // import MyProfile from "./MyProfile";
// // import LogOut from "./AuthPages/LogOut";
// // import Notification from "./AuthPages/Notification";
// // import { FaBell } from "react-icons/fa"; // Import bell icon
// // import { FaUserCircle } from "react-icons/fa"; // Import user icon
// // import { useNavigate } from "react-router-dom";

// // const Navbar = () => {
// //   const location = useLocation();
// //   const [openDropdown, setOpenDropdown] = useState(null);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [showProfile, setShowProfile] = useState(false); // State to show/hide MyProfile
// //   const [showLogout, setLogOut] = useState(false); // State to show/hide MyProfile
// //   const [showNotification, setNotification] = useState(false); // State to show/hide MyProfile
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
// //   const [notificationCount, setNotificationCount] = useState(1); // Sample notification count
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth <= 768);
// //       setIsSidebarOpen(window.innerWidth > 768);
// //       if (window.innerWidth > 768) {
// //         setIsSidebarOpen(true); // Keep sidebar open on larger screens
// //       } else {
// //         setIsSidebarOpen(false);
// //       }
// //     };

// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);
// //   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

// //   const handleLogout = async () => {
// //     try {
// //       const response = await fetch(API_BASE_URL + "/api/logout", {
// //         method: "POST",
// //         credentials: "include",
// //       });
// //       console.log(response);
// //       if (response.ok){
// //         localStorage.setItem("isAuthenticated", "false");

// //         navigate("/login");
// //       }
// //       else console.error("Logout failed");
// //     } catch (error) {
// //       console.error("Error during logout:", error);
// //     }
// //   };

// //   const toggleDropdown = (menu) => {
// //     setOpenDropdown((prevMenu) => (prevMenu === menu ? null : menu));
// //   };

// //   const toggleMobileMenu = () => {
// //     setIsMobileMenuOpen(!isMobileMenuOpen);
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (!event.target.closest(".profile-section")) {
// //         setDropdownOpen(false);
// //       }
// //     };

// //     document.addEventListener("click", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("click", handleClickOutside);
// //     };
// //   }, []);

// //   return (
// //     <>
// //     <nav className="nav-bar">
// //       {/* Logo */}
// //       <div className="logo" onClick={toggleSidebar} style={{ cursor: "pointer" }}>
// //           <img src="https://sendonow.com/Images/Logo.png" alt="Sendo Logo" />
// //         </div>
// //       {/* Hamburger Menu Button */}
// //       <div className="menu-toggle" onClick={toggleMobileMenu}>
// //         ☰
// //       </div>
// //       <div className="nav-links">
// //           {/* My Profile Button */}
// //           <div className="nav-icons">
// //           {/* Notification Bell */}

// //           <div className="notification-icon" onClick={() => setNotification(!showNotification)}>
// //             <FaBell size={20} />
// //             {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
// //           </div>

// //           {/* User Profile */}
// //           <div className="profile-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
// //               <FaUserCircle size={30} className="profile-icon" />
// //               <span className="username">OMEG GLOBAL LOGISTICS</span>
// //               {dropdownOpen && (
// //                 <div className="dropdown-menu">
// //                   <button onClick={() => setShowProfile(true)}>My Profile</button>
// //                   <button onClick={handleLogout}>Logout</button>
// //                   {/* <button onClick={handleLogout}>Logout</button> */}
// //                 </div>
// //               )}
// //           </div>
// //           </div>
// //         </div>
// //       </nav>
// //     <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
// //     {showProfile && <MyProfile />}
// //       {showLogout && <LogOut />}
// //       {showNotification && <Notification />}

// //     </>
// //   );
// // };

// // export default Navbar;

// import React, { useState, useEffect } from "react";

// import { useNavigate } from "react-router-dom";

// import { FaBell, FaUserCircle } from "react-icons/fa";

// import Sidebar from "./Components/Sidebar";

// import MyProfile from "./MyProfile";

// import LogOut from "./AuthPages/LogOut";

// import Notification from "./AuthPages/Notification";

// import "./App.css";
// import API_BASE_URL from "./config";

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const [showProfile, setShowProfile] = useState(false);

//   const [showNotification, setNotification] = useState(false);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

//   const [notificationCount, setNotificationCount] = useState(1);

//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSidebarOpen(window.innerWidth > 768);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // const componentStyle = {
//   //   overflowX : "hidden"
//   // }

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch(API_BASE_URL + "/api/logout", {
//         method: "POST",

//         credentials: "include",
//       });

//       if (response.ok) {
//         localStorage.setItem("isAuthenticated", "false");

//         navigate("/login");
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   // Toggle Profile Dropdown

//   const toggleDropdown = (event) => {
//     event.stopPropagation(); // Prevent event bubbling

//     setDropdownOpen((prev) => !prev);
//   };

//   // Close Dropdown on outside click

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownOpen &&
//         !event.target.closest(".profile-section") &&
//         !event.target.closest(".dropdown-menu")
//       ) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [dropdownOpen]);

//   const componentStyle = {
//   // overflowX: "hidden",
//   // paddingRight : "50%"
// };



// const profileSectionStyle = {
//   // display: "flex",
//   // alignItems: "center",
//   // gap: "10px",
//   // cursor: "pointer",
//   // position: "absolute",
//   // right: "5%", // Positions it at the right side
//   // top: "50%", 
//   // transform: "translateY(-50%)", // Vertically centers the component
//   // whiteSpace: "nowrap", // Prevents text wrapping
//   // overflow: "hidden", // Prevents horizontal overflow
// };

// const usernameStyle = {
//   // whiteSpace: "nowrap",
//   // textOverflow: "ellipsis",
//   // paddingRight : "50%"
// };


//   return (
//     <div style={componentStyle}>
//       <nav className="nav-bar" style={{width:"100%"}}>
//         {/* Logo */}
//         <div
//           className="logo"
//           onClick={toggleSidebar}
//           style={{ cursor: "pointer" }}
//         >
//           <img src="https://sendonow.com/Images/Logo.png" alt="Sendo Logo" />
//         </div>

//         {/* Hamburger Menu Button */}
//         <div className="menu-toggle" onClick={toggleMobileMenu}>
//           ☰
//         </div>

//         <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
//           <div className="nav-icons">
//             {/* Logout Button */}
          

//             {/* Notification Bell */}
//             <div
//               className="notification-icon"
//               onClick={() => setNotification(!showNotification)}
//             >
//               <FaBell size={20} />

//               {notificationCount > 0 && (
//                 <span className="notification-badge">{notificationCount}</span>
//               )}
//             </div>

//             {/* User Profile */}
//             <div className="profile-section" style={profileSectionStyle} onClick={toggleDropdown}>
//               <FaUserCircle size={30} className="profile-icon" />
//               <div className="username" style={usernameStyle}>OMEG GLOBAL LOGISTICS</div>

//               {dropdownOpen && (
//                 <div className="dropdown-menu">
//                   <button onClick={() => setShowProfile(true)}>
//                     My Profile
//                   </button>
//                   <button onClick={handleLogout}>Logout</button>
//                 </div>
//               )}

//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar */}
//       <Sidebar
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />

//       {/* Conditional Components */}

//       {showProfile && <MyProfile />}

//       {showNotification && <Notification />}
//     </div>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import Sidebar from "./Components/Sidebar";
import MyProfile from "./MyProfile";
import Notification from "./AuthPages/Notification";
import "./App.css";
import API_BASE_URL from "./config";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setNotification] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [notificationCount, setNotificationCount] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "70px",
      backgroundColor: "#111",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      zIndex: 1000,
      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
    },
    logoWrap: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      gap: "10px",
    },
    logo: {
      height: "40px",
      objectFit: "contain",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    notifWrap: {
      position: "relative",
      cursor: "pointer",
      color: "white",
      display: "flex",
      alignItems: "center",
    },
    notifBadge: {
      position: "absolute",
      top: "-6px",
      right: "-8px",
      backgroundColor: "#FFC107",
      color: "#000",
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      fontSize: "11px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    profileSection: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      position: "relative",
      color: "white",
    },
    username: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#FFC107",
      whiteSpace: "nowrap",
    },
    dropdownMenu: {
      position: "absolute",
      top: "44px",
      right: 0,
      backgroundColor: "#222",
      border: "1px solid #444",
      borderRadius: "4px",
      minWidth: "160px",
      zIndex: 1100,
      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
      overflow: "hidden",
    },
    dropdownBtn: {
      display: "block",
      width: "100%",
      padding: "10px 16px",
      backgroundColor: "transparent",
      color: "white",
      border: "none",
      textAlign: "left",
      cursor: "pointer",
      fontSize: "14px",
      borderBottom: "1px solid #333",
    },
    hamburger: {
      display: "none",
      color: "white",
      fontSize: "22px",
      cursor: "pointer",
    },
  };

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest(".profile-section-wrap")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleLogout = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        localStorage.setItem("isAuthenticated", "false");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <nav style={styles.navbar}>
        {/* Logo — click toggles sidebar */}
        <div style={styles.logoWrap} onClick={toggleSidebar}>
          <img
            src="https://sendonow.com/Images/Logo.png"
            alt="Sendo Logo"
            style={styles.logo}
          />
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>

          {/* Notification Bell */}
          <div
            style={styles.notifWrap}
            onClick={() => setNotification(!showNotification)}
          >
            <FaBell size={20} />
            {notificationCount > 0 && (
              <span style={styles.notifBadge}>{notificationCount}</span>
            )}
          </div>

          {/* Profile */}
          <div
            className="profile-section-wrap"
            style={styles.profileSection}
            onClick={(e) => { e.stopPropagation(); setDropdownOpen(p => !p); }}
          >
            <FaUserCircle size={28} color="#FFC107" />
            <span style={styles.username}>OMEG GLOBAL LOGISTICS</span>

            {dropdownOpen && (
              <div style={styles.dropdownMenu}>
                <button
                  style={styles.dropdownBtn}
                  onMouseEnter={e => e.target.style.backgroundColor = "#FFC107"}
                  onMouseLeave={e => e.target.style.backgroundColor = "transparent"}
                  onClick={(e) => { e.stopPropagation(); setShowProfile(true); setDropdownOpen(false); }}
                >
                  👤 My Profile
                </button>
                <button
                  style={{ ...styles.dropdownBtn, borderBottom: "none" }}
                  onMouseEnter={e => e.target.style.backgroundColor = "#c62828"}
                  onMouseLeave={e => e.target.style.backgroundColor = "transparent"}
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Overlay components */}
      {showProfile && <MyProfile />}
      {showNotification && <Notification />}
    </div>
  );
};

export default Navbar;
