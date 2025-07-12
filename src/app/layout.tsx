import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { I18nProvider } from "@/app/providers/i18n-provider";

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
        <I18nProvider>
          <AppRouterCacheProvider>
            <Providers>{children}</Providers>
          </AppRouterCacheProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
