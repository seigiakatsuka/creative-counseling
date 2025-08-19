This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Troubleshooting: API Route Syntax and Email Setup

If you run into syntax or runtime errors with `app/api/contact/route.js`, here are the common pitfalls we fixed and how to spot them next time.

What was missing/incorrect previously:

- Proper function body for the route handler: Use `export async function POST(req) { ... }` (not `=>` after the signature). A bare `=>` after a named function is invalid JavaScript.
- Proper try/catch pairing: Ensure `try { ... } catch (err) { ... }`. Having a `catch` without a preceding `try` causes a syntax error.
- Correct import from Next.js: `import { NextResponse } from 'next/server';` Only import what you need, and avoid aliasing `NextResponse` as `req`.
- Numeric SMTP port: Environment variables are strings by default. Coerce the port: `port: Number(process.env.SMTP_PORT)`. Many SMTP libraries require a number.
- Basic input validation: Check required fields before work: `if (!name || !email || !message) { ... }`.

Quick checklist for API routes using nodemailer:

- [ ] Route handler signature is one of `export async function GET(req) {}` or `POST`, etc., and has braces, not an arrow after the name.
- [ ] Wrap async work in `try/catch` with both blocks present.
- [ ] Import only what you use: `import { NextResponse } from 'next/server';`.
- [ ] Coerce numeric env vars: `Number(process.env.SOME_PORT)`.
- [ ] Validate input exists before sending email.
- [ ] Confirm .env values are set: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `FROM_EMAIL`.
- [ ] Use a valid recipient email in `to:`.

Known-good minimal example (excerpt):

```js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: 'email@example.com',
      subject: `New Message from ${name}`,
      text: `email: ${email}\n\nmessage: ${message}`,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error sending email:', err);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
```

Keep this checklist handy to quickly diagnose similar issues in the future.

---

## Static assets (images) path in Next.js

- Put files under the `public/` directory.
- Reference them in your code with a root-relative path that starts with `/` (do not include `public` in the URL).
  - Example: `public/imgs/logo/logo.jpg` should be used as `src="/imgs/logo/logo.jpg"`.
- Using Next.js `<Image />` from `next/image`:
  - You must provide either `width` and `height` or use `fill` with `sizes`. Missing these will cause a runtime error.
  - Example (fixed size): `<Image src="/imgs/logo/logo.jpg" alt="Logo" width={160} height={160} />`.
  - Example (fill): wrap the image in a relative container and use `fill` + `sizes`.
# creative-counseling
