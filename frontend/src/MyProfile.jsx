// import React, { useState } from "react";

// const MyProfile = () => {
//   const [formData, setFormData] = useState({
//     fullName: "OMEG GLOBAL LOGISTICS",
//     eicherId: "1124034",
//     phoneNumber: "+918179696364",
//     isWhatsapp: "No",
//     whatsappNumber: "",
//     communicationChannel: [],
//     dob: "",
//     email: "Instanttrans@gmail.com",
//     applications: [],
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prev) => ({
//         ...prev,
//         communicationChannel: checked
//           ? [...prev.communicationChannel, value]
//           : prev.communicationChannel.filter((ch) => ch !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//   };

//   return (
//     <div style={styles.container}>
//       <h2 className="sendo-heading">My Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={styles.grid}>
//           <div>
//             <label style={styles.label}>Full Name*</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               style={styles.input}
//               required
//             />
//           </div>
//           <div>
//             <label style={styles.label}>My Eicher ID*</label>
//             <input
//               type="text"
//               name="eicherId"
//               value={formData.eicherId}
//               onChange={handleChange}
//               style={styles.input}
//               required
//             />
//           </div>
//           <div>
//             <label style={styles.label}>Phone No.*</label>
//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               style={styles.input}
//               required
//             />
//           </div>
//           <div>
//             <label style={styles.label}>
//               Is this your WhatsApp Number?*
//             </label>
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name="isWhatsapp"
//                   value="Yes"
//                   checked={formData.isWhatsapp === "Yes"}
//                   onChange={handleChange}
//                 />{" "}
//                 Yes
//               </label>
//               <label style={{ marginLeft: "10px" }}>
//                 <input
//                   type="radio"
//                   name="isWhatsapp"
//                   value="No"
//                   checked={formData.isWhatsapp === "No"}
//                   onChange={handleChange}
//                 />{" "}
//                 No
//               </label>
//             </div>
//           </div>
//           {formData.isWhatsapp === "No" && (
//             <div>
//               <label style={styles.label}>WhatsApp Number*</label>
//               <input
//                 type="text"
//                 name="whatsappNumber"
//                 value={formData.whatsappNumber}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//           )}
//           <div>
//             <label style={styles.label}>Preferred Communication Channel*</label>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   value="Phone"
//                   onChange={handleChange}
//                 />{" "}
//                 Phone
//               </label>
//               <label style={{ marginLeft: "10px" }}>
//                 <input
//                   type="checkbox"
//                   value="WhatsApp"
//                   onChange={handleChange}
//                 />{" "}
//                 WhatsApp
//               </label>
//               <label style={{ marginLeft: "10px" }}>
//                 <input
//                   type="checkbox"
//                   value="Email"
//                   onChange={handleChange}
//                 />{" "}
//                 Email
//               </label>
//             </div>
//           </div>
//           <div>
//             <label style={styles.label}>Date of Birth</label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               style={styles.input}
//             />
//           </div>
//           <div>
//             <label style={styles.label}>Email ID</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               style={styles.input}
//               required
//             />
//           </div>
//           <div>
//             <label style={styles.label}>In which application your vehicles operate?</label>
//             <select
//               style={styles.input}
//               name="applications"
//               onChange={handleChange}
//             >
//               <option value="">Select Your Application</option>
//               <option value="Uber">Uber</option>
//               <option value="Ola">Ola</option>
//               <option value="TruckBazaar">TruckBazaar</option>
//             </select>
//           </div>
//         </div>
//         <div style={styles.buttonContainer}>
//           <button type="submit" style={styles.saveButton}>
//             Save Profile
//           </button>
//           <button type="button" style={styles.deactivateButton}>
//             Deactivate Account
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "700px",
//     margin: "0 auto",
//     marginLeft: "280px",
//     padding: "24px",
//     backgroundColor: "#fff",
//     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//     borderRadius: "8px",
//   },
//   heading: { background: "#FFC107", color: "#000", padding: "10px 20px", fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 20px 0" },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "15px",
//   },
//   label: {
//     display: "block",
//     fontWeight: "bold",
//     marginBottom: "5px",
//     color: "#555",
//   },
//   input: {
//     width: "100%",
//     padding: "8px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     fontSize: "14px",
//   },
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "20px",
//   },
//   saveButton: {
//     backgroundColor: "#d9534f",
//     color: "#fff",
//     padding: "10px 15px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   deactivateButton: {
//     backgroundColor: "#6c757d",
//     color: "#fff",
//     padding: "10px 15px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default MyProfile;
import React, { useState } from "react";

const MyProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "OMEG GLOBAL LOGISTICS",
    eicherId: "1124034",
    phoneNumber: "+918179696364",
    isWhatsapp: "No",
    whatsappNumber: "",
    communicationChannel: [],
    dob: "",
    email: "Instanttrans@gmail.com",
    applications: [],
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
    formWrapper: { padding: "24px 20px" },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#000",
      borderBottom: "2px solid #FFC107",
      paddingBottom: "6px",
      marginBottom: "16px",
      marginTop: "10px",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "24px",
    },
    label: {
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "6px",
      display: "block",
      color: "#000",
    },
    input: {
      width: "100%",
      padding: "9px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      boxSizing: "border-box",
      color: "#000",
      backgroundColor: "#fff",
      outline: "none",
    },
    radioGroup: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
      paddingTop: "6px",
    },
    radioLabel: {
      fontSize: "14px",
      color: "#000",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer",
    },
    checkboxGroup: {
      display: "flex",
      gap: "16px",
      alignItems: "center",
      paddingTop: "6px",
      flexWrap: "wrap",
    },
    checkboxLabel: {
      fontSize: "14px",
      color: "#000",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer",
    },
    buttonRow: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      paddingBottom: "10px",
    },
    btnYellow: {
      padding: "9px 28px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "#FFC107",
      color: "black",
      fontWeight: "bold",
      fontSize: "14px",
    },
    btnBlack: {
      padding: "9px 28px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "black",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
    },
    btnRed: {
      padding: "9px 28px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "#c62828",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
    },
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        communicationChannel: checked
          ? [...prev.communicationChannel, value]
          : prev.communicationChannel.filter((ch) => ch !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Profile saved successfully!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>MY PROFILE</div>

      <div style={styles.formWrapper}>
        <form onSubmit={handleSubmit}>

          {/* Basic Info */}
          <div style={styles.sectionTitle}>Basic Information</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Full Name *</label>
              <input type="text" name="fullName" style={styles.input}
                value={formData.fullName} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>My Eicher ID *</label>
              <input type="text" name="eicherId" style={styles.input}
                value={formData.eicherId} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Date of Birth</label>
              <input type="date" name="dob" style={styles.input}
                value={formData.dob} onChange={handleChange} />
            </div>
            <div>
              <label style={styles.label}>Email ID *</label>
              <input type="email" name="email" style={styles.input}
                value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          {/* Contact Info */}
          <div style={styles.sectionTitle}>Contact Information</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Phone Number *</label>
              <input type="text" name="phoneNumber" style={styles.input}
                value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Is this your WhatsApp Number? *</label>
              <div style={styles.radioGroup}>
                <label style={styles.radioLabel}>
                  <input type="radio" name="isWhatsapp" value="Yes"
                    checked={formData.isWhatsapp === "Yes"} onChange={handleChange} />
                  Yes
                </label>
                <label style={styles.radioLabel}>
                  <input type="radio" name="isWhatsapp" value="No"
                    checked={formData.isWhatsapp === "No"} onChange={handleChange} />
                  No
                </label>
              </div>
            </div>
            {formData.isWhatsapp === "No" && (
              <div>
                <label style={styles.label}>WhatsApp Number *</label>
                <input type="text" name="whatsappNumber" style={styles.input}
                  value={formData.whatsappNumber} onChange={handleChange} required />
              </div>
            )}
            <div>
              <label style={styles.label}>Preferred Communication Channel *</label>
              <div style={styles.checkboxGroup}>
                {["Phone", "WhatsApp", "Email"].map(ch => (
                  <label key={ch} style={styles.checkboxLabel}>
                    <input type="checkbox" value={ch}
                      checked={formData.communicationChannel.includes(ch)}
                      onChange={handleChange} />
                    {ch}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Application Info */}
          <div style={styles.sectionTitle}>Application Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Vehicle Operations Platform</label>
              <select style={styles.input} name="applications" onChange={handleChange}>
                <option value="">Select Your Application</option>
                <option value="Uber">Uber</option>
                <option value="Ola">Ola</option>
                <option value="TruckBazaar">TruckBazaar</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div style={styles.buttonRow}>
            <button type="button" style={styles.btnRed}>
              Deactivate Account
            </button>
            <button type="submit" style={styles.btnYellow}>
              Save Profile
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default MyProfile;