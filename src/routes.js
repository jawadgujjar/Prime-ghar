import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing page/landingpage";
import NavScrollExample from "./components/navbar/navbar";
import AuthPage from "./components/login/login";
import SignUpPage from "./components/login/signup"; // ✅ Signup Component Import
import DealersList from "./components/dealers/dealers";
import ContractorsList from "./components/contractors/contractor";

const AppRoutes = () => {
  return (
    <Router>
      <NavScrollExample />
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />{" "}
        <Route path="/dealers" element={<DealersList />} />
        <Route path="/contractors" element={<ContractorsList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
