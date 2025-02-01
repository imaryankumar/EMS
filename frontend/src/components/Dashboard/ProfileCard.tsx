import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Mail, BookType, Copy } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { DateFormat } from "@/helper/DateFormat";
import { Skeleton } from "../ui/skeleton";
import toast from "react-hot-toast";

const ProfileCard = ({ isLoading, isError, data }: any) => {
  const onHandleCopy = (text: any) => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard!", {
        id: "text",
      });
    }
  };

  const employeeCount = data?.allDetails?.employees?.length || 10;
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {isLoading ? (
        Array.from({ length: employeeCount }).map((_, index) => (
          <Card
            key={index}
            className="w-full gap-4 h-72 shadow-md border border-gray-200">
            <CardContent className="p-6 w-full h-full flex flex-col items-center justify-start gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-24 h-5" />
              <Skeleton className="w-52 h-5" />
              <Skeleton className="w-52 h-5" />
              <Skeleton className="w-52 h-8" />
            </CardContent>
          </Card>
        ))
      ) : data?.allDetails?.employees?.length > 0 ? (
        data?.allDetails.employees.map((employee: any) => (
          <Card
            key={employee?._id}
            className="w-full relative shadow-md hover:shadow-lg border border-gray-200 transition-shadow duration-300">
            {employee?.status && (
              <span
                className={`absolute right-0 w-24 px-3 py-1 rounded-tl-lg rounded-bl-lg top-2 ${
                  employee?.status === "Pending"
                    ? "bg-orange-400"
                    : "bg-green-500"
                }`}>
                {employee?.status}
              </span>
            )}
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={employee?.profilePic}
                  alt={`${employee?.fullName}'s profile`}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div className="text-center flex flex-col gap-1">
                  <h3 className="text-lg font-bold">{employee.fullName}</h3>
                  <p className="text-sm text-gray-600 border px-2 py-0.5 rounded-full bg-slate-200">
                    {employee.designation}
                  </p>
                </div>
                <div className="text-sm flex flex-col gap-1 w-full text-gray-700">
                  <div className="w-full flex items-center justify-between">
                    <span>EmployeeId:</span>
                    <span>{employee?.employeeId}</span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <span>Join Date:</span>
                    <span>{DateFormat(employee?.dateOfJoining)}</span>
                  </div>
                </div>
                <div className="w-full flex items-center justify-between">
                  <span className="p-2 rounded-xl border bg-gray-200 cursor-pointer">
                    <HoverCard>
                      <HoverCardTrigger>
                        <PhoneCall />
                      </HoverCardTrigger>
                      <HoverCardContent className="flex gap-4 w-auto">
                        <span>{employee?.phoneNumber}</span>
                        <span
                          className="cursor-pointer"
                          onClick={() => onHandleCopy(employee?.phoneNumber)}>
                          <Copy size={20} />
                        </span>
                      </HoverCardContent>
                    </HoverCard>
                  </span>
                  <span className="p-2 rounded-xl border bg-gray-200">
                    <HoverCard>
                      <HoverCardTrigger>
                        <BookType className="cursor-pointer" />
                      </HoverCardTrigger>
                      <HoverCardContent className="flex gap-4 w-auto">
                        <span>{employee?.role}</span>
                      </HoverCardContent>
                    </HoverCard>
                  </span>
                  <span className="p-2 rounded-xl border bg-gray-200">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Mail className="cursor-pointer" />
                      </HoverCardTrigger>
                      <HoverCardContent className="flex gap-4 w-auto">
                        <span>{employee?.email}</span>
                        <span
                          className="cursor-pointer"
                          onClick={() => onHandleCopy(employee?.email)}>
                          <Copy size={20} />
                        </span>
                      </HoverCardContent>
                    </HoverCard>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500 text-center">No employees found.</p>
      )}
    </div>
  );
};

export default ProfileCard;
