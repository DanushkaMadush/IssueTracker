import { getIssues } from "../api/services/issue.service";
import type { Issue } from "../api/types/issue.types";

export const fetchAllIssues = async (): Promise<Issue[]> => {
  let allIssues: Issue[] = [];

  let currentPage = 1;
  let totalPages = 1;

  do {
    const response = await getIssues({
      page: currentPage,
      limit: 50, // you can tweak this
    });

    const { data, pagination } = response;

    allIssues = [...allIssues, ...data];
    totalPages = pagination.totalPages;

    currentPage++;
  } while (currentPage <= totalPages);

  return allIssues;
};

export const exportIssuesToCSV = async () => {
  try {
    const issues = await fetchAllIssues();

    if (!issues.length) {
      console.warn("No issues to export");
      return;
    }

    const headers = [
      "ID",
      "Title",
      "Description",
      "Status",
      "Priority",
      "Severity",
      "Created At",
      "Updated At",
      "Created By",
    ];

    const rows = issues.map((issue) => [
      issue._id,
      issue.title,
      issue.description,
      issue.status,
      issue.priority,
      issue.severity,
      new Date(issue.createdAt).toLocaleString(),
      new Date(issue.updatedAt).toLocaleString(),
      issue.createdBy.email,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => JSON.stringify(value ?? "")).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "issues.csv";
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export failed:", error);
  }
};