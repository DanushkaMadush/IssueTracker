import React from "react";
import { colors } from "../theme/colors";
import StatsSection from "../components/StatsSection";
import IssuesSection from "../components/IssuesSection";
import Button from "../components/Button";
import { exportIssuesToCSV } from "../utility/exportIssues";

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ color: colors.text, marginBottom: "50px" }}>
        Issue Tracker
      </h1>

      <StatsSection />

      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              color: colors.text,
              marginBottom: "20px",
              fontSize: "16px",
            }}
          >
            Recent Issues
          </h2>

          <Button variant="secondary" onClick={exportIssuesToCSV}>
            Export
          </Button>
        </div>

        <IssuesSection />
      </div>
    </div>
  );
};

export default HomePage;