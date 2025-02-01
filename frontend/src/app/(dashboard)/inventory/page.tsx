import { Package, Search } from "lucide-react";

const Inventory = () => {
  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full flex flex-col gap-10">
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
      </div>
    </div>
  );
};

export default Inventory;
