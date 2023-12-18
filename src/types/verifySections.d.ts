import { ChangeEvent } from "react";
import UserRequestCreateType from "./userRequestCreate";
type files = {
  national_card_front: string;
  national_card_back: string;
  birth_certificate: string;
};
type verifySections = {
  onClick: (value: number) => void;
  handleForm?: (e: ChangeEvent<HTMLInputElement>) => void;
  sendData?: () => void;
  active?: boolean;
  formData?: UserRequestCreateType;
  handleFiles?: (e: ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  error?: boolean;
  name?: string;
  allFieldsFilled?: boolean;
};

export default verifySections;
