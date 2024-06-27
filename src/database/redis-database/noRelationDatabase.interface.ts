export interface IDatabase {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<any>;
  update(key: string, value: any): Promise<any>;
  delete(key: string): Promise<any>;
}
