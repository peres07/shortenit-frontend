import { redirect } from "next/navigation";

import { api } from "../../services/api";

export default async function RedirectPage({params}: {params: Promise<{ shortCode: string }>}) {
  const { shortCode } = await params;

  try {
    const res = await api.get(`/u/${shortCode}`);
    redirect(res.data.data);
  } catch {
    redirect("/");
  }
}
