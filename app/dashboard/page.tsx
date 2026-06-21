'use client'
import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Activity, Plus, X, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Movimiento = {
  id: string
  descripcion: string
  monto: number
  tipo: 'ingreso' | 'gasto'
  fecha: string
  notas?: string
  categorias?: { nombre: string }
}

type Categoria = { id: string; nombre: string; tipo: string }

export default function Dashboard() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [form, setForm] = useState({
    descripcion: '', monto: '', tipo: 'ingreso' as 'ingreso' | 'gasto',
    categoria_id: '', fecha: new Date().toISOString().split('T')[0], notas: ''
  })

  const cargar = async () => {
    setLoading(true)
    const [{ data: movs }, { data: cats }] = await Promise.all([
      supabase.from('movimientos').select('*, categorias(nombre)').order('fecha', { ascending: false }).limit(100),
      supabase.from('categorias').select('*').order('nombre'),
    ])
    setMovimientos(movs || [])
    setCategorias(cats || [])
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const guardar = async () => {
    if (!form.descripcion || !form.monto) return
    setGuardando(true)
    await supabase.from('movimientos').insert({
      descripcion: form.descripcion,
      monto: parseFloat(form.monto),
      tipo: form.tipo,
      categoria_id: form.categoria_id || null,
      fecha: form.fecha,
      notas: form.notas || null,
    })
    setModal(false)
    setForm({ descripcion: '', monto: '', tipo: 'ingreso', categoria_id: '', fecha: new Date().toISOString().split('T')[0], notas: '' })
    setGuardando(false)
    cargar()
  }

  const ingresos = movimientos.filter(m => m.tipo === 'ingreso').reduce((s, m) => s + m.monto, 0)
  const gastos = movimientos.filter(m => m.tipo === 'gasto').reduce((s, m) => s + m.monto, 0)
  const utilidad = ingresos - gastos

  // Agrupar por mes para la gráfica
  const porMes: Record<string, { mes: string; ingresos: number; gastos: number }> = {}
  movimientos.forEach(m => {
    const mes = m.fecha.slice(0, 7)
    if (!porMes[mes]) porMes[mes] = { mes, ingresos: 0, gastos: 0 }
    if (m.tipo === 'ingreso') porMes[mes].ingresos += m.monto
    else porMes[mes].gastos += m.monto
  })
  const graficaData = Object.values(porMes)
    .sort((a, b) => a.mes.localeCompare(b.mes))
    .slice(-6)
    .map(d => ({ ...d, mes: d.mes.slice(5) === '01' ? 'Ene' : d.mes.slice(5) === '02' ? 'Feb' : d.mes.slice(5) === '03' ? 'Mar' : d.mes.slice(5) === '04' ? 'Abr' : d.mes.slice(5) === '05' ? 'May' : d.mes.slice(5) === '06' ? 'Jun' : d.mes.slice(5) === '07' ? 'Jul' : d.mes.slice(5) === '08' ? 'Ago' : d.mes.slice(5) === '09' ? 'Sep' : d.mes.slice(5) === '10' ? 'Oct' : d.mes.slice(5) === '11' ? 'Nov' : 'Dic' }))

  const fmt = (v: number) => '$' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v)
  const fmtPeso = (v: number) => '$' + v.toLocaleString('es-MX', { minimumFractionDigits: 2 })

  const catsFiltradas = categorias.filter(c => c.tipo === form.tipo)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e2e2f0', marginBottom: 4 }}>Dashboard financiero</h1>
          <p style={{ color: '#7070a0', fontSize: 14 }}>Clínica Rojas · Datos en tiempo real</p>
        </div>
        <button onClick={() => setModal(true)} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
          background: 'linear-gradient(135deg,#6c63ff,#a78bfa)', border: 'none',
          borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer'
        }}>
          <Plus size={16} /> Agregar movimiento
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, gap: 12, color: '#7070a0' }}>
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
          Cargando datos...
        </div>
      ) : (
        <>
          {/* Métricas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
            <MetricCard label="Total ingresos" value={fmtPeso(ingresos)} icon={<DollarSign size={18} color="#6c63ff" />} color="#22c55e" sub={`${movimientos.filter(m=>m.tipo==='ingreso').length} movimientos`} />
            <MetricCard label="Total gastos" value={fmtPeso(gastos)} icon={<TrendingDown size={18} color="#ef4444" />} color="#ef4444" sub={`${movimientos.filter(m=>m.tipo==='gasto').length} movimientos`} />
            <MetricCard label="Utilidad neta" value={fmtPeso(utilidad)} icon={<Activity size={18} color="#22c55e" />} color={utilidad >= 0 ? '#22c55e' : '#ef4444'} sub={ingresos > 0 ? `Margen: ${((utilidad/ingresos)*100).toFixed(1)}%` : '—'} />
          </div>

          {/* Gráfica */}
          {graficaData.length > 0 && (
            <div className="card" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>Ingresos vs Gastos</div>
                  <div style={{ fontSize: 12, color: '#7070a0' }}>Últimos 6 meses</div>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#7070a0' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#6c63ff', display: 'inline-block' }} />Ingresos</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#ef4444', display: 'inline-block' }} />Gastos</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={graficaData}>
                  <defs>
                    <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1e38" />
                  <XAxis dataKey="mes" tick={{ fill: '#7070a0', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={fmt} tick={{ fill: '#7070a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#111122', border: '1px solid #1e1e38', borderRadius: 8, color: '#e2e2f0' }} formatter={(v) => ['$' + Number(v).toLocaleString('es-MX')]} />
                  <Area type="monotone" dataKey="ingresos" stroke="#6c63ff" strokeWidth={2} fill="url(#gi)" />
                  <Area type="monotone" dataKey="gastos" stroke="#ef4444" strokeWidth={2} fill="url(#gg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Movimientos recientes */}
          <div className="card">
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>
              {movimientos.length === 0 ? 'Sin movimientos aún' : `Últimos ${Math.min(movimientos.length, 20)} movimientos`}
            </div>
            {movimientos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#7070a0' }}>
                <DollarSign size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                <div style={{ fontSize: 14 }}>Agrega tu primer ingreso o gasto</div>
              </div>
            ) : (
              movimientos.slice(0, 20).map((m, i) => (
                <div key={m.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderBottom: i < Math.min(movimientos.length, 20) - 1 ? '1px solid #1e1e38' : 'none'
                }}>
                  <div>
                    <div style={{ fontSize: 14, color: '#e2e2f0', marginBottom: 2 }}>{m.descripcion}</div>
                    <div style={{ fontSize: 12, color: '#7070a0' }}>
                      {m.categorias?.nombre && <span style={{ color: '#a78bfa', marginRight: 8 }}>{m.categorias.nombre}</span>}
                      {new Date(m.fecha + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: m.tipo === 'ingreso' ? '#22c55e' : '#ef4444' }}>
                    {m.tipo === 'ingreso' ? '+' : '-'}{fmtPeso(m.monto)}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Modal */}
      {modal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div style={{ background: '#111122', border: '1px solid #1e1e38', borderRadius: 16, padding: 28, width: 460, maxWidth: '95vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#e2e2f0' }}>Agregar movimiento</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7070a0' }}><X size={20} /></button>
            </div>

            {/* Tipo */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              {(['ingreso', 'gasto'] as const).map(t => (
                <button key={t} onClick={() => setForm(f => ({ ...f, tipo: t, categoria_id: '' }))} style={{
                  padding: '10px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  border: form.tipo === t ? `1px solid ${t === 'ingreso' ? '#22c55e' : '#ef4444'}` : '1px solid #1e1e38',
                  background: form.tipo === t ? (t === 'ingreso' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)') : 'transparent',
                  color: form.tipo === t ? (t === 'ingreso' ? '#22c55e' : '#ef4444') : '#7070a0',
                }}>
                  {t === 'ingreso' ? '+ Ingreso' : '− Gasto'}
                </button>
              ))}
            </div>

            {/* Campos */}
            {[
              { label: 'Descripción', field: 'descripcion', type: 'text', placeholder: 'Ej: Limpieza dental — Paciente García' },
              { label: 'Monto ($)', field: 'monto', type: 'number', placeholder: '0.00' },
              { label: 'Fecha', field: 'fecha', type: 'date', placeholder: '' },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field} style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#7070a0', marginBottom: 6 }}>{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[field as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  style={{
                    width: '100%', background: '#0d0d1a', border: '1px solid #1e1e38',
                    borderRadius: 8, padding: '10px 14px', color: '#e2e2f0', fontSize: 14,
                    outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#7070a0', marginBottom: 6 }}>Categoría</label>
              <select
                value={form.categoria_id}
                onChange={e => setForm(f => ({ ...f, categoria_id: e.target.value }))}
                style={{
                  width: '100%', background: '#0d0d1a', border: '1px solid #1e1e38',
                  borderRadius: 8, padding: '10px 14px', color: form.categoria_id ? '#e2e2f0' : '#7070a0',
                  fontSize: 14, outline: 'none', boxSizing: 'border-box'
                }}
              >
                <option value="">Seleccionar categoría</option>
                {catsFiltradas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#7070a0', marginBottom: 6 }}>Notas (opcional)</label>
              <textarea
                placeholder="Detalles adicionales..."
                value={form.notas}
                onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
                rows={2}
                style={{
                  width: '100%', background: '#0d0d1a', border: '1px solid #1e1e38',
                  borderRadius: 8, padding: '10px 14px', color: '#e2e2f0', fontSize: 14,
                  outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit'
                }}
              />
            </div>

            <button
              onClick={guardar}
              disabled={guardando || !form.descripcion || !form.monto}
              style={{
                width: '100%', padding: '12px', borderRadius: 8, border: 'none',
                background: guardando || !form.descripcion || !form.monto ? '#2a2a4a' : 'linear-gradient(135deg,#6c63ff,#a78bfa)',
                color: '#fff', fontSize: 15, fontWeight: 700, cursor: guardando ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              {guardando ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Guardando...</> : 'Guardar movimiento'}
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function MetricCard({ label, value, icon, color, sub }: { label: string; value: string; icon: React.ReactNode; color: string; sub: string }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#7070a0' }}>{label}</span>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(108,99,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12, color: '#7070a0' }}>{sub}</div>
    </div>
  )
}
