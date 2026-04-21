// pages/HomePage.tsx
import React from "react";
import { colors } from "../theme/colors";
import StatsSection from "../components/StatsSection";

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ color: colors.text, marginBottom: "20px" }}>
        Issue Tracker
      </h1>

      <StatsSection />
    </div>
  );
};

export default HomePage;