"use client";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const WorkLogCard = ({ data, isLoading, isError }: any) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto scrollbar pr-4">
      {data?.result?.map((card: any, index: any) => {
        return (
          <div key={index} className="h-full">
            <Card className="w-full h-32 flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <div className="border flex flex-col h-16 w-24 items-center rounded">
                  <span className="border-b-2 w-full text-center rounded-tl rounded-tr text-sm bg-cyan-600 text-white">
                    {card?.date?.split(" ")[1]}
                  </span>
                  <span className="w-full h-full text-center flex items-center justify-center text-xl font-semibold">
                    {card?.date?.split("-")[2]?.split(" ")[0]}
                  </span>
                </div>
                <span
                  className={`uppercase text-md ${
                    card?.status === "Received"
                      ? "text-green-600"
                      : card?.status === "not updated"
                      ? "text-red-600"
                      : "text-gray-600"
                  }  `}>
                  {card?.status}
                </span>
              </div>
              <span
                className={`${
                  !(card?.status === "not updated")
                    ? "text-gray-300 cursor-not-allowed"
                    : "cursor-pointer"
                }`}>
                <ChevronRight size={30} />
              </span>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default WorkLogCard;
