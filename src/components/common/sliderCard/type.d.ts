export default interface SliderCardProps {
  className: string;
  imgList: string[];
  positions: {
    scale: string;
    className: string;
    zIndex: number;
  }[];
  active: number;
}
