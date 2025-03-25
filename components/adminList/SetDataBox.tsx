"use client";

import { useState } from "react";
import InputField from "./InputField";
// import { initialFormData, inputFields } from "@/common/parameter/parameters";
import { collection, doc, setDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { initialFormData, inputFields } from "@/common/parameter/parameters";

const SetDataBoxTag = () => {
  const [formData, setFormData] = useState({ ...initialFormData });

  // 입력 필드의 값이 변경될 때 실행되는 함수
  const handleInputChange = (
    fieldName: keyof typeof formData,
    value: string
  ) => {
    //formData 데이터 상태 업데이트
    //formData 값은 "...prev"를 사용하여 그대로 두고
    //fieldName이 genres일때 ","를 기준으로 배열 만들어 반환 (+ trim함수를 사용하여 빈칸 제거)
    setFormData((prev) => ({
      ...prev,
      [fieldName]:
        fieldName === "genres"
          ? (value.split(",").map((genre) => genre.trim()) as string[])
          : (value as string),
    }));
  };

  // 앨범 업로드 버튼 클릭 시 호출되는 함수
  const onClickUpLoadButton = async () => {
    // albumsName 빈칸이면 return 반환 (trim은 반칸 없애는 함수)
    if (!formData.albumsName.trim()) {
      return;
    }

    // Album 컬렉션에 새로운 문서를 생성할 준비
    const albumRef = doc(collection(fireStore, "Album"));
    // formData에 추가로 id는 16진수로 랜덤으로 들어가게 하여 앨범 데이터 생성
    const albumData = {
      id: Math.floor(Math.random() * 1000000).toString(16),
      ...formData,
    };
    // albumRef, albumData를 Firestore에 저장 (await를 사용하여 저장이 될 때까지 기다림)
    await setDoc(albumRef, albumData);
    // 저장 후 빈칸으로 초기화
    setFormData(initialFormData);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <div className="grid justify-start gap-4 lg:grid-cols-2">
          {/* inputFields 배열을 사용하여 input 박스 반환 */}
          {inputFields.map(({ key, label, type }) => (
            <InputField
              key={key}
              inputInfo={label}
              inputValue={formData[key as keyof typeof formData].toString()}
              inputType={type}
              onInputChange={(value) => {
                handleInputChange(key, String(value));
              }}
            />
          ))}
        </div>
      </div>
      <button
        onClick={onClickUpLoadButton}
        className="px-3 py-2 mt-2 text-black bg-yellow-200 border-2 border-white w-52"
      >
        앨범 저장
      </button>
    </>
  );
};

export default SetDataBoxTag;
