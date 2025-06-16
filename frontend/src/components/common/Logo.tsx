import Image from "next/image";
import LogoImage from "../../../public/images/logoIcon.png";
import React from "react";

const LogoComponent: React.FC = () => {
  return (
    <div className="relative flex items-center w-44 h-[22rem]">
      <Image src={LogoImage} alt="Logo" className="blend-image" fill />
    </div>
  );
};

export default LogoComponent;
