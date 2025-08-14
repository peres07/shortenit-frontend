"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../services/api";
import { LoadingOutlined } from "@ant-design/icons";

export default function RedirectPage() {
  const { shortCode } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (shortCode) {
      api
        .get(`/u/${shortCode}`)
        .then((res) => {
          router.push(res.data.data);
        })
        .catch(() => {
          router.push("/");
        });
    }
  }, [shortCode, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <LoadingOutlined className="text-5xl text-blue-600 animate-spin mb-4" />

      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Redirecionando...
      </h1>

      <p className="text-gray-500">Você será levado ao destino em instantes.</p>
    </div>
  );
}
