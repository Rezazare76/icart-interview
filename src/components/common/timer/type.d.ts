export default interface TimerProps {
  type: "asc" | "des";
  initialType: number;
  finishText: string;
  handleFinish: (value: boolean) => void;
}
