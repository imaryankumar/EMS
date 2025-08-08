import Image from "next/image";
import { Button } from "../ui/button";
import LogoImage from "../../../public/images/logoIcon.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between px-20 h-24 bg-cyan-800 border-b">
      <div className="relative flex items-center w-28 h-28">
        <Image src={LogoImage} alt="Logo" className="blend-image" fill />
      </div>
      <Link href={"/overview"}>
        <Button className="bg-white text-black hover:bg-white hover:text-black p-5">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;
