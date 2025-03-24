import { Colorize } from "@/common/Style/color";

const Footer = () => {
  const CommonStyle = "flex flex-col gap-3";

  return (
    <div
      className="flex flex-col gap-7 pt-8 pb-11"
      style={{
        backgroundColor: Colorize.Secondary_01,
        color: Colorize.Neutral_02,
      }}
    >
      <div
        className="sm:flex sm:flex-row grid grid-cols-2 gap-24 px-12 pb-24"
        style={{
          borderBottom: "1px solid #777777",
        }}
      >
        <ul className={CommonStyle}>
          <p style={{ color: Colorize.Secondary_03 }}>회사</p>
          <span>상세정보</span>
          <span>채용 정보</span>
          <span>For the Record</span>
        </ul>
        <ul className={CommonStyle}>
          <p style={{ color: Colorize.Secondary_03 }}>커뮤니티</p>
          <span>아티스트</span>
          <span>개발자</span>
          <span>광고</span>
          <span>투자자</span>
          <span>공급업체</span>
        </ul>
        <ul className={CommonStyle}>
          <p style={{ color: Colorize.Secondary_03 }}>유용한 링크</p>
          <span>지원</span>
          <span>무료 모바일 앱</span>
        </ul>
        <ul className={CommonStyle}>
          <p style={{ color: Colorize.Secondary_03 }}>Spotify 요금제</p>
          <span>Preminum 개인</span>
          <span>Premium 듀오</span>
        </ul>
      </div>
      <p>© 2025 Spotify AB</p>
      <p className=" sm:flex hidden">
        스포티파이 에이비, Regeringsgatan 19, 111 53 Stockholm, Sweden | 대표:
        다니엘 에크 | 사업자등록번호: 556703-7485 (스웨덴) | 통신판매업
        신고번호: 2024-공정-0007 (사업자정보) | 고객지원문의 +82 1533 6552 및
        support@spotify.com | 호스팅서비스제공자: Google LLC
      </p>
    </div>
  );
};

export default Footer;
