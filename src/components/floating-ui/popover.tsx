"use client";

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  arrow,
  FloatingFocusManager,
} from "@floating-ui/react";
import { useState, cloneElement, isValidElement, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface PopoverProps {
  children: React.ReactElement;
  content: React.ReactNode;
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
  offset?: number;
  className?: string;
  showArrow?: boolean;
  showCloseButton?: boolean;
  modal?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export function Popover({
  children,
  content,
  placement = "bottom",
  offset: offsetValue = 8,
  className,
  showArrow = true,
  showCloseButton = true,
  modal = false,
  onOpenChange,
  defaultOpen = false,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const arrowRef = useRef(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
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

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
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
          <FloatingFocusManager context={context} modal={modal}>
            <div
              className={cn(
                "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
                "bg-white border-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",
                "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                className,
              )}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {/* Close Button */}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              )}

              {/* Content */}
              <div className={showCloseButton ? "pr-6" : ""}>{content}</div>

              {/* Arrow */}
              {showArrow && (
                <div
                  ref={arrowRef}
                  className="absolute h-2 w-2 rotate-45 bg-popover border border-border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
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
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
