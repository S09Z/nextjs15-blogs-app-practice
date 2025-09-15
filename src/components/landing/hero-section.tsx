"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, Popover } from "@/components/floating-ui";
import {
  ArrowRight,
  Play,
  Download,
  Star,
  Users,
  Zap,
  ChevronDown,
} from "lucide-react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      label: "Happy Users",
      value: "10K+",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "5-Star Reviews",
      value: "500+",
      icon: <Star className="w-5 h-5" />,
    },
    {
      label: "Lightning Fast",
      value: "< 100ms",
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Main Headline */}
        <div
          className={`space-y-4 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Build Amazing
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Create stunning web applications with modern tools, beautiful
            animations, and seamless user interactions that your users will
            love.
          </p>
        </div>

        {/* Animated CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Tooltip
            content="Start building something amazing today!"
            placement="top"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Tooltip>

          <Popover
            content={
              <div className="space-y-3">
                <h3 className="font-semibold">Watch Demo Video</h3>
                <p className="text-sm text-muted-foreground">
                  See how easy it is to create beautiful animations and
                  interactions
                </p>
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                  <Play className="w-12 h-12 text-purple-600" />
                </div>
                <Button size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Assets
                </Button>
              </div>
            }
            className="w-80"
            placement="bottom"
          >
            <Button
              variant="outline"
              size="lg"
              className="group border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </Popover>
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <Tooltip
              key={stat.label}
              content={`${stat.label}: ${stat.value}`}
              placement="top"
            >
              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-center mb-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </Tooltip>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <Tooltip content="Scroll to explore more" placement="top">
            <div className="animate-bounce cursor-pointer">
              <ChevronDown className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors" />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
