"use client";

import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import DatePicker from "./DatePicker";
import { Checkbox } from "../ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsWorkModalOpen } from "@/store/utilsData/utilsDataSlice";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

export const projectWorkName = [
  "ProjectA",
  "ProjectB",
  "ProjectC",
  "ProjectD",
  "ProjectE",
];

const submitWorkLog = async (payload: any) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/worklog/add-work`,
    payload,
    {
      withCredentials: true,
    }
  );
  return data;
};

const WorkLogCard = ({ data, isError, isLoading }: any) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { isWorkModalOpen } = useAppSelector((state) => state.utilsData);

  const [isCurrentDate, setIsCurrentDate] = useState<string | null>(null);
  const [dayType, setDayType] = useState<"full" | "half" | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [hourSpent, setHourSpent] = useState<string>("");

  const onWorkLogHandler = (card: any) => {
    if (card?.status === "not updated") {
      dispatch(setIsWorkModalOpen(true));
      setIsCurrentDate(card?.date.split(" ")[0]);
    }
  };

  const mutation = useMutation({
    mutationFn: submitWorkLog,
    onSuccess: () => {
      toast.success("Work log submitted successfully!!");
      queryClient.invalidateQueries(["workLogs"] as any);
      setIsCurrentDate(null);
      setDayType(null);
      setSelectedProject(null);
      setDescription("");
      setHourSpent("");
      dispatch(setIsWorkModalOpen(false));
    },
    onError: () => {
      toast.error("Failed to submit work log");
    },
  });

  const handleSubmit = () => {
    if (!dayType || !selectedProject || !description || !hourSpent) {
      toast.error("Please fill all required fields!");
      return;
    }
    const payload = {
      date: isCurrentDate,
      dayType,
      project: selectedProject,
      description,
      hourSpent,
    };
    mutation.mutate(payload);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4 overflow-auto scrollbar pr-4">
        {isLoading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : data?.result.length > 0 ? (
          <>
            {data?.result?.map((card: any, index: any) => (
              <div key={index} className="h-full">
                <Card
                  className="w-full h-32 flex items-center justify-between px-4 cursor-pointer"
                  onClick={() => onWorkLogHandler(card)}>
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
                      }`}>
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
            ))}
          </>
        ) : (
          <p className="text-center text-xl font-semibold">
            Logs not found for certain days.
          </p>
        )}

        <Dialog
          open={isWorkModalOpen}
          onOpenChange={(open) => {
            dispatch(setIsWorkModalOpen(open));
            if (!open) {
              setIsCurrentDate(null);
            }
          }}>
          <DialogContent
            className="sm:max-w-[400px] md:max-w-[500px]"
            onInteractOutside={(event) => event.preventDefault()}
            aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="text-cyan-600 text-lg">
                Send Work Report
              </DialogTitle>
            </DialogHeader>
            <div className="w-full flex flex-col gap-5">
              <div className="relative z-[9999]">
                <Label>Select Date</Label>
                <DatePicker width="w-full" date={isCurrentDate} />
              </div>
              <div className="w-full flex flex-col gap-3">
                <Label>Select Day Type</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fullday"
                      checked={dayType === "full"}
                      onCheckedChange={() => setDayType("full")}
                    />
                    <label htmlFor="fullday" className="text-sm font-medium">
                      Full Day (Min. 9 hrs)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="halfday"
                      checked={dayType === "half"}
                      onCheckedChange={() => setDayType("half")}
                    />
                    <label htmlFor="halfday" className="text-sm font-medium">
                      Half Day (Min. 4.5 hrs)
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <span>Add Work Status</span>
                <div className="border rounded min-h-[25rem] w-full flex flex-col gap-8 overflow-auto px-3 py-4">
                  <div className="w-full flex flex-col gap-2">
                    <Label>
                      Select Project Type
                      <span className="text-red-500"> *</span>
                    </Label>
                    <Select onValueChange={setSelectedProject}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Projects</SelectLabel>
                          {projectWorkName.map((work, index) => (
                            <SelectItem
                              key={index}
                              value={work}
                              className="cursor-pointer">
                              {work}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <Label>
                      Enter detailed description
                      <span className="text-red-500"> *</span>
                    </Label>
                    <Textarea
                      className="min-h-36"
                      placeholder="Type your message here."
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <Label>
                      Enter number of hours spent
                      <span className="text-red-500"> *</span>
                    </Label>
                    <Input
                      type="number"
                      placeholder="Time spent"
                      value={hourSpent}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (parseInt(value) >= 0 && parseInt(value) <= 12)
                        ) {
                          setHourSpent(value);
                        } else {
                          toast.error("Max hours is 12", {
                            id: "error-int",
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={
                  !dayType || !selectedProject || !description || !hourSpent
                }
                className="disabled:opacity-50">
                {mutation.isPending ? "Loading..." : "Submit Work"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default WorkLogCard;
