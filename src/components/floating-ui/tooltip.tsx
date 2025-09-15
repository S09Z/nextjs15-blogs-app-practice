"use client";

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  arrow,
} from "@floating-ui/react";
import { useState, cloneElement, isValidElement, useRef } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  offset?: number;
  delay?: number;
  className?: string;
  showArrow?: boolean;
}

export function Tooltip({
  children,
  content,
  placement = "top",
  offset: offsetValue = 8,
  delay = 400,
  className,
  showArrow = true,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip({
        crossAxis: placement.includes("top") || placement.includes("bottom"),
        fallbackAxisSideDirection: "start",
        padding: 5,
      }),
      shift({ padding: 5 }),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const hover = useHover(context, {
    move: false,
    delay: {
      open: delay,
      close: 100,
    },
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // Arrow positioning
  const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {};
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]];

  if (!isValidElement(children)) {
    return children;
  }

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({
          ref: refs.setReference,
          ...(children.props || {}),
        }),
      )}
      {isOpen && (
        <FloatingPortal>
          <div
            className={cn(
              "z-50 rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
              "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
              "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              className,
            )}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}
            {showArrow && (
              <div
                ref={arrowRef}
                className="absolute h-2 w-2 rotate-45 bg-popover border border-border bg-slate-900 dark:bg-white"
                style={{
                  left: arrowX != null ? `${arrowX}px` : "",
                  top: arrowY != null ? `${arrowY}px` : "",
                  right: "",
                  bottom: "",
                  [staticSide as string]: "-4px",
                }}
              />
            )}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
