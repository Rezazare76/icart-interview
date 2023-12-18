import { FC, memo, useState, useEffect } from "react";
import SliderCardProps from "./type";
export const SliderCard: FC<SliderCardProps> = memo(
  ({ className, imgList, positions, active }) => {
    const [select, setSelect] = useState(active);
    const [prevSelect, setPrevSelect] = useState(active);
    const [data, setData] = useState(positions);
    useEffect(() => {
      const updatedData = [...data];
      const temp = { ...updatedData[select] };
      updatedData[select] = { ...updatedData[prevSelect] };
      updatedData[prevSelect] = temp;
      setData(updatedData);
    }, [select, prevSelect, active]);

    return (
      <section className={`${className}`}>
        {data.map((elm, inx) => {
          return (
            <img
              key={`hero-card-${inx}`}
              src={imgList[inx]}
              className={`absolute  cursor-pointer translate-x-[-50%]  ${elm?.className}`}
              style={{
                // transform: `scale(${elm.scale})`,
                zIndex: elm?.zIndex,
                transition: "all 1s",
              }}
              draggable={false}
              onClick={() => {
                setSelect(inx);
                setPrevSelect(select);
              }}
              loading="lazy"
            />
          );
        })}
      </section>
    );
  }
);

SliderCard.displayName = "SliderCard";
