// app/layout.js
// Add 'use client' at the top to make this a Client Component
'use client';
import { SessionProvider } from 'next-auth/react';
import './globals.css'; // Import your global styles if any

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
