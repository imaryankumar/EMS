"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import DashboardLayout from "@/components/Dashboard/layout";
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
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </>
  );
};

export default Home;
