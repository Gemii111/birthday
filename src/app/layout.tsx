import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YourStory Day | Your Personalized Birthday Experience',
  description:
    'An interactive cinematic birthday experience. Share memories, receive wishes, and celebrate in style.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
