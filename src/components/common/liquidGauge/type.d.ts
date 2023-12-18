export default interface LiquidGaugeProps {
  percent: number;
  colors: {
    start: string;
    end: string;
  };
  count?: number;
}
