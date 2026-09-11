import { ArrowRight, Check, CircuitBoard, ShieldCheck, Wrench } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import juniperNetworksRepairService from "@/lib/services/juniper-networks-repair-service";

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

export function JuniperRepairServicePage() {
  return (
    <PageContainer className="space-y-16 overflow-x-clip py-8 sm:space-y-20 sm:py-12">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          {juniperNetworksRepairService.intro.eyebrow}
        </p>
        <div className="mt-4 grid gap-8 border-b border-border-subtle pb-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {juniperNetworksRepairService.intro.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
              {juniperNetworksRepairService.intro.description}
            </p>
          </div>
          <div className="border-l-2 border-brand pl-5 text-sm font-semibold text-foreground">
            {juniperNetworksRepairService.intro.ctaText}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading {...juniperNetworksRepairService.repairExpertise} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {juniperNetworksRepairService.repairExpertise.features.map((feature, index) => (
            <article key={feature.title} className="border border-input-border bg-card p-5 shadow-sm">
              {index % 2 === 0 ? (
                <Wrench className="size-5 text-brand" aria-hidden />
              ) : (
                <ShieldCheck className="size-5 text-brand" aria-hidden />
              )}
              <h3 className="mt-5 text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border-subtle py-10">
        <SectionHeading {...juniperNetworksRepairService.repairProcess} />
        <div className="mt-8 grid gap-px overflow-hidden border border-input-border bg-input-border sm:grid-cols-2 lg:grid-cols-3">
          {juniperNetworksRepairService.repairProcess.steps.map((step) => (
            <article key={step.number} className="bg-card p-5">
              <p className="text-2xl font-bold text-brand">{step.number}</p>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading {...juniperNetworksRepairService.supportedEquipment} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {juniperNetworksRepairService.supportedEquipment.categories.map((category) => (
            <article key={category.id} className="border border-input-border bg-card p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <CircuitBoard className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <h3 className="text-base font-semibold text-foreground">{category.title}</h3>
                  <p className="mt-2 text-sm text-secondary">{category.description}</p>
                </div>
              </div>
              {category.models.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2 border-t border-border-subtle pt-4">
                  {category.models.map((model) => (
                    <span key={model} className="border border-input-border bg-background px-2 py-1 text-xs text-secondary">
                      {model}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading {...juniperNetworksRepairService.brandedProducts} />
          <div className="mt-8 overflow-hidden border border-input-border bg-card shadow-sm">
            {juniperNetworksRepairService.brandedProducts.products.map((product, index) => (
              <div
                key={`${product.name}-${index}`}
                className="grid gap-1 border-b border-border-subtle p-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <p className="text-sm font-semibold text-foreground">{product.name}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-secondary">{product.category}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-brand bg-brand/5 p-6 shadow-sm sm:p-8">
          <SectionHeading {...juniperNetworksRepairService.repairCoverage} />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {juniperNetworksRepairService.repairCoverage.categories.map((category) => (
              <p key={category} className="flex items-start gap-2 text-sm text-secondary">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                {category}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-subtle pt-10">
        <SectionHeading
          eyebrow={juniperNetworksRepairService.cta.eyebrow}
          title={juniperNetworksRepairService.cta.title}
          description={juniperNetworksRepairService.cta.description}
        />
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-brand">
          <span className="border border-brand px-4 py-3">{juniperNetworksRepairService.cta.primaryButton}</span>
          <span className="border border-input-border bg-card px-4 py-3 text-foreground">
            {juniperNetworksRepairService.cta.secondaryButton}
            <ArrowRight className="ml-2 inline size-4" aria-hidden />
          </span>
        </div>
      </section>
    </PageContainer>
  );
}