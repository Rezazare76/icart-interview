import { LocationType } from "types/locationType";

export default interface GetLocationProps {
  location: LocationType;
  setLocation: (value: LocationType) => void;
  active?:
    | { provinceName: string | undefined; parentId: string | undefined }
    | undefined;
  provinceClass?: string;
  cityClass?: string;
  require?: boolean;
}
