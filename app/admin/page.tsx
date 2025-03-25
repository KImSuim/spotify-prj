"use client";

import { useState } from "react";
import SetDataBoxTag from "@/components/adminList/SetDataBox";
import GatDataBoxTag from "@/components/adminList/GatDataBox";
import DeleteButton from "@/components/adminList/DeleteButton";

const AdminPage = () => {
  const [albumId, setAlbumId] = useState(""); // To store the albumId for deletion

  const handleDeleteSuccess = () => {
    setAlbumId(""); // Reset the album ID after deletion
  };

  return (
    <div className="p-5 text-white">
      <h2 className="my-4 text-3xl font-bold">앨범 추가를 해주세요</h2>
      <SetDataBoxTag />
      <DeleteButton />
      <h2 className="my-4 text-3xl font-bold ">앨범 리스트</h2>
      <GatDataBoxTag />
    </div>
  );
};

export default AdminPage;
