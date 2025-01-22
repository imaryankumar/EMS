"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import SelectDropdown from "@/components/common/SelectDropdown";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GetCookies } from "@/helper/CookieStore";
import EmployeCard from "@/components/Dashboard/EmployeCard";
import ProfileCard from "@/components/Dashboard/ProfileCard";

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

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  if (isError) {
    return <>Error Found!!</>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <p className="text-2xl w-full">
        Hi,
        <span className="font-semibold"> Aryan Kumar</span> Welcome to EZ Works
      </p>
      <EmployeCard userCount={data?.allDetails?.totalEmployee} />
      <div className="w-full flex items-center justify-start gap-6">
        <div className="w-80">
          <Input type="text" placeholder="Search name" className="py-6" />
        </div>
        <div className="w-72">
          <SelectDropdown
            name="Select Status"
            label="Status"
            items={["option1"]}
            selectedValue={selectedOption}
            onChange={handleSelectChange}
          />
        </div>
        <div className="w-72">
          <SelectDropdown
            name="Select Priority"
            label="Priority"
            items={["option1"]}
            selectedValue={selectedOption}
            onChange={handleSelectChange}
          />
        </div>
        <div className="p-3 bg-black text-white  rounded-lg cursor-pointer">
          <Search />
        </div>
      </div>
      <ProfileCard data={data} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default Overview;
