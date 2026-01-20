"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function signInWithGoogle() {
  const supabase = await createClient()
  const requestHeaders = await headers()
  const forwardedHost =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host")
  const forwardedProto = requestHeaders.get("x-forwarded-proto") ?? "https"
  const origin =
    (forwardedHost ? `${forwardedProto}://${forwardedHost}` : null) ??
    requestHeaders.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    redirect(`/?auth=error`)
  }

  if (data.url) {
    redirect(data.url)
  }

  redirect("/")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}
