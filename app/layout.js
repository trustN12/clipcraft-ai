import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";


const myFont = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Clipcraft AI",
  description: "AI short video generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={myFont.className} cz-shortcut-listen="true">
        <ConvexClientProvider>
        <Toaster position="top-right" richColors />

          {children}</ConvexClientProvider>
      </body>
    </html>
  );
}
