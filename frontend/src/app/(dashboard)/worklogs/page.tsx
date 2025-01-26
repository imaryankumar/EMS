"use client";

import WorkLogCard from "@/components/common/WorkLogCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Plus } from "lucide-react";

const WorkLogs = () => {
  const fetchWorkData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/worklog/all-logs`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };

  const { isError, isLoading, data } = useQuery({
    queryKey: ["work"],
    queryFn: fetchWorkData,
    staleTime: 10000,
  });

  return (
    <div className="w-full h-full relative">
      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex items-start justify-between">
          <h2 className="text-2xl font-semibold">WorkLog</h2>
          <Button className="bg-cyan-600 text-base hover:bg-cyan-500">
            <Plus />
            Add Works
          </Button>
        </div>
        <div className="w-full h-[45rem] overflow-auto pr-4 scrollbar">
          <WorkLogCard
            data={data?.allLogs}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkLogs;
