import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "main" | "section" | "div";
};

export function PageContainer({
  children,
  className,
  as: Component = "main",
}: PageContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto flex min-w-0 w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10",
        className,
      )}
    >
      {children}
    </Component>
  );
}
