"use client";
import {
  User,
  Briefcase,
  Book,
  Package,
  CalendarCheck,
  PieChart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/trackforce.webp";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { Skeleton } from "../ui/skeleton";
import LogoComponent from "../common/Logo";

interface Route {
  id: number;
  label: string;
  icon: any;
  url: string;
}

const ASidebar = () => {
  const pathname = usePathname().slice(1);
  const [activeRouteId, setActiveRouteId] = useState<string>(pathname);
  const { userDetails, isLoading } = useAppSelector(
    (state) => state.getProfileDetail
  );

  const routes: Route[] = [
    {
      id: 1,
      label: "Overview",
      url: "overview",
      icon: <PieChart size={25} />,
    },
    {
      id: 2,
      label: "leaves",
      url: "leaves",
      icon: <CalendarCheck size={25} />,
    },
    {
      id: 3,
      label: "workLog",
      url: "worklogs",
      icon: <Briefcase size={25} />,
    },
    {
      id: 4,
      label: "attendance",
      url: "attendance",
      icon: <Book size={25} />,
    },
    {
      id: 5,
      label: "inventory",
      url: "inventory",
      icon: <Package size={25} />,
    },
    {
      id: 6,
      label: "profile",
      url: "profile",
      icon: <User size={25} />,
    },
  ];

  const handleRouteChange = (id: any) => {
    setActiveRouteId(id);
  };

  const profilepic =
    userDetails?.profilePic || "https://avatar.iran.liara.run/public";

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-start py-5 bg-cyan-800 text-white">
        <LogoComponent />
        <div className="flex p-2 flex-col items-center justify-center gap-2">
          {isLoading ? (
            <Skeleton className="w-32 h-32 rounded-full" />
          ) : (
            <div className="relative">
              <Image src={profilepic} alt="Profile" width={150} height={150} />
            </div>
          )}

          {isLoading ? (
            <Skeleton className="w-48 h-6 rounded" />
          ) : (
            <h2 className="font-semibold text-2xl">{userDetails?.fullName}</h2>
          )}

          {isLoading ? (
            <Skeleton className="w-44 h-5 rounded" />
          ) : (
            <span className="text-lg">{userDetails?.designation}</span>
          )}

          {isLoading ? (
            <Skeleton className="w-40 h-5 rounded" />
          ) : (
            <span className="border px-6 py-0.5 bg-transparent text-cyan-500 rounded-full">
              {userDetails?.role}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full h-full pl-6 pt-10">
          {routes.map((route) => (
            <Link key={route?.id} href={route?.url}>
              <div
                onClick={() => handleRouteChange(route.url)}
                className={`flex items-center justify-start gap-4 py-3 px-6 cursor-pointer rounded-tl-full rounded-bl-full ${
                  activeRouteId === route?.url
                    ? "bg-[#f3f3f3] text-cyan-500"
                    : ""
                }`}>
                <span>{route?.icon}</span>
                <span className="text-xl font-semibold capitalize">
                  {route?.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ASidebar;
