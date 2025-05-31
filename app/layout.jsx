import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Professional Portfolio | Sahil",
  description: "Full Stack Developer specializing in React, Node.js, and modern web technologies",
    
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="icon" href="/my-favicon.jpg" type="image/jpeg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
