"use client";

import * as React from "react";
import { Menu } from "@base-ui/react/menu";

import { cn } from "@/lib/utils";

const DropdownMenu = Menu.Root;
const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, Menu.Trigger.Props & { className?: string }>(
  ({ className, ...props }, ref) => (
    <Menu.Trigger
      ref={ref}
      className={cn("cursor-pointer", className)}
      {...props}
    />
  ),
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
const DropdownMenuPortal = Menu.Portal;
const DropdownMenuGroup = Menu.Group;
const DropdownMenuLabel = Menu.GroupLabel;
const DropdownMenuSeparator = Menu.Separator;
const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest text-secondary", className)} {...props} />
);
const DropdownMenuSub = Menu.SubmenuRoot;
const DropdownMenuSubTrigger = React.forwardRef<HTMLElement, Menu.SubmenuTrigger.Props & { className?: string }>(
  ({ className, ...props }, ref) => (
    <Menu.SubmenuTrigger
      ref={ref}
      className={cn(menuItemClass, "flex-nowrap justify-between gap-2", className)}
      {...props}
    />
  ),
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const menuItemClass =
  "relative flex min-h-10 w-full cursor-pointer flex-nowrap items-center gap-3 rounded-sm px-3 py-2 text-left text-sm font-medium text-foreground outline-none select-none whitespace-nowrap data-highlighted:bg-brand/5 data-highlighted:text-foreground";

const dropdownPanelClass =
  "dropdown-menu-panel custom-scrollbar overscroll-contain overflow-y-auto origin-[var(--transform-origin)] rounded-xl border border-border bg-header p-1 text-foreground shadow-[0_20px_50px_-20px_color-mix(in_srgb,var(--brand)_25%,transparent)] outline-none transition-[opacity,transform] duration-150 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0";

const DropdownMenuItem = React.forwardRef<HTMLElement, Menu.Item.Props & { className?: string }>(
  ({ className, ...props }, ref) => (
    <Menu.Item ref={ref} className={cn(menuItemClass, className)} {...props} />
  ),
);
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuContent = React.forwardRef<HTMLDivElement, Menu.Popup.Props & { className?: string; sideOffset?: number; align?: "start" | "center" | "end" }>(
  ({ className, sideOffset = 6, align = "start", ...props }, ref) => (
    <Menu.Portal>
      <Menu.Positioner sideOffset={sideOffset} align={align} className="z-[70] outline-none">
        <Menu.Popup
          ref={ref}
          data-lenis-prevent
          className={cn(
            dropdownPanelClass,
            "min-w-56 max-h-[min(34rem,85vh)]",
            className,
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  ),
);
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, Menu.Popup.Props & { className?: string; sideOffset?: number }>(
  ({ className, sideOffset = 2, ...props }, ref) => (
    <Menu.Portal>
      <Menu.Positioner side="right" align="start" sideOffset={sideOffset} className="z-[80] outline-none">
        <Menu.Popup
          ref={ref}
          data-lenis-prevent
          className={cn(
            dropdownPanelClass,
            "min-w-max max-h-[min(34rem,85vh)] w-max max-w-[min(28rem,90vw)]",
            className,
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  ),
);
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
