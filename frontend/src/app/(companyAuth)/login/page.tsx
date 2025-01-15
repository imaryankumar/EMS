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
];

type FormData = Record<string, string>;

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    companyEmail: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let validationErrors: Record<string, string> = {};
    if (!formData.companyEmail) {
      validationErrors.companyEmail = "Email is required.";
    }
    if (!formData.phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required.";
    }
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
      companyEmail: formData.companyEmail,
      phoneNumber: formData.phoneNumber,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/company/login`,
        payload
      );
      toast.success("Login successful!");
      setFormData({ companyEmail: "", phoneNumber: "" });
      router.push("/");
    } catch (error: any) {
      const apiErrorMessage =
        error?.response?.data?.message ||
        "An error occurred during login. Please try again.";
      toast.error(apiErrorMessage, {
        id: "error-toast",
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
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl">Company Login</CardTitle>
            <CardDescription>
              Enter your email and phone number to log in to your account.
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
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
            <p className="text-center mt-4">
              <span className="font-medium">Already have an account? </span>
              <Link href={"/signup"} className="text-blue-500 underline">
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
