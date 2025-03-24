type Level =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";
type PrimaryColor = "1DB954";
type SecondaryColor = "000000" | "121212" | "FFFFFF" | "FFFFFF0D";
type Neutral = "868686" | "777777" | "535353";
type Genre =
  | "55A891"
  | "27856A"
  | "5F8109"
  | "F037A5"
  | "AF2896"
  | "477D95"
  | "509BF5"
  | "1D3164"
  | "E8115B"
  | "E13300"
  | "BA5D07"
  | "2E77D0";
type ColorType = "Primary" | "Secondary" | "Neutral" | "Genre";
type PriColor = `${Extract<ColorType, "Primary">}_${Extract<Level, "01">}`;
type SecColor = `${Extract<ColorType, "Secondary">}_${Extract<
  Level,
  "01" | "02" | "03" | "04"
>}`;
type NeuColor = `${Extract<ColorType, "Neutral">}_${Extract<
  Level,
  "01" | "02" | "03"
>}`;
type GenreColor = `${Extract<ColorType, "Genre">}_${Level}`;

type ColorList = PrimaryColor | SecondaryColor | Neutral | Genre;
type SetColorList = `#${ColorList}`;

type PriRecord = Record<
  PriColor | SecColor | NeuColor | GenreColor,
  SetColorList
>;

export const Colorize: PriRecord = {
  Primary_01: "#1DB954", // 초록색
  Secondary_01: "#000000", // 진한 까만색
  Secondary_02: "#121212", // 까만색
  Secondary_03: "#FFFFFF", // 흰색
  Secondary_04: "#FFFFFF0D", // 흰색-투명도 있는 버전
  Neutral_01: "#868686", // 연한 회색
  Neutral_02: "#777777", // 기본 회색
  Neutral_03: "#535353", // 진한 회색
  Genre_01: "#55A891", // 연한 청록색
  Genre_02: "#27856A", // 진한 청록색
  Genre_03: "#5F8109", // 녹색
  Genre_04: "#F037A5", // 핫핑크색
  Genre_05: "#AF2896", // 보라색
  Genre_06: "#477D95", // 탁한 파란색
  Genre_07: "#509BF5", // 하늘색
  Genre_08: "#1D3164", // 남색
  Genre_09: "#E8115B", // 크림슨 레드
  Genre_10: "#E13300", // 주황색
  Genre_11: "#BA5D07", // 갈색
  Genre_12: "#2E77D0",
};
