"use client";

import { Colorize } from "@/common/Style/color";
import { ArtistProps } from "@/common/Type/type";
import Image from "next/image";

const Artist = ({ image, name }: ArtistProps) => {
  return (
    <article className="p-2 w-[180px] flex flex-col items-center">
      <div className="w-[180px] h-[180px] relative overflow-hidden rounded-full">
        <Image
          className="object-cover object-center"
          src={image}
          alt={name}
          layout="fill"
        />
      </div>
      <div className="mt-3 h-[50px] text-center">
        <p
          className="text-base font-medium truncate"
          style={{ color: Colorize.Neutral_01 }}
        >
          {name}
        </p>
      </div>
    </article>
  );
};

export default Artist;
