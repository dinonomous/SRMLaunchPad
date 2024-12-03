// src/app/page.tsx
import ReactQueryProvider from "@/components/QueryClientProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export default function Wraper({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AppRouterCacheProvider>
        <main className="md:pt-20" style={{ minHeight: "calc(100vh - 16rem)" }}>
          {children}
        </main>
      </AppRouterCacheProvider>
    </ReactQueryProvider>
  );
}
