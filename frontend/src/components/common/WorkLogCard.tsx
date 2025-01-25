"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "../ui/skeleton";
import { DateFormat } from "@/helper/DateFormat";
import { Textarea } from "../ui/textarea";

const WorkLogCard = ({ data, isLoading, isError }: any) => {
  console.log("Data", data);
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {isLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <Card
            key={index}
            className="w-full gap-4 h-64 shadow-md border border-gray-200">
            <CardContent className="p-6 w-full h-full flex flex-col items-start justify-start gap-4">
              <Skeleton className="w-44 h-6" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full mt-20 h-8" />
              <Skeleton className="w-full h-8" />
            </CardContent>
          </Card>
        ))
      ) : data?.length > 0 ? (
        data?.map((works: any) => (
          <Card key={works._id} className="w-full h-64">
            <CardHeader className="w-full flex flex-col gap-2">
              <CardTitle className="w-full flex items-center justify-between">
                <span>Date: {DateFormat(works?.date)}</span>
                <span>Hours: {works?.hourSpent}</span>
              </CardTitle>
              <h2
                className="text-xl font-semibold w-full truncate"
                title={works?.project}>
                Project: {works?.project}
              </h2>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description" className="pb-1 font-semibold">
                      Description:
                    </Label>
                    <Textarea
                      className=""
                      placeholder="Enter your description"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500 text-center">No employees found.</p>
      )}
    </div>
  );
};

export default WorkLogCard;
