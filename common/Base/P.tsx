import { IconType } from "react-icons";
import { Colorize } from "../Style/color";

type PProps = {
  text: number | string;
  icon?: IconType; // Make icon optional
};

const P = ({ text, icon: Icon }: PProps) => {
  const InfoCusStyle =
    "flex items-center gap-2 text-white text-base min-h-[32px]";
  return (
    <p
      className={InfoCusStyle}
      style={{
        color: Colorize.Secondary_03,
      }}
    >
      {Icon && <Icon size={45} />}
      <span className="whitespace-nowrap leading-none">{text}</span>
    </p>
  );
};

export default P;
