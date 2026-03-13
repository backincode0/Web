import nodemailer from "nodemailer";

const host = process.env.EMAIL_HOST;
const port = Number(process.env.EMAIL_PORT ?? 587);
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const transporter =
  host && user && pass
    ? nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      })
    : null;

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!transporter) {
    console.info("Email not configured, logging payload", options);
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? "Studio Notifications <noreply@wfereger.studio>",
    ...options
  });
}
