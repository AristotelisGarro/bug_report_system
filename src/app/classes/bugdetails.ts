export class Bugdetails {
  dateCreated: Date;

  constructor(
    public title: string,
    public priority: number,
    public id: string,
    private createdAt: string,
    public reporter?: string,
    public status?: string
  ) {
    this.dateCreated = new Date(createdAt);
    status = status || 'Unknown';
  }
}
