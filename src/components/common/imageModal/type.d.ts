import { ReactNode } from "react";

export default interface ImageModalProps {
  image: string;
  children: ReactNode;
  containerClass?: string;
}
