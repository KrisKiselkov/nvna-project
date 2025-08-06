"use client";

import { useState } from "react";
import LoginPage from "./login/page";
import "./globals.css";

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
          <a href="#" className="sidebar__nav-link">Заявки</a>
          <a href="#" className="sidebar__nav-link">Approved</a>
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
