import { Barlow } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const barlow = Barlow({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "Weather Dashboard",
  description: "This is a weather dashboard where you can enter your location and get weather report accordingly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={barlow.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
