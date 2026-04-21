import apiClient from "../client";
import type {
  Issue,
  CreateIssueRequest,
  IssueListResponse,
  IssueStatus,
} from "../types/issue.types";

// create issue
export const createIssue = async (data: CreateIssueRequest) => {
  const response = await apiClient.post("/issues", data);
  return response.data;
};

// get all issues
export const getIssues = async (params: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
}): Promise<IssueListResponse> => {
  const response = await apiClient.get("/issues", { params });
  return response.data;
};

// get issue by id
export const getIssueById = async (id: string): Promise<Issue> => {
  const response = await apiClient.get(`/issues/${id}`);
  return response.data;
};

// update issue
export const updateIssue = async (id: string, data: CreateIssueRequest) => {
  const response = await apiClient.put(`/issues/${id}`, data);
  return response.data;
};

// update issue status
export const updateIssueStatus = async (id: string, status: IssueStatus) => {
  const response = await apiClient.patch(`/issues/${id}/status`, { status });
  return response.data;
};

// get stats
export const getIssueStats = async (): Promise<Record<string, number>> => {
  const response = await apiClient.get("/issues/stats");
  return response.data;
};
