"use client";

import WorkLogCard from "@/components/common/WorkLogCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { setIsWorkModalOpen } from "@/store/utilsData/utilsDataSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipboardMinus, Plus } from "lucide-react";

const WorkLogs = () => {
  const dispatch = useAppDispatch();
  const fetchWorkData = async ({ year, month }: any) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/worklog/all-works?month=${month}&year=${year}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };

  const { isError, isLoading, data } = useQuery({
    queryKey: ["workLogs"],
    queryFn: () =>
      fetchWorkData({
        month: "01",
        year: "2025",
      }),
    staleTime: 10000,
  });

  return (
    <div className="w-full h-full relative">
      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex items-start justify-between">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="border p-1 rounded bg-gray-200">
              <ClipboardMinus color="#00BCD4" size={30} />
            </span>
            Work Reports
          </h2>
          <Button
            className="bg-cyan-600 text-base hover:bg-cyan-500"
            onClick={() => dispatch(setIsWorkModalOpen(true))}>
            <Plus />
            Add Works
          </Button>
        </div>
        <div className="w-full h-[45rem] overflow-auto scrollbar">
          <WorkLogCard data={data} isLoading={isLoading} isError={isError} />
        </div>
      </div>
    </div>
  );
};

export default WorkLogs;
