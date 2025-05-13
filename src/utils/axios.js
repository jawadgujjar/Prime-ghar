import axios from "axios";

// Base URL from environment variables
const baseURL = "http://localhost:5000/v1";

// Create instances with consistent base URLs for each service
const register = axios.create({
  baseURL: `${baseURL}/auth`, // Ensure this is the correct endpoint for login
});
const login = axios.create({
  baseURL: `${baseURL}/auth`, // Ensure this is the correct endpoint for login
});
const users = axios.create({
  baseURL: `${baseURL}/users`, // Ensure this is the correct endpoint for login
});
const portfolio = axios.create({
  baseURL: `${baseURL}/contactorportfolio`, // Ensure this is the correct endpoint for login
});
const property = axios.create({
  baseURL: `${baseURL}/property`, // Ensure this is the correct endpoint for login
});
const contact = axios.create({
  baseURL: `${baseURL}/contact`, // Ensure this is the correct endpoint for login
});

// Generic request interceptor for all instances
const requestInterceptor = (req) => {
  // Optionally add authorization headers or custom logic
  // req.headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return req;
};

const errorInterceptor = (err) => {
  console.error("Request failed:", err);
  return Promise.reject(err);
};

// Apply interceptors for each axios instance
register.interceptors.request.use(requestInterceptor, errorInterceptor);
login.interceptors.request.use(requestInterceptor, errorInterceptor);
users.interceptors.request.use(requestInterceptor, errorInterceptor);
portfolio.interceptors.request.use(requestInterceptor, errorInterceptor);
property.interceptors.request.use(requestInterceptor, errorInterceptor);
contact.interceptors.request.use(requestInterceptor, errorInterceptor);

export { users, login, register, portfolio, property, contact };
