export const runtime = "edge";

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/SettingsForm";
import { createSupabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Settings — Julie's Cookbook",
};

export default async function SettingsPage() {
  // Auth check only. Preference values come through the TweaksProvider
  // context (already mounted in (main)/layout.tsx with server-fetched
  // values), so no duplicate fetch here.
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen pt-20 lg:pt-10 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <SettingsForm />
      </div>
    </div>
  );
}
