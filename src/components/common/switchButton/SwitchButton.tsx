import { FC, useState, memo, useEffect } from "react";
import switchButtonProps from "./type";
export const SwitchButton: FC<switchButtonProps> = memo(
  ({ containerClassName, list, active, itemsClass }) => {
    const [select, setSelect] = useState<number>(active);
    useEffect(() => setSelect(active), [active]);
    const handleClick = (inx: number, onClick: () => void) => {
      setSelect(inx);
      onClick();
    };
    return (
      <section className={containerClassName}>
        <ul className="w-full flex items-stretch">
          {list.map((elm, inx) => (
            <li
              key={`switch-${inx}`}
              className={`${
                inx === select &&
                "bg-gradient-to-r from-[#0085CF] to-[#01286D] text-tertiary-100 "
              } ${itemsClass} text-xs 2xs:text-sm sm:text-base`}
              onClick={() => handleClick(inx, elm.onClick)}
            >
              {elm.title}
            </li>
          ))}
        </ul>
      </section>
    );
  }
);

SwitchButton.defaultProps = {
  containerClassName:
    "bg-tertiary-100 text-tertiary-300 w-full border p-1 border-[#EEEEEE] rounded-xs my-8 cursor-pointer",
  itemsClass: "px-10 py-2 rounded-xs flex-grow text-center",
};
SwitchButton.displayName = "PaymentCardInput";
