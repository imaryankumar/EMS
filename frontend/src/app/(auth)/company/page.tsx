"use client";

import Image from "next/image";
import Logo from "../../../../public/images/logoIcon.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff, Building2, User } from "lucide-react";
import toast from "react-hot-toast";
import { RemoveCookies, StoreCookies } from "@/helper/CookieStore";
import { useRouter } from "next/navigation";
import axios from "axios";

const CompanyAuth: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [authDetails, setAuthDetails] = useState({
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    address: "",
    gstNumber: "",
    password: "",
  });

  const resetForm = () => {
    setAuthDetails({
      companyName: "",
      companyEmail: "",
      phoneNumber: "",
      address: "",
      gstNumber: "",
      password: "",
    });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    resetForm();
    setIsShowPassword(false);
  };

  const validateForm = () => {
    if (!authDetails.companyEmail) {
      toast.error("Company email is required");
      return false;
    }
    if (authDetails.phoneNumber.length < 10) {
      toast.error("Phone number must be 10 digits");
      return false;
    }
    if (authDetails.password.length < 5) {
      toast.error("Password must be at least 5 characters");
      return false;
    }

    if (!isLogin) {
      if (!authDetails.companyName) {
        toast.error("Company name is required");
        return false;
      }
      if (!authDetails.address) {
        toast.error("Address is required");
        return false;
      }
      if (!authDetails.gstNumber) {
        toast.error("GST number is required");
        return false;
      }
    }

    return true;
  };

  const onFormSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    const endpoint = isLogin
      ? "/api/v1/company/login"
      : "/api/v1/company/signup";
    const payload = isLogin
      ? {
          companyEmail: authDetails.companyEmail,
          phoneNumber: authDetails.phoneNumber,
          password: authDetails.password,
        }
      : {
          companyName: authDetails.companyName,
          companyEmail: authDetails.companyEmail,
          phoneNumber: authDetails.phoneNumber,
          address: authDetails.address,
          gstNumber: authDetails.gstNumber,
          password: authDetails.password,
        };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
        payload
      );

      if (res?.data?.success) {
        StoreCookies("companyToken", res?.data?.token);
        StoreCookies("companyName", res?.data?.companyName);

        if (res?.data?.message?.toLowerCase().includes("expired")) {
          RemoveCookies("companyToken");
          RemoveCookies("companyName");
          router.push("/company/auth");
          toast.error("Session expired, please login again.");
          return;
        }

        resetForm();
        toast.success(res?.data?.message);
        router.push("/signup");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      const messageError =
        error?.response?.data?.message || "Something went wrong!!";
      toast.error(messageError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full h-full flex flex-col lg:flex-row">
        {/* Left Side - Image/Branding */}
        <div className="w-full lg:w-3/5 h-64 md:h-80 lg:h-screen bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center text-white px-8">
            <div className="mb-8">
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={120}
                className="mx-auto mb-4 drop-shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Track<span className="text-cyan-200">Force</span>
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 font-light">
              Powering Workforce Efficiency through Intelligent Tracking
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Auth Toggle */}
            <div className="bg-gray-100 rounded-lg p-1 mb-8 relative">
              <div
                className={`absolute top-1 h-10 bg-white rounded-md shadow-sm transition-all duration-300 ease-in-out ${
                  isLogin
                    ? "left-1 w-[calc(50%-4px)]"
                    : "left-1/2 w-[calc(50%-4px)]"
                }`}></div>
              <div className="relative flex">
                <button
                  type="button"
                  onClick={() => !isLogin && toggleAuthMode()}
                  className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-colors duration-200 z-10 flex items-center justify-center gap-2 ${
                    isLogin ? "text-gray-900" : "text-gray-500"
                  }`}>
                  <User size={16} />
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => isLogin && toggleAuthMode()}
                  className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-colors duration-200 z-10 flex items-center justify-center gap-2 ${
                    !isLogin ? "text-gray-900" : "text-gray-500"
                  }`}>
                  <Building2 size={16} />
                  Sign Up
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              className="space-y-6 bg-white rounded-xl shadow-lg p-8 border border-gray-200"
              onSubmit={onFormSubmitHandler}>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? "Welcome Back!" : "Create Account"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isLogin
                    ? "Sign in to your company account"
                    : "Register your company with TrackForce"}
                </p>
              </div>

              <div className="space-y-4">
                {/* Company Name - Only for Signup */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isLogin ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
                  }`}>
                  <Label
                    htmlFor="companyName"
                    className="text-sm font-medium text-gray-700">
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    id="companyName"
                    placeholder="Enter company name"
                    value={authDetails.companyName}
                    onChange={(e) =>
                      setAuthDetails({
                        ...authDetails,
                        companyName: e.target.value,
                      })
                    }
                    className="mt-1 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* Company Email */}
                <div>
                  <Label
                    htmlFor="companyEmail"
                    className="text-sm font-medium text-gray-700">
                    Company Email
                  </Label>
                  <Input
                    type="email"
                    id="companyEmail"
                    placeholder="company@example.com"
                    value={authDetails.companyEmail}
                    onChange={(e) =>
                      setAuthDetails({
                        ...authDetails,
                        companyEmail: e.target.value,
                      })
                    }
                    className="mt-1 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    placeholder="Enter phone number"
                    value={authDetails.phoneNumber}
                    onChange={(e) =>
                      setAuthDetails({
                        ...authDetails,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="mt-1 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* Address - Only for Signup */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isLogin ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
                  }`}>
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700">
                    Address
                  </Label>
                  <Input
                    type="text"
                    id="address"
                    placeholder="Enter company address"
                    value={authDetails.address}
                    onChange={(e) =>
                      setAuthDetails({
                        ...authDetails,
                        address: e.target.value,
                      })
                    }
                    className="mt-1 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* GST Number - Only for Signup */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isLogin ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
                  }`}>
                  <Label
                    htmlFor="gstNumber"
                    className="text-sm font-medium text-gray-700">
                    GST Number
                  </Label>
                  <Input
                    type="text"
                    id="gstNumber"
                    placeholder="Enter GST number"
                    value={authDetails.gstNumber}
                    onChange={(e) =>
                      setAuthDetails({
                        ...authDetails,
                        gstNumber: e.target.value,
                      })
                    }
                    className="mt-1 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* Password */}
                <div>
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      type={isShowPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter password"
                      value={authDetails.password}
                      onChange={(e) =>
                        setAuthDetails({
                          ...authDetails,
                          password: e.target.value,
                        })
                      }
                      className="pr-10 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      onClick={() => setIsShowPassword(!isShowPassword)}>
                      {isShowPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {isLogin && (
                    <div className="text-right mt-2">
                      <button
                        type="button"
                        className="text-sm text-cyan-600 hover:text-cyan-800 hover:underline">
                        Forgot password?
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6 text-sm text-gray-500">
              <p>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-cyan-600 hover:text-cyan-800 font-medium hover:underline">
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAuth;
