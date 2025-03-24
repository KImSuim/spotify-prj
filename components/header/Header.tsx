"use client";

import { Colorize } from "@/common/Style/color";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { CgMenuRound } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useHeaderStore } from "@/store/headerStore";

const Header = () => {
  const {
    search,
    recentKeywords,
    showDropdown,
    setSearch,
    setShowDropdown,
    handleSearch,
    loadRecentKeywords,
  } = useHeaderStore();

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(search);
      router.push(
        `/search?query=${encodeURIComponent(search.trim().toLowerCase())}`
      );
    }
  };

  const handleFocus = () => {
    loadRecentKeywords();
    setShowDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [setShowDropdown]);

  return (
    <>
      {/* Full Header (for larger screens) */}
      <section
        className="w-full hidden sm:flex px-8 py-5 text-white relative z-50"
        style={{ backgroundColor: Colorize.Secondary_01 }}
      >
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-3 relative">
            <div className="flex gap-3 text-2xl">
              <button onClick={() => router.back()} className="p-2">
                <IoIosArrowBack />
              </button>
              <button onClick={() => router.forward()} className="p-2">
                <IoIosArrowForward />
              </button>
            </div>

            <div className="flex flex-col relative" ref={inputRef}>
              <div className="flex items-center px-4 py-2 text-gray-400 bg-white rounded-3xl w-64">
                <IoSearchOutline className="mr-2.5" />
                <input
                  className="outline-0 text-black w-full"
                  type="text"
                  placeholder="Artist, songs, or products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFocus();
                  }}
                />
              </div>

              {showDropdown && recentKeywords.length > 0 && (
                <ul className="absolute top-full left-0 mt-2 w-full bg-white text-black rounded-xl shadow-lg overflow-hidden">
                  {recentKeywords.map((keyword, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSearch(keyword);
                      }}
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-center">
            <Link
              href="https://www.spotify.com/kr-ko/signup"
              className="flex items-center justify-center h-10 font-semibold w-30"
              style={{ color: Colorize.Neutral_01 }}
            >
              Sign up
            </Link>
            <Link
              href="https://accounts.spotify.com/ko/login"
              className="flex items-center justify-center h-10 font-semibold text-black bg-white w-30 border-1 rounded-3xl"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* Hidden Header (for smaller screens) */}
      <div
        className="w-full flex sm:hidden px-8 py-5 text-white justify-between items-center"
        style={{ backgroundColor: Colorize.Secondary_01 }}
      >
        <Image width={110} height={35} src={"/Logo.png"} alt={"Spotify Logo"} />
        <div className="flex items-center justify-between px-4 py-2 text-gray-400 bg-white rounded-3xl">
          <IoSearchOutline className="mr-2.5" />
          <input
            className="outline-0 w-5xs rounded-2xl text-black"
            type="text"
            placeholder="Spotify"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(e) => {
              e.stopPropagation();
              handleFocus();
            }}
          />
        </div>
        <CgMenuRound size={40} />
      </div>
    </>
  );
};

export default Header;
