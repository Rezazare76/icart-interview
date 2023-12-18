/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState, useContext } from "react";
import { DropDown } from "../dropDown/DropDown";
import GetLocationProps from "./type";
import { UserMeContext } from "pages/Routes";

export const GetLocation: FC<GetLocationProps> = ({
  setLocation,
  location,
  active,
  provinceClass,
  cityClass,
  require,
}) => {
  const { locationList, locationMutate } = useContext(UserMeContext);
  const [province, setProvince] = useState<string | undefined>("");
  const [city, setCity] = useState<any>();

  useEffect(() => {
    if (active && locationList.length && !location.province.id) {
      setLocation({
        city: { id: active.parentId, name: "" },
        province: {
          id:
            locationList
              .find((elm) => elm.id == active.parentId)
              ?.children.find((elm) => elm.name == active.provinceName)?.id ||
            " ",
          name: active.provinceName,
        },
      });
    }
  }, [location]);

  return (
    <>
      <DropDown
        containerClassName={provinceClass}
        className="w-full rounded-[8px] "
        listClass=" bg-tertiary-100 rounded-xs"
        list={locationList.length ? locationList.map((elm) => elm.name) : []}
        onClick={(elm, inx) => {
          setCity(elm);
          setProvince(" ");
          setLocation({
            province: { id: "", name: "" },
            city: {
              name: elm,
              id: locationList[inx]?.id,
            },
          });
        }}
        title="استان"
        titleClass="bg-tertiary-100"
        active={
          location?.city.name ||
          (locationList.length &&
            locationList?.find(
              (e: { id: unknown }) => e?.id === active?.parentId
            )?.name) ||
          " "
        }
        loading={!locationList.length}
        loadingRefresh={locationMutate}
        require={require}
      />
      <DropDown
        containerClassName={cityClass}
        className="w-full rounded-[8px]"
        listClass=" bg-tertiary-100 rounded-xs"
        list={
          locationList.length
            ? locationList
                .find((elm) => elm?.name == city)
                ?.children.map((e) => e.name) || []
            : []
        }
        onClick={(elm, inx) => {
          setProvince(elm);
          setLocation({
            ...location,
            province: {
              name: elm,
              id: locationList.find((el) => el?.name == city)?.children[inx].id,
            },
          });
        }}
        title="شهر"
        titleClass="bg-tertiary-100"
        active={province || location?.province.name || active?.provinceName}
        require={require}
      />
    </>
  );
};
GetLocation.defaultProps = {
  provinceClass: "w-full",
  cityClass: "w-full",
};
