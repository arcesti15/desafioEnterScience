import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import NavBar from "@/components/navbar";
import { Raleway } from "next/font/google"

const roboto = Raleway({
  variable: "--font-roboto",
  weight: ["300", "400",  "700"],
  subsets: ["latin"]
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
