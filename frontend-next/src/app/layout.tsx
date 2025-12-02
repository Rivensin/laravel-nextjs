import "./globals.css";
import type { Metadata, Viewport } from "next";
import Navbar from "../../components/Navbar";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "../../context/AppProvider";

export const viewport : Viewport = {
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
  title: 'Product Management App',
  description: 'Product Management App',
  authors: [{name:'riven', url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}],
  icons: {
    icon: 'icons/icon.png',
  },
  openGraph: {
    title: 'Product Management App',
    description: 'Product Management ',
    images: [
      {
        url: '/icons/icon.png',
        width: 800,
        height: 600,
      }
    ],
    url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Toaster />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
