import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <LoadingOutlined className="text-5xl text-primary animate-spin mb-4" />
      <h1 className="text-2xl font-bold text-primary mb-2">
        Redirecionando...
      </h1>
      <p className="text-gray-500">Você será levado ao destino em instantes.</p>
    </div>
  );
}
