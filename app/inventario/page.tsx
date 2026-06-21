'use client'
import { useState } from 'react'
import { Package, AlertTriangle, CheckCircle, RefreshCw, Plus } from 'lucide-react'

const inventario = [
  { id: 1, nombre: 'Guantes latex (caja 100u)', stock: 2, minimo: 5, unidad: 'cajas', diasRestantes: 4, categoria: 'Protección' },
  { id: 2, nombre: 'Mascarillas N95', stock: 3, minimo: 5, unidad: 'cajas', diasRestantes: 6, categoria: 'Protección' },
  { id: 3, nombre: 'Fabuloso multiusos 1L', stock: 1, minimo: 3, unidad: 'botellas', diasRestantes: 3, categoria: 'Limpieza' },
  { id: 4, nombre: 'Anestesia lidocaína 2%', stock: 8, minimo: 10, unidad: 'cartuchos', diasRestantes: 12, categoria: 'Médico' },
  { id: 5, nombre: 'Pasta profiláctica', stock: 4, minimo: 4, unidad: 'frascos', diasRestantes: 14, categoria: 'Dental' },
  { id: 6, nombre: 'Hilo dental profesional', stock: 12, minimo: 5, unidad: 'carretes', diasRestantes: 45, categoria: 'Dental' },
  { id: 7, nombre: 'Radiografías periapicales', stock: 30, minimo: 20, unidad: 'paquetes', diasRestantes: 60, categoria: 'Diagnóstico' },
  { id: 8, nombre: 'Alcohol gel 500ml', stock: 2, minimo: 4, unidad: 'frascos', diasRestantes: 5, categoria: 'Limpieza' },
]

export default function Inventario() {
  const [filtro, setFiltro] = useState<'todos' | 'critico' | 'ok'>('todos')

  const filtrados = inventario.filter(i => {
    if (filtro === 'critico') return i.stock <= i.minimo
    if (filtro === 'ok') return i.stock > i.minimo
    return true
  })

  const criticos = inventario.filter(i => i.stock <= i.minimo).length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e2e2f0', marginBottom: 4 }}>Inventario inteligente</h1>
          <p style={{ color: '#7070a0', fontSize: 14 }}>La IA predice cuándo reabastecer según tu consumo real</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
          background: 'linear-gradient(135deg,#6c63ff,#a78bfa)', border: 'none',
          borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer'
        }}>
          <Plus size={16} /> Agregar insumo
        </button>
      </div>

      {/* Resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
        <SummCard icon={<Package size={18} color="#6c63ff" />} label="Total insumos" value={inventario.length.toString()} bg="rgba(108,99,255,0.1)" />
        <SummCard icon={<AlertTriangle size={18} color="#ef4444" />} label="Nivel crítico" value={criticos.toString()} bg="rgba(239,68,68,0.1)" />
        <SummCard icon={<CheckCircle size={18} color="#22c55e" />} label="Stock normal" value={(inventario.length - criticos).toString()} bg="rgba(34,197,94,0.1)" />
      </div>

      {/* Alerta IA */}
      {criticos > 0 && (
        <div style={{
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 10, padding: '14px 18px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12
        }}>
          <AlertTriangle size={18} color="#ef4444" />
          <div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#ef4444' }}>Alerta IA — </span>
            <span style={{ fontSize: 14, color: '#e2e2f0' }}>{criticos} insumos necesitan reposición esta semana. Se generó orden de compra automática.</span>
          </div>
          <button style={{
            marginLeft: 'auto', padding: '6px 14px', background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, color: '#ef4444',
            fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
          }}>
            <RefreshCw size={12} /> Ver orden
          </button>
        </div>
      )}

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['todos', 'critico', 'ok'] as const).map(f => (
          <button key={f} onClick={() => setFiltro(f)} style={{
            padding: '6px 16px', borderRadius: 20, fontSize: 13, cursor: 'pointer',
            border: filtro === f ? '1px solid #6c63ff' : '1px solid #1e1e38',
            background: filtro === f ? 'rgba(108,99,255,0.15)' : 'transparent',
            color: filtro === f ? '#a78bfa' : '#7070a0'
          }}>
            {f === 'todos' ? 'Todos' : f === 'critico' ? 'Críticos' : 'En stock'}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#0d0d1a' }}>
              {['Insumo', 'Categoría', 'Stock actual', 'Mínimo', 'Días restantes', 'Estado'].map(h => (
                <th key={h} style={{
                  padding: '12px 20px', textAlign: 'left', fontSize: 12,
                  color: '#7070a0', fontWeight: 600, letterSpacing: '0.04em'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((item, i) => {
              const critico = item.stock <= item.minimo
              return (
                <tr key={item.id} style={{
                  borderTop: '1px solid #1e1e38',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'
                }}>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#e2e2f0', fontWeight: 500 }}>{item.nombre}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span className="badge badge-purple" style={{ fontSize: 11 }}>{item.categoria}</span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 700, color: critico ? '#ef4444' : '#22c55e' }}>
                    {item.stock} {item.unidad}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#7070a0' }}>{item.minimo} {item.unidad}</td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: item.diasRestantes <= 7 ? '#f59e0b' : '#7070a0' }}>
                    {item.diasRestantes} días
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span className={`badge ${critico ? 'badge-danger' : 'badge-success'}`}>
                      {critico ? '⚠ Reabastecer' : '✓ Normal'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SummCard({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string; bg: string }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#7070a0', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#e2e2f0' }}>{value}</div>
      </div>
    </div>
  )
}
