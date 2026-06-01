// app/components/ClientBodyWrapper.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ClientBodyWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return <>{mounted ? children : null}</>;
}
