export type userMeType = {
  cash: { balance: number; cash_back: number };
  credit: { balance: number };
  first_name: string;
  last_name: string;
  is_valid: boolean;
  is_active: boolean;
  birth_date?: string;
  father_name?: string;
  birth_place?: string;
  address?: string;
  referral_code?: string;
  role: {
    id: string;
    name: "کاربر ساده" | "نماینده" | "ادمین";
  };
  id: string;
  national_code: string;
  phone_number: string;
  username: string;
  detail: {
    //for error
    code: number;
  };
  wallet: {
    id: string;
    cards: { id: string; is_receive: boolean }[];
  };
  referrer_id?: null | string;
};
