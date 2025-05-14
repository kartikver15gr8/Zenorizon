export type ProjectBody = {
  title: string;
  content: string;
  createdBy: string;
  description: string;
  health: string;
  id: string;
  lead: string;
  priority: string;
  status: string;
  targetDate: any;
};

export type IssueBody = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  projectId: string;
  updatedAt: string | undefined;
};

export type User = {
  id: string;
  name?: string;
  email: string;
  emailVerified: Date;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  Project: ProjectBody;
  projectId: string;
  createdProjects: ProjectBody[];
  Issue: IssueBody[];
};
