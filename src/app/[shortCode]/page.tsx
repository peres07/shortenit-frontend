import { redirect } from "next/navigation";
import { api } from "../../services/api";

export default async function RedirectPage({
  params,
}: {
  params: { shortCode: string };
}) {
  const { shortCode } = params;

  try {
    const res = await api.get(`/u/${shortCode}`);
    redirect(res.data.data);
  } catch {
    redirect("/");
  }
}
