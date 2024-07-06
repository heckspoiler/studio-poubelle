'use client';
import React from 'react';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import './globals.css';
import './reset.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lenis = useLenis(({ scroll }) => {});
  return (
    <html lang="en">
      <body>
        <ReactLenis root>{children}</ReactLenis>
      </body>

      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
