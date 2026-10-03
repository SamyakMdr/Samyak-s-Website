import "./globals.css";

export const metadata = {
  title: "Samyak Manandhar | Portfolio",
  description: "Portfolio website for Samyak Manandhar."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
