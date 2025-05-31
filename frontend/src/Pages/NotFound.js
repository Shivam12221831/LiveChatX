import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h1 style={styles.code}>404</h1>
        <h2 style={styles.message}>Oops! Page not found</h2>
        <p style={styles.description}>
          The page you are looking for might have been removed <br />
          had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" style={styles.button}>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

const styles = {
  box: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "16px",
    textAlign: "center",
    maxWidth: "500px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.8s ease-in-out",
  },
  code: {
    fontSize: "100px",
    fontWeight: "bold",
    color: "#FF6B6B",
    marginTop: "0",
    marginBottom: "0",
  },
  message: {
    fontSize: "28px",
    fontWeight: "600",
    margin: "10px 0 20px",
    color: "#333",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  button: {
    display: "inline-block",
    padding: "12px 24px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#1E90FF",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  },
};

export default NotFound;
