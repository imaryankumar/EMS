import PlansCard from "../../components/common/PlansCard";

const SubscriptionPlan = () => {

  const plans = [
    {
      title: "Free",
      price: "0",
      features: [
        {
          id: 1,
          planText: "Up to 50 employees",
          info: "Great for small teams just getting started.",
        },
        {
          id: 2,
          planText: "Basic attendance dashboard",
          info: "Track attendance with a simple dashboard.",
        },
        {
          id: 3,
          planText: "Basic leave approval",
          info: "Employees can apply for leave, managers approve.",
        },
        {
          id: 4,
          planText: "HR & Manager roles",
          info: "Assign basic roles for HR and Managers.",
        },
        {
          id: 5,
          planText: "Track company assets",
          info: "Track assets with basic records.",
        },
        {
          id: 6,
          planText: "Community support",
          info: "Access user forums for troubleshooting.",
        },
        {
          id: 7,
          planText: "Free for small teams",
          info: "Perfect for startups and small businesses.",
        },
      ],
      btnText: "Free",
      bgBtnColor: "bg-slate-300 text-black",
    },
    {
      title: "Plus",
      price: "499",
      features: [
        {
          id: 1,
          planText: "Up to 200 employees",
          info: "Support for growing teams and businesses.",
        },
        {
          id: 2,
          planText: "WFH & leave tracking",
          info: "Track WFH days and leave approvals.",
        },
        {
          id: 3,
          planText: "Multi-level approvals",
          info: "Set approval hierarchy for leave requests.",
        },
        {
          id: 4,
          planText: "Team Lead roles",
          info: "Assign team leads with limited access.",
        },
        {
          id: 5,
          planText: "Asset assignment reports",
          info: "Generate reports on asset distribution.",
        },
        {
          id: 6,
          planText: "Priority support",
          info: "Get faster responses with email support.",
        },
        {
          id: 7,
          planText: "Affordable for growth",
          info: "Great value for businesses scaling up.",
        },
      ],
      btnText: "Plus",
      bgBtnColor: "bg-sky-500 text-white",
    },
    {
      title: "Pro",
      price: "999",
      features: [
        {
          id: 1,
          planText: "Up to 500 employees",
          info: "Designed for large teams and enterprises.",
        },
        {
          id: 2,
          planText: "Advanced attendance reports",
          info: "Detailed analytics on attendance trends.",
        },
        {
          id: 3,
          planText: "Custom leave policies",
          info: "Create and automate custom leave workflows.",
        },
        {
          id: 4,
          planText: "Custom roles & permissions",
          info: "Fully customizable roles for your organization.",
        },
        {
          id: 5,
          planText: "Advanced asset management",
          info: "Track and analyze large volumes of assets.",
        },
        {
          id: 6,
          planText: "24/7 dedicated support",
          info: "Access support at any time, day or night.",
        },
        {
          id: 7,
          planText: "Enterprise features",
          info: "Unlock premium features for large enterprises.",
        },
      ],
      btnText: "Pro",
      bgBtnColor: "bg-teal-500 text-white",
    },
  ];
  
  return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-8 sm:gap-10 py-12">
        <h2 className="text-xl sm:text-3xl text-center font-semibold">
         Find the perfect plan to <span className="text-teal-500 font-semibold">scale your business</span> with ease
        </h2>
        <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-6 px-6 sm:px-32 lg:px-44">
          {plans.map((plan, index) => (
            <PlansCard
              key={index}
              title={plan.title}
              price={plan.price}
              plans={plan.features}
              btnText={plan.btnText}
              bgBtnColor={plan.bgBtnColor}
            />
          ))}
        </div>
      </div>
  );
};

export default SubscriptionPlan;