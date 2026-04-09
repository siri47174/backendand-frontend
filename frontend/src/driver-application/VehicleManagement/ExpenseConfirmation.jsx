// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const ExpenseConfirmation = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const data = state || {};

//   const S = {
//     page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
//     heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
//     card: { backgroundColor: "#fff", borderRadius: "8px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", maxWidth: 600, margin: "0 auto" },
//     row: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 },
//     label: { color: "#888", fontWeight: "bold" },
//     value: { color: "#222" },
//     btnRow: { display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" },
//     backBtn: { background: "#fff", border: "1px solid #ccc", padding: "9px 22px", borderRadius: 4, cursor: "pointer", fontSize: 13 },
//     confirmBtn: { background: "#FFC107", color: "#000", border: "none", padding: "9px 22px", borderRadius: 4, cursor: "pointer", fontWeight: "bold", fontSize: 13 },
//   };

//   return (
//     <div style={S.page}>
//       <h2 style={S.heading}>Expense Confirmation</h2>
//       <div style={S.card}>
//         <div style={{ textAlign: "center", marginBottom: 24 }}>
//           <div style={{ fontSize: 48 }}>✅</div>
//           <div style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Please confirm the details below</div>
//         </div>
//         {Object.entries(data).length > 0 ? (
//           Object.entries(data).map(([k, v]) => (
//             <div style={S.row} key={k}>
//               <span style={S.label}>{k.replace(/([A-Z])/g, " $1").trim()}</span>
//               <span style={S.value}>{v?.toString() || "—"}</span>
//             </div>
//           ))
//         ) : (
//           <p style={{ textAlign: "center", color: "#aaa" }}>No data to confirm. Navigate from an expense form.</p>
//         )}
//         <div style={S.btnRow}>
//           <button style={S.backBtn} onClick={() => navigate(-1)}>← Back</button>
//           <button style={S.confirmBtn} onClick={() => { alert("Expense confirmed!"); navigate("/expenses"); }}>Confirm & Submit</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExpenseConfirmation;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ExpenseConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state || {};

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
    formWrapper: {
      padding: "24px 20px",
    },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#000",
      borderBottom: "2px solid #FFC107",
      paddingBottom: "6px",
      marginBottom: "16px",
    },
    card: {
      maxWidth: "680px",
      margin: "0 auto",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #f0f0f0",
      fontSize: "14px",
    },
    label: {
      color: "#555",
      fontWeight: "bold",
      fontSize: "14px",
      flex: 1,
    },
    value: {
      color: "#000",
      fontSize: "14px",
      flex: 1,
      textAlign: "right",
    },
    emptyMsg: {
      textAlign: "center",
      color: "#aaa",
      fontSize: "14px",
      padding: "28px 0",
    },
    buttonRow: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      marginTop: "24px",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>EXPENSE CONFIRMATION</div>

      <div style={styles.formWrapper}>
        <div style={styles.sectionTitle}>Review Expense Details</div>

        <div style={styles.card}>
          {Object.entries(data).length > 0 ? (
            Object.entries(data).map(([k, v]) => (
              <div style={styles.row} key={k}>
                <span style={styles.label}>
                  {k.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span style={styles.value}>{v?.toString() || "—"}</span>
              </div>
            ))
          ) : (
            <p style={styles.emptyMsg}>
              No data to confirm. Please navigate from an expense form.
            </p>
          )}

          <div style={styles.buttonRow}>
            <button style={styles.btnBlack} onClick={() => navigate(-1)}>
              ← Back
            </button>
            <button
              style={styles.btnYellow}
              onClick={() => {
                alert("Expense confirmed!");
                navigate("/expenses");
              }}
            >
              Confirm & Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseConfirmation;