import React, { useState, useEffect } from "react";
import { colors } from "../theme/colors";
import { createIssue, updateIssue } from "../api/services/issue.service";
import type { Issue, Priority, Severity } from "../api/types/issue.types";

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
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: colors.text,
  marginBottom: "4px",
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