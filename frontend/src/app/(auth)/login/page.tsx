"use client";

import Image from "next/image";
import Logo from "../../../../public/images/trackforce.webp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { StoreCookies } from "@/helper/CookieStore";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login: React.FC = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });
  const onFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (userDetails.phoneNumber.length < 10) {
      toast.error("Phone number must be 10 digits", {
        id: "error-phone",
      });
      return;
    }
    if (userDetails.password.length < 5) {
      toast.error("password must be 5 character", {
        id: "error-phone",
      });
      return;
    }
    const payload = {
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber,
      password: userDetails.password,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/employee/login`,
        payload
      );
      if (res?.data?.success) {
        StoreCookies("userToken", res?.data?.token);
        setUserDetails({
          email: "",
          password: "",
          phoneNumber: "",
        });
        toast.success(res?.data?.message);
        router.push("/");
      } else {
        console.error("Something went wrong");
      }
    } catch (error: any) {
      const messageError =
        error?.response?.data?.message || "Something went wrong!!";
      toast.error(messageError, {
        id: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex">
        <div className="w-3/5 h-full bg-cover bg-no-repeat bg-custom-login" />
        <div className="w-2/5 h-full flex flex-col gap-8 items-center justify-center px-12 ">
          <div className="w-28 h-28">
            <Image src={Logo} alt="Logo" className="rounded object-cover" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-sans text-2xl text-center">
              Powering{" "}
              <span className="text-cyan-500 font-semibold">
                Workforce Efficiency
              </span>{" "}
              through Intelligent Tracking
            </h1>
          </div>
          <form
            className="w-full max-w-sm flex flex-col justify-center gap-4 shadow rounded-md border p-4"
            onSubmit={onFormSubmitHandler}
          >
            <h2 className="font-semibold text-2xl pb-1">Login</h2>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={`${isShowPassword ? "text" : "password"}`}
                  id="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    })
                  }
                />
                <span
                  className="absolute right-4 top-2.5 cursor-pointer"
                  onClick={() => setIsShowPassword((prev) => !prev)}
                >
                  {isShowPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </span>
                <span className="text-cyan-500 absolute cursor-pointer hover:underline right-0 py-1 text-sm">
                  Forgot password
                </span>
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full pt-2">
              <Button
                className="w-full cursor-pointer disabled:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Loading.." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
