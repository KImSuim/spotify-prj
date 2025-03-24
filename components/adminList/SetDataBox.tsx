"use client";

// 프롭스 타입 정의
type SetDataBoxTagProps = {
  inputInfo: string; // input 설명 이름
  inputValue: string; // input 데이터
  inputType: "text" | "number";
  onInputChange: (value: string | number) => void;
};

const SetDataBoxTag = ({
  inputInfo,
  inputValue,
  inputType,
  onInputChange,
}: SetDataBoxTagProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      inputType === "number"
        ? Math.max(0, Number(e.target.value))
        : e.target.value;
    onInputChange(value);
  };

  return (
    <div className="w-fit items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-300">
      <div className="pt-1.5 text-xs text-black select-none shrink-0">
        {inputInfo}
      </div>
      <input
        type={inputType}
        className="block w-auto max-w-xs pb-1.5 text-base text-gray-900 grow placeholder:text-gray-400 focus:outline-none"
        placeholder="값을 입력해주세요"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SetDataBoxTag;
