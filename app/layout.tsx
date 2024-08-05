import '@/app/globals.css'

import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'React Hook Form with Next.js',
  description: 'How to use React Hook Form with Next.js',
  icons: { icon: '/favicon.ico' },
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={`${GeistSans.variable} font-sans`}>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        {children}
        <Toaster richColors />
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
