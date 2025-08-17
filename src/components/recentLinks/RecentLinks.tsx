import {
  CopyOutlined,
  DeleteOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, message, Table, Tooltip } from "antd";

import type { ShortenedLink } from "../../types";

interface Props {
  links: ShortenedLink[];
  onDelete: (shortCode: string) => void;
}

export default function RecentLinks({ links, onDelete }: Props) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleOpen = (shortCode: string) => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    window.open(shortUrl, "_blank");
  };

  const handleAnalytics = (shortCode: string) => {
    const shortUrl = `${window.location.origin}/analytics/${shortCode}`;
    window.open(shortUrl, "_blank");
  };

  const handleCopy = async (shortCode: string) => {
    try {
      const shortUrl = `${window.location.origin}/${shortCode}`;
      await navigator.clipboard.writeText(shortUrl);
      messageApi.success("Link encurtado copiado!");
    } catch {
      messageApi.error("Erro ao copiar o link.");
    }
  };

  const dataSource = links.map((link) => ({
    key: link.shortCode,
    url: link.url,
    shortCode: link.shortCode,
  }));

  const columns = [
    {
      title: "URL Original",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Código de encurtação",
      dataIndex: "shortCode",
      key: "shortCode",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: unknown, record: { shortCode: string }) => (
        <div className="flex flex-row md:gap-2 gap-1">
          <Tooltip title="Copiar">
            <Button
              icon={<CopyOutlined />}
              size="small"
              onClick={() => handleCopy(record.shortCode)}
            />
          </Tooltip>
          <Tooltip title="Abrir">
            <Button
              icon={<ExportOutlined />}
              size="small"
              onClick={() => handleOpen(record.shortCode)}
            />
          </Tooltip>
          <Tooltip title="Ver desempenho">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleAnalytics(record.shortCode)}
            />
          </Tooltip>
          <Tooltip title="Deletar">
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              onClick={() => onDelete(record.shortCode)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        className="md:w-1/2 md:px-0 w-full px-4 mx-auto my-5"
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </>
  );
}
