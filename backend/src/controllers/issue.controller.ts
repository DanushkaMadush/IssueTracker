import { Request, Response, NextFunction } from "express";
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  updateIssueStatus,
  getIssueStats,
} from "../services/issue.service";
import { AuthRequest } from "../middleware/auth.middleware";

interface IdParams {
  id: string;
}

export const create = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const issue = await createIssue(req.body, req.userId!);

    res.status(201).json({
      message: "Issue created",
      data: issue,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, status, priority, search } = req.query;

    const result = await getIssues({
      page: Number(page),
      limit: Number(limit),
      status: status as string,
      priority: priority as string,
      search: search as string,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const issue = await getIssueById(req.params.id);

    res.json(issue);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const issue = await updateIssue(req.params.id, req.body);

    res.json({
      message: "Issue updated",
      data: issue,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status } = req.body;

    const issue = await updateIssueStatus(req.params.id, status);

    res.json({
      message: "Status updated",
      data: issue,
    });
  } catch (error) {
    next(error);
  }
};

export const stats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getIssueStats();

    res.json(result);
  } catch (error) {
    next(error);
  }
};