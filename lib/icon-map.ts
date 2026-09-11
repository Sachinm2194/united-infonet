import type { LucideIcon } from "lucide-react";
import {
  Box,
  CalendarClock,
  Cpu,
  Lock,
  Network,
  Phone,
  Recycle,
  Router,
  Server,
  ShieldCheck,
  ShoppingCart,
  Wifi,
  Wrench,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Router,
  Network,
  ShieldCheck,
  Wifi,
  Phone,
  Server,
  Cpu,
  ShoppingCart,
  CalendarClock,
  Wrench,
  Recycle,
  Lock,
};

export function resolveIcon(name?: string): LucideIcon {
  if (!name) return Box;
  return iconMap[name] ?? Box;
}
