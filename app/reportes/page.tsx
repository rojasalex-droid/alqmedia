'use client'
import { FileText, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Download } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

const radar = [
  { area: 'Ingresos', valor: 87 },
  { area: 'Retención', valor: 72 },
  { area: 'Inventario', valor: 90 },
  { area: 'Marketing', valor: 65 },
  { area: 'Satisfacción', valor: 94 },
  { area: 'Operación', valor: 78 },
]

export default function Reportes() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e2e2f0', marginBottom: 4 }}>Reportes inteligentes</h1>
          <p style={{ color: '#7070a0', fontSize: 14 }}>La IA analiza tu negocio y te dice qué mejorar cada mes</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
          background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)',
          borderRadius: 8, color: '#a78bfa', fontSize: 14, fontWeight: 600, cursor: 'pointer'
        }}>
          <Download size={16} /> Descargar PDF
        </button>
      </div>

      {/* Selector de mes */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'].map((m, i) => (
          <button key={m} style={{
            padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer',
            border: i === 5 ? '1px solid #6c63ff' : '1px solid #1e1e38',
            background: i === 5 ? 'rgba(108,99,255,0.15)' : 'transparent',
            color: i === 5 ? '#a78bfa' : '#7070a0'
          }}>{m}</button>
        ))}
      </div>

      {/* Score general */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div className="card" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              border: '4px solid #6c63ff', display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexDirection: 'column'
            }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#a78bfa' }}>81</span>
              <span style={{ fontSize: 10, color: '#7070a0' }}>/100</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e2f0', marginBottom: 4 }}>Score del mes</div>
            <div style={{ fontSize: 13, color: '#7070a0', marginBottom: 8 }}>Junio 2025 — Clínica Rojas</div>
            <span className="badge badge-success">Muy bien 🎉</span>
          </div>
        </div>

        <div className="card" style={{ padding: 0 }}>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={radar}>
              <PolarGrid stroke="#1e1e38" />
              <PolarAngleAxis dataKey="area" tick={{ fill: '#7070a0', fontSize: 11 }} />
              <Radar name="Desempeño" dataKey="valor" stroke="#6c63ff" fill="#6c63ff" fillOpacity={0.2} />
              <Tooltip contentStyle={{ background: '#111122', border: '1px solid #1e1e38', borderRadius: 8, color: '#e2e2f0' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lo bueno */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <CheckCircle size={18} color="#22c55e" />
          <span style={{ fontWeight: 700, fontSize: 16, color: '#22c55e' }}>Lo que funcionó este mes</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { titulo: 'Ingresos +18.6%', detalle: 'El incremento de precios en ortodoncia y la campaña de WhatsApp generaron $19,000 adicionales respecto al mes anterior.' },
            { titulo: 'Bot WhatsApp — 94% resolución', detalle: 'La IA resolvió 44 de 47 conversaciones sin intervención humana. 12 citas agendadas automáticamente.' },
            { titulo: 'Cero faltantes de inventario', detalle: 'El sistema de alertas preventivas evitó 3 situaciones de desabasto. Ahorro estimado: $2,400.' },
            { titulo: 'Satisfacción del paciente: 4.8/5', detalle: '89% de los pacientes calificaron la atención como "excelente". Tiempo de espera promedio: 8 minutos.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px', background: 'rgba(34,197,94,0.05)', borderRadius: 8, border: '1px solid rgba(34,197,94,0.15)' }}>
              <TrendingUp size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#e2e2f0', marginBottom: 2 }}>{item.titulo}</div>
                <div style={{ fontSize: 13, color: '#9090b0', lineHeight: 1.5 }}>{item.detalle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lo que mejorar */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <AlertCircle size={18} color="#f59e0b" />
          <span style={{ fontWeight: 700, fontSize: 16, color: '#f59e0b' }}>Áreas de mejora</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { titulo: 'Cancelaciones: 12%', detalle: 'La tasa de cancelación está 3 puntos arriba del objetivo (9%). Recomendación: activar recordatorios automáticos 48h antes.', accion: 'Activar recordatorios' },
            { titulo: 'Gastos insumos +7.4%', detalle: 'El consumo de guantes y mascarillas aumentó más de lo esperado. Revisar si hay merma o consumo excesivo.', accion: 'Ver detalle insumos' },
            { titulo: 'Marketing digital: bajo', detalle: 'Las campañas de Instagram tuvieron CTR de 0.8% (objetivo: 1.5%). Recomendación: cambiar creativos y probar video corto.', accion: 'Revisar campañas' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px', background: 'rgba(245,158,11,0.05)', borderRadius: 8, border: '1px solid rgba(245,158,11,0.15)' }}>
              <TrendingDown size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#e2e2f0', marginBottom: 2 }}>{item.titulo}</div>
                <div style={{ fontSize: 13, color: '#9090b0', lineHeight: 1.5, marginBottom: 8 }}>{item.detalle}</div>
                <button style={{
                  padding: '4px 12px', fontSize: 12, background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.3)', borderRadius: 6, color: '#f59e0b', cursor: 'pointer'
                }}>{item.accion} →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Próximos pasos IA */}
      <div className="card" style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <FileText size={16} color="#a78bfa" />
          <span style={{ fontWeight: 600, fontSize: 14, color: '#a78bfa' }}>Plan de acción IA para Julio</span>
        </div>
        <ol style={{ paddingLeft: 20, color: '#9090b0', fontSize: 13, lineHeight: 2 }}>
          <li>Activar recordatorios automáticos de cita 48h y 2h antes → reducir cancelaciones al 9%</li>
          <li>Lanzar promoción "Blanqueamiento de verano" en WhatsApp a base de pacientes → meta: 15 tratamientos</li>
          <li>Auditar consumo de insumos de protección → identificar causa del +7.4%</li>
          <li>Cambiar creativos Instagram a video 15s formato Reels → meta CTR 1.5%</li>
        </ol>
      </div>
    </div>
  )
}
