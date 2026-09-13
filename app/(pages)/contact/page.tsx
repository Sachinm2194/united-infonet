import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to United Infonet about networking, hardware, repair, AMC and IT infrastructure support.",
};

export default async function ContactRoute({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; product?: string }>;
}) {
  const params = await searchParams;

  return <ContactPage initialType={params.type} initialProduct={params.product} />;
}
