import {
  FieldTimeOutlined,
  LinkOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { headers } from "next/headers";

import { SearchCode } from "@/components/analytics";
import { CantLoading } from "@/components/analytics/CantLoad/CantLoad";
import { AnalyticsData } from "@/types/types";

import { api } from "../../../services/api";

export default async function AnalyticsShortCodePage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;

  try {
    const res = await api.get(`/u/analytics/${shortCode}`);
    const data: AnalyticsData = res.data.data;
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    return (
      <div>
        <SearchCode />
        <div className="md:w-1/2 md:px-0 px-4 mx-auto flex flex-col gap-6 mt-8">
          <h1 className="text-primary text-2xl font-bold">
            Analytics para <span className="text-secondary">{shortCode}</span>
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
                href={`${baseUrl}/${data.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-words"
              >
                {`${baseUrl}/${data.shortCode}`}
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
                  title={<span className="text-base">Última atualização</span>}
                  value={new Date(data.updatedAt).toLocaleDateString()}
                  prefix={<FieldTimeOutlined />}
                  valueStyle={{ fontSize: "1rem" }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  } catch {
    return (
      <>
        <SearchCode />
        <CantLoading />
      </>
    );
  }
}
