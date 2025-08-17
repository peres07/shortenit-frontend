"use client";

import { useState } from "react";
import { Button, Input, message } from "antd";
import { useRouter } from "next/navigation";

export function SearchCode() {
  const [url, setUrl] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const handleAnalyze = () => {
    if (!url.trim())
      return messageApi.error("Por favor, adicione um código válido.");

    router.push(`/analytics/${url}`);
  };

  return (
    <>
      {contextHolder}
      <div className="md:w-1/2 md:px-0 px-4 mx-auto flex justify-center flex-col gap-4 mt-8">
        <h1 className="text-center text-primary text-3xl font-bold">
          Analytics
        </h1>
        <p className="text-center text-secondary ">
          Veja os detalhes do seu link aqui.
        </p>
        <div className="flex text-center items-center justify-center flex-row gap-4">
          <Input
            size="large"
            placeholder="Seu código de encurtação aqui. Ex: abc123"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required={true}
          />
          <Button
            color="default"
            variant="solid"
            size="large"
            onClick={handleAnalyze}
          >
            Analisar
          </Button>
        </div>
      </div>
    </>
  );
}
