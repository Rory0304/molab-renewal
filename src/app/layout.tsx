import "../constants/styles/global.css";
import { GlobalFooter, GlobalMain, GlobalHeader } from "src/components/blocks";
import { AuthProvider } from "src/context/auth-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <AuthProvider>
        <body>
          <div className="flex flex-col items-center min-h-screenflex">
            <GlobalHeader />
            <GlobalMain>{children}</GlobalMain>
            <GlobalFooter />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
