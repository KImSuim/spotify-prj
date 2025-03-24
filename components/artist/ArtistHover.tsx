import { Colorize } from "@/common/Style/color";
import { motion } from "framer-motion";
import PlayButton from "../icon/PlayButton";
import { ArtistProps } from "@/common/Type/type";

const ArtistHover = ({ image, name }: ArtistProps) => {
  return (
    <article className="p-2 w-[180px] flex flex-col items-center">
      <motion.div className="relative" whileHover="hover" initial="initial">
        <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
          <img src={image} alt={name} />
        </div>
        <motion.div
          className="w-8 h-8 absolute right-1 bottom-1 flex justify-center items-center"
          style={{
            backgroundColor: Colorize.Primary_01,
            borderRadius: "50%",
          }}
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        >
          <PlayButton />
        </motion.div>
      </motion.div>
      <div className="mt-3">
        <p className="text-xl" style={{ color: Colorize.Neutral_01 }}>
          {name}
        </p>
      </div>
    </article>
  );
};

export default ArtistHover;
