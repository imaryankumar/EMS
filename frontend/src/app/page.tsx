"use client";
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
      <h1>Hello</h1>
    </>
  );
};

export default Home;
