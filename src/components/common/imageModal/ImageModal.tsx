import { FC, useState } from "react";
import ImageModalProps from "./type";
import CloseFillIcon from "remixicon-react/CloseFillIcon";
import { createPortal } from "react-dom";

export const ImageModal: FC<ImageModalProps> = ({
  image,
  children,
  containerClass,
}) => {
  const [show, setShow] = useState(false);
  const containerElement = document.querySelector("body");

  return (
    <article
      className={`${containerClass} cursor-pointer`}
      onClick={() => {
        setShow(true);
      }}
    >
      {children}
      {show &&
        createPortal(
          <div className="fixed left-0 top-0 w-full h-full flex flex-col z-[1005] bg-black bg-opacity-30">
            <CloseFillIcon
              onClick={(e) => {
                e.stopPropagation();
                setShow(false);
              }}
              className="text-tertiary-100 m-5 self-start z-[1003] cursor-pointer mb-5"
              size={30}
            />
            <div className="w-full flex items-center justify-center h-full overflow-auto">
              <img
                src={image}
                alt="modal-image"
                width={"60%"}
                className="object-contain m-auto mb-6 "
              />
            </div>
          </div>,
          containerElement!
        )}
    </article>
  );
};
