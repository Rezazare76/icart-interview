export default interface DropDownProps {
  title: string;
  list: string[];
  onClick: (elm: string, inx: number) => void;
  className?: string;
  containerClassName?: string;
  titleClass?: string;
  listClass?: string;
  active?: string;
  loading?: boolean;
  loadingRefresh?: () => void;
  require?: boolean;
}
