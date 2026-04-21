import React, { useState, useEffect } from "react";
import { colors } from "../theme/colors";
import {
  createIssue,
  updateIssue,
  updateIssueStatus,
} from "../api/services/issue.service";
import type {
  Issue,
  IssueStatus,
  Priority,
  Severity,
} from "../api/types/issue.types";
import Button from "./Button";

interface Props {
  mode: "create" | "edit";
  issue: Issue | null;
  onClose: () => void;
  onSuccess: () => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  borderRadius: "8px",
  border: `1px solid ${colors.border}`,
  background: colors.surface,
  color: colors.text,
  fontSize: "0.9rem",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: colors.text,
  marginBottom: "4px",
  display: "block",
  textAlign: "left",
  width: "100%",
  fontFamily: "inherit",
};

const IssueForm: React.FC<Props> = ({ mode, issue, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Low");
  const [severity, setSeverity] = useState<Severity>("Minor");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && issue) {
      setTitle(issue.title);
      setDescription(issue.description);
      setPriority(issue.priority);
      setSeverity(issue.severity);
    }
  }, [mode, issue]);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      const payload = {
        title,
        description,
        status: "Open" as const,
        priority,
        severity,
      };

      if (mode === "create") {
        await createIssue(payload);
      } else if (mode === "edit" && issue) {
        await updateIssue(issue._id, payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to save issue", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: IssueStatus) => {
    if (!issue) return;

    try {
      await updateIssueStatus(issue._id, newStatus);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h3 style={{ color: colors.text }}>
        {mode === "create" ? "Create Issue" : "Update Issue"}
      </h3>

      <div>
        <div style={labelStyle}>Title</div>
        <input
          style={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <div style={labelStyle}>Description</div>
        <textarea
          style={{ ...inputStyle, minHeight: "80px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <div style={labelStyle}>Priority</div>
        <select
          style={inputStyle}
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div>
        <div style={labelStyle}>Severity</div>
        <select
          style={inputStyle}
          value={severity}
          onChange={(e) => setSeverity(e.target.value as Severity)}
        >
          <option>Minor</option>
          <option>Major</option>
          <option>Critical</option>
        </select>
      </div>

      {mode === "edit" && (
        <div style={{ marginTop: "16px" }}>
          <div style={{ ...labelStyle, marginBottom: "8px" }}>
            Change Status
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <Button
              variant="secondary"
              style={{
                flex: 1,
                borderColor: colors.statusOpen,
                color: colors.statusOpen,
                backgroundColor:
                  issue?.status === "Open"
                    ? `${colors.statusOpen}20`
                    : undefined,
              }}
              onClick={() => handleStatusChange("Open")}
            >
              Open
            </Button>

            <Button
              variant="secondary"
              style={{
                flex: 1,
                borderColor: colors.statusInProgress,
                color: colors.statusInProgress,
                backgroundColor:
                  issue?.status === "Open"
                    ? `${colors.statusOpen}20`
                    : undefined,
              }}
              onClick={() => handleStatusChange("In Progress")}
            >
              In Progress
            </Button>

            <Button
              variant="secondary"
              style={{
                flex: 1,
                borderColor: colors.statusResolved,
                color: colors.statusResolved,
                backgroundColor:
                  issue?.status === "Open"
                    ? `${colors.statusOpen}20`
                    : undefined,
              }}
              onClick={() => handleStatusChange("Resolved")}
            >
              Resolved
            </Button>
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: colors.primary,
          color: colors.text,
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          marginTop: "20px",
          fontFamily: "inherit",
        }}
      >
        {loading
          ? "Saving..."
          : mode === "create"
            ? "Add Issue"
            : "Update Issue"}
      </button>
    </div>
  );
};

export default IssueForm;
