"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";

type FormField = {
  name: string;
  label: string;
  type: "email" | "text";
  placeholder: string;
};

const formFields: FormField[] = [
  {
    name: "companyName",
    label: "Company Name",
    type: "text",
    placeholder: "Enter your company name",
  },
  {
    name: "companyEmail",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter your company address",
  },
  {
    name: "gstNumber",
    label: "GST Number",
    type: "text",
    placeholder: "Enter your GST number",
  },
];

type FormData = Record<string, string>;

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    address: "",
    gstNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};
    if (!formData.companyName)
      validationErrors.companyName = "Company name is required.";
    if (!formData.companyEmail)
      validationErrors.companyEmail = "Email is required.";
    if (!formData.phoneNumber)
      validationErrors.phoneNumber = "Phone number is required.";
    if (!formData.address) validationErrors.address = "Address is required.";
    if (!formData.gstNumber)
      validationErrors.gstNumber = "GST number is required.";
    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fill all required fields.", {
        id: "empty-fields",
      });
      return;
    }

    setLoading(true);

    const payload = {
      companyName: formData.companyName,
      companyEmail: formData.companyEmail,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      gstNumber: formData.gstNumber,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/company/signup`,
        payload
      );

      if (response.data?.success) {
        toast.success("Signup successful!", {
          id: "success-message",
        });

        setFormData({
          companyName: "",
          companyEmail: "",
          phoneNumber: "",
          address: "",
          gstNumber: "",
        });

        setErrors({});
        router.push("/login");
      } else {
        toast.error("Signup failed. Please try again.", {
          id: "failure-message",
        });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "An error occurred during signup. Please try again.";
      toast.error(message, {
        id: "error-message",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-4/6 h-full bg-[url('/images/blue-toned-set-paper-sheets-with-copy-space.jpg')] bg-cover bg-center flex flex-col items-center justify-center px-10 gap-8 text-black">
        <h1 className="text-4xl font-semibold text-center">
          Effortless Workforce Solutions for Growing Businesses
        </h1>
        <p className="text-center text-xl font-mono">
          Streamline your employee management with our comprehensive platform.
          From onboarding to attendance, assets to performance tracking —
          empower your HR team with tools built for efficiency and scalability.
          Experience the simplicity of managing your workforce today.
        </p>
      </div>
      <div className="w-2/6 h-full flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Company Signup</CardTitle>
            <CardDescription>
              Fill in the details below to create your company account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full gap-4">
                {formFields.map((field) => (
                  <div key={field.name} className="flex flex-col space-y-1.5">
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={`w-full ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={loading}>
                  {loading ? "Processing..." : "Signup"}
                </Button>
              </div>
            </form>
            <p className="text-center mt-4">
              <span className="font-medium">Don't have an account? </span>
              <Link href={"/login"} className="text-blue-500 underline">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
