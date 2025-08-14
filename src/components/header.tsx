"use client";

import { LinkOutlined } from "@ant-design/icons";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex border-b border-b-light items-center justify-around">
      <div className="flex gap-2 flex-row">
        <LinkOutlined className="text-xl" />
        <Link href="/">
          {" "}
          <h1 className="text-xl font-bold py-4 text-primary">ShortenIt</h1>
        </Link>
      </div>
      <div className="flex md:gap-6 gap-4 flex-row">
        <Link href="/" className="">
          {" "}
          <h1 className="text-sm py-4 text-secondary hover:text-primary transition-all">Home</h1>
        </Link>
        <Link href="/analytics">
          {" "}
          <h1 className="text-sm py-4 text-secondary hover:text-primary transition-all">Analytics</h1>
        </Link>
      </div>
    </header>
  );
}
