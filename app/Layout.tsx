import React from 'react';
import Menu from './Menu';
import './global.css';

export const metadata = {
  title: 'Embedded Flatfile in a Next.js App',
  description: 'Generated by Flatfile'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Menu />
      <main>{children}</main>
    </>
  );
}