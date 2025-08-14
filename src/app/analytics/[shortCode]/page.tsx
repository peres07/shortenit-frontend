"use client";

import { use, useEffect, useState } from "react";
import AnalyticsPage from "../page";
import { api } from "../../../services/api";
import { message, Card, Statistic, Row, Col } from "antd";
import {
  LinkOutlined,
  FieldTimeOutlined,
  ThunderboltOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

interface AnalyticsData {
  id: number;
  originalUrl: string;
  shortCode: string;
  hits: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function AnalyticsShortCodePage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const resolvedParams = use(params);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/u/analytics/${resolvedParams.shortCode}`
        );
        setData(response.data.data);
      } catch {
        messageApi.error(
          "Não foi possível carregar os dados do código fornecido."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [messageApi, resolvedParams.shortCode]);

  return (
    <div>
      {contextHolder}
      <AnalyticsPage />
      <div className="md:w-1/2 md:px-0 px-4 mx-auto flex flex-col gap-6 mt-8">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center bg-gray-50 text-center p-6">
            <LoadingOutlined className="text-5xl text-primary animate-spin mb-4" />
            <p className="text-secondary font-bold">Carregando dados...</p>
          </div>
        ) : data ? (
          <>
            <h1 className="text-primary text-2xl font-bold">
              Analytics para{" "}
              <span className="text-secondary">{resolvedParams.shortCode}</span>
            </h1>

            <Card className="shadow-md rounded-xl">
              <p className="mb-2">
                <LinkOutlined className="mr-2" />
                <span className="font-semibold">URL Original:</span>{" "}
                <a
                  href={data.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-words"
                >
                  {data.originalUrl}
                </a>
              </p>
              <p className="mb-2">
                <ThunderboltOutlined className="mr-2" />
                <span className="font-semibold">Link encurtado:</span>{" "}
                <a
                  href={`${window.location.origin}/${data.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-words"
                >
                  {`${window.location.origin}/${data.shortCode}`}
                </a>
              </p>
            </Card>

            <Row gutter={[16, 16]} className="flex flex-wrap">
              <Col xs={24} sm={12} md={8}>
                <Card className="rounded-xl shadow-md">
                  <Statistic
                    title={<span className="text-base">Acessos</span>}
                    value={data.hits}
                    valueStyle={{ fontSize: "1rem" }}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Card className="rounded-xl shadow-md">
                  <Statistic
                    title={<span className="text-base">Criado em</span>}
                    value={new Date(data.createdAt).toLocaleDateString()}
                    prefix={<FieldTimeOutlined />}
                    valueStyle={{ fontSize: "1rem" }}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Card className="rounded-xl shadow-md">
                  <Statistic
                    title={
                      <span className="text-base">Última atualização</span>
                    }
                    value={new Date(data.updatedAt).toLocaleDateString()}
                    prefix={<FieldTimeOutlined />}
                    valueStyle={{ fontSize: "1rem" }}
                  />
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <p className="text-center text-gray-500">Nenhum dado disponível.</p>
        )}
      </div>
    </div>
  );
}
