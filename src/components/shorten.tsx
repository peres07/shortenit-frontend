"use client";

import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button, Input, message, Select } from "antd";
import RecentLinks from "./recent-links";
import { ShortenedLink } from "@/types";
import Cookies from "js-cookie";

export default function Shorten() {
  const [messageApi, contextHolder] = message.useMessage();
  const [url, setUrl] = useState("");
  const [protocol, setProtocol] = useState("https://");
  const [links, setLinks] = useState<ShortenedLink[]>([]);

  useEffect(() => {
    const savedLinks = Cookies.get("shortenedLinks");
    if (savedLinks) setLinks(JSON.parse(savedLinks));
  }, []);

  const handleShorten = async () => {
    if (url.trim() === "") {
      messageApi.error("Por favor, insira uma URL válida!");
      return;
    }

    const fullUrl = protocol + url;

    try {
      const res = await api.post("/u/create", { originalUrl: fullUrl });
      const newLink: ShortenedLink = {
        url: fullUrl,
        shortCode: res.data.data.shortCode,
      };
      const updatedLinks = [newLink, ...links];
      setLinks(updatedLinks);
      Cookies.set("shortenedLinks", JSON.stringify(updatedLinks), {
        expires: 7,
      });
      messageApi.success("URL encurtada com sucesso!");
    } catch {
      messageApi.error("Por favor, insira uma URL válida!");
    }
  };

  const handleDelete = (shortCode: string) => {
    const filtered = links.filter((link) => link.shortCode !== shortCode);
    setLinks(filtered);
    Cookies.set("shortenedLinks", JSON.stringify(filtered), { expires: 7 });
    messageApi.success("Link deletado do histórico com sucesso!");
  };

  return (
    <>
      {contextHolder}
      <div className="md:w-1/2 md:px-0 px-4 mx-auto flex justify-center flex-col gap-4 mt-8">
        <h1 className="text-center text-primary text-3xl font-bold">
          Encurte seus links
        </h1>
        <div className="flex text-center items-center justify-center flex-row gap-4">
          <Input
            size="large"
            placeholder="example.com"
            addonBefore={
              <Select
                defaultValue="https://"
                onChange={(value) => setProtocol(value)}
                options={[
                  { value: "https://", label: "https://" },
                  { value: "http://", label: "http://" },
                ]}
              />
            }
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button size="large" onClick={handleShorten}>
            <span className="font-bold">Encurtar</span>
          </Button>
        </div>
      </div>
      <div>
        <RecentLinks links={links} onDelete={handleDelete} />
      </div>
    </>
  );
}
