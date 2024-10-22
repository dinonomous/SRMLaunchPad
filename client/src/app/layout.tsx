// src/app/layout.tsx
import './globals.css'; // Make sure to import your global CSS
import { Roboto } from 'next/font/google'; // Import the Roboto font
import { Metadata } from 'next'; // Import Metadata for type safety

// Load Roboto font
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Your Site Title',
  description: 'Your Site Description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
