import React, { useEffect, useState } from "react";
import { getIssues } from "../api/services/issue.service";
import { colors } from "../theme/colors";
import IssueCard from "./IssueCard";
import { motion } from "framer-motion";
import PaginationArrows from "./PaginationArrows";
import Modal from "./Modal";
import IssueForm from "./IssueForm";
import type { Issue } from "../api/types/issue.types";
import FloatingButton from "./FloatingButton";

const IssuesSection: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    fetchIssues(page);
  }, [page]);

  const fetchIssues = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await getIssues({
        page: pageNumber,
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

  const openCreate = () => {
    setMode("create");
    setSelectedIssue(null);
    setIsModalOpen(true);
  };

  const openEdit = (issue: Issue) => {
    setMode("edit");
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <button
          onClick={openCreate}
          style={{
            marginBottom: "12px",
            background: colors.primary,
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          + New Issue
        </button>
        {issues.map((issue) => (
          <IssueCard
            key={issue._id}
            title={issue.title}
            status={issue.status}
            priority={issue.priority}
            severity={issue.severity}
            onClick={() => openEdit(issue)}
          />
        ))}
      </motion.div>
      <PaginationArrows
        showPrev={hasPrev}
        showNext={hasNext}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IssueForm
          mode={mode}
          issue={selectedIssue}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => fetchIssues(page)}
        />
      </Modal>

      <FloatingButton onClick={openCreate} label="New Issue" />
      
    </>
  );
};

export default IssuesSection;