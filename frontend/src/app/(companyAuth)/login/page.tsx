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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

type FormField = {
  name: string;
  label: string;
  type: "email" | "password";
  placeholder: string;
};

const formFields: FormField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

type FormData = Record<string, string>;
const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let validationErrors: Record<string, string> = {};
    if (!formData.email) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setErrorMessage("");

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`,
        payload
      );
      console.log("Login successful:", response.data);
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(
        error?.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex items-center justify-between">
        <div className="w-4/6 h-full bg-[url(/images/blue-toned-set-paper-sheets-with-copy-space.jpg)] bg-cover bg-center bg-no-repeat">
          <div className="w-full h-full flex flex-col items-center justify-center px-10 gap-8 text-black">
            <h1 className="text-4xl font-semibold">
              Effortless Workforce Solutions for Growing Businesses
            </h1>
            <p className="text-center text-xl font-mono">
              Streamline your employee management with our comprehensive
              platform. From onboarding to attendance, assets to performance
              tracking empower your HR team with tools built for efficiency and
              scalability. Experience the simplicity of managing your workforce
              today.
            </p>
          </div>
        </div>
        <div className="w-2/6 h-full">
          <div className="w-full h-screen flex items-center justify-center">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email and password to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full gap-4">
                    {formFields.map((field) => (
                      <div
                        key={field.name}
                        className="flex flex-col space-y-1.5">
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
                    {errorMessage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorMessage}
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="w-full mt-8"
                      disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
