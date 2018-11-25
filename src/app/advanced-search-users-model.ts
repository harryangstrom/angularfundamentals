export class AdvancedSearchUsersModel {
  constructor(
    public q: string,
    public language?: string,
    public type?: string,
    public repos?: string,
    public followers?: number
  ) {

  }
}
