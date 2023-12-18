export type contractList = {
  contract?: {
    name: string;
    id: string;
    position_request: {
      id: string;
      tel?: string;
      address?: string;
      location: { name: string; id: string; geo?: string };
      postal_code: string;
    };
    employees_number: string;
    signatory_name: string;
    number: string;
  };
  location?: { name: string };
  is_active?: boolean;
  user?: {
    national_code: string;
    is_active: boolean;
    id: string;
    phone_number: string;
  };
  geo?: string;
  field_of_work?: string;
  id?: string;
  blue_profit?: number;
  silver_profit?: number;
  gold_profit?: number;
  corporate_profit?: number;
};
