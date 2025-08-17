import SearchCode from "@/components/analytics/SearchCode";
import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
  return (
    <>
      <SearchCode />
      <div className="h-64 flex flex-col items-center justify-center bg-gray-50 text-center p-6">
        {" "}
        <LoadingOutlined className="text-5xl text-primary animate-spin mb-4" />{" "}
        <p className="text-secondary font-bold">Carregando dados...</p>{" "}
      </div>
    </>
  );
}
