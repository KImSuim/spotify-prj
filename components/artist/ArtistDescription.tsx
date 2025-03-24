import P from "@/common/Base/P";
import { ArtistDescriptionProps } from "@/common/Type/type";
import { BiSolidAlbum } from "react-icons/bi";
import { BsArrowThroughHeart } from "react-icons/bs";
import { TbMoodPlus } from "react-icons/tb";

const ArtistDescription = ({
  popularity,
  genre,
  follower,
}: ArtistDescriptionProps) => {
  return (
    <div className="w-full p-10 flex flex-col gap-7 rounded-xl">
      <div className="flex justify-between sm:flex-col gap-3">
        <P icon={BsArrowThroughHeart} text={popularity} />
        <P icon={TbMoodPlus} text={`${follower}명`} />
        <P icon={BiSolidAlbum} text={[...new Set(genre)].join(" , ")} />
      </div>
    </div>
  );
};

export default ArtistDescription;
