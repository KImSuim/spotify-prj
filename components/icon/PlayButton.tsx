import { Colorize } from "@/common/Style/color";

const PlayButton = () => {
  return (
    <span
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        borderTop: "6px solid transparent",
        borderBottom: "6px solid transparent",
        borderLeft: "11px solid " + Colorize.Secondary_01,
        left: "55%", // 왼쪽 기준으로 50% 이동
        top: "50%", // 위쪽 기준으로 50% 이동
        transform: "translate(-50%, -50%)", // 정확한 중앙 정렬
      }}
    />
  );
};

export default PlayButton;
