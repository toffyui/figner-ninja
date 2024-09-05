import { useEffect, useRef } from "react";

type Props = {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputForm: React.FC<Props> = ({
  inputValue,
  handleInputChange,
}) => {
  useEffect(() => {
    if (inputValue.length === 0 && inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [inputValue]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      // style={{ opacity: 0, position: "absolute", top: "-9999px" }}
      autoFocus
    />
  );
};
