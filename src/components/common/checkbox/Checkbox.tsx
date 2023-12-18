import { FC, useEffect, useState } from "react";
import { CheckboxProps } from "./type";
import style from "./style.module.scss";

export const Checkbox: FC<CheckboxProps> = ({
  className,
  label,
  onClick,
  isCheck,
  id,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [isCheck]);

  const handleCheck = () => {
    setLoading(true);
    onClick();
  };
  return (
    <div className="flex items-center justify-center">
      <label
        className={`${className} ${style.toggle} overflow-hidden justify-center`}
        htmlFor={id}
        onClick={(e) => {
          e.stopPropagation();
          handleCheck();
        }}
      >
        {label}
        <input
          type="checkbox"
          className={`${style.toggle__input}`}
          id={id}
          defaultChecked={isCheck}
        />
        <span className={`${style.toggle_track}`}>
          <span className={`${style.toggle_indicator} `}>
            {!loading && (
              <span className={`${style.checkMark}`}>
                <svg
                  viewBox="0 0 24 24"
                  id="ghq-svg-check"
                  role="presentation"
                  aria-hidden="true"
                >
                  <path
                    d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0
               111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"
                  ></path>
                </svg>
              </span>
            )}
            {loading && (
              <span className={`${style.loading}`}>
                <svg
                  viewBox="0 0 24 24"
                  id="ghq-svg-check"
                  role="presentation"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#ffffff"
                    strokeWidth="4"
                    fill="none"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      dur="2s"
                      repeatCount="indefinite"
                      from="0"
                      to="502"
                    />
                    <animate
                      attributeName="stroke-dasharray"
                      dur="2s"
                      repeatCount="indefinite"
                      values="150.6 100.4;1 250;150.6 100.4"
                    />
                  </circle>
                </svg>
              </span>
            )}
          </span>
        </span>
      </label>
    </div>
  );
};
