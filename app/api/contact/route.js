import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  try {
    const raw = await req.json();
    let name = "";
    let email = "";
    let message = "";
    let subject = "";

    if (typeof raw === "object" && raw !== null) {
      const body = raw;
      if (typeof body.name === "string") name = body.name.trim();
      if (typeof body.email === "string") email = body.email.trim();
      if (typeof body.message === "string") message = body.message;
      if (typeof body.subject === "string") subject = body.subject.trim();
    }

    // Check if all required fields are present
    if (!name || !email || !message || !subject) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // SMTP Configuration
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "25");
    let secure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "false"
      : port === 25;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;

    if (!host || !port || !user || !pass) {
      return NextResponse.json(
        { error: "Email service is not configured properly" },
        { status: 500 }
      );
    }

    // Auto-correct common misconfigurations
    if (port === 465 && !secure) {
      console.warn("[contact] Forcing secure TLS for port 465");
      secure = true;
    } else if (port === 587 && secure) {
      console.warn("[contact] Disabling secure for port 587");
      secure = false;
    }

    // Init the SMTP connection
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    await transporter.verify();
    console.log("SMTP connection verified");

    const envTo = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    // Email Content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: envTo,
      replyTo: `${name} <${email}>`,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #007bff;">
    <h3 style="margin-top: 0; color: #333;">Message:</h3>
    <p style="line-height: 1.6; color: #555;">${message.replace(
      /\n/g,
      "<br>"
    )}</p>
  </div>
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
  <p style="color: #888; font-size: 12px;">This email was sent from your website's contact form.</p>
</div>
`,
    };

    // Function to send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    const isProd = process.env.NODE_ENV === "production";
    const code = typeof error?.code === "string" ? error.code : undefined;
    const messageStr = typeof error?.message === "string" ? error.message : "";

    const hint =
      code === "ETIMEDOUT"
        ? "Connection timed out. Check SMTP settings."
        : "Unexpected error while sending email.";

    return NextResponse.json(
      {
        error: "Failed to send email. Please try again later.",
        hint: hint,
        details: isProd ? undefined : { code, message: messageStr },
      },
      { status: 500 }
    );
  }
}
