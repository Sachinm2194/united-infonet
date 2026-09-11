import { ArrowRight, Check, Cpu, HardDrive, Monitor, Wrench, Zap } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import laptopComputerRepairService from "@/lib/services/laptop-computer-repair-service";

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

const problemIcons = [Monitor, Zap, Cpu, Wrench, HardDrive, Cpu];

export function LaptopComputerRepairServicePage() {
  return (
    <PageContainer className="space-y-16 overflow-x-clip py-8 sm:space-y-20 sm:py-12">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          {laptopComputerRepairService.intro.eyebrow}
        </p>
        <div className="mt-4 grid gap-8 border-b border-border-subtle pb-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {laptopComputerRepairService.intro.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
              {laptopComputerRepairService.intro.description}
            </p>
          </div>
          <div className="border-l-2 border-brand pl-4 text-sm font-semibold text-foreground sm:pl-5">
            {laptopComputerRepairService.intro.ctaText}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading {...laptopComputerRepairService.problems} />
        <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {laptopComputerRepairService.problems.categories.map((category, index) => {
            const Icon = problemIcons[index] ?? Wrench;

            return (
              <article key={category.id} className="min-w-0 border border-input-border bg-card p-5 shadow-sm">
                <Icon className="size-5 text-brand" aria-hidden />
                <h3 className="mt-5 text-base font-semibold text-foreground">{category.title}</h3>
                <ul className="mt-4 space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex min-w-0 items-start gap-2 text-sm leading-relaxed text-secondary">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading {...laptopComputerRepairService.repairServices} />
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
          {laptopComputerRepairService.repairServices.services.map((service) => (
            <article key={service.title} className="min-w-0 border border-input-border bg-card p-5 shadow-sm">
              <Wrench className="size-5 text-brand" aria-hidden />
              <h3 className="mt-5 text-sm font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="border border-brand bg-brand/5 p-6 shadow-sm sm:p-8">
          <SectionHeading {...laptopComputerRepairService.damageRepair} />
          <p className="mt-6 text-sm font-semibold text-brand">
            {laptopComputerRepairService.damageRepair.ctaText}
            <ArrowRight className="ml-2 inline size-4" aria-hidden />
          </p>
        </div>
        <div className="border border-input-border bg-card p-6 shadow-sm sm:p-8">
          <SectionHeading {...laptopComputerRepairService.upgradeServices} />
          <div className="mt-6 flex flex-wrap gap-2">
            {laptopComputerRepairService.upgradeServices.upgrades.map((upgrade) => (
              <span key={upgrade} className="border border-input-border bg-background px-3 py-2 text-sm text-secondary">
                {upgrade}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-subtle py-10">
        <SectionHeading {...laptopComputerRepairService.repairProcess} />
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-input-border bg-input-border sm:grid-cols-2 lg:grid-cols-5">
          {laptopComputerRepairService.repairProcess.steps.map((step) => (
            <article key={step.number} className="bg-card p-5">
              <p className="text-2xl font-bold text-brand">{step.number}</p>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border-subtle pt-10">
        <SectionHeading
          eyebrow={laptopComputerRepairService.cta.eyebrow}
          title={laptopComputerRepairService.cta.title}
          description={laptopComputerRepairService.cta.description}
        />
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-brand">
          <span className="border border-brand px-4 py-3">{laptopComputerRepairService.cta.primaryButton}</span>
          <span className="border border-input-border bg-card px-4 py-3 text-foreground">
            {laptopComputerRepairService.cta.secondaryButton}
            <ArrowRight className="ml-2 inline size-4" aria-hidden />
          </span>
        </div>
      </section>
    </PageContainer>
  );
}