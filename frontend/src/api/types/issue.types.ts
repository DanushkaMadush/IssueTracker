export type IssueStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type Priority = "Low" | "Medium" | "High";
export type Severity = "Minor" | "Major" | "Critical";

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: Priority;
  severity: Severity;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: string;
    email: string;
  };
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  status: IssueStatus;
  priority: Priority;
  severity: Severity;
}

export interface IssueListResponse {
  data: Issue[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}