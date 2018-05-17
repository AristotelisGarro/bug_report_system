import { IBugcomments } from "./bugcomments";

export interface IBugdetails {
  title: string;
  description: string;
  priority: string;
  reporter?: string;
  createdAt: string;
  status?: string;
  id: string;
  comments?: IBugcomments[];
}
