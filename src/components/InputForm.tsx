import { useEffect, useRef } from "react";

type Props = {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputKey: number;
};

export const InputForm: React.FC<Props> = ({
  inputValue,
  handleInputChange,
  inputKey,
}) => {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
      setTimeout(() => {
        handleInputChange({ target: { value: "" } } as any);
      }, 100);
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
