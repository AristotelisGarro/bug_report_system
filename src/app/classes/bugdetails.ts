import { IBugdetails } from '../interfaces/bugdetails';
import { IBugcomments } from '../interfaces/bugcomments';

export class Bugdetails implements IBugdetails {


  constructor(
    public title: string,
    public description: string,
    public priority: string,
    public id: string,
    public createdAt: string,
    public reporter?: string,
    public status?: string,
    public comments?: IBugcomments[]
  ) {
    status = status || 'Unknown';
  }
}
