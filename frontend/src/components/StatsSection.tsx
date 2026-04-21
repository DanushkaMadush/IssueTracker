import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import { getIssueStats } from "../api/services/issue.service";
import { colors } from "../theme/colors";

const StatsSection: React.FC = () => {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getIssueStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p style={{ color: colors.textSubtle }}>Loading stats...</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        marginBottom: "20px",
      }}
    >
      <StatsCard
        title="Open Issues"
        count={stats["Open"] || 0}
        variant="danger"
      />

      <StatsCard
        title="In Progress"
        count={stats["In Progress"] || 0}
        variant="warning"
      />

      <StatsCard
        title="Resolved"
        count={stats["Resolved"] || 0}
        variant="success"
      />

      <StatsCard
        title="Closed"
        count={stats["Closed"] || 0}
        variant="default"
      />
    </div>
  );
};

export default StatsSection;