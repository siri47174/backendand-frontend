// import React from "react";
// import { useNavigate } from "react-router-dom";
// const HelpSupport = () => {
//   const navigate = useNavigate(); // Hook for navigation
//   const cards = [
//     {
//       title: "Getting Started",
//       description: "All you need to know to get started with My Eicher Mobile Application.",
//       buttonText: "READ MORE",
//       image: "image1.png", // Replace with actual image path
//     },
//     {
//       title: "Raise a Request",
//       description: "Let us know, Our team is here to help you!",
//       buttonText: "EXPLORE",
//       image: "image2.png", // Replace with actual image path
//     },
//     {
//       title: "My Request",
//       description: "View the status of your current requests.",
//       buttonText: "VIEW",
//       image: "image3.png", // Replace with actual image path
//       onClick: () => navigate("/my-requests"), // Navigate to MyRequests
//     },
//     {
//       title: "Contact Us",
//       description: "Here is how you can reach us.",
//       buttonText: "VIEW",
//       image: "image4.png", // Replace with actual image path
//     },
//   ];

//   return (
//     <div style={styles.container}>
//       <h2 className="sendo-heading" style={{marginBottom:0}}>Help &amp; Support</h2>
//       <div style={styles.cardContainer}>
//         {cards.map((card, index) => (
//           <div key={index} style={styles.card}>
//             <img src={card.image} alt={card.title} style={styles.image} />
//             <h3 style={styles.cardTitle}>{card.title}</h3>
//             <p style={styles.cardDescription}>{card.description}</p>
//             <button style={styles.button}onClick={card.onClick}>{card.buttonText}</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "2.5rem",
//     backgroundColor: "#f7fafc",
//     minHeight: "100vh",
//     marginLeft:"20rem"
//   },
//   header: {
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//     marginBottom: "1.5rem",
//   },
//   cardContainer: {
//     display: "grid",
//     gridTemplateColumns: "repeat(2, 1fr)",
//     gap: "1.5rem",
//     "@media(min-width: 768px)": {
//       gridTemplateColumns: "repeat(2, 1fr)",
//     },
//   },
//   card: {
//     backgroundColor: "white",
//     padding: "1.5rem",
//     borderRadius: "0.375rem",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   image: {
//     width: "8rem",
//     height: "8rem",
//     marginBottom: "1rem",
//   },
//   cardTitle: {
//     fontSize: "1.25rem",
//     fontWeight: "600",
//     marginBottom: "0.5rem",
//   },
//   cardDescription: {
//     color: "#4a5568",
//     marginBottom: "1rem",
//   },
//   button: {
//     padding: "0.5rem 1rem",
//     backgroundColor: "#e53e3e",
//     color: "white",
//     fontWeight: "600",
//     borderRadius: "0.375rem",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
// };

// export default HelpSupport;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

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
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "16px",
      marginBottom: "32px",
    },
    card: {
      padding: "24px 20px",
      border: "1.5px solid #000",
      borderRadius: "6px",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "10px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    cardIcon: { fontSize: "40px" },
    cardTitle: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#000",
    },
    cardDesc: {
      fontSize: "13px",
      color: "#555",
      lineHeight: "1.5",
    },
    cardBtn: {
      marginTop: "8px",
      padding: "7px 20px",
      backgroundColor: "#FFC107",
      color: "#000",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px",
    },
    contactGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "16px",
      marginBottom: "32px",
    },
    contactCard: {
      padding: "18px 20px",
      border: "1.5px solid #000",
      borderRadius: "6px",
      backgroundColor: "#fafafa",
      display: "flex",
      alignItems: "flex-start",
      gap: "14px",
    },
    contactIcon: { fontSize: "28px", marginTop: "2px" },
    contactLabel: {
      fontWeight: "bold",
      fontSize: "14px",
      color: "#000",
      marginBottom: "4px",
    },
    contactValue: { fontSize: "13px", color: "#555" },
    faqItem: {
      borderBottom: "1px solid #f0f0f0",
      padding: "14px 0",
    },
    faqQuestion: {
      fontWeight: "bold",
      fontSize: "14px",
      color: "#000",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    faqAnswer: {
      fontSize: "13px",
      color: "#555",
      marginTop: "10px",
      lineHeight: "1.6",
    },
  };

  const cards = [
    {
      icon: "📖",
      title: "Getting Started",
      description: "Everything you need to know to get started with the Sendo Driver platform.",
      btn: "READ MORE",
      action: null,
    },
    {
      icon: "📝",
      title: "Raise a Request",
      description: "Let us know your issue — our support team is here to help you.",
      btn: "EXPLORE",
      action: null,
    },
    {
      icon: "📋",
      title: "My Requests",
      description: "View the status of your current and past support requests.",
      btn: "VIEW",
      action: () => navigate("/my-requests"),
    },
    {
      icon: "📞",
      title: "Contact Us",
      description: "Find all the ways you can reach our support team.",
      btn: "VIEW",
      action: null,
    },
  ];

  const faqs = [
    {
      q: "How do I add a new vehicle?",
      a: "Go to Vehicle Management → Onboarding, fill in the vehicle details and submit the form.",
    },
    {
      q: "How do I record diesel expenses?",
      a: "Navigate to Vehicle Management → Diesel, fill in the entry form and click Save Entry.",
    },
    {
      q: "How do I approve a leave request?",
      a: "Go to Driver Management → Leave Requests and use the Approve or Reject buttons on pending requests.",
    },
    {
      q: "How do I download CSV reports?",
      a: "Most pages have a Download CSV button at the top-right of the records table.",
    },
    {
      q: "How do I track vehicles live?",
      a: "Go to Vehicle Management → Live Fleet Tracking to see real-time vehicle locations on the map.",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>HELP & SUPPORT</div>

      <div style={styles.innerPad}>

        {/* Quick Access Cards */}
        <div style={styles.sectionTitle}>How Can We Help You?</div>
        <div style={styles.cardsGrid}>
          {cards.map((card, i) => (
            <div
              key={i}
              style={styles.card}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#fffde7"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
            >
              <div style={styles.cardIcon}>{card.icon}</div>
              <div style={styles.cardTitle}>{card.title}</div>
              <div style={styles.cardDesc}>{card.description}</div>
              <button
                style={styles.cardBtn}
                onClick={card.action || undefined}
              >
                {card.btn}
              </button>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div style={styles.sectionTitle}>Contact Information</div>
        <div style={styles.contactGrid}>
          {[
            { icon: "📧", label: "Email Support", value: "support@sendo.in" },
            { icon: "📞", label: "Phone Support", value: "+91 98765 43210" },
            { icon: "🕐", label: "Support Hours", value: "Mon–Sat, 9:00 AM – 6:00 PM" },
            { icon: "📍", label: "Office Address", value: "Sendo HQ, Bangalore, Karnataka" },
          ].map((item, i) => (
            <div key={i} style={styles.contactCard}>
              <div style={styles.contactIcon}>{item.icon}</div>
              <div>
                <div style={styles.contactLabel}>{item.label}</div>
                <div style={styles.contactValue}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={styles.sectionTitle}>Frequently Asked Questions</div>
        {faqs.map((faq, i) => (
          <div key={i} style={styles.faqItem}>
            <div
              style={styles.faqQuestion}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span>{faq.q}</span>
              <span>{openFaq === i ? "▲" : "▼"}</span>
            </div>
            {openFaq === i && (
              <div style={styles.faqAnswer}>{faq.a}</div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default HelpSupport;