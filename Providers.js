"use client";
import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import { authClient } from "@/lib/auth/client";
export function Providers({ children }) {
  return (
    <NeonAuthUIProvider authClient={authClient}>{children}</NeonAuthUIProvider>
  );
}
