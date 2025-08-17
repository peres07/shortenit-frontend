import { redirect } from "next/navigation";

import { api } from "../../services/api";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;

  const res = await api.get(`/u/${shortCode}`);
  const url = res.data.data;

  if (url) {
    redirect(url);
  } else {
    redirect("/");
  }
}
