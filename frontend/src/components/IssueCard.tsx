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
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.3px",
  display: "inline-flex",
  alignItems: "center",
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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: `1px solid ${colors.border}`,
        position: "relative",
        overflow: "hidden",
        borderRadius: "15px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
        e.currentTarget.style.borderColor = colors.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = colors.border;
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "10px",
          backgroundColor: severityColors[severity],
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span
          style={{
            fontWeight: 600,
            color: colors.text,
            fontSize: "0.95rem",
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <span style={badgeStyle(statusColors[status])}>{status}</span>
        <span style={badgeStyle(priorityColors[priority])}>{priority}</span>
        <span style={badgeStyle(severityColors[severity])}>{severity}</span>
      </div>
    </Card>
  );
};

export default IssueCard;
