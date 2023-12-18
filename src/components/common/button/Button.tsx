import { FC, MouseEvent } from "react";
import ButtonProps from "./type";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon";
export const Button: FC<ButtonProps> = ({
  className,
  text,
  icon,
  onClick,
  disabled,
  loading,
  loadingClass,
  error,
  errorClass,
  type,
}) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClick?.(e);
  };
  return (
    <button
      className={`${
        disabled && "bg-tertiary-300 cursor-not-allowed bg-gradient-0"
      } ${error && errorClass} relative ${className}`}
      value={text}
      onClick={(e) => handleClick(e)}
      disabled={disabled}
      style={{ backgroundImage: disabled ? "unset" : " " }}
      type={type}
    >
      {icon}
      {text}
      {loading && (
        <RefreshLineIcon
          size={16}
          className={` ${loadingClass} loading absolute translate-x-[-50%] translate-y-[-50%] top-[32%] left-[8px] z-[2]`}
        />
      )}
      {error && (
        <ErrorWarningLineIcon
          size={16}
          className={`text-danger absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[16px] z-[1]`}
        />
      )}
    </button>
  );
};
Button.defaultProps = {
  className: "bg-primary-700 text-white rounded py-2 px-12",
};
