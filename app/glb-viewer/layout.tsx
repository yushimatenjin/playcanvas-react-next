'use client';
import { FILLMODE_FILL_WINDOW } from 'playcanvas';
import { Application } from '@playcanvas/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function GlbViewerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Application fillMode={FILLMODE_FILL_WINDOW}>
        {children}
      </Application>
    </QueryClientProvider>
  );
}
