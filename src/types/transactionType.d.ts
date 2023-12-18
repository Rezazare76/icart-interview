export default interface transactionType {
  code: number;
  created_at: string;
  id: string;
  reason: string;
  receiver: {
    id: string;
    number: string;
    wallet: {
      user: {
        username: string;
        first_name: string;
        last_name: string;
      };
    };
  };
  transferor: {
    id: string;
    number: string;
    wallet: {
      user: {
        username: string;
        first_name: string;
        last_name: string;
      };
    };
  };
  receiver_id: string;
  status: "ACCEPTED" | "FAILED";
  text: string;
  transaction_rows: [];
  transferor_id: string;
  updated_at: string | null;
  value: number;
  value_type: "CASH" | "CREDIT";
}
