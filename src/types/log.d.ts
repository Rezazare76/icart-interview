export default interface LogType {
  type: string;
  detail: string;
  user_id: string;
  id: string;
  created_at: string;
  updated_at: string | null;
  user: {
    username: string;
    national_code: string;
    first_name: string;
    last_name: string;
  };
}
