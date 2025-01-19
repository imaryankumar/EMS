import { Bell, ChevronDown, Moon, Search } from "lucide-react";

const Navbar = () => {
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
          <span className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border">
            H
          </span>
          <div className="flex gap-1 items-center justify-center">
            <span>Hello Aryan</span>
            <span>
              <ChevronDown size={20} />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
