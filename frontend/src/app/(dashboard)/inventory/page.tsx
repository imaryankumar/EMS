"use client";
import { Package, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Inventory = () => {
  const fetchAssetData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/asset/all-assets`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssetData,
  });
  console.log("Data==>", data);
  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full flex flex-col gap-12">
        <div className="w-full flex flex-col gap-4 sm:gap-0 sm:flex-row items-start justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <span className="border p-1 rounded bg-gray-200">
              <Package color="#00BCD4" size={30} />
            </span>
            Assets Details
          </h2>
          <div className="flex w-72 sm:w-80 items-center px-3 py-2 relative shadow-sm border rounded-md">
            <input
              type="text"
              className="w-full border-none bg-transparent rounded-md outline-none"
              placeholder="Search by Reference ID"
            />
            <span>
              <Search size={20} />
            </span>
          </div>
        </div>
        <div className="w-full flex items-center justify-between font-semibold text-gray-500">
          <span>Asset Name</span>
          <span>Assign Date</span>
          <span>Reference ID</span>
          <span>Action</span>
        </div>
        {isLoading ? (
          <p className="text-center text-gray-500 font-semibold">Loading...</p>
        ) : data?.getAssets.length > 0 ? (
          <>
            {data?.getAssets?.map((item: any) => {
              return (
                <div
                  key={item?._id}
                  className="w-full h-32 rounded bg-white  flex items-center justify-between px-4">
                  <span>{item?.name}</span>
                  <span>{item?.issuedDate}</span>
                  <span>{item?.serialNumber}</span>
                  <span>{item?.status}</span>
                </div>
              );
            })}
          </>
        ) : (
          <p className="text-center text-gray-500 font-semibold">
            Assets Not Found !!
          </p>
        )}
      </div>
    </div>
  );
};

export default Inventory;
