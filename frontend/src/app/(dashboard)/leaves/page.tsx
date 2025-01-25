"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateReverseFormat } from "@/helper/DateFormat";
import ProfileCard from "@/components/Dashboard/ProfileCard";
import DatePicker from "@/components/common/DatePicker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const leaveTypes = [
  "Casual Leave",
  "Sick Leave",
  "Half-Day Leave (Casual)",
  "Half-Day Leave (Sick)",
  "Compensatory Leave (India)",
  "Compensatory Leave (Egypt)",
  "Work From Home",
  "Marriage Leave (Self)",
  "Parental Leave",
  "Parental Work From Home",
  "Birthday Month leave",
];

const Leaves = () => {
  const [leavedate, setLeaveDate] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const fetchLeaveData = async ({ date }: any) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/employee/leave-approved?date=${date}`
    );
    return response.data;
  };
  const { isError, isLoading, data } = useQuery({
    queryKey: ["leaves", leavedate],
    queryFn: () =>
      fetchLeaveData({
        date: leavedate || DateReverseFormat(new Date() as any),
      }),
    staleTime: 10000,
  });
  const handleLeaveDateChange = (selectedDate: any) => {
    setLeaveDate(selectedDate);
  };

  const handleStartDateChange = (selectedDate: any) => {
    setStartDate(selectedDate);
  };
  const handleEndDateChange = (selectedDate: any) => {
    setEndDate(selectedDate);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-start justify-center gap-12 px-8">
        <div className="w-full flex items-center justify-between">
          <h2 className="w-full text-3xl font-medium capitalize">
            Our Team Buddy{" "}
            <span className="text-cyan-500 font-semibold"> Leave today</span>
          </h2>
          <div className="flex items-center justify-center gap-12">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">Leave Apply</Button>
                </DialogTrigger>
                <DialogContent
                  className="sm:max-w-[425px] md:max-w-[625px]"
                  onInteractOutside={(event) => event.preventDefault()}>
                  <DialogHeader>
                    <DialogTitle>Leave Application</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="w-full flex flex-col gap-2">
                      <Label htmlFor="select" className="font-semibold">
                        Select Leave Type
                        <span className="text-red-500"> *</span>
                      </Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Leave Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Leave Type</SelectLabel>
                            {leaveTypes.map((leave, index) => {
                              return (
                                <SelectItem
                                  key={index}
                                  value={leave}
                                  className="cursor-pointer">
                                  {leave}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <Label htmlFor="end" className="font-semibold">
                        Start Date<span className="text-red-500"> *</span>
                      </Label>
                      <DatePicker
                        date={startDate}
                        handleDateChange={handleStartDateChange}
                        width="w-full"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <Label htmlFor="start" className="font-semibold">
                        End Date<span className="text-red-500"> *</span>
                      </Label>
                      <DatePicker
                        date={endDate}
                        handleDateChange={handleEndDateChange}
                        width="w-full"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="reason" className="font-semibold">
                        Reason<span className="text-red-500"> *</span>
                      </Label>
                      <Input
                        type="text"
                        id="reason"
                        placeholder="Enter your reason"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <DatePicker
                date={leavedate}
                handleDateChange={handleLeaveDateChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[45rem] overflow-auto scrollbar">
          <ProfileCard isLoading={isLoading} isError={isError} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Leaves;
