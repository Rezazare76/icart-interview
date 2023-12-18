import { FC } from "react";
import { Tooltip as ReactToolTip } from "react-tooltip";
import TooltipProps from "./type";
export const Tooltip: FC<TooltipProps> = ({ id, style }) => {
  return (
    <ReactToolTip
      id={id}
      style={{ borderRadius: "8px", fontSize: "14px", ...style }}
      arrowColor="transparent"
    />
  );
};
