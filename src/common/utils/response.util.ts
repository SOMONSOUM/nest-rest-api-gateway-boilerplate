export class Response {
  static success<T>({
    message = 'Success',
    data,
  }: {
    message?: string;
    data: T;
  }): { message: string; data: T } {
    return { message, data };
  }
}
