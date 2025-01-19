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
import Logo from "../../../public/images/logoicon.png";
import { useState } from "react";

interface Route {
  id: number;
  label: string;
  icon: any;
  url: string;
}

const ASidebar = () => {
  const [activeRouteId, setActiveRouteId] = useState<number>(1);

  const routes: Route[] = [
    {
      id: 1,
      label: "overview",
      url: "overview",
      icon: <PieChart size={20} />,
    },
    {
      id: 2,
      label: "leaves",
      url: "leaves",
      icon: <CalendarCheck size={20} />,
    },
    {
      id: 3,
      label: "workLog",
      url: "worklogs",
      icon: <Briefcase size={20} />,
    },
    {
      id: 4,
      label: "attendance",
      url: "attendance",
      icon: <Book size={20} />,
    },
    {
      id: 5,
      label: "inventory",
      url: "inventory",
      icon: <Package size={20} />,
    },
    {
      id: 6,
      label: "profile",
      url: "profile",
      icon: <User size={20} />,
    },
  ];

  const handleRouteChange = (id: number) => {
    setActiveRouteId(id);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-start justify-start gap-10 py-4 px-8">
        <div className="relative">
          <Image
            src={Logo}
            alt="Logo"
            width={200}
            height={200}
            className="blend-image"
          />
        </div>
        <div className="flex flex-col gap-3 w-full h-full">
          {routes.map((route) => (
            <Link key={route?.id} href={route?.url}>
              <div
                onClick={() => handleRouteChange(route.id)}
                className={`flex items-center justify-start gap-3 py-1 px-2 cursor-pointer rounded hover:bg-slate-300 ${
                  activeRouteId === route?.id ? "bg-slate-300" : ""
                }`}
              >
                <span>{route?.icon}</span>
                <span className="text-lg font-semibold capitalize">
                  {route?.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div>Hello</div>
      </div>
    </div>
  );
};

export default ASidebar;
