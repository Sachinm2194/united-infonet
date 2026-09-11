import { ArrowRight, Check, CircuitBoard, History, ShieldCheck, Wrench } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import foundryRepairService from "@/lib/services/foundry-repair-service";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">{description}</p> : null}
    </div>
  );
}

export function FoundryRepairServicePage() {
  return (
    <PageContainer className="space-y-16 overflow-x-clip py-8 sm:space-y-20 sm:py-12">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          {foundryRepairService.intro.eyebrow}
        </p>
        <div className="mt-4 grid gap-8 border-b border-border-subtle pb-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {foundryRepairService.intro.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
              {foundryRepairService.intro.description}
            </p>
          </div>
          <div className="border-l-2 border-brand pl-5 text-sm font-semibold text-foreground">
            {foundryRepairService.intro.ctaText}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading {...foundryRepairService.expertise} />
        <div className="grid gap-3 sm:grid-cols-3">
          {foundryRepairService.expertise.features.map((feature, index) => (
            <article key={feature.title} className="border border-input-border bg-card p-5 shadow-sm">
              {index === 1 ? (
                <History className="size-5 text-brand" aria-hidden />
              ) : index === 2 ? (
                <ShieldCheck className="size-5 text-brand" aria-hidden />
              ) : (
                <Wrench className="size-5 text-brand" aria-hidden />
              )}
              <h3 className="mt-5 text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border-subtle py-10">
        <SectionHeading {...foundryRepairService.repairProcess} />
        <div className="mt-8 grid gap-px overflow-hidden border border-input-border bg-input-border sm:grid-cols-2 lg:grid-cols-4">
          {foundryRepairService.repairProcess.steps.map((step) => (
            <article key={step.number} className="bg-card p-5">
              <p className="text-2xl font-bold text-brand">{step.number}</p>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading {...foundryRepairService.supportedEquipment} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {foundryRepairService.supportedEquipment.categories.map((category) => (
            <article key={category.id} className="border border-input-border bg-card p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <CircuitBoard className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <h3 className="text-base font-semibold text-foreground">{category.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">{category.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border border-input-border bg-card p-6 shadow-sm sm:p-8">
          <SectionHeading {...foundryRepairService.whyChooseUs} />
          <div className="mt-6 grid gap-3">
            {foundryRepairService.whyChooseUs.points.map((point) => (
              <p key={point} className="flex items-start gap-3 text-sm leading-relaxed text-secondary">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                {point}
              </p>
            ))}
          </div>
        </div>
        <div className="border border-brand bg-brand/5 p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Repair focus</p>
          <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">Current, legacy, and end-of-life equipment.</p>
          <p className="mt-4 text-sm leading-relaxed text-secondary">
            Foundry hardware does not have to be discarded simply because conventional support has ended.
          </p>
        </div>
      </section>

      <section className="border-t border-border-subtle pt-10">
        <SectionHeading
          eyebrow={foundryRepairService.cta.eyebrow}
          title={foundryRepairService.cta.title}
          description={foundryRepairService.cta.description}
        />
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-brand">
          <span className="border border-brand px-4 py-3">{foundryRepairService.cta.primaryButton}</span>
          <span className="border border-input-border bg-card px-4 py-3 text-foreground">
            {foundryRepairService.cta.secondaryButton}
            <ArrowRight className="ml-2 inline size-4" aria-hidden />
          </span>
        </div>
      </section>
    </PageContainer>
  );
}