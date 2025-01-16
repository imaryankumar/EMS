import Image from "next/image";
import Logo from "../../../../public/images/trackforce.webp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex">
        <div className="w-3/5 h-full bg-cover bg-no-repeat bg-custom-login" />
        <div className="w-2/5 h-full flex flex-col gap-4 items-center justify-center">
          <div className="w-28 h-28">
            <Image src={Logo} alt="Logo" className="rounded object-cover" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-sans text-2xl">
              Powering{" "}
              <span className="text-cyan-500 font-semibold">
                Workforce Efficiency
              </span>{" "}
              through Intelligent Tracking
            </h1>
            <span className="font-medium">Track Smarter, Perform Better</span>
          </div>
          <form className="w-full flex flex-col items-center justify-center gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <Input type="tel" id="phone" placeholder="Phone Number" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
