import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phoneNumber: "",
    agencyName: "",
    agencyAddress: [
      {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    ],
    agencyNtnNumber: "",
    description: "",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D", // Profile picture state
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("agencyAddress.")) {
      const field = name.split(".")[1]; // Extract field name
      setFormData((prev) => ({
        ...prev,
        agencyAddress: prev.agencyAddress.map((address, index) =>
          index === 0 ? { ...address, [field]: value } : address
        ),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await register.post("/register", formData);
      console.log("User Signed Up:", response.data);
      navigate("/login");
    } catch (err) {
      console.error(
        "Signup Error:",
        err.response?.data?.message || err.message
      );
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="user">User</option>
            <option value="dealer">Dealer</option>
            <option value="contractor">Contractor</option>
          </select>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {formData.role !== "user" && (
            <>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="agencyName"
                placeholder="Agency Name"
                value={formData.agencyName}
                onChange={handleChange}
                required
                style={styles.input}
              />

              <h3 style={styles.subTitle}>Agency Address</h3>
              <input
                type="text"
                name="agencyAddress.street"
                placeholder="Street"
                value={formData.agencyAddress.street}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="text"
                name="agencyAddress.city"
                placeholder="City"
                value={formData.agencyAddress.city}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="text"
                name="agencyAddress.state"
                placeholder="State"
                value={formData.agencyAddress.state}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="text"
                name="agencyAddress.zipCode"
                placeholder="Zip Code"
                value={formData.agencyAddress.zipCode}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="text"
                name="agencyAddress.country"
                placeholder="Country"
                value={formData.agencyAddress.country}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="agencyNtnNumber"
                placeholder="Agency NTN Number"
                value={formData.agencyNtnNumber}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <textarea
                name="description"
                placeholder="Enter description..."
                value={formData.description}
                onChange={handleChange}
                style={styles.textarea}
              />
            </>
          )}

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        <p style={styles.text}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    backgroundColor: "#000",
  },
  formContainer: {
    backgroundColor: "#222",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 0px 10px rgba(255, 165, 0, 0.5)",
  },
  title: { color: "#FFA500", fontSize: "24px", marginBottom: "20px" },
  subTitle: {
    color: "#FFA500",
    fontSize: "18px",
    marginBottom: "10px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #FFA500",
    backgroundColor: "#333",
    color: "#fff",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #FFA500",
    backgroundColor: "#333",
    color: "#fff",
    resize: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#FFA500",
    color: "#000",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  text: { color: "#fff", marginTop: "10px" },
  link: { color: "#FFA500", cursor: "pointer", textDecoration: "underline" },
  error: { color: "red", fontSize: "14px", marginBottom: "10px" },
};

export default SignUpPage;
