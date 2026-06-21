'use client'
import { useState } from 'react'
import { Plus, TrendingUp, DollarSign, Clock, Shield, CheckCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts'

const proyectos = [
  {
    id: 1, nombre: 'Nueva sucursal Norte', estado: 'En análisis',
    rentabilidad: 32.7, riesgo: 'Bajo', inversion: 250000, retorno: '8–12 meses',
    descripcion: 'Apertura de segunda clínica en zona norte de la ciudad. Capacidad: 3 consultorios.',
    flujo: [
      { mes: 'Mes 1', ingreso: 0, egreso: -85000 },
      { mes: 'Mes 2', ingreso: 15000, egreso: -62000 },
      { mes: 'Mes 3', ingreso: 38000, egreso: -55000 },
      { mes: 'Mes 4', ingreso: 62000, egreso: -52000 },
      { mes: 'Mes 6', ingreso: 95000, egreso: -50000 },
      { mes: 'Mes 9', ingreso: 120000, egreso: -50000 },
      { mes: 'Mes 12', ingreso: 145000, egreso: -50000 },
    ],
    puntos: [
      'Zona de alto crecimiento residencial (+18% nuevas viviendas)',
      'Solo 1 clínica dental en radio de 2km',
      'Contrato de renta firmado a 3 años con opción de compra',
    ],
    riesgos: ['Tiempo de posicionamiento 3–6 meses', 'Requiere contratar 2 dentistas adicionales'],
  },
  {
    id: 2, nombre: 'Equipo de rayos X digital', estado: 'Aprobado',
    rentabilidad: 48.2, riesgo: 'Muy bajo', inversion: 85000, retorno: '4–6 meses',
    descripcion: 'Reemplazo de equipo de rayos X análogo por sistema digital. Reduce costos y tiempo de diagnóstico.',
    flujo: [
      { mes: 'Mes 1', ingreso: 8000, egreso: -85000 },
      { mes: 'Mes 2', ingreso: 22000, egreso: -8000 },
      { mes: 'Mes 3', ingreso: 28000, egreso: -8000 },
      { mes: 'Mes 4', ingreso: 32000, egreso: -8000 },
      { mes: 'Mes 5', ingreso: 36000, egreso: -8000 },
      { mes: 'Mes 6', ingreso: 40000, egreso: -8000 },
    ],
    puntos: ['Reduce revelado de placas: ahorro $3,200/mes', 'Diagnóstico 3x más rápido', 'Diferenciador competitivo inmediato'],
    riesgos: ['Capacitación del personal: 2 semanas'],
  },
]

export default function Proyectos() {
  const [sel, setSel] = useState(proyectos[0])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e2e2f0', marginBottom: 4 }}>Planes financieros</h1>
          <p style={{ color: '#7070a0', fontSize: 14 }}>IA + financieros expertos evalúan la rentabilidad de tus proyectos</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
          background: 'linear-gradient(135deg,#6c63ff,#a78bfa)', border: 'none',
          borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer'
        }}>
          <Plus size={16} /> Nuevo proyecto
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16 }}>
        {/* Lista proyectos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {proyectos.map(p => (
            <div key={p.id} onClick={() => setSel(p)} className="card" style={{
              cursor: 'pointer', padding: 16,
              border: sel.id === p.id ? '1px solid #6c63ff' : '1px solid #1e1e38',
              background: sel.id === p.id ? 'rgba(108,99,255,0.08)' : '#111122'
            }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#e2e2f0', marginBottom: 6 }}>{p.nombre}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#22c55e' }}>{p.rentabilidad}%</span>
                <span className={`badge ${p.estado === 'Aprobado' ? 'badge-success' : 'badge-purple'}`}>{p.estado}</span>
              </div>
              <div style={{ fontSize: 12, color: '#7070a0', marginTop: 4 }}>Inversión: ${p.inversion.toLocaleString()}</div>
            </div>
          ))}

          <div className="card" style={{ padding: 16, border: '2px dashed #1e1e38', background: 'transparent', cursor: 'pointer', textAlign: 'center' }}>
            <Plus size={20} color="#7070a0" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 13, color: '#7070a0' }}>Agregar proyecto</div>
          </div>
        </div>

        {/* Detalle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#e2e2f0', marginBottom: 4 }}>{sel.nombre}</h2>
                <p style={{ fontSize: 13, color: '#7070a0' }}>{sel.descripcion}</p>
              </div>
              <span className={`badge ${sel.estado === 'Aprobado' ? 'badge-success' : 'badge-purple'}`}>{sel.estado}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[
                { icon: <TrendingUp size={16} color="#22c55e" />, label: 'Rentabilidad', valor: sel.rentabilidad + '%', color: '#22c55e' },
                { icon: <DollarSign size={16} color="#6c63ff" />, label: 'Inversión', valor: '$' + sel.inversion.toLocaleString(), color: '#a78bfa' },
                { icon: <Clock size={16} color="#f59e0b" />, label: 'Retorno', valor: sel.retorno, color: '#f59e0b' },
                { icon: <Shield size={16} color="#22c55e" />, label: 'Riesgo', valor: sel.riesgo, color: '#22c55e' },
              ].map(m => (
                <div key={m.label} style={{ background: '#0d0d1a', borderRadius: 8, padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>{m.icon}<span style={{ fontSize: 11, color: '#7070a0' }}>{m.label}</span></div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: m.color }}>{m.valor}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Flujo de caja */}
          <div className="card">
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Flujo de caja proyectado</div>
            <div style={{ fontSize: 12, color: '#7070a0', marginBottom: 16 }}>Ingresos vs egresos mes a mes</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={sel.flujo}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e38" />
                <XAxis dataKey="mes" tick={{ fill: '#7070a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => '$' + Math.abs(v / 1000).toFixed(0) + 'k'} tick={{ fill: '#7070a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#111122', border: '1px solid #1e1e38', borderRadius: 8, color: '#e2e2f0' }}
                  formatter={(v: unknown) => ['$' + Math.abs(Number(v)).toLocaleString()]}
                />
                <Bar dataKey="ingreso" fill="#22c55e" radius={[3, 3, 0, 0]} name="Ingresos" />
                <Bar dataKey="egreso" fill="#ef4444" radius={[3, 3, 0, 0]} name="Egresos" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Puntos clave y riesgos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card">
              <div style={{ fontWeight: 600, fontSize: 14, color: '#22c55e', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={15} /> Por qué conviene
              </div>
              {sel.puntos.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#9090b0' }}>
                  <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span> {p}
                </div>
              ))}
            </div>
            <div className="card">
              <div style={{ fontWeight: 600, fontSize: 14, color: '#f59e0b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Shield size={15} /> Riesgos identificados
              </div>
              {sel.riesgos.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#9090b0' }}>
                  <span style={{ color: '#f59e0b', flexShrink: 0 }}>⚠</span> {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
