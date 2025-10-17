import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = localFont({
  variable: "--font-quicksand",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Quicksands/static/Quicksand-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Quicksands/static/Quicksand-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Quicksands/static/Quicksand-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "Creative Counseling",
  description: "Creative Counseling is a platform that connects individuals with professional counselors for personalized mental health support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} antialiased`}>
      <body>
      <header>
          <NavBar />
      </header>
        {children}
      <footer>
        <Footer/>
      </footer>
      </body>
    </html>
  );
}
