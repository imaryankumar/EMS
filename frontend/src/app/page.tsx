"use client";
import { GetCookies } from "@/helper/CookieStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = GetCookies("companyToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return <div>Page Content</div>;
};

export default Home;
