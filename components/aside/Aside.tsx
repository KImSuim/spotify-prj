"use client";
import { Colorize } from "@/common/Style/color";
import { headerFont } from "@/common/Style/font";
import Image from "next/image";
import { GoHomeFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Aside = () => {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기

  const isActive = pathname === "/";
  return (
    <section
      className="p-5 hidden sm:flex flex-col items-center gap-5 h-full "
      style={{ backgroundColor: Colorize.Secondary_01 }}
    >
      <button onClick={() => router.push("/")} className="cursor-pointer">
        <Image width={180} height={85} src={"/Logo.png"} alt="Home" priority />
      </button>
      <button
        onClick={() => router.push("/")}
        className="flex items-center w-full h-8 gap-1 p-6 mt-4 rounded-md"
        style={{
          color: isActive ? Colorize.Secondary_03 : Colorize.Neutral_01,
          backgroundColor: isActive ? Colorize.Neutral_03 : "initial",
        }}
      >
        <GoHomeFill style={headerFont.Header02} />
        <div className="text-xs font-semibold" style={headerFont.Header04}>
          Home
        </div>
      </button>
      <Link
        href="https://accounts.spotify.com/ko/login?continue=https%3A%2F%2Fopen.spotify.com%2F"
        className="flex items-center w-full h-8 p-6 rounded-md"
        style={{
          color: Colorize.Neutral_01,
        }}
      >
        <div className="text-xs font-semibold" style={headerFont.Header04}>
          Log in
        </div>
      </Link>
    </section>
  );
};

export default Aside;
