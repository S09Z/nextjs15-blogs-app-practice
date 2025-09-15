"use client";

import { useEffect, useState } from "react";

interface FloatingOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export function AnimatedBackground() {
  const [orbs, setOrbs] = useState<FloatingOrb[]>([]);

  useEffect(() => {
    const colors = [
      "bg-gradient-to-r from-purple-400/20 to-pink-400/20",
      "bg-gradient-to-r from-blue-400/20 to-cyan-400/20",
      "bg-gradient-to-r from-green-400/20 to-emerald-400/20",
      "bg-gradient-to-r from-yellow-400/20 to-orange-400/20",
      "bg-gradient-to-r from-indigo-400/20 to-purple-400/20",
    ];

    const newOrbs: FloatingOrb[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));

    setOrbs(newOrbs);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className={`absolute rounded-full blur-3xl ${orb.color}`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            animation: `float ${orb.duration}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, -30px) rotate(90deg);
          }
          50% {
            transform: translate(-20px, 20px) rotate(180deg);
          }
          75% {
            transform: translate(-30px, -10px) rotate(270deg);
          }
        }
      `}</style>
    </div>
  );
}
