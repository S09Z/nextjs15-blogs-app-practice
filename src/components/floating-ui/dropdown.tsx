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
  useListNavigation,
  FloatingFocusManager,
  useTypeahead,
} from "@floating-ui/react";
import { useState, useRef, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface DropdownProps {
  children: React.ReactElement;
  items: DropdownItem[];
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "bottom-start"
    | "top-start";
  offset?: number;
  className?: string;
  onSelect?: (value: string) => void;
}

export function Dropdown({
  children,
  items,
  placement = "bottom-start",
  offset: offsetValue = 4,
  className,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const listContentRef = useRef(items.map((item) => item.label));

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip({ padding: 5 }),
      shift({ padding: 5 }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    onMatch: setActiveIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation, typeahead],
  );

  const handleItemClick = (item: DropdownItem, index: number) => {
    if (item.disabled) return;

    item.onClick?.();
    onSelect?.(item.value);
    setIsOpen(false);
    setActiveIndex(null);
  };

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
          <FloatingFocusManager context={context} modal={false}>
            <div
              className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                "bg-white border-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",
                "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                className,
              )}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {items.map((item, index) => (
                <div
                  key={item.value}
                  ref={(node) => {
                    listRef.current[index] = node;
                  }}
                  role="menuitem"
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                    "focus:bg-accent focus:text-accent-foreground",
                    "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
                    item.disabled && "pointer-events-none opacity-50",
                    activeIndex === index && "bg-accent text-accent-foreground",
                  )}
                  tabIndex={item.disabled ? undefined : -1}
                  {...getItemProps({
                    onClick: () => handleItemClick(item, index),
                  })}
                >
                  {item.icon && (
                    <span className="mr-2 h-4 w-4">{item.icon}</span>
                  )}
                  {item.label}
                </div>
              ))}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
