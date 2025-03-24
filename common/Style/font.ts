type Level = "01" | "02" | "03" | "04" | "05" | "06";
type HeaderSize = `Header${Exclude<Level, "">}`;
type BodySize = `Body${Exclude<Level, "04" | "05" | "06">}`;

type FontSize = `${80 | 32 | 20 | 14 | 12 | 10}px`;
type HeaderFontSize = Exclude<FontSize, "">;
type BodyFontSize = Exclude<FontSize, "80px" | "32px" | "20px">;

type LineHeight = `${96 | 40 | 24 | 16 | 14 | 12}px`;
type HeaderLineHeight = Exclude<LineHeight, "">;
type BodyLineHeight = Exclude<LineHeight, "96px" | "40px" | "24px">;

type HeaderValue = {
  fontSize: HeaderFontSize;
  lineHeight: HeaderLineHeight;
};

type BodyValue = {
  fontSize: BodyFontSize;
  lineHeight: BodyLineHeight;
};

type Size<T extends HeaderSize | BodySize> = {
  [key in T]: key extends HeaderSize ? HeaderValue : BodyValue;
};

export const headerFont: Size<HeaderSize> = {
  Header01: { fontSize: "80px", lineHeight: "96px" },
  Header02: { fontSize: "32px", lineHeight: "40px" },
  Header03: { fontSize: "20px", lineHeight: "24px" },
  Header04: { fontSize: "14px", lineHeight: "16px" },
  Header05: { fontSize: "12px", lineHeight: "14px" },
  Header06: { fontSize: "10px", lineHeight: "12px" },
};

export const bodyFont: Size<BodySize> = {
  Body01: { fontSize: "14px", lineHeight: "16px" },
  Body02: { fontSize: "12px", lineHeight: "14px" },
  Body03: { fontSize: "10px", lineHeight: "12px" },
};
