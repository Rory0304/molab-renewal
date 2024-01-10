import { GlobalFooter, GlobalHeader, GlobalMain } from 'src/components/blocks';
import AppProvider from 'src/context/AppProvider';
import { AuthProvider } from 'src/context/AuthProvider';
import ModalProvider from 'src/context/ModalProvider';

import '../constants/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <AppProvider>
            <ModalProvider>
              <div className="flex flex-col items-center min-h-screenflex">
                <GlobalHeader />
                <GlobalMain>{children}</GlobalMain>
                <GlobalFooter />
              </div>
            </ModalProvider>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
