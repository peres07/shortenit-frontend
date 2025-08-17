"use client";

import { useEffect } from "react";
import { message } from "antd";

export function CantLoading() {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    messageApi.error("Não foi possível carregar os dados do código fornecido.");
  }, [messageApi]);
  return (
    <>
      {contextHolder}
      <p className="text-center text-gray-500 mt-5">
        Não foi possível carregar os dados do código fornecido.
      </p>
    </>
  );
}
