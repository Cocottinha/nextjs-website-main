import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "@/components/navbar/Navbar";
import Footer from '@/components/footer/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: { default: "Lab.Data", template: "%s | Lab.Data" },
  description: 'O site de análises forenses do Brasil!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className='container'>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
