import { Colorize } from "@/common/Style/color";
import { bodyFont, headerFont } from "@/common/Style/font";
import { AlbumProps } from "@/common/Type/type";
import Image from "next/image";

const Album = ({ name, image }: AlbumProps) => {
  return (
    <article className="max-w-[220px]">
      <Image src={image} alt={name} width={220} height={220} />
      <div className="mt-1">
        <p
          style={{
            fontSize: "14px",
            color: Colorize.Neutral_01,
          }}
        >
          {name}
        </p>
      </div>
    </article>
  );
};

export default Album;
