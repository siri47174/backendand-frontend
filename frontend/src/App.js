// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./Navbar";
// import Documents from "./driver-application/VehicleManagement/Documents.jsx";
// import VehicleOnboarding from "./driver-application/VehicleManagement/VehicleOnboarding";
// import LiveFleetTracking from "./driver-application/VehicleManagement/LiveFleetTracking";
// import OilService from "./driver-application/VehicleManagement/OilService";
// import SpareParts from "./driver-application/VehicleManagement/SpareParts";
// import VehicleType from "./driver-application/VehicleManagement/VehicleTyre.jsx";
// import DriverManagement from "./driver-application/DriverManagement/DriverManagement";
// import DriverOnboarding from "./driver-application/DriverManagement/DriverOnboarding.jsx";
// import ExpensesManagement from "./driver-application/ExpenseManagement/ExpensesManagement";
// import VehicleExpenses from "./driver-application/ExpenseManagement/VehicleExpenses";
// import Others from "./driver-application/ExpenseManagement/Others";
// import VendorManagement from "./driver-application/VendorManagement/VendorManagement";
// import Advance from "./driver-application/VendorManagement/Advance";
// import Deduction from "./driver-application/VendorManagement/Deduction";
// import Payment from "./driver-application/VendorManagement/Payment";
// import TripSheet from "./driver-application/VendorManagement/TripSheet";
// import CustomerManagement from "./driver-application/CustomerManagement/CustomerManagement";
// import VendorOnboarding from "./driver-application/VendorManagement/VendorOnboarding.jsx";
// import Agreement from "./driver-application/CustomerManagement/Agreement.jsx";
// import GSTFile from "./driver-application/CustomerManagement/GSTFile.jsx";
// import Invoice from "./driver-application/CustomerManagement/Invoice.jsx";
// import PaymentStatus from "./driver-application/CustomerManagement/PaymentStatus.jsx";
// import CustomerOnboarding from "./driver-application/CustomerManagement/CustomerOnboarding.jsx";
// import MIS from "./driver-application/CustomerManagement/MIS";
// import Sidebar from "./Components/Sidebar.jsx";
// import CustomerConfirmation from "./driver-application/CustomerManagement/CustomerConfirmation.jsx";
// import VehicleConfirmation from "./driver-application/VehicleManagement/VehicleConfirmation.jsx";
// import DriverConfirmation from "./driver-application/DriverManagement/DriverConfirmation.jsx";
// import VendorConfirmation from "./driver-application/VendorManagement/VendorConfirmation.jsx";
// import Diesel from "./driver-application/VehicleManagement/Diesel.jsx";
// import Expenses from "./driver-application/VehicleManagement/Expenses.jsx";
// import DieselConfirmation from "./driver-application/VehicleManagement/DieselConfirmation.jsx";
// import VehicleTyreConfirmation from "./driver-application/VehicleManagement/VehicleTyreConfirmation.jsx";
// import OilServiceConfirmation from "./driver-application/VehicleManagement/OilServiceConfirmation.jsx";
// import SparePartsConfirmation from "./driver-application/VehicleManagement/SparePartsConfirmation.jsx";
// import DriverDeduction from "./driver-application/DriverManagement/DriverDeduction.jsx";
// import DriverAdvance from "./driver-application/DriverManagement/DriverAdvance.jsx";
// import Salary from "./driver-application/DriverManagement/Salary.jsx";
// import LoginPage from "./AuthPages/LoginPage.jsx";
// import SignInPage from "./AuthPages/SignIn.jsx";
// import ForgotPasswordPage from "./AuthPages/ForgotPasswordPage.jsx";
// import ResetPassword from "./AuthPages/ResetPassword.jsx";
// import DriverTimeSheet from "./driver-application/DriverManagement/DriverTimeSheet.jsx";
// import DriverLiveTracking from "./driver-application/DriverManagement/DriverLiveTracking.jsx";
// import VehicleGPSIntegration from "./driver-application/DriverManagement/VehicleGPSIntegration.jsx";
// import DriverVehicleTracking from "./driver-application/DriverManagement/DriverVehicleTracking.jsx";
// import Home from "./Components/Home.jsx";
// import MyProfile from "./MyProfile.jsx";
// import LogOut from "./AuthPages/LogOut.jsx";
// import Notification from "./AuthPages/Notification.jsx";
// import HelpSupport from "./Components/HelpSupport.jsx";
// import MyRequest from "./Components/MyRequest.jsx";
// import Attendance from "./driver-application/DriverManagement/Attendance.jsx";
// import AttendanceRecords from "./driver-application/DriverManagement/AttendanceRecords.jsx";
// import DriverShift from "./driver-application/DriverManagement/DriverShift.jsx";
// import LeaveRequest from "./driver-application/DriverManagement/LeaveRequest.jsx";
// import TruckMaintenance from "./driver-application/VehicleManagement/TruckMaintenance.jsx";
// import VehicleManagement from "./driver-application/VehicleManagement/VehicleManagement.jsx";
// import DashboardReports from "./Components/DashboardReports.jsx";

// const App = () => {
//   const [stoppedCount, setStoppedCount] = useState(0);
//   const [movingCount, setMovingCount] = useState(0);
//   // AUTO-LOGIN: bypass authentication - always authenticated
//   const [isAuthenticated, setIsAuthenticated] = useState(true);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("isAuthenticated");
//   };

//   return (
//     <Router>
//       {isAuthenticated ? (
//         <>
//           <Navbar/>
//           <Routes>
//             <Route path="*" element={<Navigate to="/home" />} />
//             <Route path="/help-support" element={<HelpSupport/>}/>
//             <Route path="/my-requests" element={<MyRequest/>}/>
//             <Route path="/home" element={<Home stoppedCount={stoppedCount} movingCount={movingCount}/>}/>
//             <Route path="/my-profile" element={<MyProfile/>}/>
//             <Route path="/notification" element={<Notification/>}/>
//             {/* Vehicle Management Routes */}
//             <Route path="/vehicle-documents" element={<Documents />} />
//             <Route path="/vehicle-onboarding" element={<VehicleOnboarding />} />
//             <Route path="/live-fleet-tracking" element={<LiveFleetTracking setStoppedCount={setStoppedCount} setMovingCount={setMovingCount} />}/>
//             <Route path="/oil-service" element={<OilService />} />
//             <Route path="/spare-parts" element={<SpareParts />} />
//             <Route path="/vehicle-type" element={<VehicleType />} />
//             <Route path="/vehicle-confirm" element={<VehicleConfirmation />} />
//             <Route path="/diesel" element={<Diesel />} />
//             <Route path="/expenses" element={<Expenses />} />
//             <Route path="/diesel-confirmation" element={<DieselConfirmation />}/>
//             <Route path="/vehicle-tyre-confirm" element={<VehicleTyreConfirmation />}/>
//             <Route path="/oil-service-confirmation" element={<OilServiceConfirmation />}/>
//             <Route path="/spare-parts-confirmation" element={<SparePartsConfirmation />}/>
//             <Route path="/truck-maintenance" element={<TruckMaintenance />} />
//             <Route path="/vehicle-management" element={<VehicleManagement />} />
//             <Route path="/dashboard-reports" element={<DashboardReports />} />
//             {/* Driver Management Routes */}
//             <Route path="/driver-management" element={<DriverManagement />} />
//             <Route path="/driver-onboarding" element={<DriverOnboarding />} />
//             <Route path="/driver-confirm" element={<DriverConfirmation />} />
//             <Route path="/driver-deduction" element={<DriverDeduction />} />
//             <Route path="/driver-advance" element={<DriverAdvance />} />
//             <Route path="/driver-salary" element={<Salary />} />
//             <Route path="/driver-timeSheet" element={<DriverTimeSheet/>}/>
//             <Route path="/driver-liveTracking" element={<DriverLiveTracking/>}/>
//             <Route path="/vehicle-GPSIntegration" element={<VehicleGPSIntegration/>}/>
//             <Route path="/driver-vehicleTracking" element={<DriverVehicleTracking/>}/>
//             <Route path="/driver-attendance-approval" element={<Attendance/>}/>
//             <Route path="/attendance-records" element={<AttendanceRecords/>}/>
//             <Route path="/driver-onboarding-shift" element={<DriverShift/>}/>
//             <Route path="/driver-leave-admin" element={<LeaveRequest/>}/>
//             {/* Expense Management Routes */}
//             <Route path="/expenses-management" element={<ExpensesManagement />}/>
//             <Route path="/vehicle-expenses" element={<VehicleExpenses />} />
//             <Route path="/others" element={<Others />} />
//             {/* Vendor Management Routes */}
//             <Route path="/vendor-management" element={<VendorManagement />} />
//             <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
//             <Route path="/advance" element={<Advance />} />
//             <Route path="/deduction" element={<Deduction />} />
//             <Route path="/payment" element={<Payment />} />
//             <Route path="/trip-sheet" element={<TripSheet />} />
//             <Route path="/vendor-confirm" element={<VendorConfirmation />} />
//             {/* Customer Management */}
//             <Route path="/customer-management" element={<CustomerManagement />}/>
//             <Route path="/customer-onboarding" element={<CustomerOnboarding />}/>
//             <Route path="/agreement" element={<Agreement />} />
//             <Route path="/gst-file" element={<GSTFile />} />
//             <Route path="/invoice" element={<Invoice />} />
//             <Route path="/mis" element={<MIS />} />
//             <Route path="/payment-status" element={<PaymentStatus />} />
//             <Route path="/customer-confirm" element={<CustomerConfirmation />}/>
//           </Routes>
//         </>
//       ) : (
//         <Routes>
//           <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
//           <Route path="/sign-in" element={<SignInPage />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//           <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
//           <Route path="/reset-password" element={<ResetPassword/>}/>
//         </Routes>
//       )}
//     </Router>
//   );
// };

// export default App;
