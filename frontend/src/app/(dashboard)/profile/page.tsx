"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

type FormField = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "select"
    | "textarea"
    | "date"
    | "number";
  options?: string[];
};

const formFields: FormField[] = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phoneNumber", label: "Phone Number", type: "tel" },
  { name: "password", label: "Password", type: "password" },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: ["admin", "hr", "employee", "manager"],
  },
  {
    name: "jobType",
    label: "Job Type",
    type: "select",
    options: ["on-site", "remote"],
  },
  { name: "designation", label: "Designation", type: "text" },
  { name: "department", label: "Department", type: "text" },
  { name: "dateOfBirth", label: "Date of Birth", type: "date" },
  { name: "dateOfJoining", label: "Date of Joining", type: "date" },
  { name: "leaveBalance", label: "Leave Balance", type: "number" },
  {
    name: "employmentStatus",
    label: "Employment Status",
    type: "select",
    options: ["active", "inactive"],
  },
  { name: "emergencyContact", label: "Emergency Contact", type: "tel" },
  {
    name: "maritalStatus",
    label: "Marital Status",
    type: "select",
    options: ["single", "married", "divorced"],
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["male", "female", "other"],
  },
  {
    name: "probationPeriod",
    label: "Probation Period (Months)",
    type: "number",
  },
  { name: "address", label: "Address", type: "textarea" },
  { name: "reportingManager", label: "Reporting Manager", type: "text" },
];

const Profile = () => {
  const [userDetail, setUserDetail] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserDetail((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserDetail((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors: any = {};
    formFields.forEach((field) => {
      if (
        field.type !== "select" &&
        field.type !== "textarea" &&
        !userDetail[field.name]
      ) {
        validationErrors[field.name] = `${field.label} is required`;
      }
    });
    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    const payload = { ...userDetail };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/employee/signup`,
        payload
      );
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: FormField) => {
    const hasError = errors[field.name];

    switch (field.type) {
      case "select":
        return (
          <Select
            key={field.name}
            value={userDetail[field.name]}
            onValueChange={(value) => handleSelectChange(field.name, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{field.label}</SelectLabel>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            key={field.name}
            name={field.name}
            value={userDetail[field.name]}
            onChange={handleChange}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            className={`w-full ${hasError ? "border-red-500" : ""}`}
          />
        );
      case "text":
      case "email":
      case "tel":
      case "password":
      case "number":
      case "date":
        return (
          <Input
            key={field.name}
            name={field.name}
            type={field.type}
            value={userDetail[field.name]}
            onChange={handleChange}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            className={`w-full ${hasError ? "border-red-500" : ""}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="text-2xl">Update an account</CardTitle>
          <CardDescription>
            Fill in the details below to update your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full">
              {formFields.map((field) => (
                <div key={field.name} className="flex flex-col space-y-1.5">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {renderField(field)}
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <Button type="submit" className="w-auto mt-8" disabled={loading}>
              {loading ? "Submitting..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
