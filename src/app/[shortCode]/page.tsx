import { redirect } from "next/navigation";

import { api } from "../../services/api";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;

  let res;
  try {
    res = await api.get(`/u/${shortCode}`);
  } catch {
    redirect("/");
  }

  const url = res?.data?.data;
  if (!url) {
    redirect("/");
  }

  redirect(url);
}
