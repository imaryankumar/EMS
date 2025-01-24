"use client";
import { useAppDispatch } from "@/store/hooks";
import { getProfileDetail } from "@/store/userDetailSlice/userDetailSlice";
import { useEffect } from "react";

const ProfileDataWrapper = ({ children }: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfileDetail());
  }, [dispatch]);
  return <>{children}</>;
};

export default ProfileDataWrapper;
