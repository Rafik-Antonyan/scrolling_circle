import Footer from "./components/molecules/Footer";
import Header from "./components/molecules/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-jeko-regular">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
