import { useEffect, useRef } from "react";

type Props = {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetInputField: () => void;
  inputKey: number;
};

export const InputForm: React.FC<Props> = ({
  inputValue,
  handleInputChange,
  resetInputField,
  inputKey,
}) => {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
      setTimeout(() => {
        resetInputField();
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputKey]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      key={inputKey}
      style={{ opacity: 0, position: "absolute", top: "-9999px" }}
      autoFocus
    />
  );
};
