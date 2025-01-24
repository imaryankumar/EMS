"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateReverseFormat } from "@/helper/DateFormat";
import ProfileCard from "@/components/Dashboard/ProfileCard";

const Leaves = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const fetchLeaveData = async ({ date }: any) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/employee/leave-approved?date=${date}`
    );
    return response.data;
  };
  const { isError, isLoading, data } = useQuery({
    queryKey: ["leaves", date],
    queryFn: () =>
      fetchLeaveData({ date: date || DateReverseFormat(new Date() as any) }),
    staleTime: 10000,
  });
  const handleDateChange = (selectedDate: any) => {
    setDate(selectedDate);
    console.log(selectedDate);
  };
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-start justify-center gap-12 px-8">
        <div className="w-full flex items-center justify-between">
          <h2 className="w-full text-3xl font-medium capitalize">
            Our Team Buddy Leave{" "}
            <span className="text-cyan-500 font-semibold"> today</span>
          </h2>
          <div className="flex items-center justify-center gap-12">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">Leave Apply</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Leave Application</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">Hello</div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-[240px] pl-3 text-left font-normal">
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    className="rounded-md border shadow"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="">
          <ProfileCard isLoading={isLoading} isError={isError} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Leaves;
