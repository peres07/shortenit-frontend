"use client";

import { useEffect, useState } from "react";
import { Button, Input, message, Select } from "antd";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

import { RecentLinks } from "@/app/(shorten)/components/RecentLinks";
import { api } from "@/services/api";
import { ShortenedLink } from "@/types/types";

export function ShortenForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const [url, setUrl] = useState("");
  const [protocol, setProtocol] = useState("https://");
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

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
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 429) {
          messageApi.error(
            "Limite de requisições atingido. Tente novamente mais tarde.",
          );
        } else {
          messageApi.error("Por favor, insira uma URL válida!");
        }
      } else {
        messageApi.error("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
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
        <Button
          size="large"
          color="default"
          variant="solid"
          onClick={handleShorten}
          loading={loading}
        >
          <span className="font-bold">Encurtar</span>
        </Button>
      </div>
      <div>
        <RecentLinks links={links} onDelete={handleDelete} />
      </div>
    </>
  );
}
