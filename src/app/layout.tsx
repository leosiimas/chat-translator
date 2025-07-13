import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { I18nProvider } from "@/app/providers/i18n-provider";
import { UserProvider } from "@/app/providers/user-provider";
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
        <UserProvider>
          <I18nProvider>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </I18nProvider>
        </UserProvider>
      </body>
    </html>
  );
}
