export interface SessionService {
  create(email: string): Promise<string>;
}
