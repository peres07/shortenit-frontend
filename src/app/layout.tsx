import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import "@ant-design/v5-patch-for-react-19";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "ShortenIt",
  description: "Encurtador de URLs",
};

const notoSans = Noto_Sans({ subsets: ["latin"] });

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="pt-br" className={notoSans.className}>
    <body>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
