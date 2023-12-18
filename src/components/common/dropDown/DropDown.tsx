import { FC, useState, memo, useEffect } from "react";
import DropDownProps from "./type";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import style from "./style.module.scss";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";

export const DropDown: FC<DropDownProps> = memo(
  ({
    list,
    className,
    titleClass,
    title,
    listClass,
    onClick,
    containerClassName,
    active,
    loading,
    loadingRefresh,
    require,
  }) => {
    const [value, setValue] = useState(list?.[0]);
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = (elm: string, inx: number) => {
      onClick(elm, inx);
      setValue(elm);
    };
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
      if (!loading) setRefresh(false);
    }, [loading]);
    return (
      <section
        className={`${containerClassName} flex items-center relative 
        cursor-pointer `}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
        tabIndex={loading ? undefined : 0}
      >
        <div
          className={`${className} flex items-center  px-2 py-3 bg-inherit 
         border border-tertiary-300 `}
        >
          <label
            className={`${titleClass} absolute font-light text-sm top-[-12px] right-[13px]`}
          >
            {title}
            {require && (
              <i className="text-danger font-bold text-lg rounded-full pulse w-[5px] h-[5px] bg-danger inline-block mx-1" />
            )}
          </label>
          <span className=" text-start w-full px-2">
            {active ? active : value}
          </span>
          <div className="w-[25px]">
            <ArrowDownSLineIcon size={20} className="text-tertiary-300 " />
          </div>
        </div>

        <ul
          className={`${listClass} ${
            style.ul
          } absolute top-[38px]  right-[0] w-full 
        border border-tertiary-300 border-t-0
         rounded-t-none ${
           isOpen
             ? "overflow-auto bottom-[-150px]"
             : "overflow-hidden bottom-[0] hidden"
         } z-10`}
        >
          {list?.length
            ? list?.map((elm, inx) => (
                <li
                  key={`${elm}-${inx}`}
                  className={`${
                    inx == 0 && "pt-4"
                  } p-2 border-b hover:bg-primary-100 hover:text-tertiary-200`}
                  onClick={() => handleClick(elm, inx)}
                >
                  {elm}
                </li>
              ))
            : ""}
          {!list?.length && loading ? (
            <div
              className={`flex items-center justify-center absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%]`}
            >
              <RefreshLineIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setRefresh(true);
                  loadingRefresh?.();
                }}
                className={`text-primary-400 ${refresh && "loading"}`}
                size={24}
              />
            </div>
          ) : (
            ""
          )}
        </ul>
      </section>
    );
  }
);
DropDown.defaultProps = {
  className: "rounded-xs",
  listClass: "rounded-xs bg-tertiary-100",
};
DropDown.displayName = "DropDown";
