"use client";
import HeroSection from "@/components/HomePages/HeroSection";
import Navbar from "@/components/common/Navbar";
import { GetCookies } from "@/helper/CookieStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = GetCookies("userToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
};

export default Home;
