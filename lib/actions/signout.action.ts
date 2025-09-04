"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  const cookieStore = cookies();

  // Clear the cookie by overwriting
  // @ts-expect-error - cookies.set works at runtime in server actions
  cookieStore.set({
    name: "session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 0, // ✅ expire immediately
  });

  // Redirect to login page
  redirect("/sign-in");
}
