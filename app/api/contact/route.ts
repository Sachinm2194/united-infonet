import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const payload = (await request.json()) as Record<string, unknown>;
  const name = String(payload.name ?? "").trim();
  const company = String(payload.company ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const service = String(payload.service ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name || !email || !service || !message || !emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Please complete the required fields with a valid email address." },
      { status: 400 },
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD?.replace(/\s+/g, "");
  const from = process.env.SMTP_FROM ?? user;
  const to = process.env.CONTACT_TO_EMAIL ?? "sales@unitedinfonet.com";

  if (!host || !user || !password || !from || !Number.isFinite(port)) {
    return NextResponse.json(
      { error: "Contact email delivery is not configured yet." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `${service} enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || "Not provided"}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Requirement: ${service}`,
        "",
        message,
      ].join("\n"),
    });
  } catch (error) {
    const smtpError = error as {
      code?: string;
      responseCode?: number;
      command?: string;
    };
    console.error("SMTP contact delivery failed", {
      code: smtpError.code,
      responseCode: smtpError.responseCode,
      command: smtpError.command,
    });

    const errorMessage =
      smtpError.code === "EAUTH" || smtpError.responseCode === 535
        ? "Gmail rejected the SMTP login. Check the mailbox and app password."
        : smtpError.code === "ECONNECTION" || smtpError.code === "ETIMEDOUT"
          ? "Could not connect to Gmail SMTP. Check the SMTP host and port."
          : "The SMTP server could not deliver your enquiry.";

    return NextResponse.json(
      { error: errorMessage },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
