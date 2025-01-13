import { BadgeInfo, Check } from "lucide-react";
import { Button } from "../ui/button";


const PlansCard = ({ title, plans, price, btnText, bgBtnColor }: any) => {
  const isPresent = ["24/7 dedicated support.", "Multi-level approvals."]
  return (
    <div
      className={`w-full h-[32rem] sm:h-[35rem] border rounded-md flex flex-col items-start justify-between p-4 md:p-6 lg:p-8 shadow-xl bg-white text-black `}>
      <div className="flex flex-col gap-4 w-full">
        <span
          className={`p-0.5 w-16 bg-gray-200 text-black rounded text-center ${bgBtnColor}`}>
          {title}
        </span>
        <h3 className="text-2xl font-semibold">
          ₹{price}{" "}
          <span className="font-medium">/Month</span>
        </h3>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">What's inside:</p>
          {plans?.map((item: any) => {
            return (
              <div
                key={item?.id}
                className=" w-full flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Check size={20} />
                  <span
                    className={`${
                      isPresent.includes(item?.planText) &&
                    "text-blue-700 font-semibold"
                    }`}>
                    {item?.planText}
                  </span>
                </div>
                <span title={item?.info} className="cursor-pointer">
                  <BadgeInfo size={20} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Button className={`w-full text-lg cursor-pointer`}>Get {btnText} Package</Button>
        <span className="text-center">One-time payment · Plus local taxes</span>
      </div>
    </div>
  );
};

export default PlansCard;