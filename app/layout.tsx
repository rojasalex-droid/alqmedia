import type { Metadata } from 'next'
import './globals.css'
import Sidebar from './components/Sidebar'

export const metadata: Metadata = {
  title: 'ALQ Media — IA que Automatiza',
  description: 'Plataforma de automatización empresarial para clínicas dentales',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ display: 'flex', minHeight: '100vh', background: '#08080f' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto', maxHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
