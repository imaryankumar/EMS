"use client";
import { Boxes, Search, Calendar, Hash, Tag, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Inventory = () => {
  const fetchAssetData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/asset/all-assets`,
      { withCredentials: true }
    );
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssetData,
  });

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "issued":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      case "returned":
        return "bg-green-100 text-green-700 border border-green-200";
      case "damaged":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-6">
        {/* Simple Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold flex items-center gap-3 text-gray-800">
            <Package color="#00BCD4" size={30} />
            Assets Details
          </h2>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by Reference ID"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
        </div>

        {/* Clean Table Container */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:flex items-center bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="w-1/4 font-semibold text-gray-700">Asset Name</div>
            <div className="w-1/4 font-semibold text-gray-700">Issue Date</div>
            <div className="w-1/4 font-semibold text-gray-700">
              Reference ID
            </div>
            <div className="w-1/4 font-semibold text-gray-700">Status</div>
          </div>

          {/* Table Data */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          ) : data?.getAssets?.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {data.getAssets.map((item: any) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 px-6 py-6 hover:bg-gray-50 transition-colors">
                  <div className="w-full sm:w-1/4 flex items-center gap-2">
                    <Boxes className="text-gray-500" size={18} />
                    <span className="font-medium text-gray-900">
                      {item?.name}
                    </span>
                  </div>

                  {/* Issue Date */}
                  <div className="w-full sm:w-1/4 text-gray-600 text-sm sm:text-base">
                    <span className="sm:hidden font-medium text-gray-700 mr-2">
                      Issue Date:
                    </span>
                    {new Date(item?.issuedDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>

                  {/* Reference ID */}
                  <div className="w-full sm:w-1/4">
                    <span className="sm:hidden font-medium text-gray-700 mr-2">
                      Reference ID:
                    </span>
                    <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded font-mono">
                      {item?.serialNumber}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="w-full sm:w-1/4">
                    <span className="sm:hidden font-medium text-gray-700 mr-2">
                      Status:
                    </span>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(
                        item?.status
                      )}`}>
                      {item?.status || "Unknown"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Boxes className="mx-auto text-gray-400 mb-3" size={40} />
                <p className="text-gray-600 font-medium">Assets Not Found !!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
