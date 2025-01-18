import Asideboard from "./Asideboard";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/5 h-full border-r-2">
        <Asideboard />
      </div>
      <main className="w-4/5 h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
