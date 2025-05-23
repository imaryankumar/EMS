import { Button } from "../ui/button";
import LogoComponent from "./Logo";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between px-20 h-24 bg-slate-100 border-b">
      <LogoComponent />
      <Button>Get Started</Button>
    </div>
  );
};

export default Navbar;
