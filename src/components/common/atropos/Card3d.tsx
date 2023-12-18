import { memo, FC } from "react";
import Atropos from "atropos/react";
import Card3dProps from "./type";
import "./style.scss";
export const Card3d: FC<Card3dProps> = memo(({ element, className }) => {
  return (
    <div className={`${className} text-white relative`}>
      <Atropos
        className="h-[390px] flex items-center justify-center relative"
        shadowScale={0}
        data-atropos-offset="-5"
      >
        {element}
      </Atropos>
    </div>
  );
});
Card3d.displayName = "Card3d";
