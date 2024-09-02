export interface IHashing {
  hash(data: string): string;
  salt(): string;
}
