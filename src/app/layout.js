import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/ui/global/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "demos",
  description: "Rocket League Esports",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
