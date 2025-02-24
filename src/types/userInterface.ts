export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  failed_login_attempts: number;
  last_login_attempt: string | null;
  csrf_token: string | null;
}
