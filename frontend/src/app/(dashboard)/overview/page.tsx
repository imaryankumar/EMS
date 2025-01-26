"use client";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GetCookies } from "@/helper/CookieStore";
import EmployeCard from "@/components/Dashboard/EmployeCard";
import ProfileCard from "@/components/Dashboard/ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Overview = () => {
  const router = useRouter();

  useEffect(() => {
    const token = GetCookies("userToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/employee/all`,
      {
        withCredentials: true,
      }
    );
    const data = await response.data;
    return data;
  };

  const { isError, isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
    staleTime: 10000,
  });

  if (isError) {
    return <>Error Found!!</>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-8">
      {isLoading ? (
        <Skeleton className="w-1/2 h-9" />
      ) : (
        <p className="text-3xl w-full">
          Hi,
          <span className="font-semibold text-cyan-500">
            {" "}
            {data?.allDetails?.authUser?.fullName}!!
          </span>{" "}
          Welcome to{" "}
          <span className="font-semibold text-cyan-500">
            {data?.allDetails?.authUser?.companyName}
          </span>
        </p>
      )}
      <EmployeCard userCount={data?.allDetails?.totalEmployee} />
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-semibold">All Employees</h2>
        <div className="flex items-center justify-center gap-8">
          {isLoading ? (
            <Skeleton className="w-36 h-10" />
          ) : (
            data?.allDetails?.authUser?.role === "HR" && (
              <Button onClick={() => router.push("/signup")}>
                <Plus />
                Add Employee
              </Button>
            )
          )}
          <div className="flex w-80 items-center px-3 py-2 relative shadow-sm border rounded-md">
            <input
              type="text"
              className="w-full border-none bg-transparent rounded-md outline-none"
              placeholder="Search"
            />
            <span>
              <Search size={20} />
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-[30rem] overflow-auto scrollbar pr-2">
        <ProfileCard data={data} isLoading={isLoading} isError={isError} />
      </div>
    </div>
  );
};

export default Overview;
