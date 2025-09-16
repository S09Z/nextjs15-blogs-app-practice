"use client";

import { useEffect, useState, useRef } from "react";

export function CursorMask() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<{ x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    // Force hide cursor on all elements
    const hideCursor = () => {
      document.body.style.cursor = 'none !important';
      document.documentElement.style.cursor = 'none !important';

      // Add global CSS rule to override all cursor styles
      const style = document.createElement('style');
      style.id = 'cursor-hide-global';
      style.textContent = `
        *, *:hover, *:focus, *:active {
          cursor: none !important;
        }
      `;

      // Remove existing style if present
      const existingStyle = document.getElementById('cursor-hide-global');
      if (existingStyle) {
        existingStyle.remove();
      }

      document.head.appendChild(style);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add trail effect
      trailRef.current.push({ x: e.clientX, y: e.clientY, opacity: 1 });
      if (trailRef.current.length > 8) {
        trailRef.current.shift();
      }

      // Continuously hide cursor
      hideCursor();
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]') ||
                           target.closest('a, button, [role="button"]') !== null;
      setIsHovering(isInteractive);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Initial cursor hide
    hideCursor();

    // Watch for new elements and hide their cursor
    const observer = new MutationObserver(() => {
      hideCursor();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Trail animation
    const animateTrail = () => {
      trailRef.current = trailRef.current.map(point => ({
        ...point,
        opacity: point.opacity * 0.9
      })).filter(point => point.opacity > 0.01);

      requestAnimationFrame(animateTrail);
    };
    animateTrail();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      observer.disconnect();

      // Remove global cursor hiding style
      const existingStyle = document.getElementById('cursor-hide-global');
      if (existingStyle) {
        existingStyle.remove();
      }

      // Restore cursor
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Trail Effect */}
      {trailRef.current.map((point, index) => (
        <div
          key={index}
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-lime-400/30 pointer-events-none z-[9996]"
          style={{
            transform: `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`,
            opacity: point.opacity,
          }}
        />
      ))}

      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-200 ease-out mix-blend-difference ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "24px",
          height: "24px",
          background: isHovering
            ? "radial-gradient(circle, rgba(190, 242, 100, 0.8) 0%, rgba(190, 242, 100, 0.4) 70%, transparent 100%)"
            : "rgb(190, 242, 100)",
          border: isHovering ? "2px solid rgba(34, 35, 36, 0.3)" : "2px solid black",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%) scale(${isClicking ? 0.75 : isHovering ? 1.5 : 1})`,
          transformOrigin: "center center",
          backdropFilter: isHovering ? "blur(2px)" : "none",
        }}
      />

      {/* Mask Reveal Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "60px",
          height: "60px",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`,
          transformOrigin: "center center",
          background: `conic-gradient(from 0deg,
            rgba(190, 242, 100, 0.2) 0deg,
            rgba(190, 242, 100, 0.1) 90deg,
            transparent 180deg,
            rgba(190, 242, 100, 0.1) 270deg,
            rgba(190, 242, 100, 0.2) 360deg)`,
          filter: "blur(1px)",
          animation: isHovering ? "spin 2s linear infinite" : "none",
        }}
      />

      {/* Outer Glow */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9997] transition-all duration-700 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "200px",
          height: "200px",
          transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`,
          transformOrigin: "center center",
          background: `radial-gradient(circle, transparent 60%, rgba(190, 242, 100, 0.03) 70%, transparent 100%)`,
          filter: "blur(2px)",
        }}
      />

      {/* Custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          body {
            overflow-x: hidden;
          }
        `
      }} />
    </>
  );
}