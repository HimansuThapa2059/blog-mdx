import React, { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <main className="max-w-6xl mx-auto py-12 px-4">{children}</main>
    </div>
  );
}
