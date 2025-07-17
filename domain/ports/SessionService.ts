export interface SessionService {
  create(_email: string): Promise<string>;
}
