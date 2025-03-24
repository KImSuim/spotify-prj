"use client";

import { Colorize } from "@/common/Style/color";
import { SubHeaderProps } from "@/common/Type/type";
import { HiCheckBadge } from "react-icons/hi2";

const SubHeader = ({ image, name }: SubHeaderProps) => {
  return (
    <article
      className="max-w-full py-10 px-6 sm:px-32 flex flex-col sm:flex-row items-center sm:items-end"
      style={{
        background:
          "linear-gradient(to bottom, rgba(205, 168, 228, 1), rgba(18, 18, 18, 1))",
      }}
    >
      <div className="w-[300px] h-[300px] rounded-full sm:w-[350px] sm:h-[350px] sm:rounded-t-full overflow-hidden">
        <img src={image} alt={name} />
      </div>
      <span
        style={{
          paddingLeft: "24px",
          paddingBottom: "17px",
          paddingTop: "96px",
          color: Colorize.Secondary_03,
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <HiCheckBadge
            style={{ color: Colorize.Genre_12, fontSize: "20px" }}
          />
          <span>인증된 아티스트</span>
        </div>
        <div
          className="text-6xl font-bold sm:text-7xl sm:font-bold"
          style={{
            color: Colorize.Secondary_03,
          }}
        >
          {name}
        </div>
      </span>
    </article>
  );
};

export default SubHeader;
