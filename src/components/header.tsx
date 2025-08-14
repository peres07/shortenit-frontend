"use client";

import { LinkOutlined } from "@ant-design/icons";

export function Header() {
  return (
    <header className="flex border-b border-b-light items-center justify-around">
      <div className="flex gap-2 flex-row">
        <LinkOutlined className="text-xl" />
        <a href="/">
          {" "}
          <h1 className="text-xl font-bold py-4 text-primary">ShortenIt</h1>
        </a>
      </div>
      <div className="flex md:gap-6 gap-4 flex-row">
        <a href="/" className="">
          {" "}
          <h1 className="text-sm py-4 text-secondary hover:text-primary transition-all">Home</h1>
        </a>
        <a href="/analytics">
          {" "}
          <h1 className="text-sm py-4 text-secondary hover:text-primary transition-all">Analytics</h1>
        </a>
      </div>
    </header>
  );
}
