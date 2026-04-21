// pages/HomePage.tsx
import React from "react";
import { colors } from "../theme/colors";
import StatsSection from "../components/StatsSection";
import IssuesSection from "../components/IssuesSection";

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

      <div style={{ marginTop: "24px" }}>
        <h2
          style={{
            color: colors.text,
            marginBottom: "12px",
            fontSize: "16px",
          }}
        >
          Issues
        </h2>

        <IssuesSection />
      </div>
    </div>
  );
};

export default HomePage;