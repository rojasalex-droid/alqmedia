'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, MessageCircle, FileText,
  TrendingUp, Megaphone, Sparkles
} from 'lucide-react'

const links = [
  { href: '/dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/inventario',  label: 'Inventario',  icon: Package },
  { href: '/whatsapp',    label: 'WhatsApp IA', icon: MessageCircle },
  { href: '/reportes',    label: 'Reportes',    icon: FileText },
  { href: '/proyectos',   label: 'Proyectos',   icon: TrendingUp },
  { href: '/marketing',   label: 'Marketing',   icon: Megaphone },
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <aside style={{
      width: 220, minHeight: '100vh', background: '#0d0d1a',
      borderRight: '1px solid #1e1e38', padding: '24px 16px',
      display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0
    }}>
      <div style={{ padding: '8px 12px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg,#6c63ff,#a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Sparkles size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#e2e2f0' }}>ALQ Media</div>
            <div style={{ fontSize: 11, color: '#7070a0' }}>Clínica Dental</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 11, color: '#7070a0', padding: '0 12px', marginBottom: 4, letterSpacing: '0.08em' }}>
        MÓDULOS
      </div>

      {links.map(({ href, label, icon: Icon }) => {
        const active = path === href || path.startsWith(href + '/')
        return (
          <Link key={href} href={href} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
            fontSize: 14, fontWeight: active ? 600 : 400,
            color: active ? '#a78bfa' : '#9090b0',
            background: active ? 'rgba(108,99,255,0.12)' : 'transparent',
            transition: 'all 0.15s'
          }}>
            <Icon size={16} />
            {label}
          </Link>
        )
      })}

      <div style={{ marginTop: 'auto', padding: '16px 12px 0', borderTop: '1px solid #1e1e38' }}>
        <div style={{ fontSize: 12, color: '#7070a0' }}>IA activa</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 12, color: '#22c55e' }}>Todos los sistemas online</span>
        </div>
      </div>
    </aside>
  )
}
