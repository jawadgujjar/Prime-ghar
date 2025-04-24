import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./components/landing page/landingpage";
import NavScrollExample from "./components/navbar/navbar";
import AuthPage from "./components/login/login";
import SignUpPage from "./components/login/signup";
import DealersList from "./components/dealers/dealers";
import ContractorsList from "./components/contractors/contractor";
import DealerDetails from "./components/dealers/dealerdetail";
import ContractorDetail from "./components/contractors/contractordetail";
import PropertyDetail from "./components/property/propertydetail";
import NewDashboard from "./components/dealerdashboard/newdashboard";
import AddProperty from "./components/dealerdashboard/addproperty";

// ✅ Function to check if user is logged in
const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

// ✅ Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <NavScrollExample />
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dealers" element={<DealersList />} />
        <Route path="/dealers/:id" element={<DealerDetails />} />
        <Route path="/contractors" element={<ContractorsList />} />
        <Route path="/contractors/:id" element={<ContractorDetail />} />
        <Route path="/propertydetail/:id" element={<PropertyDetail />} />
        <Route
          path="/newdashboard"
          element={<ProtectedRoute element={<NewDashboard />} />}
        />{" "}
        <Route
          path="/add-property"
          element={<ProtectedRoute element={<AddProperty />} />}
        />
        {/* ✅ Protected */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
