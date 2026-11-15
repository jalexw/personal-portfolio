import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@schemavaults/theme/globals.css";
import { description, title } from "@/metadata";
import type { ReactElement, ReactNode } from "react";
import ClientProviders from "./client-providers";

const inter = Inter({ subsets: ["latin"] });

const googleMeasurementId: string | undefined =
  typeof process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID === "string" &&
  process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID.length > 0
    ? process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID
    : undefined;

export const metadata: Metadata = {
  title,
  description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
      {googleMeasurementId && <GoogleAnalytics gaId={googleMeasurementId} />}
    </html>
  );
}
