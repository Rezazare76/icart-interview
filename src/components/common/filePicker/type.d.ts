export default interface FilePickerProps {
  containerClass?: string;
  subject: string;
  description?: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFile: any;
  name?: string;
}
