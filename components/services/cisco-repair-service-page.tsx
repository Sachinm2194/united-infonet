import { ArrowRight, Check, Wrench } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import ciscoRepairService from "@/lib/services/cisco-repair-service";

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">{description}</p> : null}
    </div>
  );
}

export function CiscoRepairServicePage() {
  return (
    <PageContainer className="space-y-16 overflow-x-clip py-8 sm:space-y-20 sm:py-12">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{ciscoRepairService.intro.eyebrow}</p>
        <div className="mt-4 grid gap-8 border-b border-border-subtle pb-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">{ciscoRepairService.intro.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">{ciscoRepairService.intro.description}</p>
          </div>
          <div className="border-l-2 border-brand pl-5 text-sm font-semibold text-foreground">{ciscoRepairService.intro.ctaText}</div>
        </div>
      </section>

      <section className="grid gap-8 border-y border-border-subtle py-10 lg:grid-cols-2">
        <SectionHeading {...ciscoRepairService.sparesAndRepairs} />
        <SectionHeading {...ciscoRepairService.successfulRepairs} />
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading {...ciscoRepairService.whyChooseUs} />
        <div className="grid gap-3 sm:grid-cols-3">
          {ciscoRepairService.whyChooseUs.features.map((feature) => (
            <article key={feature.title} className="border border-input-border bg-card p-5 shadow-sm">
              <Wrench className="size-5 text-brand" aria-hidden />
              <h3 className="mt-5 text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border-subtle py-10">
        <SectionHeading {...ciscoRepairService.repairProcess} />
        <div className="mt-8 grid gap-px overflow-hidden border border-input-border bg-input-border sm:grid-cols-2 lg:grid-cols-3">
          {ciscoRepairService.repairProcess.steps.map((step) => (
            <article key={step.number} className="bg-card p-5">
              <p className="text-2xl font-bold text-brand">{step.number}</p>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading {...ciscoRepairService.repairSupport} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {ciscoRepairService.repairSupport.categories.map((category) => (
            <article key={category.id} className="border border-input-border bg-card p-5 shadow-sm">
              <h3 className="text-base font-semibold text-foreground">{category.title}</h3>
              <p className="mt-2 text-sm text-secondary">{category.description}</p>
              {category.models.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.models.map((model) => <span key={model} className="border border-input-border bg-background px-2 py-1 text-xs text-secondary">{model}</span>)}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading {...ciscoRepairService.repairCoverage} />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ciscoRepairService.repairCoverage.categories.map((category) => <p key={category} className="flex items-start gap-2 text-sm text-secondary"><Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />{category}</p>)}
          </div>
        </div>
        <div className="border border-brand bg-brand/5 p-6 shadow-sm sm:p-8">
          <SectionHeading {...ciscoRepairService.outOfWarranty} />
          <p className="mt-6 text-sm font-semibold text-brand">{ciscoRepairService.outOfWarranty.ctaText} <ArrowRight className="ml-1 inline size-4" aria-hidden /></p>
        </div>
      </section>

      <section className="border-t border-border-subtle pt-10">
        <SectionHeading eyebrow={ciscoRepairService.cta.eyebrow} title={ciscoRepairService.cta.title} description={ciscoRepairService.cta.description} />
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-brand">
          <span className="border border-brand px-4 py-3">{ciscoRepairService.cta.primaryButton}</span>
          <span className="border border-input-border bg-card px-4 py-3 text-foreground">{ciscoRepairService.cta.secondaryButton}</span>
        </div>
      </section>
    </PageContainer>
  );
}