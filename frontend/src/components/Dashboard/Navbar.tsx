"use client";
import { GetCookies, RemoveCookies } from "@/helper/CookieStore";
import { Bell, ChevronDown, LogOut, Moon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUsername = GetCookies("username");
    if (getUsername) {
      setUsername(getUsername.replace("_", " "));
    }
  }, []);

  const fetchLogout = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/employee/logout`,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        RemoveCookies("username");
        RemoveCookies("userToken");
        router.push("/login");
        toast.success(res?.data?.message, {
          id: "logout",
        });
      } else {
        toast.error("Invalid Data!!", {
          id: "error-logout",
        });
      }
    } catch (error: any) {
      console.log(error?.message || "something went wrong!!");
      toast.error("something went wrong!!", {
        id: "error",
      });
    }
  };
  return (
    <nav className="w-full flex items-center justify-between h-20 px-8">
      <div className="flex items-center w-1/2 py-1.5 px-4 relative shadow-sm border rounded-full">
        <span>
          <Search size={18} />
        </span>
        <input
          type="text"
          className="w-full border-none bg-transparent rounded-full px-3 outline-none"
          placeholder="Search here"
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="border p-2 rounded-full">
          <Bell size={20} />
        </div>
        <div className="border p-2 rounded-full">
          <Moon size={20} />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border bg-gray-200">
            {username?.slice(0, 1) || ""}
          </span>
          <Popover>
            <PopoverTrigger>
              <div className="flex gap-1 items-center justify-center">
                <span className="w-28">{username}</span>
                <span>
                  <ChevronDown size={20} />
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-32 h-16 flex items-center gap-4 mt-2 bg-gray-200 cursor-pointer"
              onClick={fetchLogout}>
              <LogOut />
              <span>Logout</span>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
