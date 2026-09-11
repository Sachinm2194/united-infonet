import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import type { SolutionContent, SolutionItem } from "@/lib/solutions";

type SolutionDetailViewProps = {
  solution: SolutionContent;
};

function isDetailedSolutionItem(item: SolutionItem): item is { title: string; description: string } {
  return typeof item !== "string";
}

export function SolutionDetailView({ solution }: SolutionDetailViewProps) {
  return (
    <PageContainer className="py-8 sm:py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Our Solutions</p>
      <div className="mt-3 flex flex-col gap-4 border-b border-border-subtle pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {solution.name}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary sm:text-base">
            {solution.description}
          </p>
        </div>
        <p className="hidden max-w-32 text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary sm:block">
          Scalable solutions for a connected tomorrow
        </p>
      </div>

      <div className="mt-2 grid gap-x-10 md:grid-cols-2">
        {solution.items.map((item) => (
          <div
            key={typeof item === "string" ? item : item.title}
            className="flex min-h-14 items-start gap-3 border-b border-border-subtle py-4"
          >
            <ArrowRight className="size-5 shrink-0 text-brand" aria-hidden />
            <div>
              <p className="text-sm font-medium text-foreground">
                {isDetailedSolutionItem(item) ? item.title : item}
              </p>
              {isDetailedSolutionItem(item) ? (
                <p className="mt-1 text-sm leading-relaxed text-secondary">{item.description}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}