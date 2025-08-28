"use client";

import { useState } from "react";
import LoginPage from "./login/page";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
    const handleLogin = () => {
      // You can later validate credentials before setting true
      setIsLoggedIn(true);
    };


  return (
     <html lang="en">
      {isLoggedIn ? (
      <body className="body">
        <div className="sidebar">
          <h2 className="sidebar__h2">VVMU Panel</h2>
          <Link href="/admin/requests" className="sidebar__nav-link">Заявки</Link>
          <Link href="/client/requestsClient" className="sidebar__nav-link">Approved</Link>
          <a href="#" className="sidebar__nav-link">Settings</a>
        </div>
        <main className="main">
          {children} {/* this is where each page gets injected */}
        </main>
      </body>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </html>
  );
}
