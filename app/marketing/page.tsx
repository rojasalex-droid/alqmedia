'use client'
import { useState } from 'react'
import { Megaphone, TrendingUp, Eye, MousePointer, Users, Plus } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'

const rendimiento = [
  { dia: 'L', alcance: 4200, clics: 310, conversiones: 18 },
  { dia: 'M', alcance: 5800, clics: 420, conversiones: 24 },
  { dia: 'M', alcance: 4900, clics: 380, conversiones: 21 },
  { dia: 'J', alcance: 6200, clics: 510, conversiones: 31 },
  { dia: 'V', alcance: 7800, clics: 620, conversiones: 42 },
  { dia: 'S', alcance: 9100, clics: 740, conversiones: 58 },
  { dia: 'D', alcance: 8400, clics: 680, conversiones: 48 },
]

const canales = [
  { name: 'WhatsApp', value: 42, color: '#22c55e' },
  { name: 'Instagram', value: 28, color: '#a78bfa' },
  { name: 'Facebook Ads', value: 18, color: '#6c63ff' },
  { name: 'Google', value: 12, color: '#f59e0b' },
]

const campanas = [
  { nombre: 'Blanqueamiento Verano', canal: 'Instagram', estado: 'Activa', alcance: '12,400', ctr: '2.1%', conv: 48, presupuesto: '$3,500' },
  { nombre: 'Limpieza + Revisión', canal: 'WhatsApp', estado: 'Activa', alcance: '890 contactos', ctr: '38%', conv: 142, presupuesto: '$800' },
  { nombre: 'Ortodoncia invisible', canal: 'Facebook Ads', estado: 'Pausada', alcance: '8,200', ctr: '0.9%', conv: 12, presupuesto: '$2,100' },
]

export default function Marketing() {
  const [tab, setTab] = useState<'rendimiento' | 'campanas' | 'plan'>('rendimiento')

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e2e2f0', marginBottom: 4 }}>Marketing inteligente</h1>
          <p style={{ color: '#7070a0', fontSize: 14 }}>Campañas, análisis de resultados y branding con IA</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
          background: 'linear-gradient(135deg,#6c63ff,#a78bfa)', border: 'none',
          borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer'
        }}>
          <Plus size={16} /> Nueva campaña
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { icon: <Eye size={16} color="#6c63ff" />, label: 'Alcance semanal', valor: '51,300', cambio: '+21.3%' },
          { icon: <MousePointer size={16} color="#a78bfa" />, label: 'Clics totales', valor: '3,660', cambio: '+16.7%' },
          { icon: <Users size={16} color="#22c55e" />, label: 'Nuevos pacientes', valor: '242', cambio: '+35.9%' },
          { icon: <TrendingUp size={16} color="#f59e0b" />, label: 'Costo por paciente', valor: '$265', cambio: '-12.4%' },
        ].map(k => (
          <div key={k.label} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#7070a0' }}>{k.label}</span>
              {k.icon}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#e2e2f0', marginBottom: 4 }}>{k.valor}</div>
            <div style={{ fontSize: 12, color: k.cambio.startsWith('+') ? '#22c55e' : '#22c55e' }}>{k.cambio} esta semana</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {(['rendimiento', 'campanas', 'plan'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 20px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
            border: tab === t ? '1px solid #6c63ff' : '1px solid #1e1e38',
            background: tab === t ? 'rgba(108,99,255,0.15)' : 'transparent',
            color: tab === t ? '#a78bfa' : '#7070a0',
            fontWeight: tab === t ? 600 : 400
          }}>
            {t === 'rendimiento' ? 'Rendimiento' : t === 'campanas' ? 'Campañas' : 'Plan IA'}
          </button>
        ))}
      </div>

      {tab === 'rendimiento' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div className="card">
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Alcance y conversiones — Esta semana</div>
              <div style={{ fontSize: 12, color: '#7070a0', marginBottom: 16 }}>Todos los canales combinados</div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 12, color: '#7070a0' }}>
                {[{c:'#6c63ff',l:'Alcance'},{c:'#22c55e',l:'Conversiones'}].map(x => (
                  <span key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: x.c, display: 'inline-block' }} />{x.l}
                  </span>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={rendimiento}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1e38" />
                  <XAxis dataKey="dia" tick={{ fill: '#7070a0', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#7070a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#111122', border: '1px solid #1e1e38', borderRadius: 8, color: '#e2e2f0' }} />
                  <Line type="monotone" dataKey="alcance" stroke="#6c63ff" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="conversiones" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Canales</div>
              <div style={{ fontSize: 12, color: '#7070a0', marginBottom: 16 }}>Nuevos pacientes por origen</div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={canales} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70}>
                    {canales.map((c, i) => <Cell key={i} fill={c.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#111122', border: '1px solid #1e1e38', borderRadius: 8, color: '#e2e2f0' }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {canales.map(c => (
                  <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9090b0' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, display: 'inline-block' }} />{c.name}
                    </span>
                    <span style={{ fontWeight: 600, color: '#e2e2f0' }}>{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'campanas' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0d0d1a' }}>
                {['Campaña', 'Canal', 'Alcance', 'CTR', 'Conversiones', 'Presupuesto', 'Estado'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, color: '#7070a0', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campanas.map((c, i) => (
                <tr key={i} style={{ borderTop: '1px solid #1e1e38' }}>
                  <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 600, color: '#e2e2f0' }}>{c.nombre}</td>
                  <td style={{ padding: '14px 20px' }}><span className="badge badge-purple" style={{ fontSize: 11 }}>{c.canal}</span></td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#9090b0' }}>{c.alcance}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#e2e2f0', fontWeight: 600 }}>{c.ctr}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#22c55e', fontWeight: 700 }}>{c.conv}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#9090b0' }}>{c.presupuesto}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span className={`badge ${c.estado === 'Activa' ? 'badge-success' : 'badge-warning'}`}>{c.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'plan' && (
        <div className="card" style={{ background: 'rgba(108,99,255,0.04)', border: '1px solid rgba(108,99,255,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Megaphone size={18} color="#a78bfa" />
            <span style={{ fontWeight: 700, fontSize: 16, color: '#a78bfa' }}>Plan de marketing IA — Julio 2025</span>
          </div>
          {[
            { semana: 'Semana 1', accion: 'Campaña WhatsApp "Limpieza de mitad de año"', meta: '25 citas', presupuesto: '$0' },
            { semana: 'Semana 2', accion: 'Reels Instagram: "Antes y después blanqueamiento"', meta: '50,000 alcance', presupuesto: '$1,200' },
            { semana: 'Semana 3', accion: 'Email + WhatsApp a pacientes sin cita en 6 meses', meta: '18 reactivaciones', presupuesto: '$0' },
            { semana: 'Semana 4', accion: 'Google Ads "dentista urgencias [ciudad]"', meta: '40 clics/día', presupuesto: '$2,800' },
          ].map((p, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '100px 1fr 100px 80px',
              gap: 16, padding: '14px 0', borderBottom: i < 3 ? '1px solid #1e1e38' : 'none',
              alignItems: 'center'
            }}>
              <span className="badge badge-purple">{p.semana}</span>
              <span style={{ fontSize: 14, color: '#e2e2f0' }}>{p.accion}</span>
              <span style={{ fontSize: 12, color: '#22c55e' }}>Meta: {p.meta}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: p.presupuesto === '$0' ? '#22c55e' : '#f59e0b' }}>{p.presupuesto}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, padding: '14px', background: 'rgba(34,197,94,0.05)', borderRadius: 8, border: '1px solid rgba(34,197,94,0.15)', fontSize: 13, color: '#9090b0' }}>
            <strong style={{ color: '#22c55e' }}>Proyección IA:</strong> Con este plan, julio debería cerrar con 285–310 nuevos pacientes y un incremento del 22% en ingresos respecto a junio.
          </div>
        </div>
      )}
    </div>
  )
}
