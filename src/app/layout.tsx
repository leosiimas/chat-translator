import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { Providers } from "./providers";

export const metadata = {
  title: "Chat",
  description: "Chat to talk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
