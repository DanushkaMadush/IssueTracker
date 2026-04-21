import React, { useEffect, useState } from "react";
import { getIssues } from "../api/services/issue.service";
import { colors } from "../theme/colors";
import IssueCard from "./IssueCard";
import { motion } from "framer-motion";

interface Issue {
  _id: string;
  title: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High";
  severity: "Minor" | "Major" | "Critical";
}

const IssuesSection: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await getIssues({
          page: 1,
          limit: 10,
        });

        setIssues(res.data);
      } catch (err) {
        console.error("Failed to fetch issues", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return <p style={{ color: colors.textMuted }}>Loading issues...</p>;
  }

  if (issues.length === 0) {
    return <p style={{ color: colors.textMuted }}>No issues found</p>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      {issues.map((issue) => (
        <IssueCard
          key={issue._id}
          title={issue.title}
          status={issue.status}
          priority={issue.priority}
          severity={issue.severity}
          onClick={() => {
            console.log("Clicked issue:", issue._id);
          }}
        />
      ))}
    </motion.div>
  );
};

export default IssuesSection;