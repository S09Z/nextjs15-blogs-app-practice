"use client";

import { useEffect, useState } from "react";
import { Tooltip } from "@/components/floating-ui";
import {
  Sparkles,
  Zap,
  Heart,
  Star,
  Rocket,
  Lightbulb,
  Award,
  Target,
} from "lucide-react";

interface FloatingElement {
  id: number;
  icon: React.ReactNode;
  x: number;
  y: number;
  delay: number;
  tooltip: string;
  color: string;
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const icons = [
      {
        icon: <Sparkles className="w-6 h-6" />,
        tooltip: "Innovation at its finest",
        color: "text-yellow-400",
      },
      {
        icon: <Zap className="w-6 h-6" />,
        tooltip: "Lightning fast performance",
        color: "text-blue-400",
      },
      {
        icon: <Heart className="w-6 h-6" />,
        tooltip: "Built with love and passion",
        color: "text-red-400",
      },
      {
        icon: <Star className="w-6 h-6" />,
        tooltip: "5-star user experience",
        color: "text-purple-400",
      },
      {
        icon: <Rocket className="w-6 h-6" />,
        tooltip: "Launch your ideas to space",
        color: "text-green-400",
      },
      {
        icon: <Lightbulb className="w-6 h-6" />,
        tooltip: "Bright ideas, brighter future",
        color: "text-orange-400",
      },
      {
        icon: <Award className="w-6 h-6" />,
        tooltip: "Award-winning design",
        color: "text-indigo-400",
      },
      {
        icon: <Target className="w-6 h-6" />,
        tooltip: "Precision in every detail",
        color: "text-pink-400",
      },
    ];

    const newElements: FloatingElement[] = icons.map((item, i) => ({
      id: i,
      icon: item.icon,
      tooltip: item.tooltip,
      color: item.color,
      x: Math.random() * 80 + 10, // 10% to 90% to avoid edges
      y: Math.random() * 80 + 10,
      delay: Math.random() * 3,
    }));

    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute pointer-events-auto"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animation: `bounce 3s ease-in-out infinite`,
            animationDelay: `${element.delay}s`,
          }}
        >
          <Tooltip content={element.tooltip} placement="top">
            <div
              className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer ${element.color}`}
            >
              {element.icon}
            </div>
          </Tooltip>
        </div>
      ))}

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
