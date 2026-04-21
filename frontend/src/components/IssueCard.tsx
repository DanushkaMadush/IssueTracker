import React from "react";
import Card from "./Card";
import { colors } from "../theme/colors";

type Status = "Open" | "In Progress" | "Resolved" | "Closed";
type Priority = "Low" | "Medium" | "High";
type Severity = "Minor" | "Major" | "Critical";

interface Props {
  title: string;
  status: Status;
  priority: Priority;
  severity: Severity;
  onClick?: () => void;
}

const statusColors: Record<Status, string> = {
  Open: colors.statusOpen,
  "In Progress": colors.statusInProgress,
  Resolved: colors.statusResolved,
  Closed: colors.statusClosed,
};

const priorityColors: Record<Priority, string> = {
  Low: colors.priorityLow,
  Medium: colors.priorityMedium,
  High: colors.priorityHigh,
};

const severityColors: Record<Severity, string> = {
  Minor: colors.severityMinor,
  Major: colors.severityMajor,
  Critical: colors.severityCritical,
};

const badgeStyle = (color: string): React.CSSProperties => ({
  backgroundColor: `${color}20`,
  color,
  padding: "2px 8px",
  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: 500,
});

const IssueCard: React.FC<Props> = ({
  title,
  status,
  priority,
  severity,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      style={{
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <h3
        style={{
          fontWeight: 600,
          marginBottom: "0.5rem",
          color: colors.text,
        }}
      >
        {title}
      </h3>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <span style={badgeStyle(statusColors[status])}>{status}</span>
        <span style={badgeStyle(priorityColors[priority])}>{priority}</span>
        <span style={badgeStyle(severityColors[severity])}>{severity}</span>
      </div>
    </Card>
  );
};

export default IssueCard;
