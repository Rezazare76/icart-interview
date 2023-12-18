export default interface ticketList {
  created_at: string;
  id: string;
  title: string;
  type: string;
  unread_supporter: number;
  unread_user: number;
  updated_at: string;
  position: "OPEN" | "CLOSE";
}
