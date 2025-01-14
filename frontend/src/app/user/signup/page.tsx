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

const Signup = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-[850px]">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Let's get started. Fill in the details below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-2 w-full items-center gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="passwords">Password</Label>
                  <Input
                    id="passwords"
                    type="password"
                    placeholder="*********"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone No.</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your Phone No."
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="team-lead">Team Lead</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="intern">Intern</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="addresses">Address</Label>
                  <Textarea
                    id="addresses"
                    placeholder="Type your message here."
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Marital Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Employee Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="contractual">Contractual</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    type="text"
                    placeholder="Enter your designation"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="designation">Department</Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="Enter your department"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="reportingManager">Reporting Manager</Label>
                  <Input
                    id="reportingManager"
                    type="text"
                    placeholder="Enter your manager name"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="reportingManager">
                    Probation Period (Month)
                  </Label>
                  <Input
                    id="probation"
                    type="tel"
                    placeholder="Enter your probation time"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="contact">Emergency Contact No.</Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="Enter your contact number"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="*********" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Type your message here."
                  />
                </div>
              </div>
            </div>
          </form>
          <Button className="w-auto mt-8">Signup</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
