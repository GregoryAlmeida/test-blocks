import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/components/menu/menu";
import Premium from "@/components/premium/premium";

export const metadata: Metadata = {
  title: "Front End Test Blocks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Premium />
        <Menu />
        {children}
      </body>
    </html>
  );
}
