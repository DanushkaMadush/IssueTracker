import React, { useEffect, useState } from "react";
import { getIssues } from "../api/services/issue.service";
import { colors } from "../theme/colors";
import IssueCard from "./IssueCard";
import { motion } from "framer-motion";
import PaginationArrows from "./PaginationArrows";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchIssues = async (currentPage: number) => {
      setLoading(true);
      try {
        const res = await getIssues({
          page: currentPage,
          limit: 10,
        });

        setIssues(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        console.error("Failed to fetch issues", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues(page);
  }, [page]);

  if (loading) {
    return <p style={{ color: colors.textMuted }}>Loading issues...</p>;
  }

  if (issues.length === 0) {
    return <p style={{ color: colors.textMuted }}>No issues found</p>;
  }

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const handleNext = () => {
    if (hasNext) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (hasPrev) setPage((p) => p - 1);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <>
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
      <PaginationArrows
        showPrev={hasPrev}
        showNext={hasNext}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
};

export default IssuesSection;
