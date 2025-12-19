import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP.A.M Dashboard",
  description: "Portail de gestion pour médecins et administrateurs AP.A.M",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
