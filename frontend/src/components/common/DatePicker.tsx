"use client";

import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface SimpleDateInputProps {
  date: Date | undefined;
  handleDateChange: (date: Date | undefined) => void;
  width?: string;
  placeholder?: string;
}

const SimpleDateInput = ({
  date,
  handleDateChange,
  width = "w-full",
  placeholder = "Select date",
}: SimpleDateInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      handleDateChange(new Date(value));
    } else {
      handleDateChange(undefined);
    }
  };

  const dateValue = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <Input
      type="date"
      value={dateValue}
      onChange={handleInputChange}
      className={width}
      placeholder={placeholder}
    />
  );
};

export default SimpleDateInput;
