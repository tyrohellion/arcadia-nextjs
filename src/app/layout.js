import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/ui/global/NavBar";
import Footer from "./components/ui/global/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "arcadia",
  description: "Rocket League Esports",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className="container">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
