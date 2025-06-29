import React from "react";
import { Users, Calendar, Clock, FileText, User, Package } from "lucide-react";
import Image from "next/image";

const TrackForceLanding = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Overview",
      description: "View all employees in your company at a glance",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Leaves",
      description: "Manage leave requests and approvals efficiently",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Attendance",
      description: "Track employee attendance and working hours",
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Inventory",
      description: "Manage company assets and inventory items",
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Profile",
      description: "Employee profiles and personal information",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Worklog",
      description: "Daily work tracking and productivity monitoring",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "HR/Admin Signup",
      description: "Register your company account",
    },
    {
      step: "2",
      title: "Add Employees",
      description: "Invite and onboard your team members",
    },
    {
      step: "3",
      title: "Start Tracking",
      description: "Monitor attendance, leaves, and productivity",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Banner */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - 50% */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Streamline Your Workforce with{" "}
                <span className="text-cyan-800">Track Force</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                An intelligent employee management platform to manage
                attendance, worklogs, leaves, and performance — all in one
                place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-cyan-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-cyan-900 transition-colors">
                  Book a Demo
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors">
                  Start Free Trial
                </button>
              </div>
            </div>

            {/* Right Banner Image - 50% */}
            <div className="relative w-full h-96 border overflow-hidden rounded">
              <Image
                src="/images/signup.jpeg"
                alt="heading"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">Get started in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-cyan-800 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Team
            </h2>
            <p className="text-gray-600">
              Track what matters most for your company
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 rounded-lg hover:border-cyan-200 hover:shadow-sm transition-all">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-cyan-50 text-cyan-800 rounded-lg mr-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-800 mb-2">50+</div>
              <div className="text-gray-600">Companies Trust Us</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-800 mb-2">10K+</div>
              <div className="text-gray-600">Employees Managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-800 mb-2">95%</div>
              <div className="text-gray-600">Time Saved on HR Tasks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Simplify Your HR Management?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join companies who switched to TrackForce for better team management
          </p>
          <button className="bg-cyan-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-cyan-900 transition-colors text-lg">
            Start Your Free Trial
          </button>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day free trial • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-900 font-bold text-xl mb-4 sm:mb-0">
              TrackForce
            </div>
            <div className="text-gray-600 text-sm">
              © 2025 TrackForce. Built for growing companies.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrackForceLanding;
