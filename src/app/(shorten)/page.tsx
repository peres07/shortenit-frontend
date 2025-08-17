import { ShortenForm } from "@/app/(shorten)/components/ShortenForm";

export default function ShortenPage() {
  return (
    <div className="md:w-1/2 md:px-0 px-4 mx-auto flex justify-center flex-col gap-4 mt-8">
      <h1 className="text-center text-primary text-3xl font-bold">
        Encurte seus links
      </h1>
      <ShortenForm />
    </div>
  );
}
