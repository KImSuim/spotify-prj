import { Colorize } from "@/common/Style/color";
import { SongProps } from "@/common/Type/type";
import Image from "next/image";

const SongList = ({ number, name, image, duration }: SongProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-3.5 w-11" style={{ color: Colorize.Neutral_01 }}>
          {number + 1}
        </div>
        <div className="flex items-center">
          {image && (
            <Image
              src={image}
              alt={name}
              width={48}
              height={48}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="ml-2">
          <div
            className="text-xl font-bold"
            style={{
              color: Colorize.Secondary_03,
            }}
          >
            {name}
          </div>
        </div>
      </div>
      <div className="mr-12">
        <div
          className="text-sm font-bold"
          style={{
            color: Colorize.Neutral_01,
          }}
        >
          {duration}
        </div>
      </div>
    </div>
  );
};

export default SongList;
