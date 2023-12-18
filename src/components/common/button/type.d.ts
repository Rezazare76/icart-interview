import { ReactNode } from "react";
export default interface ButtonProps {
  text: string;
  className?: string;
  icon?: ReactNode;
  onClick?: ((event: React.MouseEvent) => void) | (() => void);
  disabled?: boolean;
  loading?: boolean;
  loadingClass?: string;
  error?: boolean;
  errorClass?: string;
  type?: "submit" | "button" | "reset" | undefined;
}
