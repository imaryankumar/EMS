import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signup = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Let's get started. Fill in the details below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="*********" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Type your message here." />
              </div>
            </div>
          </form>
          <Button className="w-full mt-8">Signup</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
