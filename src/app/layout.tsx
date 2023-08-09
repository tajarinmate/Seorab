'use client';

import StyledComponentsRegistry from './styling/registry';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: '서랍',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
