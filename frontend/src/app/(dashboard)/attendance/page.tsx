"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getDaysInMonth = (month: string, year: number) => {
  const monthsWith30Days = ["April", "June", "September", "November"];
  const monthsWith31Days = [
    "January",
    "March",
    "May",
    "July",
    "August",
    "October",
    "December",
  ];
  if (monthsWith31Days.includes(month)) return 31;
  if (monthsWith30Days.includes(month)) return 30;

  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return isLeapYear ? 29 : 28;
};

const Attendance = ({ year, month }: { year: number; month: string }) => {
  const daysInMonth = getDaysInMonth(month, year);
  const generateAttendanceData = (
    month: string,
    year: number,
    daysInMonth: number
  ) => {
    const data = [];
    for (let i = 1; i <= daysInMonth; i++) {
      data.push({
        date: `${month} ${i}, ${year}`,
        checkInTime: "09:00 AM",
        checkOutTime: "05:00 PM",
        totalHours: "8",
        punctuality: "On Time",
        approval: "Approved",
        status: "Present",
      });
    }
    return data;
  };

  const attendanceData = generateAttendanceData(month, year, daysInMonth);

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full px-4 flex flex-col gap-8">
        <p>
          Attendance for {month} {year}
        </p>
        <div className="w-full h-[45rem] overflow-auto scrollbar pr-4">
          <Table>
            <TableCaption>
              Attendance records for {month} {year}.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Date</TableHead>
                <TableHead className="px-4">Check In time</TableHead>
                <TableHead className="px-4">Check Out Time</TableHead>
                <TableHead className="px-4">Total Hours</TableHead>
                <TableHead className="px-4">Punctuality</TableHead>
                <TableHead className="px-4">Approval</TableHead>
                <TableHead className="px-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium px-4">Hello</TableCell>
                  <TableCell className="px-4">{record.checkInTime}</TableCell>
                  <TableCell className="px-4">{record.checkOutTime}</TableCell>
                  <TableCell className="px-4">{record.totalHours}</TableCell>
                  <TableCell className="px-4">{record.punctuality}</TableCell>
                  <TableCell className="px-4">{record.approval}</TableCell>
                  <TableCell className="px-4">{record.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
