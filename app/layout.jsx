import "./globals.css";
import { MainNav } from "./global-components/Navbar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-arial bg-app-purple-100">
          <MainNav />
          {children}
      </body>
    </html>
  );
}