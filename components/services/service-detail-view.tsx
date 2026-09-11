import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import type { ServiceMenuItem } from "@/lib/services";

type ServiceDetailViewProps = {
  service: ServiceMenuItem;
};

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <PageContainer className="py-8 sm:py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Our Services</p>
      <div className="mt-3 border-b border-border-subtle pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {service.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary sm:text-base">
          {service.description}
        </p>
      </div>
      <div className="mt-2 grid gap-x-10 md:grid-cols-2">
        <div className="flex items-start gap-3 border-b border-border-subtle py-4">
          <ArrowRight className="size-5 shrink-0 text-brand" aria-hidden />
          <p className="text-sm leading-relaxed text-secondary">
            Contact our team to discuss your requirements and receive a tailored estimate.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}