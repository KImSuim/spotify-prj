import React, { useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
// import { firestore } from "./firebase"; // 🔹 Firebase 설정 파일 import
const Albums = [
  {
    id: "12YODvwEH9NPutL8OhObfD",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Rebirth (Intro)",
    trackDuration: "02:24",
  },
  {
    id: "3vKBoDN6DGrxMRDBOe5bQa",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Interlude : Showtime",
    trackDuration: "01:18",
  },
  {
    id: "0KsBlpW6csX9YBVckbTDZh",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Smeraldo Garden Marching Band (feat. Loco)",
    trackDuration: "03:02",
  },
  {
    id: "5XvFNFNsgvmwsWk1T7BfRj",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Slow Dance (feat. Sofia Carson)",
    trackDuration: "03:08",
  },
  {
    id: "59ldd5koyBqo1vFp6MusW1",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Be Mine",
    trackDuration: "03:27",
  },
  {
    id: "5wPnPIZS8wr4lPNLz4qvHK",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Who",
    trackDuration: "02:50",
  },
  {
    id: "2Zyto2vRT9MEj44Y4qbzcs",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Closer Than This",
    trackDuration: "03:43",
  },
  {
    id: "1Px44tw80Q4rcCl8FxDGOi",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Who (Instrumental)",
    trackDuration: "02:50",
  },
  {
    id: "10I5rhhFoWZDIN3kEc6Dbo",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Who (Acoustic Remix)",
    trackDuration: "03:04",
  },
  {
    id: "1MC8JLPV4fbvVBqvGSLoDf",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Who (Rock Remix)",
    trackDuration: "02:51",
  },
  {
    id: "1ZtkxrnxZB6r8nIiHwqaUn",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Rebirth (Intro)",
    trackDuration: "02:24",
  },
  {
    id: "12HctF6VyD118g7eXtWLBo",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Interlude : Showtime",
    trackDuration: "01:18",
  },
  {
    id: "7yODD9DKQIllpZ5eioLZRY",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Smeraldo Garden Marching Band (feat. Loco)",
    trackDuration: "03:02",
  },
  {
    id: "5nyhz1bxLCiBBIAIcBgiEP",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Slow Dance (feat. Sofia Carson)",
    trackDuration: "03:08",
  },
  {
    id: "3VaKWbW68AyOkEl4AxhXA2",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Be Mine",
    trackDuration: "03:27",
  },
  {
    id: "32lSgbCqRcIOyUSnfuUZEQ",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Who",
    trackDuration: "02:50",
  },
  {
    id: "6OIVG9TFJnqOec4G5rD8pW",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Closer Than This",
    trackDuration: "03:43",
  },
  {
    id: "1ySWoGgrduSzvtJ3PUzO41",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Who (Shibuyakei Remix)",
    trackDuration: "02:46",
  },
  {
    id: "7KZNgri6Jxw88FAfATw6i9",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Who (Funky Remix)",
    trackDuration: "03:08",
  },
  {
    id: "2isRbZIIU4PqPrECffn7QO",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Who (Beautiful Mind Remix)",
    trackDuration: "02:57",
  },
  {
    id: "7gMfVc4zfNIxuMyMGglOHa",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Rebirth (Intro)",
    trackDuration: "02:24",
  },
  {
    id: "45zLrK0668WQ5JFMyiYmCS",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Interlude : Showtime",
    trackDuration: "01:18",
  },
  {
    id: "1agDCV4zQqaFwJQNsTgmL1",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Smeraldo Garden Marching Band (feat. Loco)",
    trackDuration: "03:02",
  },
  {
    id: "3d2bsbugow8JiNvuaRupFH",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Slow Dance (feat. Sofia Carson)",
    trackDuration: "03:08",
  },
  {
    id: "3LWVXp636uLT356Rj08Jaz",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Be Mine",
    trackDuration: "03:27",
  },
  {
    id: "7tI8dRuH2Yc6RuoTjxo4dU",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Who",
    trackDuration: "02:50",
  },
  {
    id: "6qafqn8bBMy7t5c5WqpyRk",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Closer Than This",
    trackDuration: "03:43",
  },
  {
    id: "4DairgmwgyfmFHm0e7kRPL",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Be Mine (English Version)",
    releaseDate: "2024-08-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27319655636129722b4bd720dbc",
    trackName: "Be Mine (English Version)",
    trackDuration: "03:27",
  },
  {
    id: "1yqdD2ScjkqvaNBUzPQ4vR",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who",
    trackDuration: "02:50",
  },
  {
    id: "6t7t37Bex3DV4ADqAwUmwa",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Instrumental)",
    trackDuration: "02:50",
  },
  {
    id: "2YKecnWyzkGEDTyNaKBG2H",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Acoustic Remix)",
    trackDuration: "03:04",
  },
  {
    id: "2x9lpe6UIHNqLf8fB8qpb7",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Rock Remix)",
    trackDuration: "02:51",
  },
  {
    id: "1PNdJibg1adHD1pTpYBfGc",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Shibuyakei Remix)",
    trackDuration: "02:46",
  },
  {
    id: "6E9BsGMop0G1jrpQNzugXv",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Funky Remix)",
    trackDuration: "03:08",
  },
  {
    id: "1GDjQlek7EFZ3qTyySTSAF",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Beautiful Mind Remix)",
    trackDuration: "02:57",
  },
  {
    id: "6IST7HiO2OlytkRp866Xdd",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "HOME SWEET HOME (feat. TAEYANG & DAESUNG)",
    trackDuration: "03:31",
  },
  {
    id: "3hRg8A9PwC5YWrgLRJ4OFf",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "PO￦ER",
    trackDuration: "02:23",
  },
  {
    id: "0Kk5TRkYuWXY89KamtFEFw",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "TOO BAD (feat. Anderson .Paak)",
    trackDuration: "02:33",
  },
  {
    id: "5p888hnYmPMQTMcVZXF8Dd",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "DRAMA",
    trackDuration: "03:54",
  },
  {
    id: "1YfsKKIW19u5QMeWdiFvk1",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "IBELONGIIU",
    trackDuration: "03:13",
  },
  {
    id: "1rHhowJ15GjsTqCGoTXm5e",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "TAKE ME",
    trackDuration: "03:39",
  },
  {
    id: "4wq8RcVA4GdRx8w6GUrjio",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "보나마나 (BONAMANA)",
    trackDuration: "03:15",
  },
  {
    id: "5WNRDeYpON54LEZOoiI3Xf",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "GYRO-DROP",
    trackDuration: "02:48",
  },
  {
    id: "1SYcF2fUYDYQsISyFehQYI",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "COUP D'ETAT",
    trackDuration: "02:58",
  },
  {
    id: "62qrReIGZC8zzdmw9DXEuS",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "NILIRIA - Missy Elliott Version",
    trackDuration: "02:52",
  },
  {
    id: "3iBJHz5krbr4zUM40zzwcJ",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "R.O.D.",
    trackDuration: "03:56",
  },
  {
    id: "44f1TNdoQUgf3PUYraCTsH",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "Black (Feat. JENNIE of BLACKPINK)",
    trackDuration: "03:23",
  },
  {
    id: "4uS12OS6QeNgiCHpaqwvlR",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "WHO YOU?",
    trackDuration: "03:21",
  },
  {
    id: "3jeGRLccqBJ0CxkUVZQKxE",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "SHAKE THE WORLD",
    trackDuration: "02:54",
  },
  {
    id: "3N9lH3C9oykSau0Q74bVsi",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "GO",
    trackDuration: "03:28",
  },
  {
    id: "3mb0tvqsU8IPaAYvyf55az",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "CROOKED",
    trackDuration: "03:44",
  },
  {
    id: "5CRuf5AnlXoapQfwi1sxbS",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "NILIRIA - G-Dragon Version",
    trackDuration: "02:52",
  },
  {
    id: "6wCNJoZaOLnFzXoNFlR65V",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "RUNAWAY",
    trackDuration: "03:21",
  },
  {
    id: "2tNdosMthOOTnH1KYdKl16",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "I LOVE IT",
    trackDuration: "03:14",
  },
  {
    id: "7nySA2CVivNXZvjwJLe9dG",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "YOU DO (Outro)",
    trackDuration: "02:37",
  },
  {
    id: "3q0evJwZohI2FfXkfC5tSR",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "COUP D'ETAT",
    trackDuration: "02:58",
  },
  {
    id: "1fZGJrxPq82zcHVoYMntZt",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "NILIRIA - Missy Elliott Version",
    trackDuration: "02:52",
  },
  {
    id: "1TmvMsKakEUCtLgkGYEZp4",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "R.O.D.",
    trackDuration: "03:56",
  },
  {
    id: "7BYGfn9F73atTWMdAHVdPk",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "BLACK",
    trackDuration: "03:23",
  },
  {
    id: "7iT56ss42YdtYnNQEnxp9Z",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "WHO YOU?",
    trackDuration: "03:21",
  },
  {
    id: "0yQVxHQ8MPI7jxkewravSD",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "SHAKE THE WORLD",
    trackDuration: "02:54",
  },
  {
    id: "7gPF3Mu0DVWj75SXdZaYCY",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "GO",
    trackDuration: "03:28",
  },
  {
    id: "4EwNWRBWdZ6bgvxRHlZ8OO",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "CROOKED",
    trackDuration: "03:44",
  },
  {
    id: "3lLFAlgTMNJdXEl9bhkowL",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "NILIRIA - G-Dragon Version",
    trackDuration: "02:52",
  },
  {
    id: "4yUZkcPv80Wi4TYgpJaZ9e",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "RUNAWAY",
    trackDuration: "03:21",
  },
  {
    id: "1K1DpAZoH5jbpvxcAY07Sy",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "I LOVE IT",
    trackDuration: "03:14",
  },
  {
    id: "2346AzTq5Qtru2VJv1Wreq",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "YOU DO (Outro)",
    trackDuration: "02:37",
  },
  {
    id: "5KIPe6uCM6rosCxeGcfPTA",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "GO - Live",
    trackDuration: "04:15",
  },
  {
    id: "2fbvGELVvBGeCt5PGEvxNf",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Heartbreaker - Live",
    trackDuration: "03:20",
  },
  {
    id: "52fUpY23U2AsSdVCOcfK5v",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "One of a Kind - Live",
    trackDuration: "03:28",
  },
  {
    id: "4CxEcSx0FIYmzwDGDbUHoO",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Butterfly - Live",
    trackDuration: "04:00",
  },
  {
    id: "6gSO9nwQqrgfMBXEmWCyQL",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Missing You - Live",
    trackDuration: "03:46",
  },
  {
    id: "62QLmXhOjh4iWC1CKy90xK",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "That XX - Live",
    trackDuration: "03:44",
  },
  {
    id: "6pxrme6UtEm7KaFI1RMdQl",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Without You - Live",
    trackDuration: "04:11",
  },
  {
    id: "7GVT1u4kAKlIAkVkPaSZ9p",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Today - Live",
    trackDuration: "04:51",
  },
  {
    id: "7nsdz4KlIj91cwCJ9m33Fx",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "A Boy - Live",
    trackDuration: "03:52",
  },
  {
    id: "1iNWC4Bu09R0o9DJXlKJGF",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "This Love - Live",
    trackDuration: "03:12",
  },
  {
    id: "0fAeXI8WxncT8IkMaNI75c",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "1 Year - Live",
    trackDuration: "04:50",
  },
  {
    id: "1TkjST5uC2Kx4A6Ktg7RXV",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Obsession - Live",
    trackDuration: "05:25",
  },
  {
    id: "6E9qJkWX0Kae59pZelC02V",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "She's Gone - Live",
    trackDuration: "04:42",
  },
  {
    id: "2J7RfDZhlJo4PPcF6S3SuO",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Crayon + Fantastic Baby - Live",
    trackDuration: "06:14",
  },
  {
    id: "0jzNkPeK3W1g7G1MoqIfeZ",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Heartbreaker",
    trackDuration: "05:04",
  },
  {
    id: "4eAbsf15Xi5ItqJiTOVHKQ",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "This Love",
    trackDuration: "03:44",
  },
  {
    id: "3ar6JH26PgvWitEsBx2H4I",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Hello (Feat. DARA)",
    trackDuration: "03:46",
  },
  {
    id: "19o6PAA7YhNuKlJ6McmvP6",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Gossip Man (Feat. Kim Gun Mo)",
    trackDuration: "03:58",
  },
  {
    id: "02b9u4HtbgWDEDWmmkv061",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Korean Dream + Storm + Hip Hop Gentlemen + G-DRAGON",
    trackDuration: "04:15",
  },
  {
    id: "1LERA11k6mBQVtPON9xrxX",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "A Boy",
    trackDuration: "03:16",
  },
  {
    id: "7eUU0sWJq3k0GPca9Ak8cP",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "The Leaders (Feat. Teddy, CL)",
    trackDuration: "04:44",
  },
  {
    id: "7p6ZmgzWeZPIqoqMr1GgEQ",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Breathe",
    trackDuration: "03:54",
  },
  {
    id: "0cwyRZpI8CmHF3Inx78Hgo",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Butterfly (Feat. Jin Jung)",
    trackDuration: "03:41",
  },
  {
    id: "5QIp9cwiXJdCI8Bz2k8i8c",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "But I Love U",
    trackDuration: "04:55",
  },
  {
    id: "4zAGN8kU33hfTrhQRHhYdU",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "She's Gone (Feat. KUSH)",
    trackDuration: "04:50",
  },
  {
    id: "1JaGOGGmxiMUlQ2SGwheLk",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Only Look At Me",
    trackDuration: "04:01",
  },
  {
    id: "3lShYM0Ts3HfEDFpfkGO5z",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Korean Dream (Feat. TAEYANG)",
    trackDuration: "03:33",
  },
  {
    id: "4McJBwPCVaey67P7Vva81s",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "1 Year",
    trackDuration: "05:29",
  },
  {
    id: "3bNTPfEavB3i1RD4g8AaDn",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Lies",
    trackDuration: "05:59",
  },
  {
    id: "0bEca0Fd6dmW9PmEDGeEi7",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Heartbreaker (Encore)",
    trackDuration: "04:51",
  },
  {
    id: "5HH0VAoIyxEL5X4ZES6TEx",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Heartbreaker (Feat. Flo Rida)",
    trackDuration: "03:24",
  },
  {
    id: "163261XJJ4vA69ZXKW6WeP",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "This love (G.H remix)",
    trackDuration: "03:19",
  },
  {
    id: "6pcsEv1oLDQa3SggnaASsg",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "A Boy (CHOICE 37 Remix)",
    trackDuration: "03:24",
  },
  {
    id: "0z3tku2tK4E9hAj7PmLRzd",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb99234fca18ba6bc8e75620ca",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Breathe (hitchhiker Remix)",
    trackDuration: "03:38",
  },
  {
    id: "0BA3uoKlu9CsHgXIeAiXmJ",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Caligo Pt.1",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ca59009b95be7b850357de10",
    trackName: "Chroma Drift",
    trackDuration: "03:30",
  },
  {
    id: "2sDcIrosoXqiGv1D5OQUvF",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Caligo Pt.1",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ca59009b95be7b850357de10",
    trackName: "Dash",
    trackDuration: "02:54",
  },
  {
    id: "6JbyOUBLnkMadKcPQoQeTR",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Caligo Pt.1",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ca59009b95be7b850357de10",
    trackName: "RIZZ",
    trackDuration: "02:44",
  },
  {
    id: "3ICrCBhFiLaX0qP7KErHLe",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Caligo Pt.1",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ca59009b95be7b850357de10",
    trackName: "Island",
    trackDuration: "04:16",
  },
  {
    id: "4gQJFhPYEVLuxyriyUubzD",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Caligo Pt.1",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ca59009b95be7b850357de10",
    trackName: "12:32 (A to T)",
    trackDuration: "03:13",
  },
  {
    id: "1riEr6o3obQxrQRFmD9Sed",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "The Fiery Priest 2 (Original Soundtrack) Part.2",
    releaseDate: "2024-11-16",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342f928ecd788665e0941e7da",
    trackName: "We don't stop",
    trackDuration: "03:22",
  },
  {
    id: "4jdlmdxikDrQc4YNhkRccv",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "The Fiery Priest 2 (Original Soundtrack) Part.2",
    releaseDate: "2024-11-16",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342f928ecd788665e0941e7da",
    trackName: "We don't stop - Inst.",
    trackDuration: "03:12",
  },
  {
    id: "0CN7xUFQbPRzffogC4FgBR",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Dear Hyeri, Pt. 4 (Original Soundtrack)",
    releaseDate: "2024-10-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a34b2e1a0bddae322a8219da",
    trackName: "What If",
    trackDuration: "03:51",
  },
  {
    id: "3KSkAziu70R5dvs0gmaNLv",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Dear Hyeri, Pt. 4 (Original Soundtrack)",
    releaseDate: "2024-10-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a34b2e1a0bddae322a8219da",
    trackName: "What If - Instrumental",
    trackDuration: "03:51",
  },
  {
    id: "34DtDWmIUacoop6Md298vE",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Pump Up The Volume!",
    releaseDate: "2024-08-20",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730521b4efcb4432ca54cf2baa",
    trackName: "Pump Up The Volume!",
    trackDuration: "02:59",
  },
  {
    id: "1NubJcJa12xLssOkQfWZDZ",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "Watch Me Woo!",
    trackDuration: "02:15",
  },
  {
    id: "1T6xi2QrnmwaebXGvWAjLg",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "WAY 4 LUV",
    trackDuration: "03:39",
  },
  {
    id: "4mMtn8zhy4IaOwzNCgSbCT",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "Virtual Idol",
    trackDuration: "02:29",
  },
  {
    id: "1UyrFk2u0Asqmys76trMLi",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "From",
    trackDuration: "03:28",
  },
  {
    id: "2ODZujtUNxCQDfKCxCeRxZ",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "Our Movie",
    trackDuration: "02:41",
  },
  {
    id: "30FH8tNdUgHqZbB6ENgOwY",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "Merry PLLIstmas",
    trackDuration: "03:59",
  },
  {
    id: "6xGr4tVzpTX99p9Cf0hRRL",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "3D (feat. Jack Harlow)",
    trackDuration: "03:21",
  },
  {
    id: "06Qo2fYR2KS1F7bL338iVT",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Closer to You (feat. Major Lazer)",
    trackDuration: "02:50",
  },
  {
    id: "2HRgqmZQC0MC7GeNuDIXHN",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Seven (feat. Latto) (Explicit Ver.)",
    trackDuration: "03:03",
  },
  {
    id: "2KslE17cAJNHTsI2MI0jb2",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Standing Next to You",
    trackDuration: "03:26",
  },
  {
    id: "2gkVEnpahpE3bQuvGuCpAV",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Yes or No",
    trackDuration: "02:27",
  },
  {
    id: "0k0GtcnyQLMiXrdEDbLXmJ",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Please Don't Change (feat. DJ Snake)",
    trackDuration: "02:26",
  },
  {
    id: "5ONOlTiqymhzwcFjqcIT6E",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Hate You",
    trackDuration: "02:34",
  },
  {
    id: "5KfJvZ0PZzRdwFRaTUDAA7",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Somebody",
    trackDuration: "02:48",
  },
  {
    id: "3bNNvJA7hsGw0wSpGkfOBm",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Too Sad to Dance",
    trackDuration: "02:55",
  },
  {
    id: "7AbqgE05nFl9qY4FRUiq2p",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Shot Glass of Tears",
    trackDuration: "02:47",
  },
  {
    id: "7Hcj0duTWiCSYDtJaztNIt",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Seven (feat. Latto) (Clean Ver.)",
    trackDuration: "03:03",
  },
  {
    id: "01qFKNWq73UfEslI0GvumE",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow)",
    trackDuration: "03:21",
  },
  {
    id: "6Xa9B3iE7bo3GkyUOVAhB9",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow) (Instrumental)",
    trackDuration: "03:19",
  },
  {
    id: "5BKiMkWucQVb7wrFi29VtX",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (Alternate Ver.)",
    trackDuration: "02:42",
  },
  {
    id: "7fQKDpB4i0hiQacjVCXVU2",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow) (A. G. Cook Remix)",
    trackDuration: "03:08",
  },
  {
    id: "0TaaG2kxjzSjVbmmiiSZEa",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow) (Clean Ver.)",
    trackDuration: "03:22",
  },
  {
    id: "1ewYtP6BZlak8qokzZe4Bx",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow) (Sped Up)",
    trackDuration: "02:48",
  },
  {
    id: "0dzT72K2RElXDMuMOyuKOI",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow) (Slowed Down)",
    trackDuration: "03:56",
  },
  {
    id: "2nRMW95dnOILirpjbksLTs",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "Never Let Go",
    releaseDate: "2024-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273083f5a45d93b57cb65a97b83",
    trackName: "Never Let Go",
    trackDuration: "02:46",
  },
  {
    id: "0VPFT123HKoQ2J6ipeDcI1",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "Standing Next to You (USHER Remix)",
    releaseDate: "2023-12-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c9912de0a8a9a44b450318e4",
    trackName: "Standing Next to You (USHER Remix)",
    trackDuration: "03:34",
  },
  {
    id: "2mHw0KoEyDw8Yaw3yPoke6",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D (Justin Timberlake Remix)",
    releaseDate: "2023-11-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27322e565596578ef0adbf5eaf1",
    trackName: "3D (Justin Timberlake Remix)",
    trackDuration: "02:40",
  },
  {
    id: "42e6dogVzAPSudzaBqRUIV",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "HANDS UP - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:01",
  },
  {
    id: "4DOvi3I7GtgVErqXnjAs3o",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName: "SOBER - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:19",
  },
  {
    id: "3RVgqjACPWt7LC7TgcCD7w",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "WE LIKE 2 PARTY - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:42",
  },
  {
    id: "5Ym7yyiFy5Z2GW8zYH45ms",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "FXXK IT - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "02:36",
  },
  {
    id: "7kBSj85ufJ1VpvSqLAr75X",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName: "LOSER - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:03",
  },
  {
    id: "6HldMPK1mbjgI0Y5t370j9",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "BAD BOY - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:14",
  },
  {
    id: "3emIcxw9NWVwKEdaXvXxF7",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "WAKE ME UP - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:23",
  },
  {
    id: "3pP5rsaeJMIovsClmJmh3i",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "DARLING - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:10",
  },
  {
    id: "2GrmNtTCulwxR9lk8NQBAD",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "SUPER STAR - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:04",
  },
  {
    id: "2C0LOJPcnVcSKCX3N0DqEn",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "Untitled, 2014 - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:44",
  },
  {
    id: "6Q00t2IdzTzcWgaevt2AQ7",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName: "D-Day - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:57",
  },
  {
    id: "5nCje7k5ZjgJ2XISx7cUZd",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "A・ZE・CHO ! - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:56",
  },
  {
    id: "7uJ9p6GuOS5F5GnY94Kq5v",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "COME TO MY - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "02:17",
  },
  {
    id: "2Gu2yJtqxaJsq0fEozyChQ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName: "I KNOW - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "02:36",
  },
  {
    id: "2QtzsCMEuxZ5TAfOGVJpLY",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "Look at me, Gwisun - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:47",
  },
  {
    id: "5wmUNZ7P5GUjZ0JBWKBDZs",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "GOOD BOY - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:08",
  },
  {
    id: "7ijpfBQv7sW0EHwbzRgI1a",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName: "IF YOU - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:28",
  },
  {
    id: "5LkYB8BCNIDf6ZWwrRNacI",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "HaruHaru - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:44",
  },
  {
    id: "31jPf3RQi35D9NaOIgwX4P",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "FANTASTIC BABY - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:11",
  },
  {
    id: "55iMEsMm9td9daH0mHPoBG",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "BANG BANG BANG - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:46",
  },
  {
    id: "45mMN0OSFF5Nv7hBmeOUQx",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "HEAVEN - Live",
    trackDuration: "04:26",
  },
  {
    id: "1zq8heBhjwmCnqx4RSZhb7",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "WE LIKE 2 PARTY - Live",
    trackDuration: "03:36",
  },
  {
    id: "0tYT6RdFKcSgBiaMfs3mdR",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "HANDS UP - Live",
    trackDuration: "03:55",
  },
  {
    id: "6w17ZLpTonbMfRRDdrofVj",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "BAD BOY - Live",
    trackDuration: "04:13",
  },
  {
    id: "1QdpaBkjNApYmwYlDuWHik",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "LOSER - Live",
    trackDuration: "03:59",
  },
  {
    id: "6iCrpFpnNJO7FY8Iu7z7Hf",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "FXXK IT - Live",
    trackDuration: "07:33",
  },
  {
    id: "4uov3g2rlZdNY9GORNsh4b",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "LET’S TALK ABOUT LOVE - Live",
    trackDuration: "01:27",
  },
  {
    id: "4pJRJMMTymF7IeRYHrHThC",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "STRONG BABY - Live",
    trackDuration: "02:21",
  },
  {
    id: "225g4x1sW9Zm3lULmJrVKa",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "WINGS - Live",
    trackDuration: "02:46",
  },
  {
    id: "4SHIhIglN6lQzBWzjfPRE8",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "LOOK AT ME GWISOON - Live",
    trackDuration: "04:20",
  },
  {
    id: "6kv5MN91E2yByJ1XWD76vQ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "HEARTBREAKER - Live",
    trackDuration: "02:28",
  },
  {
    id: "5OmzFuUbe7djQLT2uG6I3r",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "CRAYON - Live",
    trackDuration: "03:20",
  },
  {
    id: "1YD8M14uJW3DXrCs4FeO8o",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "HIGH HIGH - Live",
    trackDuration: "03:15",
  },
  {
    id: "4Kz8OC4sm2uCaCrEp9mLZ1",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "GOOD BOY - Live",
    trackDuration: "04:10",
  },
  {
    id: "0fIiCm9Pf19dcIrmZ7stf8",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "PRETENDED - Live",
    trackDuration: "02:44",
  },
  {
    id: "10CDw5PAK3WmqkNQYJ1kuN",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "DOOM DADA - Live",
    trackDuration: "05:24",
  },
  {
    id: "6nrgWCby7MpEpbcRJxRRZ9",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "EYES, NOSE, LIPS - Live",
    trackDuration: "04:45",
  },
  {
    id: "00zcv0aqdWQep2DrVWNPjO",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "ONLY LOOK AT ME - Live",
    trackDuration: "02:38",
  },
  {
    id: "7zqLN6qt1ZNlEFLgB3LBWx",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "RINGA LINGA - Live",
    trackDuration: "03:46",
  },
  {
    id: "00hHDWHG3MiE2OOUmve79F",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "IF YOU - Live",
    trackDuration: "04:50",
  },
  {
    id: "33e3jzlgpXBQgTQ6radEv8",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "HEAVEN - Live",
    trackDuration: "04:23",
  },
  {
    id: "4h0kPyfScsOoKlNRJ1l5Ty",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "WE LIKE 2 PARTY - Live",
    trackDuration: "03:35",
  },
  {
    id: "0wjAWaUxM3moRA6jvtsxPJ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "HANDS UP - Live",
    trackDuration: "04:00",
  },
  {
    id: "27PYGYRXxejUF4cYulQmtS",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "BAD BOY - Live",
    trackDuration: "04:08",
  },
  {
    id: "3r6dAVVWsmqCDFvgSBiHEz",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "LOSER - Live",
    trackDuration: "03:41",
  },
  {
    id: "0qdJctmCqOqUL3kanmkmRi",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "FEELING - Live",
    trackDuration: "03:41",
  },
  {
    id: "3NggKc4eylweTkujZEgHJ8",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "LET'S TALK ABOUT LOVE - Live",
    trackDuration: "01:23",
  },
  {
    id: "69uYZk1xUWUGAGaTG3dfNm",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "STRONG BABY - Live",
    trackDuration: "02:25",
  },
  {
    id: "3LhyrhaUISsp2adwBdRLVX",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "WINGS - Live",
    trackDuration: "02:45",
  },
  {
    id: "70ZcnxosNyBkxqNnaVdVcB",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "LOOK AT ME GWISOON - Live",
    trackDuration: "04:21",
  },
  {
    id: "6asqAqKRwHKQh2ANgDiJXe",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "CROOKED - Live",
    trackDuration: "07:07",
  },
  {
    id: "3PRaRBkHgzmxer5HIh0vGF",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "HEARTBREAKER - Live",
    trackDuration: "02:28",
  },
  {
    id: "6BTfPlTa9AvOM3H3szjaRL",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "CRAYON - Live",
    trackDuration: "03:25",
  },
  {
    id: "0dflZ9lezOwO0AZVgYQSQL",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "HIGH HIGH - Live",
    trackDuration: "03:23",
  },
  {
    id: "18oGfIsfOaNHMrq8dyyk3e",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "GOOD BOY - Live",
    trackDuration: "04:11",
  },
  {
    id: "31eR03TwO2IRMYsCgKy6C3",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "PRETENDED - Live",
    trackDuration: "02:46",
  },
  {
    id: "1euM6MeQnbHHz1IgMyixo5",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "DOOM DADA - Live",
    trackDuration: "04:07",
  },
  {
    id: "7w45jf4z9fNIJYE59BtjiC",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "EYES, NOSE, LIPS - Live",
    trackDuration: "04:52",
  },
  {
    id: "5npsyXX3PBPXv48zF8o6bh",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "ONLY LOOK AT ME - Live",
    trackDuration: "02:36",
  },
  {
    id: "0Vhmd3nrLXS9cVMiFaXg1T",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "RINGA LINGA - Live",
    trackDuration: "02:38",
  },
  {
    id: "3lYvepDz6yYj29z7e4r5z0",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "FXXK IT",
    trackDuration: "03:51",
  },
  {
    id: "7ijWcf4FsoxoyPK4B9WGp6",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "LAST DANCE",
    trackDuration: "04:39",
  },
  {
    id: "0FRVxxD5ZaLVnlwI9nxkqP",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "GIRLFRIEND",
    trackDuration: "03:48",
  },
  {
    id: "6UgkB0xM45TR3Zjqm3GQ6T",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "LET'S NOT FALL IN LOVE",
    trackDuration: "03:31",
  },
  {
    id: "2vzn8usBcuNL93DnTjEK0z",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "LOSER",
    trackDuration: "03:39",
  },
  {
    id: "3miMeSGd7rzJEtuhQnzm0f",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "BAE BAE",
    trackDuration: "02:49",
  },
  {
    id: "3dI59jLoFMjMAyUAyRZnkE",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "BANG BANG BANG",
    trackDuration: "03:40",
  },
  {
    id: "3gUSmSBeeYsSMWECJcQW8w",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "SOBER",
    trackDuration: "03:57",
  },
  {
    id: "4kaY4LbdbomICC25gYGGtn",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "IF YOU",
    trackDuration: "04:24",
  },
  {
    id: "6ePbs5ln6NGmMMuA6DrSaQ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "ZUTTER (GD&T.O.P)",
    trackDuration: "03:14",
  },
  {
    id: "07gp2fnoTbVCsRJYazycI4",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "WE LIKE 2 PARTY",
    trackDuration: "03:15",
  },
  {
    id: "3kseM0JJ9CgrCKAv1uoQmu",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Bang Bang Bang - Live",
    trackDuration: "04:49",
  },
  {
    id: "36uTWoCYuYtO1Qp9u7a7hF",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Tonight - Live",
    trackDuration: "03:57",
  },
  {
    id: "7LfrP6RxGo9dMZYKVwewgC",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Stupid Liar - Live",
    trackDuration: "04:36",
  },
  {
    id: "7ADw9GQ6A97ytTLwUAciFa",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Haru Haru - Live",
    trackDuration: "05:09",
  },
  {
    id: "5RcJp2r9ZHREM56nV2lTp5",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Loser - Live",
    trackDuration: "03:59",
  },
  {
    id: "3yfcH0kOXWgc95wdL62tPw",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Blue - Live",
    trackDuration: "04:24",
  },
  {
    id: "0PRny2NKo7iBdU47zTOoSJ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Bad Boy - Live",
    trackDuration: "04:32",
  },
  {
    id: "0iAgdDYh8Y9CETXoz1psiV",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "If You - Live",
    trackDuration: "05:10",
  },
  {
    id: "5Cnt2UgBxTIO65mlD5ELeQ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Strong Baby - Live",
    trackDuration: "04:12",
  },
  {
    id: "2mYTfHz0wolZrAlF2bEX6M",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Wings - Live",
    trackDuration: "05:21",
  },
  {
    id: "0753tiqVdX34CvtoMgVYZF",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Doom Dada - Live",
    trackDuration: "04:01",
  },
  {
    id: "21po0SccfQs9FBEojjhmNN",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Eyes, Nose, Lips - Live",
    trackDuration: "05:19",
  },
  {
    id: "7efFRFZXZEwXCYrvFvNnOy",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Zutter - Live",
    trackDuration: "03:26",
  },
  {
    id: "3SgqaUT4PjwO84nO6OIhyI",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Good Boy - Live",
    trackDuration: "04:07",
  },
  {
    id: "6rxMYaoZlTWqWRyCDMHo0s",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Crooked - Live",
    trackDuration: "04:25",
  },
  {
    id: "5gNATY0PKGl0iCJ1cj7RCY",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Sober - Live",
    trackDuration: "05:38",
  },
  {
    id: "4Oq7zp72QZLwNbLlwvcSAz",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Bae Bae - Live",
    trackDuration: "03:56",
  },
  {
    id: "7wkdrGxG3jWLCpMhifoAGD",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Fantastic Baby - Live",
    trackDuration: "04:26",
  },
  {
    id: "3vG5OctNjOeRjZwxzAXTNv",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "We Like 2 Party (Encore) - Live",
    trackDuration: "03:17",
  },
  {
    id: "18I6Sg8Avsf5LIAzyYiNYH",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Lies (Encore) - Live",
    trackDuration: "03:39",
  },
  {
    id: "2RENZFrMGuOtr162uKsjOn",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Intro : JANE with FKJ",
    trackDuration: "01:38",
  },
  {
    id: "0DC62SYIRKMFgx2f7OyvwD",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "like JENNIE",
    trackDuration: "02:03",
  },
  {
    id: "4YoN6sOtjWgbtB2jKgLPHL",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "start a war",
    trackDuration: "02:45",
  },
  {
    id: "2eOXb8aSpBUQLSk1sTBPEK",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Handlebars (feat. Dua Lipa)",
    trackDuration: "03:04",
  },
  {
    id: "0wQASbxN6UbZXZhKXvuczj",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "with the IE (way up)",
    trackDuration: "02:43",
  },
  {
    id: "3fN2swfuBHUljCyPlA8wBN",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "ExtraL (feat. Doechii)",
    trackDuration: "02:47",
  },
  {
    id: "0oYhOxvxd95jtTWXHkYsPh",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Mantra",
    trackDuration: "02:16",
  },
  {
    id: "2DW9UqvL7vcG3qCGFUmvXp",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Love Hangover (feat. Dominic Fike)",
    trackDuration: "03:00",
  },
  {
    id: "76tWxLk4KWOw1Qd8dC5SdI",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "ZEN",
    trackDuration: "03:21",
  },
  {
    id: "3KldgsZmR6nCItrTrP8zbl",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Damn Right (feat. Childish Gambino & Kali Uchis)",
    trackDuration: "03:50",
  },
  {
    id: "6wbLxHGBCpTWIpLZ5L0Zuv",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "F.T.S.",
    trackDuration: "02:32",
  },
  {
    id: "4p3oOaC3Fo38tEXp3SR5DN",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Filter",
    trackDuration: "02:31",
  },
  {
    id: "3IPh4v7HFJ8Egba3lYNDrQ",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Seoul City",
    trackDuration: "02:44",
  },
  {
    id: "0rNCeIkEvz61X0oP48z6cC",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Starlight",
    trackDuration: "02:48",
  },
  {
    id: "5rP5Mwcx5IYavwVTCmdVIK",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "twin",
    trackDuration: "03:28",
  },
  {
    id: "2cR7c0dxkHnPcnWMLUlRVo",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Intro : JANE with FKJ",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27397b8e6f0dd873b5e34a394ee",
    trackName: "Intro : JANE with FKJ",
    trackDuration: "01:38",
  },
  {
    id: "4kh7FBVzeyRC0rMWRFDmMC",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Handlebars (feat. Dua Lipa)",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2739fb875cc9e6e4151461c2cf3",
    trackName: "Handlebars (feat. Dua Lipa)",
    trackDuration: "03:04",
  },
  {
    id: "4cfiNs7Yvr9UTLvbYWal1o",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Damn Right (feat. Childish Gambino & Kali Uchis)",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273270745e1253630a60c9b8d52",
    trackName: "Damn Right (feat. Childish Gambino & Kali Uchis)",
    trackDuration: "03:50",
  },
  {
    id: "4g0F7gpT3iVHqKjXF87eX1",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "ExtraL",
    releaseDate: "2025-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738f2b7786ef16c658cccfaecd",
    trackName: "ExtraL (feat. Doechii)",
    trackDuration: "02:47",
  },
  {
    id: "6JVXVLqCPaodBSEwRFUN8w",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Ditto (250 Remix)",
    trackDuration: "03:21",
  },
  {
    id: "4yjDMKCAeLovlo9ih0AgXW",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "OMG (FRNK Remix)",
    trackDuration: "03:30",
  },
  {
    id: "2nW48vXnZZ5EYka46v7GOk",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Attention (250 Remix)",
    trackDuration: "03:01",
  },
  {
    id: "6CUKsv928uT4561qJovhhG",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Hype Boy (250 Remix)",
    trackDuration: "04:11",
  },
  {
    id: "5bwpbZBOY0mrmRhZ94c0kW",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Cookie (FRNK Remix)",
    trackDuration: "03:32",
  },
  {
    id: "2gWWYL6iXZKkOqCE3TQHBM",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Hurt (250 Remix)",
    trackDuration: "03:44",
  },
  {
    id: "3dCCHYqCAMdm1GCuklUaZG",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Ditto (250 Remix) (Instrumental)",
    trackDuration: "03:21",
  },
  {
    id: "2oLVT9Lo0SavCNpGw4WfPp",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "OMG (FRNK Remix) (Instrumental)",
    trackDuration: "03:30",
  },
  {
    id: "4MhgDz4lSj2HtlUcpe3yrd",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Attention (250 Remix) (Instrumental)",
    trackDuration: "03:01",
  },
  {
    id: "6tU4EeTSSawN9sbfAjWPX4",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Hype Boy (250 Remix) (Instrumental)",
    trackDuration: "04:11",
  },
  {
    id: "2akxtSALPUX8orriSWyDi4",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Cookie (FRNK Remix) (Instrumental)",
    trackDuration: "03:32",
  },
  {
    id: "1q9V1vsIEehAm2hDT6l53g",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Hurt (250 Remix) (Instrumental)",
    trackDuration: "03:36",
  },
  {
    id: "5ocSQW5sIUIOFojwXEz9Ki",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "Supernatural",
    releaseDate: "2024-06-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737e1eeb0d7cc374a168369c80",
    trackName: "Supernatural",
    trackDuration: "03:11",
  },
  {
    id: "58Q3FZFs1YXPpliWQB5kXB",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "Supernatural",
    releaseDate: "2024-06-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737e1eeb0d7cc374a168369c80",
    trackName: "Right Now",
    trackDuration: "02:40",
  },
  {
    id: "4823f9W4xmR3n1BebPyNaR",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "Supernatural",
    releaseDate: "2024-06-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737e1eeb0d7cc374a168369c80",
    trackName: "Supernatural (Instrumental)",
    trackDuration: "03:11",
  },
  {
    id: "6jgUrLEivd4DaiYb1izJLF",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "Supernatural",
    releaseDate: "2024-06-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737e1eeb0d7cc374a168369c80",
    trackName: "Right Now (Instrumental)",
    trackDuration: "02:40",
  },
  {
    id: "38tXZcL1gZRfbqfOG0VMTH",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "How Sweet",
    releaseDate: "2024-05-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b657fbb27b17e7bd4691c2b2",
    trackName: "How Sweet",
    trackDuration: "03:39",
  },
  {
    id: "19D8LNpWwIPpi6hs9BG7dq",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "How Sweet",
    releaseDate: "2024-05-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b657fbb27b17e7bd4691c2b2",
    trackName: "Bubble Gum",
    trackDuration: "03:20",
  },
  {
    id: "54tBIDmNdxGp04gPNWCCbi",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "How Sweet",
    releaseDate: "2024-05-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b657fbb27b17e7bd4691c2b2",
    trackName: "How Sweet (Instrumental)",
    trackDuration: "03:39",
  },
  {
    id: "54uNtM77iZ5gawWBQGnEar",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "How Sweet",
    releaseDate: "2024-05-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b657fbb27b17e7bd4691c2b2",
    trackName: "Bubble Gum (Instrumental)",
    trackDuration: "03:20",
  },
  {
    id: "11YovYUVkZdLyOFncbecWL",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NewJeans X MY DEMON",
    releaseDate: "2023-11-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2732509e504c96367276ca6d1dd",
    trackName: "Our Night is more beautiful than your Day",
    trackDuration: "03:12",
  },
  {
    id: "6sJ6EoG4vyUC1tW718ww7f",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NewJeans X MY DEMON",
    releaseDate: "2023-11-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2732509e504c96367276ca6d1dd",
    trackName: "Our Night is more beautiful than your Day (Inst.)",
    trackDuration: "03:12",
  },
  {
    id: "210JJAa9nJOgNa0YNrsT5g",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "GODS",
    releaseDate: "2023-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e4179b3fb74beaf0cdfa7a13",
    trackName: "GODS",
    trackDuration: "03:40",
  },
  {
    id: "2VdSktBqFfkW7y6q5Ik4Z4",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Supernova",
    trackDuration: "02:58",
  },
  {
    id: "5eWcGfUCrVFMoYskyfkEPE",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Armageddon",
    trackDuration: "03:16",
  },
  {
    id: "27LqJ29VMqwKQQC2CE9FHr",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Set The Tone",
    trackDuration: "03:22",
  },
  {
    id: "4AZ4Y1QAOLBwnWaX9cguoF",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Mine",
    trackDuration: "03:13",
  },
  {
    id: "4iSiRU5nGU7EP5TbkEEcsj",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Licorice",
    trackDuration: "02:38",
  },
  {
    id: "67yDGKXKIkyBhwbey8AmEU",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "BAHAMA",
    trackDuration: "03:10",
  },
  {
    id: "0u24lLekIGJ0CifIrHdD8N",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Long Chat (#♥)",
    trackDuration: "03:15",
  },
  {
    id: "4oBpXs4KppprE6ql0Dmr2O",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Prologue",
    trackDuration: "03:14",
  },
  {
    id: "1x1oCGsFUDViOvcISuoKW0",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Live My Life",
    trackDuration: "02:39",
  },
  {
    id: "4T5AbXz68PpZyKewHO5Tqw",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Melody",
    trackDuration: "03:07",
  },
  {
    id: "5XWlyfo0kZ8LF7VSyfS4Ew",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "Drama",
    trackDuration: "03:34",
  },
  {
    id: "3EI3OLBeM89B0o0UsIGCOx",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "Trick or Trick",
    trackDuration: "02:55",
  },
  {
    id: "2uJEnyojuGg31VVlLTQFpp",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "Don't Blink",
    trackDuration: "02:49",
  },
  {
    id: "1mdtLny0zugh89vokWGG80",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "Hot Air Balloon",
    trackDuration: "03:18",
  },
  {
    id: "3OQWohbPUsvbXaH1AiRazX",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "YOLO",
    trackDuration: "03:09",
  },
  {
    id: "52qof5uEYA0TV0EpR7jNxs",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "You",
    trackDuration: "03:23",
  },
  {
    id: "330IIz7d75eqAsKq1xhzXR",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "Better Things",
    trackDuration: "03:23",
  },
  {
    id: "07fqC2Puj13frv9iYtlcri",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Girls",
    trackDuration: "04:00",
  },
  {
    id: "2cGf0hmhkACTwRj58XNGlP",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "도깨비불 (Illusion)",
    trackDuration: "03:15",
  },
  {
    id: "3QXov5M0VLI3ROldfiSwj0",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Lingo",
    trackDuration: "02:36",
  },
  {
    id: "0WiadRUdgEIjgmYFAmTttb",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Life's Too Short",
    trackDuration: "02:58",
  },
  {
    id: "4jzrYUhlzXROpV5M944Yvu",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "ICU (쉬어가도 돼)",
    trackDuration: "03:41",
  },
  {
    id: "1AqyAbANWcx0B4f0WpYeM2",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Life's Too Short (English Version)",
    trackDuration: "02:58",
  },
  {
    id: "7v1X2PGU3uZXu7tzFTTsSh",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Black Mamba",
    trackDuration: "02:54",
  },
  {
    id: "4UVgc46bNblcuD6nj0RsXF",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Forever (약속)",
    trackDuration: "04:58",
  },
  {
    id: "7aLwuGyYNWKnxOSWXQK88V",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Dreams Come True",
    trackDuration: "03:24",
  },
  {
    id: "6uPnrBgweGOcwjFL4ItAvV",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Whiplash",
    trackDuration: "03:03",
  },
  {
    id: "7dYEUpcXJLDcI22m0dgmnH",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Kill It",
    trackDuration: "03:19",
  },
  {
    id: "1aRyIsgzfUdSGAGz8zgFR2",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Flights, Not Feelings",
    trackDuration: "03:01",
  },
  {
    id: "2Kf6WQmc6TU4bYIu3Szsz2",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Pink Hoodie",
    trackDuration: "02:26",
  },
  {
    id: "4u9cOL7R5OjAmlWkeEFXzf",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Flowers",
    trackDuration: "03:10",
  },
  {
    id: "3Oi1pDSYLVkz3i8jOXaQdt",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Just Another Girl",
    trackDuration: "03:04",
  },
  {
    id: "5sjnkOfTLCLNfkkchI2re2",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "SYNK : PARALLEL LINE - Special Digital Single",
    releaseDate: "2024-10-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273253096eda3b7826c11c7fab8",
    trackName: "UP - KARINA Solo",
    trackDuration: "02:46",
  },
  {
    id: "6pIuPm3u7QgUFAX1V0D9wY",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "SYNK : PARALLEL LINE - Special Digital Single",
    releaseDate: "2024-10-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273253096eda3b7826c11c7fab8",
    trackName: "Dopamine - GISELLE Solo",
    trackDuration: "03:14",
  },
  {
    id: "44qlcokPO2RjD8791ohJFR",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "SYNK : PARALLEL LINE - Special Digital Single",
    releaseDate: "2024-10-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273253096eda3b7826c11c7fab8",
    trackName: "Bored! - NINGNING Solo",
    trackDuration: "02:51",
  },
  {
    id: "2xoA126GEgFhrYzRaTH7E4",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "SYNK : PARALLEL LINE - Special Digital Single",
    releaseDate: "2024-10-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273253096eda3b7826c11c7fab8",
    trackName: "Spark - WINTER Solo",
    trackDuration: "03:21",
  },
  {
    id: "45DB3yqxYGAnKN3YmLWbAX",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Running Wild",
    trackDuration: "02:31",
  },
  {
    id: "2SR0alFA2oWYXSoePGTj0V",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "I’ll Be There",
    trackDuration: "03:01",
  },
  {
    id: "6L4VgCOiyt8MzYfH4llkQg",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Another Level",
    trackDuration: "02:42",
  },
  {
    id: "5jxuw4S5IDEY6CjjAHvRAt",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Falling",
    trackDuration: "02:58",
  },
  {
    id: "0gzXQHsv4zYHQ1pvlyYZZa",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Heart on the Window (with WENDY)",
    trackDuration: "02:57",
  },
  {
    id: "79ldP0lRJABss2gUdH346e",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "I will come to you",
    trackDuration: "02:36",
  },
  {
    id: "2ub590isVV1Xy5u8JgBFuV",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Running Wild (Ballad Remix)",
    trackDuration: "02:23",
  },
  {
    id: "6X6b1RQFCkzhUCpHQlbOiW",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Running Wild (Holiday Remix)",
    trackDuration: "02:33",
  },
  {
    id: "3WcWE3cvBJpRoJSbrxrVkY",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Running Wild (Afropop Remix)",
    trackDuration: "02:29",
  },
  {
    id: "5xwyQy35cGlBuheV8fvutf",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Running Wild (UK Garage Remix)",
    trackDuration: "02:42",
  },
  {
    id: "50zAEIE4B1QqhPjRMK2Xmh",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Running Wild",
    trackDuration: "02:31",
  },
  {
    id: "5zOv7QzCMrSkPJKQr1Tcif",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "I’ll Be There",
    trackDuration: "03:01",
  },
  {
    id: "1YmY0HUm05BUpcHibc1bhB",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Another Level",
    trackDuration: "02:42",
  },
  {
    id: "5oSUmLelhXItguqPQ0Qn2b",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Falling",
    trackDuration: "02:58",
  },
  {
    id: "4qUmNOnS81p8wrMdBHRbS3",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Heart on the Window (with WENDY)",
    trackDuration: "02:57",
  },
  {
    id: "5s7flUAYsDmcUWtHsMCihv",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "I will come to you",
    trackDuration: "02:36",
  },
  {
    id: "6mbbLSTKMMG50xML4OzlVS",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Running Wild (Extended Ver.)",
    trackDuration: "03:34",
  },
  {
    id: "2L56YCM5eA8xWsUcGgo4zV",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Running Wild (Band Ver.)",
    trackDuration: "02:43",
  },
  {
    id: "4z0vfU3JiAsl99ZHL29hMm",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "When the Stars Gossip OST Part.3",
    releaseDate: "2025-01-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b850cdaf11ac8dd77591d423",
    trackName: "Close to You",
    trackDuration: "03:48",
  },
  {
    id: "6J48hy1freVjme4h7DFaDt",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "When the Stars Gossip OST Part.3",
    releaseDate: "2025-01-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b850cdaf11ac8dd77591d423",
    trackName: "Close to You (Inst.)",
    trackDuration: "03:48",
  },
  {
    id: "7HaUkQ34NYlOXFFspHeoG6",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Falling (feat. Taka)",
    releaseDate: "2024-11-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d3830c84379ff6c02c4a50ba",
    trackName: "Falling (feat. Taka)",
    trackDuration: "02:58",
  },
  {
    id: "1EEvAuVSb57ryIlNKuMWyr",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild",
    trackDuration: "02:31",
  },
  {
    id: "3WBkiZRpmyDBXIHi0o4xjK",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Instrumental)",
    trackDuration: "02:31",
  },
  {
    id: "6dCqghpYHuD1LqBloAzgDv",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Extended Ver.)",
    trackDuration: "03:34",
  },
  {
    id: "6mJRx8ghgw9QwJk0v5DfVj",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Band Ver.)",
    trackDuration: "02:43",
  },
  {
    id: "1XZeIqnzH8LKB1SmUL7tpy",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Ballad Remix)",
    trackDuration: "02:23",
  },
  {
    id: "1faf3hb79uGzk5a7O5H144",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Holiday Remix)",
    trackDuration: "02:33",
  },
  {
    id: "7uHAhFnUOfJXlDzfyvRJQD",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Afropop Remix)",
    trackDuration: "02:29",
  },
  {
    id: "0K0lpwTATjvexmWWVURaZP",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (UK Garage Remix)",
    trackDuration: "02:42",
  },
  {
    id: "0OaHZgVm77zLQNR3kwFf6n",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "Dangerous",
    trackDuration: "02:23",
  },
  {
    id: "1t4a4bAObtfBiiNo0a0vle",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "Gonna Be A Rock",
    trackDuration: "03:17",
  },
  {
    id: "52NdZoytptz6k8oMtDWtzX",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "SKIT",
    trackDuration: "01:06",
  },
  {
    id: "6pqyZNnLKyJKtrlf42FQoq",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "Nice Guy",
    trackDuration: "02:44",
  },
  {
    id: "0Pd79ZmfbrE6690cuN9fHC",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "20",
    trackDuration: "02:48",
  },
  {
    id: "1Oa2zQLfI44pN76mZgAoqT",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "Call Me",
    trackDuration: "02:58",
  },
  {
    id: "7n3rgZ7GWmoVwhDrrF41Rn",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "Nice Guy (English Ver.)",
    trackDuration: "02:44",
  },
  {
    id: "54wqX30KnwGZdLmi8r0Wgo",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "OUR",
    trackDuration: "02:36",
  },
  {
    id: "1w1kvWFdm3u0GgkG9VSFGH",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "Amnesia",
    trackDuration: "02:50",
  },
  {
    id: "7x9s9KVpMOrQ2z2fzOGo8z",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "So let's go see the stars",
    trackDuration: "03:22",
  },
  {
    id: "0Tq7v8YAmwdnAYBwyR1pZ4",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "Earth, Wind & Fire",
    trackDuration: "02:59",
  },
  {
    id: "7rXUWfUAaOmPNHS7cwfTL2",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "l i f e i s c o o l",
    trackDuration: "03:18",
  },
  {
    id: "4gHBVNtx6Kh5F97GoIg0fq",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "Dear. My Darling",
    trackDuration: "01:40",
  },
  {
    id: "7sEkQPK4bxBum9CoAp5Onl",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "Earth, Wind & Fire (English Ver.)",
    trackDuration: "02:59",
  },
  {
    id: "1cgtNgk0bkBjKaHmhes7f0",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName:
      "Never Loved This Way Before (Odd Girl Out X BOYNEXTDOOR) [Original Soundtrack]",
    releaseDate: "2025-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d853fd935616b3f2d674caa5",
    trackName: "Never Loved This Way Before",
    trackDuration: "04:25",
  },
  {
    id: "47vaCu7VXBxOZrtt7MVlH3",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName:
      "Never Loved This Way Before (Odd Girl Out X BOYNEXTDOOR) [Original Soundtrack]",
    releaseDate: "2025-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d853fd935616b3f2d674caa5",
    trackName: "Never Loved This Way Before - Inst.",
    trackDuration: "04:25",
  },
  {
    id: "7DPrrI5VUfCI0TslImBQDc",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "It's Beginning To Look A Lot Like Christmas",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733f3bc66394a60aa9d95b3f62",
    trackName: "It's Beginning To Look A Lot Like Christmas",
    trackDuration: "02:13",
  },
  {
    id: "61MgNE2WKJh27wRgw1zuFI",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "IF I SAY, I LOVE YOU (Japanese Version)",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27344744239930f871bf30c1eba",
    trackName: "IF I SAY, I LOVE YOU - Japanese Version",
    trackDuration: "02:41",
  },
  {
    id: "12YODvwEH9NPutL8OhObfD",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Rebirth (Intro)",
    trackDuration: "02:24",
  },
  {
    id: "3vKBoDN6DGrxMRDBOe5bQa",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Interlude : Showtime",
    trackDuration: "01:18",
  },
  {
    id: "0KsBlpW6csX9YBVckbTDZh",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Smeraldo Garden Marching Band (feat. Loco)",
    trackDuration: "03:02",
  },
  {
    id: "5XvFNFNsgvmwsWk1T7BfRj",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Slow Dance (feat. Sofia Carson)",
    trackDuration: "03:08",
  },
  {
    id: "59ldd5koyBqo1vFp6MusW1",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Be Mine",
    trackDuration: "03:27",
  },
  {
    id: "5wPnPIZS8wr4lPNLz4qvHK",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Who",
    trackDuration: "02:50",
  },
  {
    id: "2Zyto2vRT9MEj44Y4qbzcs",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Closer Than This",
    trackDuration: "03:43",
  },
  {
    id: "1Px44tw80Q4rcCl8FxDGOi",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Who (Instrumental)",
    trackDuration: "02:50",
  },
  {
    id: "10I5rhhFoWZDIN3kEc6Dbo",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Who (Acoustic Remix)",
    trackDuration: "03:04",
  },
  {
    id: "1MC8JLPV4fbvVBqvGSLoDf",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WONDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f150d9f2e5e8148e5032fd7d",
    trackName: "Who (Rock Remix)",
    trackDuration: "02:51",
  },
  {
    id: "1ZtkxrnxZB6r8nIiHwqaUn",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Rebirth (Intro)",
    trackDuration: "02:24",
  },
  {
    id: "12HctF6VyD118g7eXtWLBo",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Interlude : Showtime",
    trackDuration: "01:18",
  },
  {
    id: "7yODD9DKQIllpZ5eioLZRY",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Smeraldo Garden Marching Band (feat. Loco)",
    trackDuration: "03:02",
  },
  {
    id: "5nyhz1bxLCiBBIAIcBgiEP",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Slow Dance (feat. Sofia Carson)",
    trackDuration: "03:08",
  },
  {
    id: "3VaKWbW68AyOkEl4AxhXA2",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Be Mine",
    trackDuration: "03:27",
  },
  {
    id: "32lSgbCqRcIOyUSnfuUZEQ",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Who",
    trackDuration: "02:50",
  },
  {
    id: "6OIVG9TFJnqOec4G5rD8pW",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Closer Than This",
    trackDuration: "03:43",
  },
  {
    id: "1ySWoGgrduSzvtJ3PUzO41",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Who (Shibuyakei Remix)",
    trackDuration: "02:46",
  },
  {
    id: "7KZNgri6Jxw88FAfATw6i9",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Who (Funky Remix)",
    trackDuration: "03:08",
  },
  {
    id: "2isRbZIIU4PqPrECffn7QO",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE (WANDER ver.)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27382601539d4a27061ad90eacb",
    trackName: "Who (Beautiful Mind Remix)",
    trackDuration: "02:57",
  },
  {
    id: "7gMfVc4zfNIxuMyMGglOHa",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Rebirth (Intro)",
    trackDuration: "02:24",
  },
  {
    id: "45zLrK0668WQ5JFMyiYmCS",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Interlude : Showtime",
    trackDuration: "01:18",
  },
  {
    id: "1agDCV4zQqaFwJQNsTgmL1",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Smeraldo Garden Marching Band (feat. Loco)",
    trackDuration: "03:02",
  },
  {
    id: "3d2bsbugow8JiNvuaRupFH",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Slow Dance (feat. Sofia Carson)",
    trackDuration: "03:08",
  },
  {
    id: "3LWVXp636uLT356Rj08Jaz",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Be Mine",
    trackDuration: "03:27",
  },
  {
    id: "7tI8dRuH2Yc6RuoTjxo4dU",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Who",
    trackDuration: "02:50",
  },
  {
    id: "6qafqn8bBMy7t5c5WqpyRk",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "MUSE",
    releaseDate: "2024-07-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f02c451189a709b9a952aaec",
    trackName: "Closer Than This",
    trackDuration: "03:43",
  },
  {
    id: "4DairgmwgyfmFHm0e7kRPL",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Be Mine (English Version)",
    releaseDate: "2024-08-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27319655636129722b4bd720dbc",
    trackName: "Be Mine (English Version)",
    trackDuration: "03:27",
  },
  {
    id: "1yqdD2ScjkqvaNBUzPQ4vR",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who",
    trackDuration: "02:50",
  },
  {
    id: "6t7t37Bex3DV4ADqAwUmwa",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Instrumental)",
    trackDuration: "02:50",
  },
  {
    id: "2YKecnWyzkGEDTyNaKBG2H",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Acoustic Remix)",
    trackDuration: "03:04",
  },
  {
    id: "2x9lpe6UIHNqLf8fB8qpb7",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Rock Remix)",
    trackDuration: "02:51",
  },
  {
    id: "1PNdJibg1adHD1pTpYBfGc",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Shibuyakei Remix)",
    trackDuration: "02:46",
  },
  {
    id: "6E9BsGMop0G1jrpQNzugXv",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Funky Remix)",
    trackDuration: "03:08",
  },
  {
    id: "1GDjQlek7EFZ3qTyySTSAF",
    artistName: "Jimin",
    genres: ["k-pop"],
    popularity: 84,
    followers: 9988618,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcb08296cca5a2d197caabb79",
    albumsName: "Who (Remixes)",
    releaseDate: "2024-07-23",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737f35adfbec3bb2bc8256802b",
    trackName: "Who (Beautiful Mind Remix)",
    trackDuration: "02:57",
  },
  {
    id: "6IST7HiO2OlytkRp866Xdd",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "HOME SWEET HOME (feat. TAEYANG & DAESUNG)",
    trackDuration: "03:31",
  },
  {
    id: "3hRg8A9PwC5YWrgLRJ4OFf",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "PO￦ER",
    trackDuration: "02:23",
  },
  {
    id: "0Kk5TRkYuWXY89KamtFEFw",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "TOO BAD (feat. Anderson .Paak)",
    trackDuration: "02:33",
  },
  {
    id: "5p888hnYmPMQTMcVZXF8Dd",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "DRAMA",
    trackDuration: "03:54",
  },
  {
    id: "1YfsKKIW19u5QMeWdiFvk1",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "IBELONGIIU",
    trackDuration: "03:13",
  },
  {
    id: "1rHhowJ15GjsTqCGoTXm5e",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "TAKE ME",
    trackDuration: "03:39",
  },
  {
    id: "4wq8RcVA4GdRx8w6GUrjio",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "보나마나 (BONAMANA)",
    trackDuration: "03:15",
  },
  {
    id: "5WNRDeYpON54LEZOoiI3Xf",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Übermensch",
    releaseDate: "2025-02-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c8549d4dad1c1e95f316736",
    trackName: "GYRO-DROP",
    trackDuration: "02:48",
  },
  {
    id: "1SYcF2fUYDYQsISyFehQYI",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "COUP D'ETAT",
    trackDuration: "02:58",
  },
  {
    id: "62qrReIGZC8zzdmw9DXEuS",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "NILIRIA - Missy Elliott Version",
    trackDuration: "02:52",
  },
  {
    id: "3iBJHz5krbr4zUM40zzwcJ",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "R.O.D.",
    trackDuration: "03:56",
  },
  {
    id: "44f1TNdoQUgf3PUYraCTsH",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "Black (Feat. JENNIE of BLACKPINK)",
    trackDuration: "03:23",
  },
  {
    id: "4uS12OS6QeNgiCHpaqwvlR",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "WHO YOU?",
    trackDuration: "03:21",
  },
  {
    id: "3jeGRLccqBJ0CxkUVZQKxE",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "SHAKE THE WORLD",
    trackDuration: "02:54",
  },
  {
    id: "3N9lH3C9oykSau0Q74bVsi",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "GO",
    trackDuration: "03:28",
  },
  {
    id: "3mb0tvqsU8IPaAYvyf55az",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "CROOKED",
    trackDuration: "03:44",
  },
  {
    id: "5CRuf5AnlXoapQfwi1sxbS",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "NILIRIA - G-Dragon Version",
    trackDuration: "02:52",
  },
  {
    id: "6wCNJoZaOLnFzXoNFlR65V",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "RUNAWAY",
    trackDuration: "03:21",
  },
  {
    id: "2tNdosMthOOTnH1KYdKl16",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "I LOVE IT",
    trackDuration: "03:14",
  },
  {
    id: "7nySA2CVivNXZvjwJLe9dG",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT (Korean Version)",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738993cee2c10adefcac0a3654",
    trackName: "YOU DO (Outro)",
    trackDuration: "02:37",
  },
  {
    id: "3q0evJwZohI2FfXkfC5tSR",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "COUP D'ETAT",
    trackDuration: "02:58",
  },
  {
    id: "1fZGJrxPq82zcHVoYMntZt",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "NILIRIA - Missy Elliott Version",
    trackDuration: "02:52",
  },
  {
    id: "1TmvMsKakEUCtLgkGYEZp4",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "R.O.D.",
    trackDuration: "03:56",
  },
  {
    id: "7BYGfn9F73atTWMdAHVdPk",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "BLACK",
    trackDuration: "03:23",
  },
  {
    id: "7iT56ss42YdtYnNQEnxp9Z",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "WHO YOU?",
    trackDuration: "03:21",
  },
  {
    id: "0yQVxHQ8MPI7jxkewravSD",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "SHAKE THE WORLD",
    trackDuration: "02:54",
  },
  {
    id: "7gPF3Mu0DVWj75SXdZaYCY",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "GO",
    trackDuration: "03:28",
  },
  {
    id: "4EwNWRBWdZ6bgvxRHlZ8OO",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "CROOKED",
    trackDuration: "03:44",
  },
  {
    id: "3lLFAlgTMNJdXEl9bhkowL",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "NILIRIA - G-Dragon Version",
    trackDuration: "02:52",
  },
  {
    id: "4yUZkcPv80Wi4TYgpJaZ9e",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "RUNAWAY",
    trackDuration: "03:21",
  },
  {
    id: "1K1DpAZoH5jbpvxcAY07Sy",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "I LOVE IT",
    trackDuration: "03:14",
  },
  {
    id: "2346AzTq5Qtru2VJv1Wreq",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "COUP D'ETAT",
    releaseDate: "2013-09-05",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733dbdbd0023f1e1c08cd5a6c9",
    trackName: "YOU DO (Outro)",
    trackDuration: "02:37",
  },
  {
    id: "5KIPe6uCM6rosCxeGcfPTA",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "GO - Live",
    trackDuration: "04:15",
  },
  {
    id: "2fbvGELVvBGeCt5PGEvxNf",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Heartbreaker - Live",
    trackDuration: "03:20",
  },
  {
    id: "52fUpY23U2AsSdVCOcfK5v",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "One of a Kind - Live",
    trackDuration: "03:28",
  },
  {
    id: "4CxEcSx0FIYmzwDGDbUHoO",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Butterfly - Live",
    trackDuration: "04:00",
  },
  {
    id: "6gSO9nwQqrgfMBXEmWCyQL",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Missing You - Live",
    trackDuration: "03:46",
  },
  {
    id: "62QLmXhOjh4iWC1CKy90xK",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "That XX - Live",
    trackDuration: "03:44",
  },
  {
    id: "6pxrme6UtEm7KaFI1RMdQl",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Without You - Live",
    trackDuration: "04:11",
  },
  {
    id: "7GVT1u4kAKlIAkVkPaSZ9p",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Today - Live",
    trackDuration: "04:51",
  },
  {
    id: "7nsdz4KlIj91cwCJ9m33Fx",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "A Boy - Live",
    trackDuration: "03:52",
  },
  {
    id: "1iNWC4Bu09R0o9DJXlKJGF",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "This Love - Live",
    trackDuration: "03:12",
  },
  {
    id: "0fAeXI8WxncT8IkMaNI75c",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "1 Year - Live",
    trackDuration: "04:50",
  },
  {
    id: "1TkjST5uC2Kx4A6Ktg7RXV",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Obsession - Live",
    trackDuration: "05:25",
  },
  {
    id: "6E9qJkWX0Kae59pZelC02V",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "She's Gone - Live",
    trackDuration: "04:42",
  },
  {
    id: "2J7RfDZhlJo4PPcF6S3SuO",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "2013 G-DRAGON WORLD TOUR 'ONE OF A KIND in SEOUL'",
    releaseDate: "2013-09-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733b3dd1119701d44552749dae",
    trackName: "Crayon + Fantastic Baby - Live",
    trackDuration: "06:14",
  },
  {
    id: "0jzNkPeK3W1g7G1MoqIfeZ",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Heartbreaker",
    trackDuration: "05:04",
  },
  {
    id: "4eAbsf15Xi5ItqJiTOVHKQ",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "This Love",
    trackDuration: "03:44",
  },
  {
    id: "3ar6JH26PgvWitEsBx2H4I",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Hello (Feat. DARA)",
    trackDuration: "03:46",
  },
  {
    id: "19o6PAA7YhNuKlJ6McmvP6",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Gossip Man (Feat. Kim Gun Mo)",
    trackDuration: "03:58",
  },
  {
    id: "02b9u4HtbgWDEDWmmkv061",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Korean Dream + Storm + Hip Hop Gentlemen + G-DRAGON",
    trackDuration: "04:15",
  },
  {
    id: "1LERA11k6mBQVtPON9xrxX",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "A Boy",
    trackDuration: "03:16",
  },
  {
    id: "7eUU0sWJq3k0GPca9Ak8cP",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "The Leaders (Feat. Teddy, CL)",
    trackDuration: "04:44",
  },
  {
    id: "7p6ZmgzWeZPIqoqMr1GgEQ",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Breathe",
    trackDuration: "03:54",
  },
  {
    id: "0cwyRZpI8CmHF3Inx78Hgo",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Butterfly (Feat. Jin Jung)",
    trackDuration: "03:41",
  },
  {
    id: "5QIp9cwiXJdCI8Bz2k8i8c",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "But I Love U",
    trackDuration: "04:55",
  },
  {
    id: "4zAGN8kU33hfTrhQRHhYdU",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "She's Gone (Feat. KUSH)",
    trackDuration: "04:50",
  },
  {
    id: "1JaGOGGmxiMUlQ2SGwheLk",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Only Look At Me",
    trackDuration: "04:01",
  },
  {
    id: "3lShYM0Ts3HfEDFpfkGO5z",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Korean Dream (Feat. TAEYANG)",
    trackDuration: "03:33",
  },
  {
    id: "4McJBwPCVaey67P7Vva81s",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "1 Year",
    trackDuration: "05:29",
  },
  {
    id: "3bNTPfEavB3i1RD4g8AaDn",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Lies",
    trackDuration: "05:59",
  },
  {
    id: "0bEca0Fd6dmW9PmEDGeEi7",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Heartbreaker (Encore)",
    trackDuration: "04:51",
  },
  {
    id: "5HH0VAoIyxEL5X4ZES6TEx",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Heartbreaker (Feat. Flo Rida)",
    trackDuration: "03:24",
  },
  {
    id: "163261XJJ4vA69ZXKW6WeP",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "This love (G.H remix)",
    trackDuration: "03:19",
  },
  {
    id: "6pcsEv1oLDQa3SggnaASsg",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "A Boy (CHOICE 37 Remix)",
    trackDuration: "03:24",
  },
  {
    id: "0z3tku2tK4E9hAj7PmLRzd",
    artistName: "G-DRAGON",
    genres: ["k-pop", "k-rap"],
    popularity: 76,
    followers: 3400689,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb783a6a578e8eb992bfd74765",
    albumsName: "Shine A Light",
    releaseDate: "2010-03-30",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735bc7ee0b1136b3265704f138",
    trackName: "Breathe (hitchhiker Remix)",
    trackDuration: "03:38",
  },
  {
    id: "0BA3uoKlu9CsHgXIeAiXmJ",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Caligo Pt.1",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ca59009b95be7b850357de10",
    trackName: "Chroma Drift",
    trackDuration: "03:30",
  },
  {
    id: "2sDcIrosoXqiGv1D5OQUvF",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Caligo Pt.1",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ca59009b95be7b850357de10",
    trackName: "Dash",
    trackDuration: "02:54",
  },
  {
    id: "6JbyOUBLnkMadKcPQoQeTR",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Caligo Pt.1",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ca59009b95be7b850357de10",
    trackName: "RIZZ",
    trackDuration: "02:44",
  },
  {
    id: "3ICrCBhFiLaX0qP7KErHLe",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Caligo Pt.1",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ca59009b95be7b850357de10",
    trackName: "Island",
    trackDuration: "04:16",
  },
  {
    id: "4gQJFhPYEVLuxyriyUubzD",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Caligo Pt.1",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ca59009b95be7b850357de10",
    trackName: "12:32 (A to T)",
    trackDuration: "03:13",
  },
  {
    id: "1riEr6o3obQxrQRFmD9Sed",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "The Fiery Priest 2 (Original Soundtrack) Part.2",
    releaseDate: "2024-11-16",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342f928ecd788665e0941e7da",
    trackName: "We don't stop",
    trackDuration: "03:22",
  },
  {
    id: "4jdlmdxikDrQc4YNhkRccv",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "The Fiery Priest 2 (Original Soundtrack) Part.2",
    releaseDate: "2024-11-16",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342f928ecd788665e0941e7da",
    trackName: "We don't stop - Inst.",
    trackDuration: "03:12",
  },
  {
    id: "0CN7xUFQbPRzffogC4FgBR",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Dear Hyeri, Pt. 4 (Original Soundtrack)",
    releaseDate: "2024-10-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a34b2e1a0bddae322a8219da",
    trackName: "What If",
    trackDuration: "03:51",
  },
  {
    id: "3KSkAziu70R5dvs0gmaNLv",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Dear Hyeri, Pt. 4 (Original Soundtrack)",
    releaseDate: "2024-10-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a34b2e1a0bddae322a8219da",
    trackName: "What If - Instrumental",
    trackDuration: "03:51",
  },
  {
    id: "34DtDWmIUacoop6Md298vE",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "Pump Up The Volume!",
    releaseDate: "2024-08-20",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730521b4efcb4432ca54cf2baa",
    trackName: "Pump Up The Volume!",
    trackDuration: "02:59",
  },
  {
    id: "1NubJcJa12xLssOkQfWZDZ",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "Watch Me Woo!",
    trackDuration: "02:15",
  },
  {
    id: "1T6xi2QrnmwaebXGvWAjLg",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "WAY 4 LUV",
    trackDuration: "03:39",
  },
  {
    id: "4mMtn8zhy4IaOwzNCgSbCT",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "Virtual Idol",
    trackDuration: "02:29",
  },
  {
    id: "1UyrFk2u0Asqmys76trMLi",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "From",
    trackDuration: "03:28",
  },
  {
    id: "2ODZujtUNxCQDfKCxCeRxZ",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "Our Movie",
    trackDuration: "02:41",
  },
  {
    id: "30FH8tNdUgHqZbB6ENgOwY",
    artistName: "PLAVE",
    genres: ["k-pop"],
    popularity: 66,
    followers: 283687,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba3fb52387f636edea69f599c",
    albumsName: "ASTERUM : 134-1",
    releaseDate: "2024-02-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcdc5e626e66249ead948655",
    trackName: "Merry PLLIstmas",
    trackDuration: "03:59",
  },
  {
    id: "6xGr4tVzpTX99p9Cf0hRRL",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "3D (feat. Jack Harlow)",
    trackDuration: "03:21",
  },
  {
    id: "06Qo2fYR2KS1F7bL338iVT",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Closer to You (feat. Major Lazer)",
    trackDuration: "02:50",
  },
  {
    id: "2HRgqmZQC0MC7GeNuDIXHN",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Seven (feat. Latto) (Explicit Ver.)",
    trackDuration: "03:03",
  },
  {
    id: "2KslE17cAJNHTsI2MI0jb2",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Standing Next to You",
    trackDuration: "03:26",
  },
  {
    id: "2gkVEnpahpE3bQuvGuCpAV",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Yes or No",
    trackDuration: "02:27",
  },
  {
    id: "0k0GtcnyQLMiXrdEDbLXmJ",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Please Don't Change (feat. DJ Snake)",
    trackDuration: "02:26",
  },
  {
    id: "5ONOlTiqymhzwcFjqcIT6E",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Hate You",
    trackDuration: "02:34",
  },
  {
    id: "5KfJvZ0PZzRdwFRaTUDAA7",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Somebody",
    trackDuration: "02:48",
  },
  {
    id: "3bNNvJA7hsGw0wSpGkfOBm",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Too Sad to Dance",
    trackDuration: "02:55",
  },
  {
    id: "7AbqgE05nFl9qY4FRUiq2p",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Shot Glass of Tears",
    trackDuration: "02:47",
  },
  {
    id: "7Hcj0duTWiCSYDtJaztNIt",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "GOLDEN",
    releaseDate: "2023-11-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273741fd4807f442af3f7359316",
    trackName: "Seven (feat. Latto) (Clean Ver.)",
    trackDuration: "03:03",
  },
  {
    id: "01qFKNWq73UfEslI0GvumE",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow)",
    trackDuration: "03:21",
  },
  {
    id: "6Xa9B3iE7bo3GkyUOVAhB9",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow) (Instrumental)",
    trackDuration: "03:19",
  },
  {
    id: "5BKiMkWucQVb7wrFi29VtX",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (Alternate Ver.)",
    trackDuration: "02:42",
  },
  {
    id: "7fQKDpB4i0hiQacjVCXVU2",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow) (A. G. Cook Remix)",
    trackDuration: "03:08",
  },
  {
    id: "0TaaG2kxjzSjVbmmiiSZEa",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow) (Clean Ver.)",
    trackDuration: "03:22",
  },
  {
    id: "1ewYtP6BZlak8qokzZe4Bx",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow) (Sped Up)",
    trackDuration: "02:48",
  },
  {
    id: "0dzT72K2RElXDMuMOyuKOI",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D : The Remixes",
    releaseDate: "2023-10-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27399583bb32b47e87d55c6064b",
    trackName: "3D (feat. Jack Harlow) (Slowed Down)",
    trackDuration: "03:56",
  },
  {
    id: "2nRMW95dnOILirpjbksLTs",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "Never Let Go",
    releaseDate: "2024-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273083f5a45d93b57cb65a97b83",
    trackName: "Never Let Go",
    trackDuration: "02:46",
  },
  {
    id: "0VPFT123HKoQ2J6ipeDcI1",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "Standing Next to You (USHER Remix)",
    releaseDate: "2023-12-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c9912de0a8a9a44b450318e4",
    trackName: "Standing Next to You (USHER Remix)",
    trackDuration: "03:34",
  },
  {
    id: "2mHw0KoEyDw8Yaw3yPoke6",
    artistName: "Jung Kook",
    genres: ["k-pop"],
    popularity: 82,
    followers: 17287866,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb40a7268dd742e5f63759b960",
    albumsName: "3D (Justin Timberlake Remix)",
    releaseDate: "2023-11-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27322e565596578ef0adbf5eaf1",
    trackName: "3D (Justin Timberlake Remix)",
    trackDuration: "02:40",
  },
  {
    id: "42e6dogVzAPSudzaBqRUIV",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "HANDS UP - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:01",
  },
  {
    id: "4DOvi3I7GtgVErqXnjAs3o",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName: "SOBER - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:19",
  },
  {
    id: "3RVgqjACPWt7LC7TgcCD7w",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "WE LIKE 2 PARTY - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:42",
  },
  {
    id: "5Ym7yyiFy5Z2GW8zYH45ms",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "FXXK IT - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "02:36",
  },
  {
    id: "7kBSj85ufJ1VpvSqLAr75X",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName: "LOSER - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:03",
  },
  {
    id: "6HldMPK1mbjgI0Y5t370j9",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "BAD BOY - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:14",
  },
  {
    id: "3emIcxw9NWVwKEdaXvXxF7",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "WAKE ME UP - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:23",
  },
  {
    id: "3pP5rsaeJMIovsClmJmh3i",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "DARLING - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:10",
  },
  {
    id: "2GrmNtTCulwxR9lk8NQBAD",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "SUPER STAR - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:04",
  },
  {
    id: "2C0LOJPcnVcSKCX3N0DqEn",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "Untitled, 2014 - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:44",
  },
  {
    id: "6Q00t2IdzTzcWgaevt2AQ7",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName: "D-Day - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:57",
  },
  {
    id: "5nCje7k5ZjgJ2XISx7cUZd",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "A・ZE・CHO ! - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:56",
  },
  {
    id: "7uJ9p6GuOS5F5GnY94Kq5v",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "COME TO MY - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "02:17",
  },
  {
    id: "2Gu2yJtqxaJsq0fEozyChQ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName: "I KNOW - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "02:36",
  },
  {
    id: "2QtzsCMEuxZ5TAfOGVJpLY",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "Look at me, Gwisun - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:47",
  },
  {
    id: "5wmUNZ7P5GUjZ0JBWKBDZs",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "GOOD BOY - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:08",
  },
  {
    id: "7ijpfBQv7sW0EHwbzRgI1a",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName: "IF YOU - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:28",
  },
  {
    id: "5LkYB8BCNIDf6ZWwrRNacI",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "HaruHaru - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:44",
  },
  {
    id: "31jPf3RQi35D9NaOIgwX4P",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "FANTASTIC BABY - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "04:11",
  },
  {
    id: "55iMEsMm9td9daH0mHPoBG",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    releaseDate: "2018-08-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273baa2444671de8ec216082838",
    trackName:
      "BANG BANG BANG - BIGBANG JAPAN DOME TOUR 2017 -LAST DANCE- : THE FINAL",
    trackDuration: "03:46",
  },
  {
    id: "45mMN0OSFF5Nv7hBmeOUQx",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "HEAVEN - Live",
    trackDuration: "04:26",
  },
  {
    id: "1zq8heBhjwmCnqx4RSZhb7",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "WE LIKE 2 PARTY - Live",
    trackDuration: "03:36",
  },
  {
    id: "0tYT6RdFKcSgBiaMfs3mdR",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "HANDS UP - Live",
    trackDuration: "03:55",
  },
  {
    id: "6w17ZLpTonbMfRRDdrofVj",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "BAD BOY - Live",
    trackDuration: "04:13",
  },
  {
    id: "1QdpaBkjNApYmwYlDuWHik",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "LOSER - Live",
    trackDuration: "03:59",
  },
  {
    id: "6iCrpFpnNJO7FY8Iu7z7Hf",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "FXXK IT - Live",
    trackDuration: "07:33",
  },
  {
    id: "4uov3g2rlZdNY9GORNsh4b",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "LET’S TALK ABOUT LOVE - Live",
    trackDuration: "01:27",
  },
  {
    id: "4pJRJMMTymF7IeRYHrHThC",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "STRONG BABY - Live",
    trackDuration: "02:21",
  },
  {
    id: "225g4x1sW9Zm3lULmJrVKa",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "WINGS - Live",
    trackDuration: "02:46",
  },
  {
    id: "4SHIhIglN6lQzBWzjfPRE8",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "LOOK AT ME GWISOON - Live",
    trackDuration: "04:20",
  },
  {
    id: "6kv5MN91E2yByJ1XWD76vQ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "HEARTBREAKER - Live",
    trackDuration: "02:28",
  },
  {
    id: "5OmzFuUbe7djQLT2uG6I3r",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "CRAYON - Live",
    trackDuration: "03:20",
  },
  {
    id: "1YD8M14uJW3DXrCs4FeO8o",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "HIGH HIGH - Live",
    trackDuration: "03:15",
  },
  {
    id: "4Kz8OC4sm2uCaCrEp9mLZ1",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "GOOD BOY - Live",
    trackDuration: "04:10",
  },
  {
    id: "0fIiCm9Pf19dcIrmZ7stf8",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "PRETENDED - Live",
    trackDuration: "02:44",
  },
  {
    id: "10CDw5PAK3WmqkNQYJ1kuN",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "DOOM DADA - Live",
    trackDuration: "05:24",
  },
  {
    id: "6nrgWCby7MpEpbcRJxRRZ9",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "EYES, NOSE, LIPS - Live",
    trackDuration: "04:45",
  },
  {
    id: "00zcv0aqdWQep2DrVWNPjO",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "ONLY LOOK AT ME - Live",
    trackDuration: "02:38",
  },
  {
    id: "7zqLN6qt1ZNlEFLgB3LBWx",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "RINGA LINGA - Live",
    trackDuration: "03:46",
  },
  {
    id: "00hHDWHG3MiE2OOUmve79F",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 FINAL IN SEOUL",
    releaseDate: "2017-05-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cdeac10253b85cda391ad9b6",
    trackName: "IF YOU - Live",
    trackDuration: "04:50",
  },
  {
    id: "33e3jzlgpXBQgTQ6radEv8",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "HEAVEN - Live",
    trackDuration: "04:23",
  },
  {
    id: "4h0kPyfScsOoKlNRJ1l5Ty",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "WE LIKE 2 PARTY - Live",
    trackDuration: "03:35",
  },
  {
    id: "0wjAWaUxM3moRA6jvtsxPJ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "HANDS UP - Live",
    trackDuration: "04:00",
  },
  {
    id: "27PYGYRXxejUF4cYulQmtS",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "BAD BOY - Live",
    trackDuration: "04:08",
  },
  {
    id: "3r6dAVVWsmqCDFvgSBiHEz",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "LOSER - Live",
    trackDuration: "03:41",
  },
  {
    id: "0qdJctmCqOqUL3kanmkmRi",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "FEELING - Live",
    trackDuration: "03:41",
  },
  {
    id: "3NggKc4eylweTkujZEgHJ8",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "LET'S TALK ABOUT LOVE - Live",
    trackDuration: "01:23",
  },
  {
    id: "69uYZk1xUWUGAGaTG3dfNm",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "STRONG BABY - Live",
    trackDuration: "02:25",
  },
  {
    id: "3LhyrhaUISsp2adwBdRLVX",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "WINGS - Live",
    trackDuration: "02:45",
  },
  {
    id: "70ZcnxosNyBkxqNnaVdVcB",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "LOOK AT ME GWISOON - Live",
    trackDuration: "04:21",
  },
  {
    id: "6asqAqKRwHKQh2ANgDiJXe",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "CROOKED - Live",
    trackDuration: "07:07",
  },
  {
    id: "3PRaRBkHgzmxer5HIh0vGF",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "HEARTBREAKER - Live",
    trackDuration: "02:28",
  },
  {
    id: "6BTfPlTa9AvOM3H3szjaRL",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "CRAYON - Live",
    trackDuration: "03:25",
  },
  {
    id: "0dflZ9lezOwO0AZVgYQSQL",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "HIGH HIGH - Live",
    trackDuration: "03:23",
  },
  {
    id: "18oGfIsfOaNHMrq8dyyk3e",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "GOOD BOY - Live",
    trackDuration: "04:11",
  },
  {
    id: "31eR03TwO2IRMYsCgKy6C3",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "PRETENDED - Live",
    trackDuration: "02:46",
  },
  {
    id: "1euM6MeQnbHHz1IgMyixo5",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "DOOM DADA - Live",
    trackDuration: "04:07",
  },
  {
    id: "7w45jf4z9fNIJYE59BtjiC",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "EYES, NOSE, LIPS - Live",
    trackDuration: "04:52",
  },
  {
    id: "5npsyXX3PBPXv48zF8o6bh",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "ONLY LOOK AT ME - Live",
    trackDuration: "02:36",
  },
  {
    id: "0Vhmd3nrLXS9cVMiFaXg1T",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "BIGBANG10 THE CONCERT 0.TO.10 IN SEOUL",
    releaseDate: "2017-02-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738043ee2ff932efccb78d7b40",
    trackName: "RINGA LINGA - Live",
    trackDuration: "02:38",
  },
  {
    id: "3lYvepDz6yYj29z7e4r5z0",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "FXXK IT",
    trackDuration: "03:51",
  },
  {
    id: "7ijWcf4FsoxoyPK4B9WGp6",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "LAST DANCE",
    trackDuration: "04:39",
  },
  {
    id: "0FRVxxD5ZaLVnlwI9nxkqP",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "GIRLFRIEND",
    trackDuration: "03:48",
  },
  {
    id: "6UgkB0xM45TR3Zjqm3GQ6T",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "LET'S NOT FALL IN LOVE",
    trackDuration: "03:31",
  },
  {
    id: "2vzn8usBcuNL93DnTjEK0z",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "LOSER",
    trackDuration: "03:39",
  },
  {
    id: "3miMeSGd7rzJEtuhQnzm0f",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "BAE BAE",
    trackDuration: "02:49",
  },
  {
    id: "3dI59jLoFMjMAyUAyRZnkE",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "BANG BANG BANG",
    trackDuration: "03:40",
  },
  {
    id: "3gUSmSBeeYsSMWECJcQW8w",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "SOBER",
    trackDuration: "03:57",
  },
  {
    id: "4kaY4LbdbomICC25gYGGtn",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "IF YOU",
    trackDuration: "04:24",
  },
  {
    id: "6ePbs5ln6NGmMMuA6DrSaQ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "ZUTTER (GD&T.O.P)",
    trackDuration: "03:14",
  },
  {
    id: "07gp2fnoTbVCsRJYazycI4",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "MADE",
    releaseDate: "2016-12-13",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fd0d9a33127c1d3f58ba3504",
    trackName: "WE LIKE 2 PARTY",
    trackDuration: "03:15",
  },
  {
    id: "3kseM0JJ9CgrCKAv1uoQmu",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Bang Bang Bang - Live",
    trackDuration: "04:49",
  },
  {
    id: "36uTWoCYuYtO1Qp9u7a7hF",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Tonight - Live",
    trackDuration: "03:57",
  },
  {
    id: "7LfrP6RxGo9dMZYKVwewgC",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Stupid Liar - Live",
    trackDuration: "04:36",
  },
  {
    id: "7ADw9GQ6A97ytTLwUAciFa",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Haru Haru - Live",
    trackDuration: "05:09",
  },
  {
    id: "5RcJp2r9ZHREM56nV2lTp5",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Loser - Live",
    trackDuration: "03:59",
  },
  {
    id: "3yfcH0kOXWgc95wdL62tPw",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Blue - Live",
    trackDuration: "04:24",
  },
  {
    id: "0PRny2NKo7iBdU47zTOoSJ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Bad Boy - Live",
    trackDuration: "04:32",
  },
  {
    id: "0iAgdDYh8Y9CETXoz1psiV",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "If You - Live",
    trackDuration: "05:10",
  },
  {
    id: "5Cnt2UgBxTIO65mlD5ELeQ",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Strong Baby - Live",
    trackDuration: "04:12",
  },
  {
    id: "2mYTfHz0wolZrAlF2bEX6M",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Wings - Live",
    trackDuration: "05:21",
  },
  {
    id: "0753tiqVdX34CvtoMgVYZF",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Doom Dada - Live",
    trackDuration: "04:01",
  },
  {
    id: "21po0SccfQs9FBEojjhmNN",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Eyes, Nose, Lips - Live",
    trackDuration: "05:19",
  },
  {
    id: "7efFRFZXZEwXCYrvFvNnOy",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Zutter - Live",
    trackDuration: "03:26",
  },
  {
    id: "3SgqaUT4PjwO84nO6OIhyI",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Good Boy - Live",
    trackDuration: "04:07",
  },
  {
    id: "6rxMYaoZlTWqWRyCDMHo0s",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Crooked - Live",
    trackDuration: "04:25",
  },
  {
    id: "5gNATY0PKGl0iCJ1cj7RCY",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Sober - Live",
    trackDuration: "05:38",
  },
  {
    id: "4Oq7zp72QZLwNbLlwvcSAz",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Bae Bae - Live",
    trackDuration: "03:56",
  },
  {
    id: "7wkdrGxG3jWLCpMhifoAGD",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Fantastic Baby - Live",
    trackDuration: "04:26",
  },
  {
    id: "3vG5OctNjOeRjZwxzAXTNv",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "We Like 2 Party (Encore) - Live",
    trackDuration: "03:17",
  },
  {
    id: "18I6Sg8Avsf5LIAzyYiNYH",
    artistName: "BIGBANG",
    genres: ["k-pop"],
    popularity: 75,
    followers: 5637574,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    albumsName: "2016 BIGBANG WORLD TOUR [MADE] FINAL IN SEOUL LIVE",
    releaseDate: "2016-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273016c825603d2a38f0e0353f8",
    trackName: "Lies (Encore) - Live",
    trackDuration: "03:39",
  },
  {
    id: "2RENZFrMGuOtr162uKsjOn",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Intro : JANE with FKJ",
    trackDuration: "01:38",
  },
  {
    id: "0DC62SYIRKMFgx2f7OyvwD",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "like JENNIE",
    trackDuration: "02:03",
  },
  {
    id: "4YoN6sOtjWgbtB2jKgLPHL",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "start a war",
    trackDuration: "02:45",
  },
  {
    id: "2eOXb8aSpBUQLSk1sTBPEK",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Handlebars (feat. Dua Lipa)",
    trackDuration: "03:04",
  },
  {
    id: "0wQASbxN6UbZXZhKXvuczj",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "with the IE (way up)",
    trackDuration: "02:43",
  },
  {
    id: "3fN2swfuBHUljCyPlA8wBN",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "ExtraL (feat. Doechii)",
    trackDuration: "02:47",
  },
  {
    id: "0oYhOxvxd95jtTWXHkYsPh",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Mantra",
    trackDuration: "02:16",
  },
  {
    id: "2DW9UqvL7vcG3qCGFUmvXp",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Love Hangover (feat. Dominic Fike)",
    trackDuration: "03:00",
  },
  {
    id: "76tWxLk4KWOw1Qd8dC5SdI",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "ZEN",
    trackDuration: "03:21",
  },
  {
    id: "3KldgsZmR6nCItrTrP8zbl",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Damn Right (feat. Childish Gambino & Kali Uchis)",
    trackDuration: "03:50",
  },
  {
    id: "6wbLxHGBCpTWIpLZ5L0Zuv",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "F.T.S.",
    trackDuration: "02:32",
  },
  {
    id: "4p3oOaC3Fo38tEXp3SR5DN",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Filter",
    trackDuration: "02:31",
  },
  {
    id: "3IPh4v7HFJ8Egba3lYNDrQ",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Seoul City",
    trackDuration: "02:44",
  },
  {
    id: "0rNCeIkEvz61X0oP48z6cC",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "Starlight",
    trackDuration: "02:48",
  },
  {
    id: "5rP5Mwcx5IYavwVTCmdVIK",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Ruby",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27388e90abbb4d0d9e45881f4dc",
    trackName: "twin",
    trackDuration: "03:28",
  },
  {
    id: "2cR7c0dxkHnPcnWMLUlRVo",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Intro : JANE with FKJ",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27397b8e6f0dd873b5e34a394ee",
    trackName: "Intro : JANE with FKJ",
    trackDuration: "01:38",
  },
  {
    id: "4kh7FBVzeyRC0rMWRFDmMC",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Handlebars (feat. Dua Lipa)",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2739fb875cc9e6e4151461c2cf3",
    trackName: "Handlebars (feat. Dua Lipa)",
    trackDuration: "03:04",
  },
  {
    id: "4cfiNs7Yvr9UTLvbYWal1o",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "Damn Right (feat. Childish Gambino & Kali Uchis)",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273270745e1253630a60c9b8d52",
    trackName: "Damn Right (feat. Childish Gambino & Kali Uchis)",
    trackDuration: "03:50",
  },
  {
    id: "4g0F7gpT3iVHqKjXF87eX1",
    artistName: "JENNIE",
    genres: ["k-pop"],
    popularity: 88,
    followers: 9430096,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eba8e3627e392a1d8f539cb575",
    albumsName: "ExtraL",
    releaseDate: "2025-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738f2b7786ef16c658cccfaecd",
    trackName: "ExtraL (feat. Doechii)",
    trackDuration: "02:47",
  },
  {
    id: "6gofCueySlBTKWFkOntP2F",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "No More Hiding",
    trackDuration: "02:42",
  },
  {
    id: "5Wl7p7TylkA7Kec3HV0i5b",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "What Do I Do",
    trackDuration: "02:47",
  },
  {
    id: "3rXZ1j7QTXphBCavJDBZXz",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "30 For 30 (with Kendrick Lamar)",
    trackDuration: "04:38",
  },
  {
    id: "2kwtmk3MEM1rJ2ROBlDPJm",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Diamond Boy (DTM)",
    trackDuration: "03:37",
  },
  {
    id: "6uhsCywVYs0A9wWf0IE81N",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "BMF",
    trackDuration: "03:00",
  },
  {
    id: "1TmxBpnOfi6Qo76EubG57l",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Scorsese Baby Daddy",
    trackDuration: "02:33",
  },
  {
    id: "0ubNlPTaQkfNWkFO9Q9MOt",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Love Me 4 Me",
    trackDuration: "03:05",
  },
  {
    id: "5MJzPVpmuQenwmnW4tvqxN",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Chill Baby",
    trackDuration: "02:20",
  },
  {
    id: "0wa75FDB0wR2Y4JDe1Fw2m",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "My Turn",
    trackDuration: "02:57",
  },
  {
    id: "0lYhn8BHyws0nEVMu7xejq",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Crybaby",
    trackDuration: "04:01",
  },
  {
    id: "31tVhNpdfsOhZKDhNXul7k",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Kitchen",
    trackDuration: "02:52",
  },
  {
    id: "7BidXxXMEtU3eUM2026i2p",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Get Behind Me (Interlude)",
    trackDuration: "01:48",
  },
  {
    id: "2xCb1jIzhLMm8DYcAVK6UY",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Drive",
    trackDuration: "03:05",
  },
  {
    id: "6YDeZ8E4Sq63omeicaKbgS",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Another Life",
    trackDuration: "03:25",
  },
  {
    id: "63VqnjTVYJiwVoUm0OCdy6",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Saturn",
    trackDuration: "03:06",
  },
  {
    id: "5Hi7mKvhNYvk4PIURtuY42",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Joni (feat. Don Toliver)",
    trackDuration: "02:07",
  },
  {
    id: "0sbjvSYXqzLiMPID9FPYjL",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Take You Down",
    trackDuration: "02:39",
  },
  {
    id: "0uQHm4CLatNbvDFHt1Ystl",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "Open Arms (just SZA)",
    trackDuration: "03:35",
  },
  {
    id: "0IrFjSpWJzYsZ9UeZxqdgt",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "PSA",
    trackDuration: "01:39",
  },
  {
    id: "06e2HGTj1BDaYXpoZfjZXe",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS Deluxe: LANA",
    releaseDate: "2025-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273209356748e67773a69774a02",
    trackName: "SOS",
    trackDuration: "01:57",
  },
  {
    id: "5xMw6qCcpd2gBXPGTegC4W",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "SOS",
    trackDuration: "01:57",
  },
  {
    id: "3OHfY25tqY28d16oZczHc8",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Kill Bill",
    trackDuration: "02:33",
  },
  {
    id: "6eT2V7nKXyMf47TwPbtgAD",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Seek & Destroy",
    trackDuration: "03:23",
  },
  {
    id: "2GAhgAjOhEmItWLfgisyOn",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Low",
    trackDuration: "03:01",
  },
  {
    id: "1eIXYZWEfJO3Na2LCCnIJE",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Love Language",
    trackDuration: "03:03",
  },
  {
    id: "2CSRrnOEELmhpq8iaAi9cd",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Blind",
    trackDuration: "02:30",
  },
  {
    id: "1TweDM3JC49LNeelLVg3yX",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Used (feat. Don Toliver)",
    trackDuration: "02:26",
  },
  {
    id: "4iZ4pt7kvcaH6Yo8UoZ4s2",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Snooze",
    trackDuration: "03:21",
  },
  {
    id: "4fnNBPN9W6AoOYSQS3FJxT",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Notice Me",
    trackDuration: "02:40",
  },
  {
    id: "2Sjx8DWZO5zaTyTAmgo2gY",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Gone Girl",
    trackDuration: "04:04",
  },
  {
    id: "4jTs7ny5eSRnKTzxdrFv5I",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Smoking on my Ex Pack",
    trackDuration: "01:23",
  },
  {
    id: "4h5x3XHLVYFJaItKuO2rhy",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Ghost in the Machine (feat. Phoebe Bridgers)",
    trackDuration: "03:38",
  },
  {
    id: "2e2AXpIiJpet5b4qg85Gh6",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "F2F",
    trackDuration: "03:05",
  },
  {
    id: "5Y35SjAfXjjG0sFQ3KOxmm",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Nobody Gets Me",
    trackDuration: "03:00",
  },
  {
    id: "4hTej08FutmriOs7S1hWWy",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Conceited",
    trackDuration: "02:31",
  },
  {
    id: "6RQ5IwG7uADz9LDWliJGjU",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Special",
    trackDuration: "02:38",
  },
  {
    id: "4rAg5bbrdZX00mXXhLvYXj",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Too Late",
    trackDuration: "02:44",
  },
  {
    id: "74NI58MQexwZjNu1Gu6GjT",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Far",
    trackDuration: "03:00",
  },
  {
    id: "2wSTnntOPRi7aQneobFtU4",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Shirt",
    trackDuration: "03:01",
  },
  {
    id: "0xaFw2zDYf1rIJWl2dXiSF",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "SOS",
    releaseDate: "2022-12-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    trackName: "Open Arms (feat. Travis Scott)",
    trackDuration: "03:59",
  },
  {
    id: "3lw0PaZdGkvCwTaiatHbnU",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Supermodel",
    trackDuration: "03:01",
  },
  {
    id: "7HhtNlYNI32WY6n0ISX0U1",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Love Galore (feat. Travis Scott)",
    trackDuration: "04:35",
  },
  {
    id: "0JijvZALkvx7uonQdvXXpH",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Doves In The Wind (feat. Kendrick Lamar)",
    trackDuration: "04:26",
  },
  {
    id: "5L7sgpCZgrcqpgh1xM7r6V",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Drew Barrymore",
    trackDuration: "03:51",
  },
  {
    id: "5MffAkbuTPBqRdPuPzaEb5",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Prom",
    trackDuration: "03:16",
  },
  {
    id: "61fROeJfnI3OtNQYMpN1gT",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "The Weekend",
    trackDuration: "04:32",
  },
  {
    id: "4U4bI86Jynl9et1eXyEpz6",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Go Gina",
    trackDuration: "02:41",
  },
  {
    id: "6yyxqE2ZdAVuD2qEL76POx",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Garden (Say It Like Dat)",
    trackDuration: "03:28",
  },
  {
    id: "5dIkvSrG129dvaQ3xb0M9R",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Broken Clocks",
    trackDuration: "03:51",
  },
  {
    id: "4rbl561Pds0a8d9h0RLaLF",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Anything",
    trackDuration: "02:29",
  },
  {
    id: "0YPPnLR3TS4ZIAKCQOLZhK",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Wavy (Interlude) (feat. James Fauntleroy)",
    trackDuration: "01:15",
  },
  {
    id: "1Y7tMWKvFZLCpoX0SINyhP",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Normal Girl",
    trackDuration: "04:13",
  },
  {
    id: "4icqsSm2gIMEMUAcaReA3u",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Pretty Little Birds (feat. Isaiah Rashad)",
    trackDuration: "04:05",
  },
  {
    id: "0WC7CIZHwPXoFQEbJ721vT",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "20 Something",
    trackDuration: "03:18",
  },
  {
    id: "3fcX3E9l1gVnfKeWaEzHHv",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Love Galore (Alt Version)",
    trackDuration: "04:33",
  },
  {
    id: "3vZGtceCbJVh5aDT4XhE0p",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "2AM",
    trackDuration: "04:02",
  },
  {
    id: "4pHy0gmjfpD0Fgond5c4Ta",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Miles",
    trackDuration: "01:09",
  },
  {
    id: "4UJuFZ4btsiGqMyFHBRPbo",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Percolator",
    trackDuration: "01:24",
  },
  {
    id: "7newfXclX39UwWTw2gDswM",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Tread Carefully",
    trackDuration: "03:02",
  },
  {
    id: "2xZ0zfuDTv5LxLhEgD82PG",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Ctrl (Deluxe)",
    releaseDate: "2022-06-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731882add8fd275c04e322027d",
    trackName: "Awkward",
    trackDuration: "02:58",
  },
  {
    id: "0Grpt3Up0Kaj7PljmT7inL",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "Waving Through A Window - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "03:55",
  },
  {
    id: "4F0FjRSJxEhEg2O2X7xAik",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "For Forever - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "05:10",
  },
  {
    id: "7Fuj7RyGJYSJ7HgO5E2tJv",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "Sincerely Me - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "03:37",
  },
  {
    id: "2hp0ZBtEDA2Wn3C1fvJSf9",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "Requiem - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "04:24",
  },
  {
    id: "7bKq8MLzpWlaO1RXPkEm95",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "If I Could Tell Her - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "04:03",
  },
  {
    id: "1ouS2oUJOnxH9TaQxpNpUO",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "The Anonymous Ones - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "04:43",
  },
  {
    id: "3AYMFpcQeHCjnTAb8XKeVu",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "You Will Be Found - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "05:58",
  },
  {
    id: "34IKm7af3AY1m36bnlNH5k",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "Only Us - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "03:59",
  },
  {
    id: "6oKvPUNfMLB8tPCZxQztGR",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "Words Fail - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "05:47",
  },
  {
    id: "1MdFRRORSskeNMHJsYv9cu",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "So Big / So Small - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "04:25",
  },
  {
    id: "5V0BIjKnVh2acWHuf5evww",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "A Little Closer - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "04:09",
  },
  {
    id: "6i14jVQ6cq2BxYWlYYgzyD",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "You Will Be Found (Sam Smith & Summer Walker Version) - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "03:57",
  },
  {
    id: "1UiIBbs0Pl8rAtz294SZoR",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "The Anonymous Ones (SZA Version) - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "04:09",
  },
  {
    id: "4SaukjSrlHLaSwZ5K6OHhe",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "Only Us (Carrie Underwood & Dan + Shay Version) - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "03:45",
  },
  {
    id: "3tcquFqOHmSIDmhW4rH2Pn",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "A Little Closer (FINNEAS Version) - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "04:02",
  },
  {
    id: "1oTJvM9gyW1uY7Bb0tOZyk",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Dear Evan Hansen (Original Motion Picture Soundtrack)",
    releaseDate: "2021-09-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a7a9d81575b10a3bc8b69914",
    trackName:
      "Waving Through A Window (Tori Kelly Version) - From The “Dear Evan Hansen” Original Motion Picture Soundtrack",
    trackDuration: "04:26",
  },
  {
    id: "5qN4HFkapdAOV94XPryVof",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "Black Panther",
    trackDuration: "02:10",
  },
  {
    id: "3GCdLUSnKSMJhs4Tj6CV3s",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "All The Stars (with SZA)",
    trackDuration: "03:52",
  },
  {
    id: "4LmAnpjlhWTahvRkYR8xJa",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "X (with 2 Chainz & Saudi)",
    trackDuration: "04:27",
  },
  {
    id: "5jyyPsIGM2yqkZN9R3TmvN",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "The Ways (with Swae Lee)",
    trackDuration: "03:58",
  },
  {
    id: "7bUcBztfGqO7cSI2gMZeCI",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "Opps (with Yugen Blakrok)",
    trackDuration: "03:00",
  },
  {
    id: "0DJBgBiYeSn6n1AXAkFVE8",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "I Am",
    trackDuration: "03:28",
  },
  {
    id: "2tPcTFiQF9MbVUyjZ3zDhA",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "Paramedic!",
    trackDuration: "03:39",
  },
  {
    id: "4KXwFI9pgJLpUIAc9oSL8j",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "Bloody Waters (with Anderson .Paak & James Blake)",
    trackDuration: "04:32",
  },
  {
    id: "1eLSF6HfrRA0AsNmTkUlKx",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "King's Dead (with Kendrick Lamar, Future & James Blake)",
    trackDuration: "03:45",
  },
  {
    id: "4FpfU1O7WCLBnmwu5XAFk4",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "Redemption Interlude",
    trackDuration: "01:25",
  },
  {
    id: "76iVOVsliCHlWqKuDnCfhE",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "Redemption (with Babes Wodumo)",
    trackDuration: "03:42",
  },
  {
    id: "35cOyocq8Gb6UcT0NWeTwn",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "Seasons (with Sjava & Reason)",
    trackDuration: "04:02",
  },
  {
    id: "5cXg9IQS34FzLVdHhp7hu7",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "Big Shot (with Travis Scott)",
    trackDuration: "03:41",
  },
  {
    id: "77UjLW8j5UAGAGVGhR5oUK",
    artistName: "SZA",
    genres: ["r&b"],
    popularity: 95,
    followers: 28257274,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebfd0a9fb6c252a3ba44079acf",
    albumsName: "Black Panther The Album Music From And Inspired By",
    releaseDate: "2018-02-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888",
    trackName: "Pray For Me (with Kendrick Lamar)",
    trackDuration: "03:31",
  },
  {
    id: "6JVXVLqCPaodBSEwRFUN8w",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Ditto (250 Remix)",
    trackDuration: "03:21",
  },
  {
    id: "4yjDMKCAeLovlo9ih0AgXW",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "OMG (FRNK Remix)",
    trackDuration: "03:30",
  },
  {
    id: "2nW48vXnZZ5EYka46v7GOk",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Attention (250 Remix)",
    trackDuration: "03:01",
  },
  {
    id: "6CUKsv928uT4561qJovhhG",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Hype Boy (250 Remix)",
    trackDuration: "04:11",
  },
  {
    id: "5bwpbZBOY0mrmRhZ94c0kW",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Cookie (FRNK Remix)",
    trackDuration: "03:32",
  },
  {
    id: "2gWWYL6iXZKkOqCE3TQHBM",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Hurt (250 Remix)",
    trackDuration: "03:44",
  },
  {
    id: "3dCCHYqCAMdm1GCuklUaZG",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Ditto (250 Remix) (Instrumental)",
    trackDuration: "03:21",
  },
  {
    id: "2oLVT9Lo0SavCNpGw4WfPp",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "OMG (FRNK Remix) (Instrumental)",
    trackDuration: "03:30",
  },
  {
    id: "4MhgDz4lSj2HtlUcpe3yrd",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Attention (250 Remix) (Instrumental)",
    trackDuration: "03:01",
  },
  {
    id: "6tU4EeTSSawN9sbfAjWPX4",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Hype Boy (250 Remix) (Instrumental)",
    trackDuration: "04:11",
  },
  {
    id: "2akxtSALPUX8orriSWyDi4",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Cookie (FRNK Remix) (Instrumental)",
    trackDuration: "03:32",
  },
  {
    id: "1q9V1vsIEehAm2hDT6l53g",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NJWMX",
    releaseDate: "2023-12-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273782a8cae588fee29eefec8b6",
    trackName: "Hurt (250 Remix) (Instrumental)",
    trackDuration: "03:36",
  },
  {
    id: "5ocSQW5sIUIOFojwXEz9Ki",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "Supernatural",
    releaseDate: "2024-06-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737e1eeb0d7cc374a168369c80",
    trackName: "Supernatural",
    trackDuration: "03:11",
  },
  {
    id: "58Q3FZFs1YXPpliWQB5kXB",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "Supernatural",
    releaseDate: "2024-06-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737e1eeb0d7cc374a168369c80",
    trackName: "Right Now",
    trackDuration: "02:40",
  },
  {
    id: "4823f9W4xmR3n1BebPyNaR",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "Supernatural",
    releaseDate: "2024-06-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737e1eeb0d7cc374a168369c80",
    trackName: "Supernatural (Instrumental)",
    trackDuration: "03:11",
  },
  {
    id: "6jgUrLEivd4DaiYb1izJLF",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "Supernatural",
    releaseDate: "2024-06-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737e1eeb0d7cc374a168369c80",
    trackName: "Right Now (Instrumental)",
    trackDuration: "02:40",
  },
  {
    id: "38tXZcL1gZRfbqfOG0VMTH",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "How Sweet",
    releaseDate: "2024-05-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b657fbb27b17e7bd4691c2b2",
    trackName: "How Sweet",
    trackDuration: "03:39",
  },
  {
    id: "19D8LNpWwIPpi6hs9BG7dq",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "How Sweet",
    releaseDate: "2024-05-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b657fbb27b17e7bd4691c2b2",
    trackName: "Bubble Gum",
    trackDuration: "03:20",
  },
  {
    id: "54tBIDmNdxGp04gPNWCCbi",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "How Sweet",
    releaseDate: "2024-05-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b657fbb27b17e7bd4691c2b2",
    trackName: "How Sweet (Instrumental)",
    trackDuration: "03:39",
  },
  {
    id: "54uNtM77iZ5gawWBQGnEar",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "How Sweet",
    releaseDate: "2024-05-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b657fbb27b17e7bd4691c2b2",
    trackName: "Bubble Gum (Instrumental)",
    trackDuration: "03:20",
  },
  {
    id: "11YovYUVkZdLyOFncbecWL",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NewJeans X MY DEMON",
    releaseDate: "2023-11-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2732509e504c96367276ca6d1dd",
    trackName: "Our Night is more beautiful than your Day",
    trackDuration: "03:12",
  },
  {
    id: "6sJ6EoG4vyUC1tW718ww7f",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "NewJeans X MY DEMON",
    releaseDate: "2023-11-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2732509e504c96367276ca6d1dd",
    trackName: "Our Night is more beautiful than your Day (Inst.)",
    trackDuration: "03:12",
  },
  {
    id: "210JJAa9nJOgNa0YNrsT5g",
    artistName: "NewJeans",
    genres: ["k-pop"],
    popularity: 79,
    followers: 10471743,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
    albumsName: "GODS",
    releaseDate: "2023-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e4179b3fb74beaf0cdfa7a13",
    trackName: "GODS",
    trackDuration: "03:40",
  },
  {
    id: "5673WA8EEUSPx1ir26lhGW",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Wake Me Up (feat. Justice)",
    trackDuration: "05:08",
  },
  {
    id: "3AWDeHLc88XogCaCnZQLVI",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Cry For Me",
    trackDuration: "03:44",
  },
  {
    id: "64JIAZ0bS7WoARYfWQGCoz",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "I Can't Fucking Sing",
    trackDuration: "00:12",
  },
  {
    id: "7DY756WOLyOz2Xnhw4EFiC",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "São Paulo (feat. Anitta)",
    trackDuration: "05:01",
  },
  {
    id: "6jDGDtQPC46pFqxph3qdbD",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Until We're Skin & Bones",
    trackDuration: "00:22",
  },
  {
    id: "5rzI6Jnlhx8DgVgsOLorfW",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Baptized In Fear",
    trackDuration: "03:52",
  },
  {
    id: "0sTBOp1hdayTjw6UOyPyi6",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Open Hearts",
    trackDuration: "03:54",
  },
  {
    id: "4Msr8L0gHGDsLSBlk7pSPU",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Opening Night",
    trackDuration: "01:36",
  },
  {
    id: "2gyHr9WqZeMtzJOpWGuGo6",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName:
      "Reflections Laughing (feat. Travis Scott, Florence + The Machine)",
    trackDuration: "04:51",
  },
  {
    id: "637oNhilCI9UlkWkUW4Grt",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Enjoy The Show (feat. Future)",
    trackDuration: "05:01",
  },
  {
    id: "0FolPJnYMo71Z7qasTuoJT",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Given Up On Me",
    trackDuration: "05:54",
  },
  {
    id: "0bcZ7xN9IcjSNxLerzR2yl",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "I Can't Wait To Get There",
    trackDuration: "03:08",
  },
  {
    id: "0FIDCNYYjNvPVimz5icugS",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Timeless (feat Playboi Carti)",
    trackDuration: "04:16",
  },
  {
    id: "2v0AG62ZHtD3I4YmTb3WYM",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Niagara Falls",
    trackDuration: "04:37",
  },
  {
    id: "7rVmzyFA7f4rNGl9onF21E",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Take Me Back To LA",
    trackDuration: "04:13",
  },
  {
    id: "4sWQbsLLH2NEbO79DSZCL9",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Big Sleep (feat. Giorgio Moroder)",
    trackDuration: "03:45",
  },
  {
    id: "0K3w6WNawZlv6Izmsrye8o",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Give Me Mercy",
    trackDuration: "03:36",
  },
  {
    id: "6i5fDaCzwxRrZtuvvcqoIf",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Drive",
    trackDuration: "03:08",
  },
  {
    id: "5ZDKPFRZC6QlJpf8bCIXTs",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "The Abyss (feat. Lana Del Rey)",
    trackDuration: "04:42",
  },
  {
    id: "717s9KFmHhyy5t3xkStS56",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Hurry Up Tomorrow",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f0f6528e4eb6588b48d5128e",
    trackName: "Red Terror",
    trackDuration: "03:51",
  },
  {
    id: "76yLBykniz0SSNv0jj17M2",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Starboy (feat. Daft Punk)",
    trackDuration: "03:50",
  },
  {
    id: "6fSvz9yrQY407xmr7cdjuA",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Party Monster",
    trackDuration: "04:09",
  },
  {
    id: "4k47x4UkxG215nFLMFna8A",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "False Alarm",
    trackDuration: "03:40",
  },
  {
    id: "4zHa39io9pjsiAE6LwM2NH",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Reminder",
    trackDuration: "03:38",
  },
  {
    id: "3mynPhglTz2Ggh8SxA34kR",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Rockin’",
    trackDuration: "03:52",
  },
  {
    id: "36K5mnqwfxGS0rvxz7FPyq",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Secrets",
    trackDuration: "04:25",
  },
  {
    id: "2QRvliBEcGIEgTrjVfxmXo",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "True Colors",
    trackDuration: "03:26",
  },
  {
    id: "3CktmDvZGj21m3pNFj5Lr3",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Stargirl Interlude (feat. Lana Del Rey)",
    trackDuration: "01:51",
  },
  {
    id: "3r5lHFACTti0w2REN5tcrn",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Sidewalks (feat. Kendrick Lamar)",
    trackDuration: "03:51",
  },
  {
    id: "4QYEtbfsqusrXN5A49LG53",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Six Feet Under",
    trackDuration: "03:57",
  },
  {
    id: "5ejT19NfiINj4cFmjRHwAC",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Love To Lay",
    trackDuration: "03:43",
  },
  {
    id: "5HFQB9ENLGBHTci7xPmLk6",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "A Lonely Night",
    trackDuration: "03:40",
  },
  {
    id: "2DsrtZoRxeHdCSGRlQVQtj",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Attention",
    trackDuration: "03:17",
  },
  {
    id: "09mBPwUMt1TXNtneqvmZZ5",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Ordinary Life",
    trackDuration: "03:41",
  },
  {
    id: "3iPmwJh56xbDF7Xduimf0d",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Nothing Without You",
    trackDuration: "03:18",
  },
  {
    id: "3Xz0rSC29WbaobyJQfeYsp",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "All I Know (feat. Future)",
    trackDuration: "05:21",
  },
  {
    id: "0awWj9Wzj375IL5etqa1Dk",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Die For You",
    trackDuration: "04:20",
  },
  {
    id: "0yi180gAOIJhcRo7wY4Htl",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "I Feel It Coming (feat. Daft Punk)",
    trackDuration: "04:29",
  },
  {
    id: "4W4fNrZYkobj539TOWsLO2",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Die For You (with Ariana Grande) - Remix",
    trackDuration: "03:52",
  },
  {
    id: "3DCc4HPrVukBeaDGe3Cosk",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Starboy (Deluxe)",
    releaseDate: "2023-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ad8f5243d6534e03b656c8b",
    trackName: "Starboy (feat. Daft Punk) - Kygo Remix",
    trackDuration: "04:04",
  },
  {
    id: "7HX1VOiPj1oMlgZ3OQ92B6",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Intro - Live",
    trackDuration: "01:35",
  },
  {
    id: "2evYKtXNAdn60ANNEdjH7V",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Alone Again - Live",
    trackDuration: "02:47",
  },
  {
    id: "2h3ZotklPN6aD7OuHz7bFZ",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Gasoline - Live",
    trackDuration: "03:15",
  },
  {
    id: "7skxtd9x0d05fjz4D7w3t2",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Sacrifice - Live",
    trackDuration: "04:23",
  },
  {
    id: "72SxWvaYsDgix2N3sjCjT1",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "How Do I Make You Love Me? - Live",
    trackDuration: "03:29",
  },
  {
    id: "47vfGRaXEGzcM2vI7JC2OO",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Can't Feel My Face - Live",
    trackDuration: "03:03",
  },
  {
    id: "02YlAvsmptN8LisZqrWBIb",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Take My Breath - Live",
    trackDuration: "03:55",
  },
  {
    id: "45ypYpAdgoneWcBT0Wba3p",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Hurricane - Live",
    trackDuration: "02:07",
  },
  {
    id: "6N8W7Dbcsg9tRDxn0wjFkR",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "The Hills - Live",
    trackDuration: "03:05",
  },
  {
    id: "3kdEGx81MR9ftxRbF3Zf84",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Often - Live",
    trackDuration: "02:28",
  },
  {
    id: "03H6iCycyxfB2mZzIOEeKJ",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Crew Love - Live",
    trackDuration: "01:53",
  },
  {
    id: "4ZYGm4xWPhsZVijqtpWn4C",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Starboy - Live",
    trackDuration: "04:05",
  },
  {
    id: "0WrIAsGJOei2FGeakvpTDU",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Heartless - Live",
    trackDuration: "02:04",
  },
  {
    id: "431r2Qg4I2qFIKdSFCJN4s",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Low Life - Live",
    trackDuration: "01:47",
  },
  {
    id: "6tB01QHgH9YuVA8TomAzni",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Or Nah - Live",
    trackDuration: "01:41",
  },
  {
    id: "2YI8oiiImLkZvVgP33xrjD",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Kiss Land - Live",
    trackDuration: "01:50",
  },
  {
    id: "6knNhL3mIaackJvtjmUrfN",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Party Monster - Live",
    trackDuration: "03:09",
  },
  {
    id: "5RlqhZfTao31aQUO2QjpkG",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Faith - Live",
    trackDuration: "03:05",
  },
  {
    id: "7HK0ZDEsW0lGKKIVYvni2z",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "After Hours - Live",
    trackDuration: "04:27",
  },
  {
    id: "6XZ8C5etRn0kiS1wwuW0SO",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Live At SoFi Stadium",
    releaseDate: "2023-03-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273308f9319a3d6f6737f43b3fc",
    trackName: "Out of Time - Live",
    trackDuration: "03:20",
  },
  {
    id: "3gj1hwjku4JaoamjJVqIIl",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Dawn FM",
    trackDuration: "01:36",
  },
  {
    id: "6Uj2XaahtYXK2WeD7GGwBY",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Gasoline",
    trackDuration: "03:32",
  },
  {
    id: "3kOtREqmcGaEA2KhqffFnw",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "How Do I Make You Love Me?",
    trackDuration: "03:34",
  },
  {
    id: "3WXyY2PxX88kpBtB0GH61w",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Take My Breath",
    trackDuration: "05:39",
  },
  {
    id: "0xa4hvXeYHRRNhA7wBfUar",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Sacrifice",
    trackDuration: "03:08",
  },
  {
    id: "23iLEDPEJpcfYOw1tVhd2o",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "A Tale By Quincy",
    trackDuration: "01:36",
  },
  {
    id: "25C86uEjQ0fjj3bvsxIusO",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Out of Time",
    trackDuration: "03:34",
  },
  {
    id: "0khQeEwEv6GndVypzpGOG5",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Here We Go… Again (feat. Tyler, the Creator)",
    trackDuration: "03:29",
  },
  {
    id: "4cm7Ap6IWH6m8JyB9IXT3x",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Best Friends",
    trackDuration: "02:43",
  },
  {
    id: "37zcCimcUGurQoLEAuN8nR",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Is There Someone Else?",
    trackDuration: "03:19",
  },
  {
    id: "2022B8GxEstpvibwgbJ15s",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Starry Eyes",
    trackDuration: "02:28",
  },
  {
    id: "7q9Sr5kCkha0L49GAQctHl",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Every Angel is Terrifying",
    trackDuration: "02:47",
  },
  {
    id: "3TVnaEVbUBFmWYk9IOIwRo",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Don’t Break My Heart",
    trackDuration: "03:25",
  },
  {
    id: "7p2wRa4m9KVXEXUlkJLhUi",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "I Heard You're Married (feat. Lil Wayne)",
    trackDuration: "04:23",
  },
  {
    id: "02w1rM6spvEcbFxd63xCl2",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Less Than Zero",
    trackDuration: "03:31",
  },
  {
    id: "0DvtQkuaV0VrSHgb5pwRke",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Phantom Regret by Jim",
    trackDuration: "02:59",
  },
  {
    id: "1S9DHKpS73KFVN7nnIql3f",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Moth To A Flame (with The Weeknd)",
    trackDuration: "03:54",
  },
  {
    id: "1Jz0fAhw41suiAVekjAoLi",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Dawn FM - OPN Remix",
    trackDuration: "03:03",
  },
  {
    id: "2urqWNGpjl07PLAafoa5nT",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName:
      "How Do I Make You Love Me? - Sebastian Ingrosso & Salvatore Ganacci Remix",
    trackDuration: "03:37",
  },
  {
    id: "0QE33jkiMTzCI8momkDmQY",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM (Alternate World)",
    releaseDate: "2022-01-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ade87e5f9c3764f0a1e5df64",
    trackName: "Sacrifice (Remix) (feat. Swedish House Mafia)",
    trackDuration: "03:58",
  },
  {
    id: "6krYS8KtmNAYyb5uTZiYW4",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Dawn FM",
    trackDuration: "01:36",
  },
  {
    id: "3KyKxJ4P3pVCgaZwaq2rUC",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Gasoline",
    trackDuration: "03:32",
  },
  {
    id: "2Ghp894n1laIf2w98VeAOJ",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "How Do I Make You Love Me?",
    trackDuration: "03:34",
  },
  {
    id: "2vgUijXOTRMnWXDtvgMp2b",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Take My Breath",
    trackDuration: "05:39",
  },
  {
    id: "1nH2PkJL1XoUq8oE6tBZoU",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Sacrifice",
    trackDuration: "03:08",
  },
  {
    id: "759ndr57jb0URg4j9YSWml",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "A Tale By Quincy",
    trackDuration: "01:36",
  },
  {
    id: "2SLwbpExuoBDZBpjfefCtV",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Out of Time",
    trackDuration: "03:34",
  },
  {
    id: "1NhjYYcYTRywc0di98xHxf",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Here We Go… Again (feat. Tyler, the Creator)",
    trackDuration: "03:29",
  },
  {
    id: "1E5Xu8dur0fAjSP1VpVhAZ",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Best Friends",
    trackDuration: "02:43",
  },
  {
    id: "0mL82sxCRjrs3br407IdJh",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Is There Someone Else?",
    trackDuration: "03:19",
  },
  {
    id: "6zzdyvVWjGrQBraSvuqJPY",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Starry Eyes",
    trackDuration: "02:28",
  },
  {
    id: "3vJcz8exedHCjQ9ed95NqU",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Every Angel is Terrifying",
    trackDuration: "02:47",
  },
  {
    id: "6a4GH1gljLL7VvmO9u5O92",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Don’t Break My Heart",
    trackDuration: "03:25",
  },
  {
    id: "5XbA7TAqsD0fj0dGBrbb0D",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "I Heard You’re Married (feat. Lil Wayne)",
    trackDuration: "04:23",
  },
  {
    id: "2D4dV2KXDTszzJ3p3cFqhA",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Less Than Zero",
    trackDuration: "03:31",
  },
  {
    id: "1NlK2NtpuUazpziLhnJwEV",
    artistName: "The Weeknd",
    genres: ["pop"],
    popularity: 97,
    followers: 101882436,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    albumsName: "Dawn FM",
    releaseDate: "2022-01-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d",
    trackName: "Phantom Regret by Jim",
    trackDuration: "02:59",
  },
  {
    id: "4K09vJ27xCOreumtSuU6Ao",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "An Evening With Silk Sonic",
    releaseDate: "2021-11-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d0bbd3ea2ec554f17a6603cc",
    trackName: "Silk Sonic Intro",
    trackDuration: "01:03",
  },
  {
    id: "4pryE6cN2gFL1FVF5fYINl",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "An Evening With Silk Sonic",
    releaseDate: "2021-11-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d0bbd3ea2ec554f17a6603cc",
    trackName: "Leave The Door Open",
    trackDuration: "04:02",
  },
  {
    id: "7suB6D6uKX5DfPukdGaz0W",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "An Evening With Silk Sonic",
    releaseDate: "2021-11-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d0bbd3ea2ec554f17a6603cc",
    trackName: "Fly As Me",
    trackDuration: "03:39",
  },
  {
    id: "6jGAh1bFnXt1Muj9zeHveZ",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "An Evening With Silk Sonic",
    releaseDate: "2021-11-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d0bbd3ea2ec554f17a6603cc",
    trackName: "After Last Night (with Thundercat & Bootsy Collins)",
    trackDuration: "04:09",
  },
  {
    id: "1oERlssLrpssCAY6Yqqs6c",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "An Evening With Silk Sonic",
    releaseDate: "2021-11-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d0bbd3ea2ec554f17a6603cc",
    trackName: "Smokin Out The Window",
    trackDuration: "03:17",
  },
  {
    id: "5lka5RUbLVQGO94mKAPMRO",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "An Evening With Silk Sonic",
    releaseDate: "2021-11-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d0bbd3ea2ec554f17a6603cc",
    trackName: "Put On A Smile",
    trackDuration: "04:15",
  },
  {
    id: "2K6vUau7bnZUamjbRSOOvJ",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "An Evening With Silk Sonic",
    releaseDate: "2021-11-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d0bbd3ea2ec554f17a6603cc",
    trackName: "777",
    trackDuration: "02:45",
  },
  {
    id: "3WTWh2WDk4j8GUCGj4xfOd",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "An Evening With Silk Sonic",
    releaseDate: "2021-11-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d0bbd3ea2ec554f17a6603cc",
    trackName: "Skate",
    trackDuration: "03:23",
  },
  {
    id: "2ALh2jqA7KldpHMUHvRomw",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "An Evening With Silk Sonic",
    releaseDate: "2021-11-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d0bbd3ea2ec554f17a6603cc",
    trackName: "Love's Train",
    trackDuration: "05:07",
  },
  {
    id: "2NqyjfDXy0XfXCSPXMsKzi",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "An Evening With Silk Sonic",
    releaseDate: "2021-11-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d0bbd3ea2ec554f17a6603cc",
    trackName: "Blast Off",
    trackDuration: "04:44",
  },
  {
    id: "6b8Be6ljOzmkOmFslEb23P",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "24K Magic",
    releaseDate: "2016-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5",
    trackName: "24K Magic",
    trackDuration: "03:45",
  },
  {
    id: "0mBKv9DkYfQHjdMcw2jdyI",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "24K Magic",
    releaseDate: "2016-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5",
    trackName: "Chunky",
    trackDuration: "03:06",
  },
  {
    id: "1I6pKIyaBp4OebTGLJpCCC",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "24K Magic",
    releaseDate: "2016-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5",
    trackName: "Perm",
    trackDuration: "03:30",
  },
  {
    id: "0KKkJNfGyhkQ5aFogxQAPU",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "24K Magic",
    releaseDate: "2016-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5",
    trackName: "That's What I Like",
    trackDuration: "03:26",
  },
  {
    id: "0kN8xEmgMW9mh7UmDYHlJP",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "24K Magic",
    releaseDate: "2016-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5",
    trackName: "Versace on the Floor",
    trackDuration: "04:21",
  },
  {
    id: "2mrZYZGmPFV3QOyYPZ1zsn",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "24K Magic",
    releaseDate: "2016-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5",
    trackName: "Straight up & Down",
    trackDuration: "03:18",
  },
  {
    id: "6ObpR8ek44tvWefQRcSo8K",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "24K Magic",
    releaseDate: "2016-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5",
    trackName: "Calling All My Lovelies",
    trackDuration: "04:10",
  },
  {
    id: "5XMkENs3GfeRza8MfVAhjK",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "24K Magic",
    releaseDate: "2016-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5",
    trackName: "Finesse",
    trackDuration: "03:11",
  },
  {
    id: "0B0tYbVp7pDQAqKDhgMeaL",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "24K Magic",
    releaseDate: "2016-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5",
    trackName: "Too Good to Say Goodbye",
    trackDuration: "04:41",
  },
  {
    id: "3G5iN5QBqMeXx3uZPy8tgB",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Unorthodox Jukebox",
    releaseDate: "2012-12-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
    trackName: "Young Girls",
    trackDuration: "03:48",
  },
  {
    id: "3w3y8KPTfNeOKPiqUTakBh",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Unorthodox Jukebox",
    releaseDate: "2012-12-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
    trackName: "Locked out of Heaven",
    trackDuration: "03:53",
  },
  {
    id: "2ih2U8ttFzCjnQ5njF3SrR",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Unorthodox Jukebox",
    releaseDate: "2012-12-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
    trackName: "Gorilla",
    trackDuration: "04:04",
  },
  {
    id: "55h7vJchibLdUkxdlX3fK7",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Unorthodox Jukebox",
    releaseDate: "2012-12-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
    trackName: "Treasure",
    trackDuration: "02:58",
  },
  {
    id: "30raivfq7rSt5nKltiHfzG",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Unorthodox Jukebox",
    releaseDate: "2012-12-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
    trackName: "Moonshine",
    trackDuration: "03:48",
  },
  {
    id: "0nJW01T7XtvILxQgC5J7Wh",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Unorthodox Jukebox",
    releaseDate: "2012-12-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
    trackName: "When I Was Your Man",
    trackDuration: "03:33",
  },
  {
    id: "0inMKhbKWOTDA9UBUAKoU6",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Unorthodox Jukebox",
    releaseDate: "2012-12-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
    trackName: "Natalie",
    trackDuration: "03:45",
  },
  {
    id: "2tCPIp83mRXvVTytTAf1W4",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Unorthodox Jukebox",
    releaseDate: "2012-12-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
    trackName: "Show Me",
    trackDuration: "03:27",
  },
  {
    id: "6FPQabaldvKE5cjqRfY9Os",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Unorthodox Jukebox",
    releaseDate: "2012-12-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
    trackName: "Money Make Her Smile",
    trackDuration: "03:23",
  },
  {
    id: "7lXOqE38eCr979gp27O5wr",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Unorthodox Jukebox",
    releaseDate: "2012-12-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
    trackName: "If I Knew",
    trackDuration: "02:12",
  },
  {
    id: "4lLtanYk6tkMvooU0tWzG8",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "Grenade",
    trackDuration: "03:42",
  },
  {
    id: "47Slg6LuqLaX0VodpSCvPt",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "Just the Way You Are",
    trackDuration: "03:40",
  },
  {
    id: "4LjkHlY5qDz0hhFJJH5M7a",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "Our First Time",
    trackDuration: "04:03",
  },
  {
    id: "7hCNBVRhHzcsRAv0TQnOzq",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "Runaway Baby",
    trackDuration: "02:28",
  },
  {
    id: "386RUes7n1uM1yfzgeUuwp",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "The Lazy Song",
    trackDuration: "03:09",
  },
  {
    id: "6SKwQghsR8AISlxhcwyA9R",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "Marry You",
    trackDuration: "03:50",
  },
  {
    id: "1wVuPmvt6AWvTL5W2GJnzZ",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "Talking to the Moon",
    trackDuration: "03:37",
  },
  {
    id: "1ewMCmw7qCb5a9ttqiyemu",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "Liquor Store Blues (feat. Damian Marley)",
    trackDuration: "03:49",
  },
  {
    id: "3B5UbSndRz907IZhhmUfLi",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "Count on Me",
    trackDuration: "03:17",
  },
  {
    id: "78Z199FfQHt4VpnJzlYaIe",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "The Other Side (feat. CeeLo Green and B.o.B)",
    trackDuration: "03:48",
  },
  {
    id: "3P4v70V3Zt804r2c9dZivK",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "Somewhere in Brooklyn",
    trackDuration: "03:01",
  },
  {
    id: "6YKT5HoPwjTwhHiCNQsBMK",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Doo-Wops & Hooligans",
    releaseDate: "2010-05-11",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f60070dce96a2c1b70cf6ff0",
    trackName: "Talking to the Moon - Acoustic Piano",
    trackDuration: "03:37",
  },
  {
    id: "2FauI2onZLXgsr9dz6HWKn",
    artistName: "Bruno Mars",
    genres: ["pop"],
    popularity: 95,
    followers: 69490412,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    albumsName: "Fat Juicy & Wet",
    releaseDate: "2025-01-24",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f922561230918e636f4e130c",
    trackName: "Fat Juicy & Wet",
    trackDuration: "02:21",
  },
  {
    id: "2VdSktBqFfkW7y6q5Ik4Z4",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Supernova",
    trackDuration: "02:58",
  },
  {
    id: "5eWcGfUCrVFMoYskyfkEPE",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Armageddon",
    trackDuration: "03:16",
  },
  {
    id: "27LqJ29VMqwKQQC2CE9FHr",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Set The Tone",
    trackDuration: "03:22",
  },
  {
    id: "4AZ4Y1QAOLBwnWaX9cguoF",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Mine",
    trackDuration: "03:13",
  },
  {
    id: "4iSiRU5nGU7EP5TbkEEcsj",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Licorice",
    trackDuration: "02:38",
  },
  {
    id: "67yDGKXKIkyBhwbey8AmEU",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "BAHAMA",
    trackDuration: "03:10",
  },
  {
    id: "0u24lLekIGJ0CifIrHdD8N",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Long Chat (#♥)",
    trackDuration: "03:15",
  },
  {
    id: "4oBpXs4KppprE6ql0Dmr2O",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Prologue",
    trackDuration: "03:14",
  },
  {
    id: "1x1oCGsFUDViOvcISuoKW0",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Live My Life",
    trackDuration: "02:39",
  },
  {
    id: "4T5AbXz68PpZyKewHO5Tqw",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Armageddon - The 1st Album",
    releaseDate: "2024-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
    trackName: "Melody",
    trackDuration: "03:07",
  },
  {
    id: "5XWlyfo0kZ8LF7VSyfS4Ew",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "Drama",
    trackDuration: "03:34",
  },
  {
    id: "3EI3OLBeM89B0o0UsIGCOx",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "Trick or Trick",
    trackDuration: "02:55",
  },
  {
    id: "2uJEnyojuGg31VVlLTQFpp",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "Don't Blink",
    trackDuration: "02:49",
  },
  {
    id: "1mdtLny0zugh89vokWGG80",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "Hot Air Balloon",
    trackDuration: "03:18",
  },
  {
    id: "3OQWohbPUsvbXaH1AiRazX",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "YOLO",
    trackDuration: "03:09",
  },
  {
    id: "52qof5uEYA0TV0EpR7jNxs",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "You",
    trackDuration: "03:23",
  },
  {
    id: "330IIz7d75eqAsKq1xhzXR",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Drama - The 4th Mini Album",
    releaseDate: "2023-11-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c54e39f2ae0dd10731f93c08",
    trackName: "Better Things",
    trackDuration: "03:23",
  },
  {
    id: "07fqC2Puj13frv9iYtlcri",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Girls",
    trackDuration: "04:00",
  },
  {
    id: "2cGf0hmhkACTwRj58XNGlP",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "도깨비불 (Illusion)",
    trackDuration: "03:15",
  },
  {
    id: "3QXov5M0VLI3ROldfiSwj0",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Lingo",
    trackDuration: "02:36",
  },
  {
    id: "0WiadRUdgEIjgmYFAmTttb",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Life's Too Short",
    trackDuration: "02:58",
  },
  {
    id: "4jzrYUhlzXROpV5M944Yvu",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "ICU (쉬어가도 돼)",
    trackDuration: "03:41",
  },
  {
    id: "1AqyAbANWcx0B4f0WpYeM2",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Life's Too Short (English Version)",
    trackDuration: "02:58",
  },
  {
    id: "7v1X2PGU3uZXu7tzFTTsSh",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Black Mamba",
    trackDuration: "02:54",
  },
  {
    id: "4UVgc46bNblcuD6nj0RsXF",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Forever (약속)",
    trackDuration: "04:58",
  },
  {
    id: "7aLwuGyYNWKnxOSWXQK88V",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Girls - The 2nd Mini Album",
    releaseDate: "2022-07-08",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ea957604eae136d0681ceaff",
    trackName: "Dreams Come True",
    trackDuration: "03:24",
  },
  {
    id: "6uPnrBgweGOcwjFL4ItAvV",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Whiplash",
    trackDuration: "03:03",
  },
  {
    id: "7dYEUpcXJLDcI22m0dgmnH",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Kill It",
    trackDuration: "03:19",
  },
  {
    id: "1aRyIsgzfUdSGAGz8zgFR2",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Flights, Not Feelings",
    trackDuration: "03:01",
  },
  {
    id: "2Kf6WQmc6TU4bYIu3Szsz2",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Pink Hoodie",
    trackDuration: "02:26",
  },
  {
    id: "4u9cOL7R5OjAmlWkeEFXzf",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Flowers",
    trackDuration: "03:10",
  },
  {
    id: "3Oi1pDSYLVkz3i8jOXaQdt",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "Whiplash - The 5th Mini Album",
    releaseDate: "2024-10-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e467a8e8d7b0aa92d354aa75",
    trackName: "Just Another Girl",
    trackDuration: "03:04",
  },
  {
    id: "5sjnkOfTLCLNfkkchI2re2",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "SYNK : PARALLEL LINE - Special Digital Single",
    releaseDate: "2024-10-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273253096eda3b7826c11c7fab8",
    trackName: "UP - KARINA Solo",
    trackDuration: "02:46",
  },
  {
    id: "6pIuPm3u7QgUFAX1V0D9wY",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "SYNK : PARALLEL LINE - Special Digital Single",
    releaseDate: "2024-10-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273253096eda3b7826c11c7fab8",
    trackName: "Dopamine - GISELLE Solo",
    trackDuration: "03:14",
  },
  {
    id: "44qlcokPO2RjD8791ohJFR",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "SYNK : PARALLEL LINE - Special Digital Single",
    releaseDate: "2024-10-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273253096eda3b7826c11c7fab8",
    trackName: "Bored! - NINGNING Solo",
    trackDuration: "02:51",
  },
  {
    id: "2xoA126GEgFhrYzRaTH7E4",
    artistName: "aespa",
    genres: ["k-pop"],
    popularity: 79,
    followers: 8210001,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebf7a1090ad3a35a34fc0ecb57",
    albumsName: "SYNK : PARALLEL LINE - Special Digital Single",
    releaseDate: "2024-10-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273253096eda3b7826c11c7fab8",
    trackName: "Spark - WINTER Solo",
    trackDuration: "03:21",
  },
  {
    id: "45DB3yqxYGAnKN3YmLWbAX",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Running Wild",
    trackDuration: "02:31",
  },
  {
    id: "2SR0alFA2oWYXSoePGTj0V",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "I’ll Be There",
    trackDuration: "03:01",
  },
  {
    id: "6L4VgCOiyt8MzYfH4llkQg",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Another Level",
    trackDuration: "02:42",
  },
  {
    id: "5jxuw4S5IDEY6CjjAHvRAt",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Falling",
    trackDuration: "02:58",
  },
  {
    id: "0gzXQHsv4zYHQ1pvlyYZZa",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Heart on the Window (with WENDY)",
    trackDuration: "02:57",
  },
  {
    id: "79ldP0lRJABss2gUdH346e",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "I will come to you",
    trackDuration: "02:36",
  },
  {
    id: "2ub590isVV1Xy5u8JgBFuV",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Running Wild (Ballad Remix)",
    trackDuration: "02:23",
  },
  {
    id: "6X6b1RQFCkzhUCpHQlbOiW",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Running Wild (Holiday Remix)",
    trackDuration: "02:33",
  },
  {
    id: "3WcWE3cvBJpRoJSbrxrVkY",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Running Wild (Afropop Remix)",
    trackDuration: "02:29",
  },
  {
    id: "5xwyQy35cGlBuheV8fvutf",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :D (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730aa3d58774384527afb5df53",
    trackName: "Running Wild (UK Garage Remix)",
    trackDuration: "02:42",
  },
  {
    id: "50zAEIE4B1QqhPjRMK2Xmh",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Running Wild",
    trackDuration: "02:31",
  },
  {
    id: "5zOv7QzCMrSkPJKQr1Tcif",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "I’ll Be There",
    trackDuration: "03:01",
  },
  {
    id: "1YmY0HUm05BUpcHibc1bhB",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Another Level",
    trackDuration: "02:42",
  },
  {
    id: "5oSUmLelhXItguqPQ0Qn2b",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Falling",
    trackDuration: "02:58",
  },
  {
    id: "4qUmNOnS81p8wrMdBHRbS3",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Heart on the Window (with WENDY)",
    trackDuration: "02:57",
  },
  {
    id: "5s7flUAYsDmcUWtHsMCihv",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "I will come to you",
    trackDuration: "02:36",
  },
  {
    id: "6mbbLSTKMMG50xML4OzlVS",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Running Wild (Extended Ver.)",
    trackDuration: "03:34",
  },
  {
    id: "2L56YCM5eA8xWsUcGgo4zV",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Happy - :') (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302dd46d1f82ce19b5927b269",
    trackName: "Running Wild (Band Ver.)",
    trackDuration: "02:43",
  },
  {
    id: "4z0vfU3JiAsl99ZHL29hMm",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "When the Stars Gossip OST Part.3",
    releaseDate: "2025-01-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b850cdaf11ac8dd77591d423",
    trackName: "Close to You",
    trackDuration: "03:48",
  },
  {
    id: "6J48hy1freVjme4h7DFaDt",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "When the Stars Gossip OST Part.3",
    releaseDate: "2025-01-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b850cdaf11ac8dd77591d423",
    trackName: "Close to You (Inst.)",
    trackDuration: "03:48",
  },
  {
    id: "7HaUkQ34NYlOXFFspHeoG6",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Falling (feat. Taka)",
    releaseDate: "2024-11-25",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d3830c84379ff6c02c4a50ba",
    trackName: "Falling (feat. Taka)",
    trackDuration: "02:58",
  },
  {
    id: "1EEvAuVSb57ryIlNKuMWyr",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild",
    trackDuration: "02:31",
  },
  {
    id: "3WBkiZRpmyDBXIHi0o4xjK",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Instrumental)",
    trackDuration: "02:31",
  },
  {
    id: "6dCqghpYHuD1LqBloAzgDv",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Extended Ver.)",
    trackDuration: "03:34",
  },
  {
    id: "6mJRx8ghgw9QwJk0v5DfVj",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Band Ver.)",
    trackDuration: "02:43",
  },
  {
    id: "1XZeIqnzH8LKB1SmUL7tpy",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Ballad Remix)",
    trackDuration: "02:23",
  },
  {
    id: "1faf3hb79uGzk5a7O5H144",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Holiday Remix)",
    trackDuration: "02:33",
  },
  {
    id: "7uHAhFnUOfJXlDzfyvRJQD",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (Afropop Remix)",
    trackDuration: "02:29",
  },
  {
    id: "0K0lpwTATjvexmWWVURaZP",
    artistName: "Jin",
    genres: ["k-pop"],
    popularity: 78,
    followers: 8835583,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6d4ee2bb960bc4d9c0a4ce45",
    albumsName: "Running Wild (Remixes)",
    releaseDate: "2024-11-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730c89d58077469386be032492",
    trackName: "Running Wild (UK Garage Remix)",
    trackDuration: "02:42",
  },
  {
    id: "6dODwocEuGzHAavXqTbwHv",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "Fortnight (feat. Post Malone)",
    trackDuration: "03:48",
  },
  {
    id: "4PdLaGZubp4lghChqp8erB",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "The Tortured Poets Department",
    trackDuration: "04:53",
  },
  {
    id: "7uGYWMwRy24dm7RUDDhUlD",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "My Boy Only Breaks His Favorite Toys",
    trackDuration: "03:23",
  },
  {
    id: "1kbEbBdEgQdQeLXCJh28pJ",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "Down Bad",
    trackDuration: "04:21",
  },
  {
    id: "7wAkQFShJ27V8362MqevQr",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "So Long, London",
    trackDuration: "04:22",
  },
  {
    id: "4QMgEffJQuKtjCNvqfRZ0m",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "But Daddy I Love Him",
    trackDuration: "05:40",
  },
  {
    id: "7IWcDWOfiooH5hRs9XOVYz",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "Fresh Out The Slammer",
    trackDuration: "03:30",
  },
  {
    id: "5ExOm0dh4NyRyAdSAO9hyM",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "Florida!!! (feat. Florence + The Machine)",
    trackDuration: "03:35",
  },
  {
    id: "799KrpEbhZp0MHeiA8YK9P",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "Guilty as Sin?",
    trackDuration: "04:14",
  },
  {
    id: "2d8UxVNhJinc8uat9PoM9y",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "Who’s Afraid of Little Old Me?",
    trackDuration: "05:34",
  },
  {
    id: "5chnRTB9qMK3W1M41SnU9s",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "I Can Fix Him (No Really I Can)",
    trackDuration: "02:36",
  },
  {
    id: "3YkNIrAvbKNrrwwEd7NVLl",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "loml",
    trackDuration: "04:37",
  },
  {
    id: "2fPvQfGQEZOKtJ9qXeL4x8",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "I Can Do It With a Broken Heart",
    trackDuration: "03:38",
  },
  {
    id: "1xtw1krCR6Dw2KwkXw5z63",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "The Smallest Man Who Ever Lived",
    trackDuration: "04:05",
  },
  {
    id: "1tuNqJOtRQVHvONR8Lg3MZ",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "The Alchemy",
    trackDuration: "03:16",
  },
  {
    id: "4d9PtIEVij9jW5OaLinH66",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "Clara Bow",
    trackDuration: "03:36",
  },
  {
    id: "62E2nR0od0M5HYxuYLaDz7",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "The Black Dog",
    trackDuration: "03:58",
  },
  {
    id: "1kcwpPDQnqEqmezzXdJTCP",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "imgonnagetyouback",
    trackDuration: "03:42",
  },
  {
    id: "4EF6IyONolQy0bIQXm2EmX",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "The Albatross",
    trackDuration: "03:03",
  },
  {
    id: "1rmEsOezwf2lmIZTMAO5Ag",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
    releaseDate: "2024-04-19",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    trackName: "Chloe or Sam or Sophia or Marcus",
    trackDuration: "03:33",
  },
  {
    id: "2OzhQlSqBEmt7hmkYxfT6m",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "Fortnight (feat. Post Malone)",
    trackDuration: "03:48",
  },
  {
    id: "3NMrVbIVWT3fPXBj0rNDKG",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "The Tortured Poets Department",
    trackDuration: "04:53",
  },
  {
    id: "2XXwLdtuAcE0HSCu61ijAb",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "My Boy Only Breaks His Favorite Toys",
    trackDuration: "03:23",
  },
  {
    id: "2F3N9tdombb64aW6VtZOdo",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "Down Bad",
    trackDuration: "04:21",
  },
  {
    id: "3Vevii7qKqrmW8CcyzBHDl",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "So Long, London",
    trackDuration: "04:22",
  },
  {
    id: "5og4Qzt92jJzVDkOtSEilb",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "But Daddy I Love Him",
    trackDuration: "05:40",
  },
  {
    id: "3fO566xJgwxIa3qGCGBvIC",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "Fresh Out The Slammer",
    trackDuration: "03:30",
  },
  {
    id: "3ZVFcD8Wlw9T9klGqmJf9F",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "Florida!!! (feat. Florence + The Machine)",
    trackDuration: "03:35",
  },
  {
    id: "0W0iAC1VGlB82PI6elxFYf",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "Guilty as Sin?",
    trackDuration: "04:14",
  },
  {
    id: "36t6frENUtCYKuZus6aYDO",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "Who’s Afraid of Little Old Me?",
    trackDuration: "05:34",
  },
  {
    id: "2h3MDMf8sd9s4XIzpTBIjX",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "I Can Fix Him (No Really I Can)",
    trackDuration: "02:36",
  },
  {
    id: "6RSG1dKPV5gEvILwJb4QtS",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "loml",
    trackDuration: "04:37",
  },
  {
    id: "4q5YezDOIPcoLr8R81x9qy",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "I Can Do It With a Broken Heart",
    trackDuration: "03:38",
  },
  {
    id: "2v1ivOOsgn64g5OywuH55L",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "The Smallest Man Who Ever Lived",
    trackDuration: "04:05",
  },
  {
    id: "1dhMTsEZz6ZEquGvmzVoHn",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "The Alchemy",
    trackDuration: "03:16",
  },
  {
    id: "1UlhrRvYzbHEyugEDspXUB",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "THE TORTURED POETS DEPARTMENT",
    releaseDate: "2024-04-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33",
    trackName: "Clara Bow",
    trackDuration: "03:36",
  },
  {
    id: "4WUepByoeqcedHoYhSNHRt",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Welcome To New York (Taylor's Version)",
    trackDuration: "03:32",
  },
  {
    id: "0108kcWLnn2HlH2kedi1gn",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Blank Space (Taylor's Version)",
    trackDuration: "03:51",
  },
  {
    id: "3Vpk1hfMAQme8VJ0SNRSkd",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Style (Taylor's Version)",
    trackDuration: "03:51",
  },
  {
    id: "1OcSfkeCg9hRC2sFKB4IMJ",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Out Of The Woods (Taylor's Version)",
    trackDuration: "03:55",
  },
  {
    id: "2k0ZEeAqzvYMcx9Qt5aClQ",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "All You Had To Do Was Stay (Taylor's Version)",
    trackDuration: "03:13",
  },
  {
    id: "50yNTF0Od55qnHLxYsA5Pw",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Shake It Off (Taylor's Version)",
    trackDuration: "03:39",
  },
  {
    id: "3FxJDucHWdw6caWTKO5b23",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "I Wish You Would (Taylor's Version)",
    trackDuration: "03:27",
  },
  {
    id: "7oZONwFiFIErZcXAtTu7FY",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Bad Blood (Taylor's Version)",
    trackDuration: "03:31",
  },
  {
    id: "27exgla7YBw9DUNNcTIpjy",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Wildest Dreams (Taylor's Version)",
    trackDuration: "03:40",
  },
  {
    id: "733OhaXQIHY7BKtY3vnSkn",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "How You Get The Girl (Taylor's Version)",
    trackDuration: "04:07",
  },
  {
    id: "4WBEj8TeGtRPNJdOmT3WJW",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "This Love (Taylor’s Version)",
    trackDuration: "04:10",
  },
  {
    id: "1ULabO0PEsdJekqVH6G10G",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "I Know Places (Taylor's Version)",
    trackDuration: "03:15",
  },
  {
    id: "0lKUBmEyQfzsQHozyeXzES",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Clean (Taylor's Version)",
    trackDuration: "04:31",
  },
  {
    id: "6HRsJu8vcnzYDN4t0570FY",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Wonderland (Taylor's Version)",
    trackDuration: "04:05",
  },
  {
    id: "0TyGh27YQ5LknmiDhCzJiT",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "You Are In Love (Taylor's Version)",
    trackDuration: "04:27",
  },
  {
    id: "5M787RexsAiVYjQusM98CV",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "New Romantics (Taylor's Version)",
    trackDuration: "03:50",
  },
  {
    id: "0CD7DzeCsuPJygddqlUVYa",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: '"Slut!" (Taylor\'s Version) (From The Vault)',
    trackDuration: "03:00",
  },
  {
    id: "3CCRVu4F91Qp2mnGjmWBrf",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Say Don't Go (Taylor's Version) (From The Vault)",
    trackDuration: "04:39",
  },
  {
    id: "5QUIK7ZtziW8kGWo8RqopF",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Now That We Don't Talk (Taylor's Version) (From The Vault)",
    trackDuration: "02:26",
  },
  {
    id: "6M9ppdfFjR1AbpUl3Y8DcV",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version) [Deluxe]",
    releaseDate: "2023-10-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273dc2bacae1dca83d26e2b1949",
    trackName: "Suburban Legends (Taylor's Version) (From The Vault)",
    trackDuration: "02:51",
  },
  {
    id: "1hR8BSuEqPCCZfv93zzzz9",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Welcome To New York (Taylor's Version)",
    trackDuration: "03:32",
  },
  {
    id: "45wMBGri1PORPjM9PwFfrS",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Blank Space (Taylor's Version)",
    trackDuration: "03:51",
  },
  {
    id: "1hjRhYpWyqDpPahmSlUTlc",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Style (Taylor's Version)",
    trackDuration: "03:51",
  },
  {
    id: "045ZeOHPIzhxxsm8bq5kyE",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Out Of The Woods (Taylor's Version)",
    trackDuration: "03:55",
  },
  {
    id: "6GXgd1BPD9bUpqw5AntGV5",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "All You Had To Do Was Stay (Taylor's Version)",
    trackDuration: "03:13",
  },
  {
    id: "3pv7Q5v2dpdefwdWIvE7yH",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Shake It Off (Taylor's Version)",
    trackDuration: "03:39",
  },
  {
    id: "43y1WpBdnEy5TR9aZoSQL9",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "I Wish You Would (Taylor's Version)",
    trackDuration: "03:27",
  },
  {
    id: "64FzgoLZ3oXu2SriZblHic",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Bad Blood (Taylor's Version)",
    trackDuration: "03:31",
  },
  {
    id: "1K39ty6o1sHwwlZwO6a7wK",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Wildest Dreams (Taylor's Version)",
    trackDuration: "03:40",
  },
  {
    id: "75W3SngKzTuoQ94uLf3y82",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "How You Get The Girl (Taylor's Version)",
    trackDuration: "04:07",
  },
  {
    id: "5QVVjX0ZItqlVpEuVCM9Yg",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "This Love (Taylor’s Version)",
    trackDuration: "04:10",
  },
  {
    id: "2f0GI2ZLUtbGqFx8t2Gk6A",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "I Know Places (Taylor's Version)",
    trackDuration: "03:15",
  },
  {
    id: "2ByBBvpR9b7IynvRmnG7kG",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Clean (Taylor's Version)",
    trackDuration: "04:31",
  },
  {
    id: "2ve0kuaWUCt4Zx8x4bf1MR",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Wonderland (Taylor's Version)",
    trackDuration: "04:05",
  },
  {
    id: "4UwqOWDpdeIDVQDuKT6iza",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "You Are In Love (Taylor's Version)",
    trackDuration: "04:27",
  },
  {
    id: "2vPMoMDXxu9uX1igWZmXSG",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "New Romantics (Taylor's Version)",
    trackDuration: "03:50",
  },
  {
    id: "71BqAINEnezjQfxE4VuJfq",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: '"Slut!" (Taylor\'s Version) (From The Vault)',
    trackDuration: "03:00",
  },
  {
    id: "4NioO5R9sHEZh4cGzMHyNt",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Say Don't Go (Taylor's Version) (From The Vault)",
    trackDuration: "04:39",
  },
  {
    id: "5KD6AEm19QnMbfWpfoOHMl",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Now That We Don't Talk (Taylor's Version) (From The Vault)",
    trackDuration: "02:26",
  },
  {
    id: "6T0sEnqjmHISIKwFETeeiP",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "1989 (Taylor's Version)",
    releaseDate: "2023-10-26",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac",
    trackName: "Suburban Legends (Taylor's Version) (From The Vault)",
    trackDuration: "02:51",
  },
  {
    id: "7G0gBu6nLdhFDPRLc0HdDG",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Mine (Taylor's Version)",
    trackDuration: "03:51",
  },
  {
    id: "3MytWN8L7shNYzGl4tAKRp",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Sparks Fly (Taylor’s Version)",
    trackDuration: "04:21",
  },
  {
    id: "79uDOz0zuuWS7HWxzMmTa2",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Back To December (Taylor's Version)",
    trackDuration: "04:54",
  },
  {
    id: "5xXqyjLicvEpch72qEryFT",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Speak Now (Taylor's Version)",
    trackDuration: "04:02",
  },
  {
    id: "1zU8j1x3yi9xalMF96pzKp",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Dear John (Taylor's Version)",
    trackDuration: "06:45",
  },
  {
    id: "30Y4CV7A6YqtQtTTo7Ue4j",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Mean (Taylor's Version)",
    trackDuration: "03:58",
  },
  {
    id: "6dTA6y0C2ReQklntzZl8l3",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "The Story Of Us (Taylor's Version)",
    trackDuration: "04:27",
  },
  {
    id: "2EFZ9emtKWEglWUQGEQ3P9",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Never Grow Up (Taylor's Version)",
    trackDuration: "04:52",
  },
  {
    id: "3sW3oSbzsfecv9XoUdGs7h",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Enchanted (Taylor's Version)",
    trackDuration: "05:53",
  },
  {
    id: "0NwGC0v03ysCYINtg6ns58",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Better Than Revenge (Taylor's Version)",
    trackDuration: "03:40",
  },
  {
    id: "12nBPF4Rh4XLFJV0YLN7uj",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Innocent (Taylor's Version)",
    trackDuration: "05:01",
  },
  {
    id: "4tMzIAFTFdqGBQLdfbPces",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Haunted (Taylor's Version)",
    trackDuration: "04:05",
  },
  {
    id: "59KOoHFcw5XfICnO57holu",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Last Kiss (Taylor's Version)",
    trackDuration: "06:09",
  },
  {
    id: "4hqJ4bSlYJOXb6Z4SRmzxs",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Long Live (Taylor's Version)",
    trackDuration: "05:17",
  },
  {
    id: "3yNJkriPzWjkkDAWHIAVUq",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Ours (Taylor’s Version)",
    trackDuration: "03:55",
  },
  {
    id: "4evLyY5Ue1Wesc61t2KXAU",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "Superman (Taylor’s Version)",
    trackDuration: "04:34",
  },
  {
    id: "4e3ZNTAV6PCrdYMUrUlMpQ",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName:
      "Electric Touch (feat. Fall Out Boy) (Taylor’s Version) (From The Vault)",
    trackDuration: "04:26",
  },
  {
    id: "0zo975x58DlXbZllWvfYhg",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "When Emma Falls in Love (Taylor’s Version) (From The Vault)",
    trackDuration: "04:12",
  },
  {
    id: "5kHMfzgLZP95O9NBy0ku4v",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName: "I Can See You (Taylor’s Version) (From The Vault)",
    trackDuration: "04:33",
  },
  {
    id: "4ABYxlb92WBIjHu7TIKmml",
    artistName: "Taylor Swift",
    genres: ["pop"],
    popularity: 97,
    followers: 134306373,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    albumsName: "Speak Now (Taylor's Version)",
    releaseDate: "2023-07-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730b04da4f224b51ff86e0a481",
    trackName:
      "Castles Crumbling (feat. Hayley Williams) (Taylor’s Version) (From The Vault)",
    trackDuration: "05:06",
  },
  {
    id: "0OaHZgVm77zLQNR3kwFf6n",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "Dangerous",
    trackDuration: "02:23",
  },
  {
    id: "1t4a4bAObtfBiiNo0a0vle",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "Gonna Be A Rock",
    trackDuration: "03:17",
  },
  {
    id: "52NdZoytptz6k8oMtDWtzX",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "SKIT",
    trackDuration: "01:06",
  },
  {
    id: "6pqyZNnLKyJKtrlf42FQoq",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "Nice Guy",
    trackDuration: "02:44",
  },
  {
    id: "0Pd79ZmfbrE6690cuN9fHC",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "20",
    trackDuration: "02:48",
  },
  {
    id: "1Oa2zQLfI44pN76mZgAoqT",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "Call Me",
    trackDuration: "02:58",
  },
  {
    id: "7n3rgZ7GWmoVwhDrrF41Rn",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "19.99",
    releaseDate: "2024-09-09",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27381909c1add057c602193daab",
    trackName: "Nice Guy (English Ver.)",
    trackDuration: "02:44",
  },
  {
    id: "54wqX30KnwGZdLmi8r0Wgo",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "OUR",
    trackDuration: "02:36",
  },
  {
    id: "1w1kvWFdm3u0GgkG9VSFGH",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "Amnesia",
    trackDuration: "02:50",
  },
  {
    id: "7x9s9KVpMOrQ2z2fzOGo8z",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "So let's go see the stars",
    trackDuration: "03:22",
  },
  {
    id: "0Tq7v8YAmwdnAYBwyR1pZ4",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "Earth, Wind & Fire",
    trackDuration: "02:59",
  },
  {
    id: "7rXUWfUAaOmPNHS7cwfTL2",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "l i f e i s c o o l",
    trackDuration: "03:18",
  },
  {
    id: "4gHBVNtx6Kh5F97GoIg0fq",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "Dear. My Darling",
    trackDuration: "01:40",
  },
  {
    id: "7sEkQPK4bxBum9CoAp5Onl",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "HOW?",
    releaseDate: "2024-04-15",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273991e46e8843796184d9606d7",
    trackName: "Earth, Wind & Fire (English Ver.)",
    trackDuration: "02:59",
  },
  {
    id: "1cgtNgk0bkBjKaHmhes7f0",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName:
      "Never Loved This Way Before (Odd Girl Out X BOYNEXTDOOR) [Original Soundtrack]",
    releaseDate: "2025-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d853fd935616b3f2d674caa5",
    trackName: "Never Loved This Way Before",
    trackDuration: "04:25",
  },
  {
    id: "47vaCu7VXBxOZrtt7MVlH3",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName:
      "Never Loved This Way Before (Odd Girl Out X BOYNEXTDOOR) [Original Soundtrack]",
    releaseDate: "2025-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d853fd935616b3f2d674caa5",
    trackName: "Never Loved This Way Before - Inst.",
    trackDuration: "04:25",
  },
  {
    id: "7DPrrI5VUfCI0TslImBQDc",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "It's Beginning To Look A Lot Like Christmas",
    releaseDate: "2025-02-03",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2733f3bc66394a60aa9d95b3f62",
    trackName: "It's Beginning To Look A Lot Like Christmas",
    trackDuration: "02:13",
  },
  {
    id: "61MgNE2WKJh27wRgw1zuFI",
    artistName: "BOYNEXTDOOR",
    genres: ["k-pop"],
    popularity: 70,
    followers: 1309759,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebcfdb5b7a40a359345dc49270",
    albumsName: "IF I SAY, I LOVE YOU (Japanese Version)",
    releaseDate: "2025-01-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27344744239930f871bf30c1eba",
    trackName: "IF I SAY, I LOVE YOU - Japanese Version",
    trackDuration: "02:41",
  },
  {
    id: "0XbHqCn0SIBKLaZvZWPPII",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "Deep in Love",
    trackDuration: "03:47",
  },
  {
    id: "3G3c7sWlKSv12ft9TGy3D0",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "Sweet Chaos",
    trackDuration: "03:47",
  },
  {
    id: "3SRBulKSpzAhdmkfDQLMoA",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "EMERGENCY",
    trackDuration: "03:17",
  },
  {
    id: "1Kuk3gJSZO6bci1TM5byIh",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "Rescue Me",
    trackDuration: "03:21",
  },
  {
    id: "6CUx9eLEzPayC722kcZ06L",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "365247",
    trackDuration: "02:53",
  },
  {
    id: "5wq51Xh3FVP3d5cvEFuTbU",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "지금쯤",
    trackDuration: "02:59",
  },
  {
    id: "6HTWcnxSBP0deTtyoX67vl",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "아야야",
    trackDuration: "03:17",
  },
  {
    id: "65Ru3CZvxISXgmKHEscQeJ",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "Not Fine (나빠)",
    trackDuration: "03:35",
  },
  {
    id: "68z5zvtHbNji2SgPM0LKof",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "막말",
    trackDuration: "03:46",
  },
  {
    id: "3D9imDVFZ58EjgIe6XVu3M",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "Not Mine",
    trackDuration: "03:15",
  },
  {
    id: "63SkuEP4wJNMgg7SovncQc",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "The Book of Us : Entropy",
    releaseDate: "2019-10-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e3f3b11777ef77dcf72d9cd2",
    trackName: "마치 흘러가는 바람처럼",
    trackDuration: "03:22",
  },
  {
    id: "3TwVNsQwKqPuLUgVctugum",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "Better Better",
    trackDuration: "03:30",
  },
  {
    id: "3Xbp3hF6DOjfjixm707B0i",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "좋아합니다",
    trackDuration: "04:00",
  },
  {
    id: "43AQ3dY0lOge0dKRQNQ2qx",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "좋은걸 뭐 어떡해",
    trackDuration: "03:52",
  },
  {
    id: "5GKiaClanFqql87PpVq94G",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "남겨둘게",
    trackDuration: "03:54",
  },
  {
    id: "2SZsyEzCNp6C8oCdQYuMfQ",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "놀래!",
    trackDuration: "03:16",
  },
  {
    id: "2PVAEjSJw2KPdY6vYJW4g4",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "Be Lazy",
    trackDuration: "03:14",
  },
  {
    id: "1UjbGZK9k48SsCAtMWa4In",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "Hi Hello",
    trackDuration: "03:52",
  },
  {
    id: "6pXrKg2fKzRICc0SghWrTl",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "I Loved You",
    trackDuration: "03:54",
  },
  {
    id: "419Oc8GGyLPEpR6UNWgdqO",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "그렇더라고요",
    trackDuration: "03:46",
  },
  {
    id: "0OqxKqWVtehnFPhosPnsGQ",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "혼자야",
    trackDuration: "03:44",
  },
  {
    id: "1nFJ78pqJW8GBIxqqx6RYu",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "쏟아진다",
    trackDuration: "04:05",
  },
  {
    id: "18KrJhfAdDpXbGB4xoTWBj",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "누군가 필요해",
    trackDuration: "03:38",
  },
  {
    id: "4rHyldhPUWBot22JmVpmZb",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "MOONRISE",
    releaseDate: "2017-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bfd1ec8181e0446123237a89",
    trackName: "노력해볼게요",
    trackDuration: "03:43",
  },
  {
    id: "6i1PzZO32sfJMvTvVx23sK",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "오늘은 내게",
    trackDuration: "03:29",
  },
  {
    id: "7tkQWycd9o8c4JVW5BG6p8",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "반드시 웃는다",
    trackDuration: "03:47",
  },
  {
    id: "1vGoAFGWSDMZkpZCqSYsu8",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "Man in a Movie",
    trackDuration: "03:46",
  },
  {
    id: "4b6PRYBb9LjvaaI7sGvH8i",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "아 왜 (I Wait)",
    trackDuration: "03:38",
  },
  {
    id: "1gakoxacOGcAA4K9HjXkdU",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "어떻게 말해",
    trackDuration: "03:21",
  },
  {
    id: "0wuqq3gYZikqRbneejkBVQ",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "놓아 놓아 놓아 - Rebooted Ver.",
    trackDuration: "04:14",
  },
  {
    id: "6BOK6dVXcXVoQkr9duErE0",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "그럴 텐데",
    trackDuration: "03:43",
  },
  {
    id: "0mXcNZr47c20zd4yEXDQlj",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "겨울이 간다",
    trackDuration: "03:07",
  },
  {
    id: "5Bv2De7EzaryH40FUz0wMh",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "장난 아닌데",
    trackDuration: "03:14",
  },
  {
    id: "1Qc7n76Tqmaj7KnhYMTMMN",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "Say Wow",
    trackDuration: "03:09",
  },
  {
    id: "4cJQcQQDLdPWy6YcmsxkVZ",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "DANCE DANCE",
    trackDuration: "03:43",
  },
  {
    id: "0w55rt5Hi2orJ8IWCU6EDq",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "My Day",
    trackDuration: "03:00",
  },
  {
    id: "3HAkoNmThZhyFejhpRXXYI",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "예뻤어",
    trackDuration: "04:43",
  },
  {
    id: "2vyNjrBXARiT1BXBQ9sCHB",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "SUNRISE",
    releaseDate: "2017-06-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b3773dc742bde1298ea9399f",
    trackName: "Congratulations - Final Ver.",
    trackDuration: "03:49",
  },
  {
    id: "4a4pBfIkHEUAYRdJHQX73G",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Band Aid",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342e0fe9e101c705fe7edf5a2",
    trackName: "괴물 Monster",
    trackDuration: "03:36",
  },
  {
    id: "5Invv3m92xZvztdCbZrmZ6",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Band Aid",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342e0fe9e101c705fe7edf5a2",
    trackName: "녹아내려요 Melt Down",
    trackDuration: "02:45",
  },
  {
    id: "0KluOoZx03KC3NucRSm8n4",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Band Aid",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342e0fe9e101c705fe7edf5a2",
    trackName: "그녀가 웃었다 She Smiled",
    trackDuration: "03:22",
  },
  {
    id: "3HC3QgThjUtZcqiHM0neAJ",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Band Aid",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342e0fe9e101c705fe7edf5a2",
    trackName: "망겜 Shxtty Game",
    trackDuration: "03:09",
  },
  {
    id: "49mntFe7XtS9Zut6ySEdtw",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Band Aid",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342e0fe9e101c705fe7edf5a2",
    trackName: "도와줘요 Rock&Roll Help Me Rock&Roll",
    trackDuration: "02:36",
  },
  {
    id: "2qKBDTag2pLh9aJwKTyB6M",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Band Aid",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342e0fe9e101c705fe7edf5a2",
    trackName: "COUNTER",
    trackDuration: "02:58",
  },
  {
    id: "1l8MduTqOzwfr9f53JY5o1",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Band Aid",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342e0fe9e101c705fe7edf5a2",
    trackName: "I'm Fine",
    trackDuration: "03:15",
  },
  {
    id: "0PtsUJhLbQUlnfCleLUFHl",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Band Aid",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27342e0fe9e101c705fe7edf5a2",
    trackName: "아직 거기 살아 Still There",
    trackDuration: "03:19",
  },
  {
    id: "1Mr0PGyergfMZ7swKiWiBP",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Psycho, Loveholic [THE SEASONS: Red Carpet with Lee Hyo Ri]",
    releaseDate: "2024-03-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734986931fbb88f0db947335cd",
    trackName: "Psycho",
    trackDuration: "03:32",
  },
  {
    id: "66cl9dpkfm7WMJcfufL0Tu",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Psycho, Loveholic [THE SEASONS: Red Carpet with Lee Hyo Ri]",
    releaseDate: "2024-03-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734986931fbb88f0db947335cd",
    trackName: "Loveholic",
    trackDuration: "03:38",
  },
  {
    id: "0mP5g0VVh3TenBszcphqM9",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Psycho, Loveholic [THE SEASONS: Red Carpet with Lee Hyo Ri]",
    releaseDate: "2024-03-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734986931fbb88f0db947335cd",
    trackName: "Psycho - Instrumental",
    trackDuration: "03:32",
  },
  {
    id: "110Xlv114Asg9s4Ujhf8aD",
    artistName: "DAY6",
    genres: ["k-rock", "k-pop"],
    popularity: 69,
    followers: 3643769,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb10e83b0ca558533d0f3c376c",
    albumsName: "Psycho, Loveholic [THE SEASONS: Red Carpet with Lee Hyo Ri]",
    releaseDate: "2024-03-31",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734986931fbb88f0db947335cd",
    trackName: "Loveholic - Instrumental",
    trackDuration: "03:38",
  },
  {
    id: "1IthE5GNiRzFN5CVaCa445",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Born Singer",
    trackDuration: "03:58",
  },
  {
    id: "27S8iOXD7Z58yvJtyk2S9j",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "No More Dream",
    trackDuration: "03:42",
  },
  {
    id: "2GEnvQgSJhedm2sqZlOP8o",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "N.O",
    trackDuration: "03:29",
  },
  {
    id: "0vMk4IrUfSJQkhwZnVX6us",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Boy In Luv",
    trackDuration: "03:51",
  },
  {
    id: "0Q53fuiKLGjDKD7Mme7EoQ",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Danger",
    trackDuration: "04:05",
  },
  {
    id: "1GunnGtZCSjLUAPG6yrDUC",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "I NEED U",
    trackDuration: "03:30",
  },
  {
    id: "20Qqyt4bd1oe4KmkTagb2K",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "RUN",
    trackDuration: "03:56",
  },
  {
    id: "5cQPIQAF2T1elxWs7EqB9W",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Burning Up (FIRE)",
    trackDuration: "03:23",
  },
  {
    id: "1wiqEFd8phSCSlteDLSyp2",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Blood Sweat & Tears",
    trackDuration: "03:37",
  },
  {
    id: "4upRoEWkMWhhMfEgPZMFRP",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Spring Day",
    trackDuration: "04:34",
  },
  {
    id: "2Ygw4CPjg1lg4zxTITYY2V",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "DNA",
    trackDuration: "03:43",
  },
  {
    id: "3YspylwDrs1LuzPONbKmAL",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "FAKE LOVE",
    trackDuration: "04:02",
  },
  {
    id: "0KCvsHmGvW2XcsxEWJvLPr",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "IDOL",
    trackDuration: "03:42",
  },
  {
    id: "07qrA1FxZpXy383wX3IDEb",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Boy With Luv (Feat. Halsey)",
    trackDuration: "03:49",
  },
  {
    id: "0U4hNZFJYNFdEAXZcHbkkc",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "ON",
    trackDuration: "04:06",
  },
  {
    id: "1hIuSG6xV4RDgD8bDVKP7N",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Dynamite",
    trackDuration: "03:19",
  },
  {
    id: "1VjqXwHU3isibdXLEtXc4q",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Life Goes On",
    trackDuration: "03:28",
  },
  {
    id: "6jjYDGxVJsWS0a5wlVF5vS",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Butter",
    trackDuration: "02:44",
  },
  {
    id: "10SRMwb9EuVS1K9rYsBfHQ",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Yet To Come",
    trackDuration: "03:13",
  },
  {
    id: "69xohKu8C1fsflYAiSNbwM",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "Proof",
    releaseDate: "2022-06-10",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49",
    trackName: "Run BTS",
    trackDuration: "03:24",
  },
  {
    id: "2klid0zSCvIkOjXa0EKbVd",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "BE",
    releaseDate: "2020-11-20",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273184d20129ccf5aafcc776d11",
    trackName: "Life Goes On",
    trackDuration: "03:27",
  },
  {
    id: "5JcUAMvjUUM0z3OVIcnuvM",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "BE",
    releaseDate: "2020-11-20",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273184d20129ccf5aafcc776d11",
    trackName: "내 방을 여행하는 법",
    trackDuration: "03:42",
  },
  {
    id: "7jn7Twa2blnw4sx8w9Igu9",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "BE",
    releaseDate: "2020-11-20",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273184d20129ccf5aafcc776d11",
    trackName: "Blue & Grey",
    trackDuration: "04:14",
  },
  {
    id: "5WAiTRzC981eOxgldlxVd5",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "BE",
    releaseDate: "2020-11-20",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273184d20129ccf5aafcc776d11",
    trackName: "Skit",
    trackDuration: "02:59",
  },
  {
    id: "6XesM5tApm8ARWMjoD1EMm",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "BE",
    releaseDate: "2020-11-20",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273184d20129ccf5aafcc776d11",
    trackName: "잠시",
    trackDuration: "03:22",
  },
  {
    id: "6aGtSx8xkaDULmxdx92gkO",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "BE",
    releaseDate: "2020-11-20",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273184d20129ccf5aafcc776d11",
    trackName: "병",
    trackDuration: "03:59",
  },
  {
    id: "7izAEpXmZjjmvKKYuoSLRP",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "BE",
    releaseDate: "2020-11-20",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273184d20129ccf5aafcc776d11",
    trackName: "Stay",
    trackDuration: "03:24",
  },
  {
    id: "5aHwYjiSGgJAxy10mBMlDT",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "BE",
    releaseDate: "2020-11-20",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273184d20129ccf5aafcc776d11",
    trackName: "Dynamite",
    trackDuration: "03:19",
  },
  {
    id: "5raJ9QoZOdoRZ1MZOcygkR",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "INTRO : Calling",
    trackDuration: "01:24",
  },
  {
    id: "3Ys2PYl1wyPKQIwyqhP9cQ",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "Stay Gold",
    trackDuration: "04:03",
  },
  {
    id: "1GAAUZBTaIM1LwNpOJQJrZ",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "Boy With Luv - Japanese ver.",
    trackDuration: "03:50",
  },
  {
    id: "6P0Ni8GrnwRScC4uk8tKqM",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "Make It Right - Japanese ver.",
    trackDuration: "03:45",
  },
  {
    id: "6j0NiWoRQDiNC05RwVVZNa",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "Dionysus - Japanese ver.",
    trackDuration: "04:08",
  },
  {
    id: "2vYF5MHeCNtqCVastthDAo",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "IDOL - Japanese ver.",
    trackDuration: "03:43",
  },
  {
    id: "4EeVAiJtyblHzvkN9sZCmM",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "Airplane pt.2 - Japanese ver.",
    trackDuration: "03:40",
  },
  {
    id: "4jTEbIwCMcHSwlSEiR4NlQ",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "FAKE LOVE - Japanese ver.",
    trackDuration: "04:03",
  },
  {
    id: "5smmjzMNkj4YSacTBH6taZ",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "Black Swan - Japanese ver.",
    trackDuration: "03:18",
  },
  {
    id: "2hhizKAVm9wNn0d2N05jkG",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "ON - Japanese ver.",
    trackDuration: "04:07",
  },
  {
    id: "3TDUktzfYXMWjkWqwoT5F1",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "Lights",
    trackDuration: "04:52",
  },
  {
    id: "3TZ7NHkMT82AhwuYsd00Hz",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "Your eyes tell",
    trackDuration: "04:05",
  },
  {
    id: "0VF357Gjay5vvCqWA1kSu6",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7 ~ THE JOURNEY ~",
    releaseDate: "2020-07-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273da9c76ed020a7894443a3f97",
    trackName: "OUTRO : The Journey",
    trackDuration: "01:16",
  },
  {
    id: "2xKpEiPm7SWJTxUJgUI7Wg",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Intro : Persona",
    trackDuration: "02:51",
  },
  {
    id: "5sF9xwCDidhTovLRrr22sT",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "작은 것들을 위한 시 (Boy With Luv) [feat. Halsey]",
    trackDuration: "03:49",
  },
  {
    id: "0nAK07NX5OQYibxYZJKthX",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Make It Right",
    trackDuration: "03:46",
  },
  {
    id: "1Gz07U8Hhet3cVEeeqVel6",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Jamais Vu",
    trackDuration: "03:47",
  },
  {
    id: "6n0nzGXOD3mbJwX8tvkOqA",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Dionysus",
    trackDuration: "04:09",
  },
  {
    id: "6dTQxiNU1qc0ob4BV9AxrH",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Interlude : Shadow",
    trackDuration: "04:19",
  },
  {
    id: "31UyoQYfXdquugSTclaPG1",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Black Swan",
    trackDuration: "03:18",
  },
  {
    id: "1MIUb1YqTmBRnZrSxgxXEd",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Filter",
    trackDuration: "03:00",
  },
  {
    id: "4Yqung81v8CmhDCEXUyjTm",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "시차",
    trackDuration: "03:54",
  },
  {
    id: "12oB9TEj1ILuQEZt4VAs5e",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Louder than bombs",
    trackDuration: "03:37",
  },
  {
    id: "2vh6yTfSkyO37hj5M3A3JW",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "ON",
    trackDuration: "04:06",
  },
  {
    id: "4QWPKecgt2lc4GpWtYgYtJ",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "욱 (UGH!)",
    trackDuration: "03:45",
  },
  {
    id: "39qNsDe6e6y0ZMBFYfVdx9",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "00:00 (Zero O’Clock)",
    trackDuration: "04:10",
  },
  {
    id: "42TGLajWw43lkOF671gtDE",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Inner Child",
    trackDuration: "03:53",
  },
  {
    id: "4NQ8DTueMrnI7u5qUEaR7b",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "친구",
    trackDuration: "03:19",
  },
  {
    id: "4IyZRfH1jGzXjVg9RH6a3p",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Moon",
    trackDuration: "03:28",
  },
  {
    id: "1nkQNNXQIUvzA2kicC7mfX",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Respect",
    trackDuration: "03:57",
  },
  {
    id: "4kHoeGe1iDCSdyueYtb3EV",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "We are Bulletproof : the Eternal",
    trackDuration: "04:21",
  },
  {
    id: "12aSYs0fRflbzSeaaQzZtp",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "Outro : Ego",
    trackDuration: "03:16",
  },
  {
    id: "2WLVBA5fOIIAHYb0DsRhDk",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : 7",
    releaseDate: "2020-02-21",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a305c82beadd829638dd8c36",
    trackName: "ON (Feat. Sia)",
    trackDuration: "04:06",
  },
  {
    id: "1e60XXx2p9W87HCEZlnaB3",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : PERSONA",
    releaseDate: "2019-04-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27346d3e73ccbfde4ee771b7e76",
    trackName: "Intro : Persona",
    trackDuration: "02:51",
  },
  {
    id: "2V7Gxq4QW2Fm4zizDF0V6Z",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : PERSONA",
    releaseDate: "2019-04-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27346d3e73ccbfde4ee771b7e76",
    trackName: "작은 것들을 위한 시 (Boy With Luv) (feat. Halsey)",
    trackDuration: "03:49",
  },
  {
    id: "6QVXzFvWhzDFNMjSlMCH77",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : PERSONA",
    releaseDate: "2019-04-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27346d3e73ccbfde4ee771b7e76",
    trackName: "소우주 (Mikrokosmos)",
    trackDuration: "03:44",
  },
  {
    id: "106Xfvha3rKf5z5gCSUtFX",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : PERSONA",
    releaseDate: "2019-04-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27346d3e73ccbfde4ee771b7e76",
    trackName: "Make It Right",
    trackDuration: "03:46",
  },
  {
    id: "6BppPBOUSoZmpTLuVqwfNt",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : PERSONA",
    releaseDate: "2019-04-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27346d3e73ccbfde4ee771b7e76",
    trackName: "HOME",
    trackDuration: "03:54",
  },
  {
    id: "5pDabSsxF2KphzQZMcPo1J",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : PERSONA",
    releaseDate: "2019-04-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27346d3e73ccbfde4ee771b7e76",
    trackName: "Jamais Vu",
    trackDuration: "03:47",
  },
  {
    id: "1BodW0D2wzSDFozd1GlZOn",
    artistName: "BTS",
    genres: ["k-pop"],
    popularity: 87,
    followers: 78293429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    albumsName: "MAP OF THE SOUL : PERSONA",
    releaseDate: "2019-04-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27346d3e73ccbfde4ee771b7e76",
    trackName: "Dionysus",
    trackDuration: "04:09",
  },
  {
    id: "4u43I0LP2Xf85OAS85eG0R",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "CN TOWER",
    trackDuration: "04:01",
  },
  {
    id: "7DL2F2bueQycqYjqsjHYjG",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "MOTH BALLS",
    trackDuration: "03:32",
  },
  {
    id: "1F6nHHDJyTHLgDDFj1ZZDt",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "SOMETHING ABOUT YOU",
    trackDuration: "03:38",
  },
  {
    id: "5aIEFCKhVUM5sKkwOSdFiM",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "CRYING IN CHANEL",
    trackDuration: "03:19",
  },
  {
    id: "4GqhG9rDuRUoNyDSMJ0Brq",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "SPIDER-MAN SUPERMAN",
    trackDuration: "03:23",
  },
  {
    id: "4JeD0FGslDsMeeahEGZa2L",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "DEEPER",
    trackDuration: "02:52",
  },
  {
    id: "1YHQQFtKqFSFrqL4cNvstU",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "SMALL TOWN FAME",
    trackDuration: "02:28",
  },
  {
    id: "3CY3zAjrxKVInh2Lq1QiRb",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "PIMMIE'S DILEMMA",
    trackDuration: "01:58",
  },
  {
    id: "3FHO87BSOEVAsedSnCTnvz",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "BRIAN STEEL",
    trackDuration: "01:51",
  },
  {
    id: "5Nz7hI3cCOHmMR4vSLJ1An",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "GIMME A HUG",
    trackDuration: "03:13",
  },
  {
    id: "2xxb5zW09uwbgyLprALi9E",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "RAINING IN HOUSTON",
    trackDuration: "04:04",
  },
  {
    id: "2vjFTjmvpFjFM01cNdG2ik",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "LASERS",
    trackDuration: "03:18",
  },
  {
    id: "0o5p5zzRN84q6qVbOVONPM",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "MEET YOUR PADRE",
    trackDuration: "04:31",
  },
  {
    id: "2u9S9JJ6hTZS3Vf22HOZKg",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "NOKIA",
    trackDuration: "04:01",
  },
  {
    id: "0NUqi0ps17YpLUC3kgsZq0",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "DIE TRYING",
    trackDuration: "03:15",
  },
  {
    id: "2kZoOj1n5vk9BuF0sih58M",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "SOMEBODY LOVES ME",
    trackDuration: "03:02",
  },
  {
    id: "578CwfxpfH2HxlENOCHc2n",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "CELIBACY",
    trackDuration: "03:55",
  },
  {
    id: "775a936b2Vzl3fw86FaVat",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "OMW",
    trackDuration: "03:53",
  },
  {
    id: "1mKNJs35ede94bTPWveVOo",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "GLORIOUS",
    trackDuration: "03:25",
  },
  {
    id: "6mmPe3Y3SEtYb9HZsHTyrj",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "$ome $exy $ongs 4 U",
    releaseDate: "2025-02-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273fcb7f84280bc41e3c4c873ac",
    trackName: "WHEN HE'S GONE",
    trackDuration: "03:29",
  },
  {
    id: "6YV2AI87l1n2fzqU8Dyo05",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Virginia Beach",
    trackDuration: "04:11",
  },
  {
    id: "59ZmQR4pwCaa5iM3veM7Cs",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Amen (feat. Teezo Touchdown)",
    trackDuration: "02:21",
  },
  {
    id: "2R30S0W4JCM9JaQWlpmeWn",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Calling For You (feat. 21 Savage)",
    trackDuration: "04:45",
  },
  {
    id: "6LFW4dEsLeiGluniXRgVYr",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Fear Of Heights",
    trackDuration: "02:35",
  },
  {
    id: "1us5wNgZc0YLT8RQQs2Q7L",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Daylight",
    trackDuration: "02:44",
  },
  {
    id: "6xIsHPRHdbzU6UMVFn4wh8",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "First Person Shooter (feat. J. Cole)",
    trackDuration: "04:07",
  },
  {
    id: "2uvBprdlMpzeN5Bq0PzMBI",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "IDGAF (feat. Yeat)",
    trackDuration: "04:20",
  },
  {
    id: "0pdMOh52apEWAS1xELJY7Q",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "7969 Santa",
    trackDuration: "04:19",
  },
  {
    id: "4gQBXN2GBRpemMuxg5y3h9",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Slime You Out (feat. SZA)",
    trackDuration: "05:10",
  },
  {
    id: "3nHat22UwPywIevUrXIhy1",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Bahamas Promises",
    trackDuration: "03:04",
  },
  {
    id: "5BTu8L170anjdgSohdBkkv",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Tried Our Best",
    trackDuration: "03:29",
  },
  {
    id: "71VKjJjn76sn5Tt8X8Ay8c",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Screw The World - Interlude",
    trackDuration: "01:52",
  },
  {
    id: "7jKNxYzPFGDWEemcRVebLb",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Drew A Picasso",
    trackDuration: "04:22",
  },
  {
    id: "7uHF03xE84sQ5PicRNH3yu",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Members Only (feat. PARTYNEXTDOOR)",
    trackDuration: "04:37",
  },
  {
    id: "4e0uZkMYa8e8HJ5TEUN417",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "What Would Pluto Do",
    trackDuration: "03:02",
  },
  {
    id: "04BF53Rb6LOpDUJG518IqS",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "All The Parties (feat. Chief Keef)",
    trackDuration: "03:38",
  },
  {
    id: "1dKXBUKx7oCB2UXlkihNn8",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "8am in Charlotte",
    trackDuration: "04:26",
  },
  {
    id: "4bF4MxTGnNj8dTW0LZmAx5",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "BBL Love - Interlude",
    trackDuration: "02:41",
  },
  {
    id: "3BE3IYsAhqkTiRIR7T7x7M",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Gently (feat. Bad Bunny)",
    trackDuration: "02:13",
  },
  {
    id: "2DSy4HfDQoBsPPcRSoeM16",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs Scary Hours Edition",
    releaseDate: "2023-11-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e286ee36b4015afa8832356a",
    trackName: "Rich Baby Daddy (feat. Sexyy Red & SZA)",
    trackDuration: "05:19",
  },
  {
    id: "3eP13S8D5m2cweMEg3ZDed",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Virginia Beach",
    trackDuration: "04:11",
  },
  {
    id: "0Mrnt1YqVuW2bqmwu4VxDt",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Amen (feat. Teezo Touchdown)",
    trackDuration: "02:21",
  },
  {
    id: "2nibvvDdAQkVraYP00z2RS",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Calling For You (feat. 21 Savage)",
    trackDuration: "04:45",
  },
  {
    id: "53KaP77tkliz36LPxWGlWK",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Fear Of Heights",
    trackDuration: "02:35",
  },
  {
    id: "4ZT0wGKwlJRjpMUuwZVy3p",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Daylight",
    trackDuration: "02:44",
  },
  {
    id: "7aqfrAY2p9BUSiupwk3svU",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "First Person Shooter (feat. J. Cole)",
    trackDuration: "04:07",
  },
  {
    id: "2YSzYUF3jWqb9YP9VXmpjE",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "IDGAF (feat. Yeat)",
    trackDuration: "04:20",
  },
  {
    id: "1GpWY5RiInhezB8wGWs6oN",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "7969 Santa",
    trackDuration: "04:19",
  },
  {
    id: "0AYt6NMyyLd0rLuvr0UkMH",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Slime You Out (feat. SZA)",
    trackDuration: "05:10",
  },
  {
    id: "3JZjcKImHcmOI9ylL4zrSc",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Bahamas Promises",
    trackDuration: "03:04",
  },
  {
    id: "3IHt4j5uAEl7iBu8Utn985",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Tried Our Best",
    trackDuration: "03:29",
  },
  {
    id: "0ArVfVP8B5svkfj8clHNzB",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Screw The World - Interlude",
    trackDuration: "01:52",
  },
  {
    id: "03rwnftfgpYVO6QDWOZcG6",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Drew A Picasso",
    trackDuration: "04:22",
  },
  {
    id: "24FUBxaAYSBlWsbSnEzDcn",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Members Only (feat. PARTYNEXTDOOR)",
    trackDuration: "04:37",
  },
  {
    id: "1DAibqbopEYULPEtE8WHTE",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "What Would Pluto Do",
    trackDuration: "03:02",
  },
  {
    id: "1PIgY9ybyFT9uWLM5POYGY",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "All The Parties (feat. Chief Keef)",
    trackDuration: "03:38",
  },
  {
    id: "0w3Mfe4PIVjuFjJbe3OlYv",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "8am in Charlotte",
    trackDuration: "04:26",
  },
  {
    id: "1mjAD7IYvI5UGiB7WnppMf",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "BBL Love - Interlude",
    trackDuration: "02:41",
  },
  {
    id: "6ZprqcYFC6D9eIZaCoqrSn",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Gently (feat. Bad Bunny)",
    trackDuration: "02:13",
  },
  {
    id: "1yeB8MUNeLo9Ek1UEpsyz6",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "For All The Dogs",
    releaseDate: "2023-10-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1",
    trackName: "Rich Baby Daddy (feat. Sexyy Red & SZA)",
    trackDuration: "05:19",
  },
  {
    id: "1bDbXMyjaUIooNwFE9wn0N",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Rich Flex",
    trackDuration: "03:59",
  },
  {
    id: "46s57QULU02Voy0Kup6UEb",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Major Distribution",
    trackDuration: "02:50",
  },
  {
    id: "34tz0eDhGuFErIuW3q4mPX",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "On BS",
    trackDuration: "04:21",
  },
  {
    id: "0wshkEEcJUQU33RSRBb5dv",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "BackOutsideBoyz",
    trackDuration: "02:32",
  },
  {
    id: "7l2nxyx7IkBX5orhkALg0V",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Privileged Rappers",
    trackDuration: "02:40",
  },
  {
    id: "2ZL7WZcjuYKi1KUDtp4kCC",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Spin Bout U",
    trackDuration: "03:34",
  },
  {
    id: "0sSRLXxknVTQDStgU1NqpY",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Hours In Silence",
    trackDuration: "06:39",
  },
  {
    id: "4Flfb4fGscN9kXPOduQLrv",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Treacherous Twins",
    trackDuration: "03:00",
  },
  {
    id: "7GeTsDIc5ykNB6lORO6Cee",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Circo Loco",
    trackDuration: "03:56",
  },
  {
    id: "2KLwPaRDOB87XOYAT2fgxh",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Pussy & Millions (feat. Travis Scott)",
    trackDuration: "04:02",
  },
  {
    id: "45pUWUeEWGoSdH6UF162G8",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Broke Boys",
    trackDuration: "03:45",
  },
  {
    id: "410TZrK18uRjtsTunG14cl",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Middle of the Ocean",
    trackDuration: "05:56",
  },
  {
    id: "2ZlABhxMMa43COmZ97kKsJ",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "Jumbotron Shit Poppin",
    trackDuration: "02:17",
  },
  {
    id: "29YW2xXlo6Pc6M0SBTCXYN",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "More M’s",
    trackDuration: "03:41",
  },
  {
    id: "1MTXYvJ9TSqg9x6WPCDx2n",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "3AM on Glenwood",
    trackDuration: "02:58",
  },
  {
    id: "31bsuKDOzFGzBAoXxtnAJm",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Her Loss",
    releaseDate: "2022-11-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302854a7060fccc1a66a4b5ad",
    trackName: "I Guess It’s Fuck Me",
    trackDuration: "04:23",
  },
  {
    id: "1kNdtonJXHorsVpWerK8C2",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Intro",
    trackDuration: "00:36",
  },
  {
    id: "1vbn9fEyw1IYhqgZJdu9ZB",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Falling Back",
    trackDuration: "04:26",
  },
  {
    id: "4FIgHqXd4KkOwxrGeLDYM2",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Texts Go Green",
    trackDuration: "05:08",
  },
  {
    id: "1eCFz60zd7mAXgWLapPd9B",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Currents",
    trackDuration: "02:37",
  },
  {
    id: "0nAZGkBGKQCXyaoSJfRhC1",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "A Keeper",
    trackDuration: "02:53",
  },
  {
    id: "7sT7kZEYd1MrmzLLIRVZas",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Calling My Name",
    trackDuration: "02:09",
  },
  {
    id: "4rmVZajAF7PkrCagGPHbqa",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Sticky",
    trackDuration: "04:03",
  },
  {
    id: "28JBD8p18xNuOfyV7Cotdn",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Massive",
    trackDuration: "05:36",
  },
  {
    id: "6Yj7Zhxt73uvwFFvzQXdxO",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Flight's Booked",
    trackDuration: "04:14",
  },
  {
    id: "7hRlTK3mgFTBEjX7DjqBsI",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Overdrive",
    trackDuration: "03:22",
  },
  {
    id: "3N3d4OWbPVxTQVBFqNyykk",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Down Hill",
    trackDuration: "04:10",
  },
  {
    id: "1XsRwo2it6QHdV2OiT6IzF",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Tie That Binds",
    trackDuration: "05:36",
  },
  {
    id: "2vy9Ry1TNjCD85TiCbTz0r",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Liability",
    trackDuration: "03:57",
  },
  {
    id: "3F5CgOj3wFlRv51JsHbxhe",
    artistName: "Drake",
    genres: ["rap", "hip hop"],
    popularity: 97,
    followers: 97074395,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    albumsName: "Honestly, Nevermind",
    releaseDate: "2022-06-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37",
    trackName: "Jimmy Cooks (feat. 21 Savage)",
    trackDuration: "03:38",
  },
  {
    id: "4gxEY3Mh5FZZDAJAKPNrCS",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "CRAZY (Party Remixes 1)",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d49db78bd7ea1f7229865baa",
    trackName: "CRAZY",
    trackDuration: "02:44",
  },
  {
    id: "69MMbwpvp5I9QTIzJeinpe",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "CRAZY (Party Remixes 1)",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d49db78bd7ea1f7229865baa",
    trackName: "CRAZY (English ver.)",
    trackDuration: "02:44",
  },
  {
    id: "3s31zhHgCzJKhXGXPiTs4F",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "CRAZY (Party Remixes 1)",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d49db78bd7ea1f7229865baa",
    trackName: "CRAZY (Vogue Remix) (feat. Dashaun Wesley)",
    trackDuration: "02:28",
  },
  {
    id: "1PW3XIvHX9HLKjSfUs2mEV",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "CRAZY (Party Remixes 1)",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d49db78bd7ea1f7229865baa",
    trackName: "CRAZY (Bounce Up Remix)",
    trackDuration: "02:36",
  },
  {
    id: "5qg6dX7tOVlT5XtySVRRhY",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "CRAZY (Party Remixes 1)",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d49db78bd7ea1f7229865baa",
    trackName: "CRAZY (Dance Remix)",
    trackDuration: "02:47",
  },
  {
    id: "4WePneCUYtptHiDHuLQzQw",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "CRAZY (Party Remixes 1)",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d49db78bd7ea1f7229865baa",
    trackName: "CRAZY (Sped Up ver.)",
    trackDuration: "02:02",
  },
  {
    id: "6CLFYe1yKG6DlEqE6dTjt9",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "CRAZY (Party Remixes 1)",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d49db78bd7ea1f7229865baa",
    trackName: "CRAZY (Slowed + Reverb ver.)",
    trackDuration: "03:25",
  },
  {
    id: "0ZnkkW6pf3S9e9IKBZNrm9",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "CRAZY (Party Remixes 1)",
    releaseDate: "2024-09-02",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d49db78bd7ea1f7229865baa",
    trackName: "CRAZY (Instrumental)",
    trackDuration: "02:44",
  },
  {
    id: "2JGsTyLC4gLCWXVmvUn5Wi",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "The World Is My Oyster (2023 Ver.)",
    trackDuration: "01:46",
  },
  {
    id: "4K8jDTlNhZWEdnzZVGRMtN",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "FEARLESS (2023 Ver.)",
    trackDuration: "02:48",
  },
  {
    id: "2ahp0wvyEzyvgWfOhStHWp",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "Blue Flame (2023 Ver.)",
    trackDuration: "03:21",
  },
  {
    id: "72RWX5lMa27RQG5DzbGaoj",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "The Hydra",
    trackDuration: "01:44",
  },
  {
    id: "0bMoNdAnxNR0OuQbGDovrr",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "ANTIFRAGILE",
    trackDuration: "03:04",
  },
  {
    id: "7mYwDmbbp8UPLlnRjTJ54X",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "Impurities",
    trackDuration: "03:16",
  },
  {
    id: "3NJ5Ksj7LNbvfNgEtl3o6Z",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "Burn the Bridge",
    trackDuration: "02:34",
  },
  {
    id: "51vRumtqbkNW9wrKfESwfu",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "UNFORGIVEN (feat. Nile Rodgers)",
    trackDuration: "03:02",
  },
  {
    id: "6DSGb5CmwHX4pvclq8HUU1",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "No-Return (Into the unknown)",
    trackDuration: "03:04",
  },
  {
    id: "4QhnNyKDsAkXPwHkSnuc89",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "Eve, Psyche & The Bluebeard’s wife",
    trackDuration: "03:05",
  },
  {
    id: "0sNfFxw3pJkVmRsgY781vM",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "FEARNOT (Between you, me and the lamppost)",
    trackDuration: "03:26",
  },
  {
    id: "74cpuIw43kA8xPgbQEPdss",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "Flash Forward",
    trackDuration: "03:15",
  },
  {
    id: "05RlBHEZg1RmL9DnPgv9Qq",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "UNFORGIVEN",
    releaseDate: "2023-05-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7",
    trackName: "Fire in the belly",
    trackDuration: "03:18",
  },
  {
    id: "2ThrRg4rj3syCaROoNZD3z",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (LE SSERAFIM Package)",
    releaseDate: "2025-03-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e721dd048f1511401d6f1ea0",
    trackName: "HOT",
    trackDuration: "02:23",
  },
  {
    id: "3RH8MZU18p1Tp2lFxJylE9",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (LE SSERAFIM Package)",
    releaseDate: "2025-03-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e721dd048f1511401d6f1ea0",
    trackName: "HOT (KIM CHAEWON ver.)",
    trackDuration: "02:42",
  },
  {
    id: "51dzPsthZo6vv3dpr8dmlc",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (LE SSERAFIM Package)",
    releaseDate: "2025-03-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e721dd048f1511401d6f1ea0",
    trackName: "HOT (SAKURA ver.)",
    trackDuration: "02:16",
  },
  {
    id: "4VoZLrS5KS5A7P67ujxx8l",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (LE SSERAFIM Package)",
    releaseDate: "2025-03-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e721dd048f1511401d6f1ea0",
    trackName: "HOT (HUH YUNJIN ver.)",
    trackDuration: "03:05",
  },
  {
    id: "1fwBUAXdD4j8YeJgBUrWhg",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (LE SSERAFIM Package)",
    releaseDate: "2025-03-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e721dd048f1511401d6f1ea0",
    trackName: "HOT (KAZUHA ver.)",
    trackDuration: "02:09",
  },
  {
    id: "5GTVROehshYBZP8lvrUVI1",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (LE SSERAFIM Package)",
    releaseDate: "2025-03-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e721dd048f1511401d6f1ea0",
    trackName: "HOT (HONG EUNCHAE ver.)",
    trackDuration: "02:31",
  },
  {
    id: "0dcfrljmlnUEypYAF4aPFi",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (English ver.)",
    releaseDate: "2025-03-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e829ec8ff3543142dd473cfc",
    trackName: "HOT",
    trackDuration: "02:23",
  },
  {
    id: "33cc6g7mDVbXXCjqsG25OB",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (English ver.)",
    releaseDate: "2025-03-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e829ec8ff3543142dd473cfc",
    trackName: "HOT (English ver.)",
    trackDuration: "02:23",
  },
  {
    id: "2If5qKv7BUfVR36x0XYOh4",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (English ver.)",
    releaseDate: "2025-03-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e829ec8ff3543142dd473cfc",
    trackName: "HOT (Sped Up ver.)",
    trackDuration: "01:47",
  },
  {
    id: "6SkK9MV9YXb0h4BRTzZcNK",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (English ver.)",
    releaseDate: "2025-03-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e829ec8ff3543142dd473cfc",
    trackName: "HOT (Slowed + Reverb ver.)",
    trackDuration: "03:29",
  },
  {
    id: "7iH1crFi3c1dNsAkgYLhxC",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT (English ver.)",
    releaseDate: "2025-03-17",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e829ec8ff3543142dd473cfc",
    trackName: "HOT (Instrumental)",
    trackDuration: "02:23",
  },
  {
    id: "2FktPXK8yLMFyx6ZTQtRSm",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT",
    releaseDate: "2025-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27386efcf81bf1382daa2d2afe6",
    trackName: "Born Fire",
    trackDuration: "02:16",
  },
  {
    id: "406IpEtZPvbxApWTGM3twY",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT",
    releaseDate: "2025-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27386efcf81bf1382daa2d2afe6",
    trackName: "HOT",
    trackDuration: "02:23",
  },
  {
    id: "6efcMTYO2lJ0zcpQEPk8m1",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT",
    releaseDate: "2025-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27386efcf81bf1382daa2d2afe6",
    trackName: "Come Over",
    trackDuration: "02:17",
  },
  {
    id: "5o4U0weUIAXolji4sEAnjI",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT",
    releaseDate: "2025-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27386efcf81bf1382daa2d2afe6",
    trackName: "Ash",
    trackDuration: "03:17",
  },
  {
    id: "1Hw8WhXlRjfUFDMykf92gA",
    artistName: "LE SSERAFIM",
    genres: ["k-pop"],
    popularity: 80,
    followers: 6795697,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebd7d7064b17d00c6f8755eae6",
    albumsName: "HOT",
    releaseDate: "2025-03-14",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27386efcf81bf1382daa2d2afe6",
    trackName: "So Cynical (Badum)",
    trackDuration: "02:35",
  },
  {
    id: "0hDo3EPwvhCSggmqkVvJPX",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "number one girl",
    trackDuration: "03:36",
  },
  {
    id: "1j9Y2na5KDqntYChmIRUGf",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "3am",
    trackDuration: "02:34",
  },
  {
    id: "7hOwyq4JU1Fkw2UZGIcvHZ",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "two years",
    trackDuration: "02:47",
  },
  {
    id: "30HIJzJEUYcL9Qng15UeBo",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "toxic till the end",
    trackDuration: "02:36",
  },
  {
    id: "4JV9Kb9qxNr5YiIbAXdvDT",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "drinks or coffee",
    trackDuration: "02:13",
  },
  {
    id: "0JLcfQTtEf3Whtj59OhS0f",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "APT.",
    trackDuration: "02:49",
  },
  {
    id: "5IZfqpeQOX2pSXTlsOGMbh",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "gameboy",
    trackDuration: "02:46",
  },
  {
    id: "1PfLL0JosQTX6d2c2nes7g",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "stay a little longer",
    trackDuration: "04:06",
  },
  {
    id: "4ZrIvXRkOIvSpszy8mJvPW",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "not the same",
    trackDuration: "03:04",
  },
  {
    id: "51RVssSB8iuq9llBacPbER",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "call it the end",
    trackDuration: "02:21",
  },
  {
    id: "0kLzF2Cl3zvFOyzgE86ssW",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "too bad for us",
    trackDuration: "03:56",
  },
  {
    id: "05v68b039L6DcXHhbkL2wO",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "rosie",
    releaseDate: "2024-12-06",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a9fb6e00986e42ad4764b1f3",
    trackName: "dance all night",
    trackDuration: "03:34",
  },
  {
    id: "6BZdmmwNrZlE8QvNU15Jbv",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "number one girl",
    releaseDate: "2024-11-22",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c782fa0fb8845dd6fd594e08",
    trackName: "number one girl",
    trackDuration: "03:36",
  },
  {
    id: "2vDkR3ctidSd17d2CygVzS",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "APT.",
    releaseDate: "2024-10-18",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27359639b3440e708daa35987be",
    trackName: "APT.",
    trackDuration: "02:49",
  },
  {
    id: "2xgACMNtJ5YktyvOC83SPO",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "R",
    releaseDate: "2021-03-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fdd9fc8745ed9185dc95873",
    trackName: "On The Ground",
    trackDuration: "02:48",
  },
  {
    id: "2ayIgfvWo3SfYP2pVOr4pC",
    artistName: "ROSÉ",
    genres: ["k-pop"],
    popularity: 86,
    followers: 10677757,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    albumsName: "R",
    releaseDate: "2021-03-12",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2730fdd9fc8745ed9185dc95873",
    trackName: "Gone",
    trackDuration: "03:27",
  },
  {
    id: "0T3Hw3kPj9T2E4UoaSXmfn",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Disease",
    trackDuration: "03:49",
  },
  {
    id: "2LHNTC9QZxsL3nWpt8iaSR",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Abracadabra",
    trackDuration: "03:43",
  },
  {
    id: "4mUR5Tv0CvJtpmnUtzeIgd",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Garden Of Eden",
    trackDuration: "03:59",
  },
  {
    id: "0Tqn5Th0wk55eLdga96vZM",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Perfect Celebrity",
    trackDuration: "03:49",
  },
  {
    id: "5IoPnNiYAOvHHJpz13wzRL",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Vanish Into You",
    trackDuration: "04:04",
  },
  {
    id: "4pNzBbGcqXofx8mLBPTeih",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Killah (feat. Gesaffelstein)",
    trackDuration: "03:30",
  },
  {
    id: "0ElVpg9XIswx3XWs6kUj6a",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Zombieboy",
    trackDuration: "03:33",
  },
  {
    id: "3hcivoswCVR8LZkHR8MYA5",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "LoveDrug",
    trackDuration: "03:13",
  },
  {
    id: "2rvd6akG8qEtBNUvQpN7iY",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "How Bad Do U Want Me",
    trackDuration: "03:58",
  },
  {
    id: "0uoWOZeZZiC90RMNDQBqj4",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Don't Call Tonight",
    trackDuration: "03:45",
  },
  {
    id: "6OC87jHRiovNPEUrgaqFSu",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Shadow Of A Man",
    trackDuration: "03:19",
  },
  {
    id: "08svDlp6TNFlfMIgjjZlYI",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "The Beast",
    trackDuration: "03:54",
  },
  {
    id: "7xIoinMSiwIp5BWR7toO1O",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Blade Of Grass",
    trackDuration: "04:17",
  },
  {
    id: "7so0lgd0zP2Sbgs2d7a1SZ",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "MAYHEM",
    releaseDate: "2025-03-07",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c",
    trackName: "Die With A Smile",
    trackDuration: "04:11",
  },
  {
    id: "5sdmtQqSDr1kUbnnUK1RXY",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName:
      "Slap That Bass | Get Happy | What The World Needs Now Is Love - Music From The Motion Picture",
    trackDuration: "03:16",
  },
  {
    id: "69xu2EnbSJ8oODVH2ovjmr",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "For Once in My Life - Music From The Motion Picture",
    trackDuration: "02:49",
  },
  {
    id: "18YKCiNw0gjK025fTAb8Dd",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "If My Friends Could See Me Now - Music From The Motion Picture",
    trackDuration: "03:12",
  },
  {
    id: "4Twrnhrg6yIFCdor6yoFvW",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "Folie à Deux - Music From The Motion Picture",
    trackDuration: "01:44",
  },
  {
    id: "7HlcqBxEZfCFLxtQPTC6EF",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "Bewitched - Music From The Motion Picture",
    trackDuration: "02:58",
  },
  {
    id: "1X3NvqJ7ki9rDJz4nIc6Fb",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "That's Entertainment - Music From The Motion Picture",
    trackDuration: "01:40",
  },
  {
    id: "4dnoQrufD23hPUuK3RTqEp",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName:
      "When You’re Smiling (The Whole World Smiles With You) - Music From The Motion Picture",
    trackDuration: "01:45",
  },
  {
    id: "7FyQqFixAnYRi64pcM63Nx",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "To Love Somebody - Music From The Motion Picture",
    trackDuration: "01:49",
  },
  {
    id: "3R1GEnPh6Y3rW7bCxRezjw",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "(They Long To Be) Close To You - Music From The Motion Picture",
    trackDuration: "02:48",
  },
  {
    id: "4J6WjnT9kU3inMBlqZrEvS",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "The Joker - Music From The Motion Picture",
    trackDuration: "03:41",
  },
  {
    id: "6o2TEwdOdXgM6U7lWj5MrY",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "Gonna Build a Mountain - Music From The Motion Picture",
    trackDuration: "03:18",
  },
  {
    id: "6rT6dNA98lt4kxsluyWM7X",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "I've Got the World On A String - Music From The Motion Picture",
    trackDuration: "02:05",
  },
  {
    id: "1JFk2pK3n99dbS77xs1ifW",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "If You Go Away - Music From The Motion Picture",
    trackDuration: "03:19",
  },
  {
    id: "0nCikBJkUVkejWitX3CiGO",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName:
      "Gonna Build a Mountain (Reprise) - Music From The Motion Picture",
    trackDuration: "01:52",
  },
  {
    id: "4ph4EHuQi2tKtvNU12UTRu",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName: "That's Life - Music From The Motion Picture",
    trackDuration: "03:03",
  },
  {
    id: "4wM7clk6X7Cr6KoPUHjXs4",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Joker: Folie à Deux (Music From The Motion Picture)",
    releaseDate: "2024-10-04",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27335a31bf0be66fc393f3a5874",
    trackName:
      "True Love Will Find You in The End - Music From The Motion Picture",
    trackDuration: "02:02",
  },
  {
    id: "6RyJt2SvLFghIDe1eCviD9",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "Good Morning",
    trackDuration: "02:46",
  },
  {
    id: "2YQ0DrIFS90FEK8T4JOa8W",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "Get Happy (2024)",
    trackDuration: "03:11",
  },
  {
    id: "2Qt1GqEOR6gfBCNTZv9Q8P",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "Oh, When The Saints",
    trackDuration: "03:42",
  },
  {
    id: "1CmyFUdrzcI2TldyJzOHSb",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "World On A String",
    trackDuration: "02:37",
  },
  {
    id: "0I27tCo8rexgdYnhkSaL7k",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "If My Friends Could See Me Now",
    trackDuration: "02:41",
  },
  {
    id: "2zOSxEAk90JTKYNHqE8LXc",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "That's Entertainment",
    trackDuration: "04:09",
  },
  {
    id: "38ILZqA8DlkbKfjosEDSb1",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "sMILE",
    trackDuration: "03:38",
  },
  {
    id: "5zZoEDawAlJNgUzxknlV9V",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "The Joker",
    trackDuration: "02:54",
  },
  {
    id: "1ud0FiEQLVIDlWEqDIEvwW",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "Folie à Deux",
    trackDuration: "02:58",
  },
  {
    id: "2KniNOsSdTc2XUewjfoRyF",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "Gonna Build A Mountain",
    trackDuration: "02:51",
  },
  {
    id: "6DqmPvzGa002Qa2NQ14hCV",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "Close To You",
    trackDuration: "02:44",
  },
  {
    id: "5DQIZ8XC0EP7cfRFrtzY5h",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "Happy Mistake",
    trackDuration: "04:05",
  },
  {
    id: "7jTLS32BMC2UyTTjEUW6BT",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Harlequin",
    releaseDate: "2024-09-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738c6bfaa9549f8438bcafb668",
    trackName: "That's Life",
    trackDuration: "03:04",
  },
  {
    id: "74BfFG9qR85KXxN49esFVA",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "Main Titles (You’ve Been Called Back to Top Gun)",
    trackDuration: "02:30",
  },
  {
    id: "4XGl23ZBBQQ7KD9uSpvswx",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "Danger Zone",
    trackDuration: "03:35",
  },
  {
    id: "5jximgvZO7gGAFQndsSltj",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "Darkstar",
    trackDuration: "03:01",
  },
  {
    id: "79iLGWV1TP277jSF8QJEo3",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "Great Balls Of Fire - Live",
    trackDuration: "01:54",
  },
  {
    id: "5aAFhwGmoTsYd3ICgj5Ms2",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "You’re Where You Belong / Give ‘Em Hell",
    trackDuration: "05:46",
  },
  {
    id: "73PAbYaVbnFG0tQ4aBfxeN",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "I Ain't Worried",
    trackDuration: "02:28",
  },
  {
    id: "3Wceo1KylCeOUKJv8EVrMy",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "Dagger One Is Hit / Time To Let Go",
    trackDuration: "05:06",
  },
  {
    id: "2RfBOqxUl9g0fHJ0NuYFAO",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "Tally Two / What’s The Plan / F-14",
    trackDuration: "04:34",
  },
  {
    id: "3vPFtJIPNknOiMK7IcBtzn",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "The Man, The Legend / Touchdown",
    trackDuration: "03:54",
  },
  {
    id: "0hGL3mxCQJB5l64LsWcSN5",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "Penny Returns - Interlude",
    trackDuration: "02:47",
  },
  {
    id: "1c2hJSwcCfoPEw1su83Sw0",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "Hold My Hand",
    trackDuration: "03:45",
  },
  {
    id: "1ZkmPku85veww4fF66aUFF",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Top Gun: Maverick (Music From The Motion Picture)",
    releaseDate: "2022-05-27",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b27302701cfe03aca6827b5c5449",
    trackName: "Top Gun Anthem",
    trackDuration: "02:28",
  },
  {
    id: "5i6SVeYn0jb3yMp9fsQGto",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "It's De-Lovely",
    trackDuration: "02:53",
  },
  {
    id: "0ZzE3KupbceBjr17DMhWAo",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "Night And Day",
    trackDuration: "03:42",
  },
  {
    id: "4biVNJdcVpAljZjpiO9B4Z",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "Love For Sale",
    trackDuration: "03:40",
  },
  {
    id: "7fGcPsneoxIweHKdc14vlw",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "Do I Love You",
    trackDuration: "04:48",
  },
  {
    id: "6jz5HzDmPuQ24U7u7KfKGw",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "I've Got You Under My Skin",
    trackDuration: "03:05",
  },
  {
    id: "1Z2el1XLsdJwt6Kefb2F5p",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "I Concentrate On You",
    trackDuration: "03:56",
  },
  {
    id: "6tANJIaIQAFhMxgnafAZd2",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "I Get A Kick Out Of You",
    trackDuration: "03:33",
  },
  {
    id: "3cvdaHJUFir8IQhHO0XD0j",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "So In Love",
    trackDuration: "04:31",
  },
  {
    id: "0dImZ1ZhnS1xfhYVkPPeqE",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "Let's Do It",
    trackDuration: "03:36",
  },
  {
    id: "7kjzAKTVd9umvnChTkzTNd",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "Dream Dancing",
    trackDuration: "04:16",
  },
  {
    id: "0Kdtya9rpac1Da89XBZ52O",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "Just One Of Those Things",
    trackDuration: "02:59",
  },
  {
    id: "5ueoGQzXQDQazPcPq5UvOQ",
    artistName: "Lady Gaga",
    genres: ["art pop", "pop"],
    popularity: 94,
    followers: 35950429,
    artistsImageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
    albumsName: "Love For Sale (Deluxe)",
    releaseDate: "2021-10-01",
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273574feb25f2b0f16dee365ab2",
    trackName: "You're The Top",
    trackDuration: "02:49",
  },
];

const AlbumComponent = () => {
  const [loading, setLoading] = useState(false);

  // ✅ Firestore에 여러 개 데이터 추가하는 함수
  const addMultipleAlbums = async () => {
    setLoading(true);
    try {
      const albumCollection = collection(firestore, "Album"); // 🔹 컬렉션 참조 가져오기

      // ✅ Firestore에 저장할 앨범 리스트 확인
      console.log(`추가할 앨범 개수: ${Albums.length}개`);

      const albumPromises = Albums.map(async (album) => {
        const albumDocRef = doc(albumCollection, album.id); // ID를 직접 지정
        const docSnapshot = await setDoc(albumDocRef, album);

        console.log(`✅ Firestore에 저장 완료: ${album.albumsName}`);
      });

      // 모든 앨범이 저장될 때까지 대기
      await Promise.all(albumPromises);

      console.log("🚀 모든 앨범이 Firestore에 추가됨!");
    } catch (error) {
      console.error("❌ 데이터 추가 중 오류 발생:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>📀 Firestore에 앨범 추가하기</h2>
      <button
        onClick={addMultipleAlbums}
        disabled={loading}
        style={{
          border: "1px solid white",
          backgroundColor: "gray",
          color: "black",
          padding: "5px 10px",
        }}
      >
        {loading ? "추가 중..." : "앨범 추가"}
      </button>
    </div>
  );
};

export default AlbumComponent;
