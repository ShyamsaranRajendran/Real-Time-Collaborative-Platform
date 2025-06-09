'use client';

import { AuthProvider } from './auth-context';
import { ThemeProvider } from 'next-themes'; // Example of another provider

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}