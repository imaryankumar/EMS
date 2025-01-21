import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, UserCheck, UserMinus } from "lucide-react";
import { it } from "node:test";

const Overview = () => {
  const employeeStats = [
    {
      id: 1,
      icon: <Users />,
      count: 1,
      label: "Total Employees",
      bgColor: "bg-blue-500",
    },
    {
      id: 2,
      icon: <UserPlus />,
      count: 1,
      label: "New Employees",
      bgColor: "bg-red-500",
    },
    {
      id: 3,
      icon: <UserCheck />,
      count: 1,
      label: "Male Employees",
      bgColor: "bg-yellow-500",
    },
    {
      id: 4,
      icon: <UserMinus />,
      count: 1,
      label: "Female Employees",
      bgColor: "bg-sky-400",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <p className="text-2xl w-full">
        Hi,
        <span className="font-semibold"> Aryan Kumar</span> Welcome to EZ Works
      </p>
      <div className="w-full flex gap-3">
        {employeeStats.map((item) => (
          <div key={item?.id} className="w-full h-auto">
            <Card
              className={`shadow-md hover:shadow-lg  border border-gray-200 transition-shadow duration-300 ${item?.bgColor}`}>
              <CardContent className="p-0">
                <div className="flex items-center justify-center gap-4 px-4 py-8">
                  <span className="text-xl border bg-white p-1 rounded">
                    {item?.icon}
                  </span>
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-lg font-semibold text-gray-700">
                      {item?.label}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {item?.count}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
