import { UserCheck, UserMinus, UserPlus, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EmployeCard = ({ userCount }: any) => {
  const employeeStats = [
    {
      id: 1,
      icon: <Users />,
      count: userCount?.totalEmployCount || 0,
      label: "Total Employee",
      bgColor: "bg-[#F5F1FF]",
    },
    {
      id: 2,
      icon: <UserPlus />,
      count: userCount?.recentCount || 0,
      label: "New Employee",
      bgColor: "bg-[#FDF3EC]",
    },
    {
      id: 3,
      icon: <UserCheck />,
      count: userCount?.maleCount || 0,
      label: "Male",
      bgColor: "bg-[#E0F5EE]",
    },
    {
      id: 4,
      icon: <UserMinus />,
      count: userCount?.femaleCount || 0,
      label: "Female",
      bgColor: "bg-[#EBF0FF]",
    },
  ];
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-4">
      {employeeStats.map((item) => (
        <div key={item?.id} className="w-full h-auto">
          <Card className={`${item?.bgColor} shadow-none border-none`}>
            <CardContent className="p-0">
              <div className="flex items-center justify-start gap-4 p-8">
                <span className="text-xl bg-white p-3 rounded">
                  {item?.icon}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-md font-semibold text-gray-700">
                    {item?.label}
                  </span>
                  <span className="text-md text-gray-600">{item?.count}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default EmployeCard;
