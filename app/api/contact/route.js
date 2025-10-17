import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Check if all required fields are present
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Init the SMTP connection
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email Content
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: 'email@example.com', // Replace with your email
      subject: `New Message from ${name}`,
      text: `email: ${email}\n\nmessage: ${message}`,
    };

    // Function to send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error sending email:', err);
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
}