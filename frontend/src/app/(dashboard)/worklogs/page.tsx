"use client";

import WorkLogCard from "@/components/common/WorkLogCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const WorkLogs = () => {
  const datas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const fetchWorkData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/worklog/all-logs`
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
          <Button className="px-8 py-5 text-lg bg-blue-500 hover:bg-blue-600">
            Add Work
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
