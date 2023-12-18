import { contractList } from "./contractList";

export default interface StoreListType {
  number: string;
  field_of_work: EnFieldOfWorks;
  geo: string | null;
  selling_type: "CASH" | "CREDIT";
  blue_profit: number;
  silver_profit: number;
  gold_profit: number;
  corporate_profit: number;
  id: string;
  created_at: string;
  updated_at: string;
  user: {
    username: string;
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    national_code: string;
    is_active: true;
    role: {
      name: string;
    };
    location: null;
  };
  contract: contractList;
  location: {
    name: string;
    parent_id: null | string;
    id: string;
    created_at: string;
    updated_at: null | string;
  };
}
