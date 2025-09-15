"use client";

import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, Popover } from "@/components/floating-ui";
import {
  Palette,
  Zap,
  Shield,
  Smartphone,
  Code,
  Sparkles,
  ArrowUpRight,
  Info,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  color: string;
  gradient: string;
}

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Beautiful Design",
      description: "Stunning UI components with modern design principles",
      details:
        "Our design system follows the latest trends with carefully crafted components that look great on any device.",
      color: "text-pink-500",
      gradient: "from-pink-500/20 to-rose-500/20",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized performance for the best user experience",
      details:
        "Built with performance in mind, featuring lazy loading, code splitting, and optimal bundle sizes.",
      color: "text-yellow-500",
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime",
      details:
        "Advanced security measures including encryption, secure authentication, and regular security audits.",
      color: "text-green-500",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile First",
      description: "Responsive design that works on all devices",
      details:
        "Mobile-first approach ensures your application looks and works perfectly on any screen size.",
      color: "text-blue-500",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Developer Friendly",
      description: "Clean code with excellent documentation",
      details:
        "Well-structured codebase with comprehensive documentation, examples, and TypeScript support.",
      color: "text-purple-500",
      gradient: "from-purple-500/20 to-indigo-500/20",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Rich Animations",
      description: "Smooth animations that delight users",
      details:
        "Carefully crafted animations using modern web standards for smooth, performant user interactions.",
      color: "text-indigo-500",
      gradient: "from-indigo-500/20 to-purple-500/20",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 200); // Stagger animations
          }
        });
      },
      { threshold: 0.1 },
    );

    const cards = sectionRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build modern, scalable applications with
            exceptional user experiences
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              data-index={index}
              className={`group relative overflow-hidden border-0 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm transition-all duration-700 hover:scale-105 hover:shadow-xl ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <CardHeader className="relative">
                <div
                  className={`inline-flex p-3 rounded-lg bg-white/10 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                <CardTitle className="flex items-center gap-2">
                  {feature.title}

                  <Popover
                    content={
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                          {feature.icon}
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.details}
                        </p>
                        <div className="pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            <ArrowUpRight className="w-4 h-4 mr-2" />
                            Learn More
                          </Button>
                        </div>
                      </div>
                    }
                    placement="top"
                    className="w-80"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </Popover>
                </CardTitle>

                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tooltip
                  content={`Click to learn more about ${feature.title}`}
                  placement="bottom"
                >
                  <Button
                    variant="ghost"
                    className="group/btn w-full justify-start p-0 h-auto text-sm hover:bg-transparent"
                  >
                    Explore feature
                    <ArrowUpRight className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-200" />
                  </Button>
                </Tooltip>
              </CardContent>

              {/* Animated border effect */}
              <div className="absolute inset-0 border border-white/20 rounded-lg group-hover:border-white/40 transition-colors duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
