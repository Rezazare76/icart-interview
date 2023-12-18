import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";

interface MultiInputProps {
  onAllInputsFilled: (values: string) => void;
  inputsClassName?: string;
  containerClassName?: string;
  maxLength: number;
  error?: boolean;
}

export const MultiInput: React.FC<MultiInputProps> = ({
  onAllInputsFilled,
  inputsClassName,
  containerClassName,
  maxLength,
  error,
}) => {
  const [inputValues, setInputValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    // Focus the first input when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (Number(value) || value == "0") {
      const newInputValues = [...inputValues];
      if (value && newInputValues[index]) {
        newInputValues[index] = value;
        setInputValues(newInputValues);
        inputRefs.current[index + 1]?.focus();
      } else if (value && index >= 0) {
        newInputValues[index] = value;
        setInputValues(newInputValues);
        // Move focus to the previous input if the current input is empty
        inputRefs.current[index + 1]?.focus();
      }
      onAllInputsFilled(newInputValues.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const newInputValues = [...inputValues];

    if ((e.key === "Backspace" || e.key === "Delete") && index >= 0) {
      // Move focus to the previous input if Backspace is pressed and the current input is empty
      if (!newInputValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (newInputValues[index] && index >= 0) {
        newInputValues[index] = "";
        setInputValues(newInputValues);
      }
    } else if (newInputValues[index] && index < inputValues.length - 1) {
      if (Number(e.key) || e.key == "0") {
        newInputValues[index] = e.key;
        setInputValues(newInputValues);
        inputRefs.current[index + 1]?.focus();
      } else inputRefs.current[index + 1]?.focus();
    } else if (newInputValues[index] && index == inputValues.length - 1) {
      if (Number(e.key) || e.key == "0") {
        newInputValues[index] = e.key;
        setInputValues(newInputValues);
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <div
      className={`${containerClassName} flex items-center justify-center flex-row-reverse`}
    >
      {inputValues.map((value, index) => (
        <input
          inputMode="numeric"
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          maxLength={maxLength}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(index, e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(index, e)
          }
          className={`${inputsClassName} ${
            error ? "border-danger text-danger" : "text-tertiary-400"
          } border border-[#EEEEEE] p-1 rounded-xs
          text-center text-lg ltr`}
          dir="ltr"
        />
      ))}
    </div>
  );
};
