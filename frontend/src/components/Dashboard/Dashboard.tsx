"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProfileDetail } from "@/store/userDetailSlice/userDetailSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { isLoading, isError, userDetails }: any = useAppSelector(
    (state) => state.getProfileDetail
  );

  useEffect(() => {
    dispatch(getProfileDetail());
  }, [dispatch]);

  console.log("first==>", userDetails.fullName);

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <nav className="w-full flex items-center justify-between p-6 shadow-md">
        <h1 className="text-xl">
          Hi, <span className="font-semibold">{userDetails.fullName}</span>
        </h1>
        <div>Logout</div>
      </nav>
      <div className="w-full h-full flex items-center justify-center">
        Hello
      </div>
    </div>
  );
};

export default Dashboard;
