import { ChangeEvent, FC, useState, useRef } from "react";
import UploadCloud2LineIcon from "remixicon-react/UploadCloud2LineIcon";
import CloseCircleLineIcon from "remixicon-react/CloseCircleLineIcon";
import FilePickerProps from "./type";
import style from "./style.module.scss";
import pdfIcon from "assets/images/pdf-icon.png";
import { ToastContainer, toast } from "react-toastify";

export const FilePicker: FC<FilePickerProps> = ({
  containerClass,
  subject,
  description,
  type,
  setFile,
  name,
}) => {
  const notify = (msg: string) => toast.error(msg);

  const [drag, setDrag] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | undefined>(
    ""
  );
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    const maxSize = 1024 * 1024;
    if (file) {
      const selectedFile = file;
      if (file.size > maxSize) {
        notify("حجم فایل نباید بیشتر از 1 مگابایت باشد");
        clearInput();
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImageSrc(e?.target?.result as string);
        setFile(event);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const clearInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };
  const setDefault = () => {
    setFile({ target: { files: [""], name: name } });
  };
  return (
    <aside
      className={`${containerClass}  flex items-center justify-center relative border-dashed border-2 border-primary-500 rounded overflow-hidden`}
    >
      {selectedImageSrc ? (
        <div
          className="relative border border-tertiary-300 rounded-xs p-4 m-5
         bg-primary-100 bg-opacity-30 flex flex-col items-center justify-center"
        >
          <img
            src={type == "application/pdf" ? pdfIcon : selectedImageSrc}
            alt="Selected Image "
            width={100}
          />

          <i
            className="bg-tertiary-100 absolute top-[-12px] right-[-12px] rounded-full cursor-pointer"
            onClick={() => {
              clearInput();
              setSelectedImageSrc("");
              setDrag(false);
            }}
          >
            <CloseCircleLineIcon
              className="rounded-full   text-danger "
              onClick={setDefault}
            />
          </i>
        </div>
      ) : (
        <div className="relative w-full  p-5 ">
          <input
            className="cursor-pointer absolute w-[200%] h-[200%] left-[-50%] bottom-[-50%] opacity-0 z-20"
            ref={inputFileRef}
            type="file"
            accept={type}
            onChange={handleFileUpload}
            onDragEnter={() => setDrag(true)}
            onDragLeave={() => setDrag(false)}
            name={name}
          />
          <div className="flex flex-col gap-[10px] items-center justify-center w-full h-full">
            <UploadCloud2LineIcon className="text-primary-500" />
            <span>{subject}</span>
            <span className="text-tertiary-500">{description}</span>
          </div>
        </div>
      )}
      {drag && !selectedImageSrc && (
        <div
          className={`${style.onDrag}  absolute bg w-full h-full rounded border-dashed border-2 border-primary-500 z-0`}
        />
      )}
    </aside>
  );
};
