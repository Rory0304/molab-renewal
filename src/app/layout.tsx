import "../constants/styles/global.css";
import { GlobalFooter, GlobalMain, GlobalHeader } from "src/components/blocks";
import { AuthProvider } from "src/context/AuthProvider";
import AppProvider from "src/context/AppProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <AuthProvider>
        <AppProvider>
          <body>
            <div className="flex flex-col items-center min-h-screenflex">
              <GlobalHeader />
              <GlobalMain>{children}</GlobalMain>
              <GlobalFooter />
            </div>
          </body>
        </AppProvider>
      </AuthProvider>
    </html>
  );
}
