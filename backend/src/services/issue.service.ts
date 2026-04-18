import Issue from "../models/issue.model";

interface GetIssuesParams {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
}

export const createIssue = async (data: any, userId: string) => {
  const issue = await Issue.create({
    ...data,
    createdBy: userId,
  });

  return issue;
};

export const getIssues = async (params: GetIssuesParams) => {
  let { page = 1, limit = 10, status, priority, search } = params;

  limit = Math.min(limit, 50);

  const skip = (page - 1) * limit;
  const query: any = {};

  if (status) {
    query.status = status;
  }

  if (priority) {
    query.priority = priority;
  }

  if (search) {
    query.$text = { $search: search };
  }

  const [issues, total] = await Promise.all([
    Issue.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "email"),

    Issue.countDocuments(query),
  ]);

  return {
    data: issues,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateIssue = async (id: string, data: any) => {
  const issue = await Issue.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!issue) {
    throw new Error("Issue not found");
  }

  return issue;
};

export const updateIssueStatus = async (id: string, status: string) => {
  const issue = await Issue.findByIdAndUpdate(id, { status }, { new: true });

  if (!issue) {
    throw new Error("Issue not found");
  }

  return issue;
};

export const getIssueById = async (id: string) => {
  const issue = await Issue.findById(id).populate("createdBy", "email");

  if (!issue) {
    throw new Error("Issue not found");
  }

  return issue;
};

export const getIssueStats = async () => {
  const stats = await Issue.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const result: Record<string, number> = {
    Open: 0,
    "In Progress": 0,
    Resolved: 0,
    Closed: 0,
  };

  stats.forEach((item) => {
    result[item._id] = item.count;
  });

  return result;
};