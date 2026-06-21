'use client'
import { useState } from 'react'
import { MessageCircle, Check, CheckCheck, Bot, User, Send, Calendar } from 'lucide-react'

const conversaciones = [
  {
    id: 1, nombre: 'Carlos Mendoza', hora: '14:32', activa: true, resuelta: true,
    mensajes: [
      { de: 'cliente', texto: 'Buenas tardes, quisiera agendar una cita para limpieza dental', hora: '14:28' },
      { de: 'ia', texto: '¡Hola Carlos! 😊 Con gusto te ayudo. Tenemos disponibilidad para limpieza dental los siguientes días:\n\n📅 Martes 24 Jun — 10:00am o 4:00pm\n📅 Miércoles 25 Jun — 11:00am\n📅 Jueves 26 Jun — 3:00pm\n\n¿Cuál horario te queda mejor?', hora: '14:29' },
      { de: 'cliente', texto: 'El martes a las 10 está perfecto', hora: '14:31' },
      { de: 'ia', texto: '✅ ¡Listo! Tu cita quedó agendada:\n\n👤 Carlos Mendoza\n🦷 Limpieza dental\n📅 Martes 24 Jun · 10:00am\n📍 Clínica Rojas\n\nTe enviaré un recordatorio 24 horas antes. ¿Necesitas algo más?', hora: '14:32' },
    ]
  },
  {
    id: 2, nombre: 'María López', hora: '13:15', activa: false, resuelta: true,
    mensajes: [
      { de: 'cliente', texto: '¿Cuánto cuesta un blanqueamiento dental?', hora: '13:10' },
      { de: 'ia', texto: 'Hola María! El blanqueamiento dental profesional tiene un costo de $3,500 pesos e incluye:\n\n✨ Blanqueamiento LED de 1 hora\n🦷 Limpieza previa incluida\n📋 Evaluación dental sin costo\n\n¿Te gustaría agendar una consulta de valoración gratuita?', hora: '13:12' },
      { de: 'cliente', texto: 'Sí me interesa, ¿tienen citas esta semana?', hora: '13:14' },
      { de: 'ia', texto: '¡Claro! Tenemos disponibilidad el viernes 27 a las 2:00pm. ¿Te la aparto?', hora: '13:15' },
    ]
  },
  {
    id: 3, nombre: 'Roberto Silva', hora: '11:45', activa: false, resuelta: false,
    mensajes: [
      { de: 'cliente', texto: 'Me duele mucho una muela, ¿tienen citas de urgencia hoy?', hora: '11:43' },
      { de: 'ia', texto: '¡Hola Roberto! Entiendo que tienes urgencia 😟 Déjame verificar disponibilidad para hoy... Tenemos un espacio a las 5:30pm. ¿Puedes venir a esa hora?', hora: '11:44' },
      { de: 'cliente', texto: 'Sí puedo, ¿qué necesito llevar?', hora: '11:45' },
    ]
  },
]

export default function WhatsApp() {
  const [seleccionada, setSeleccionada] = useState(conversaciones[0])

  const stats = [
    { label: 'Conversaciones hoy', valor: '47', color: '#6c63ff' },
    { label: 'Resueltas por IA', valor: '94%', color: '#22c55e' },
    { label: 'Citas agendadas', valor: '12', color: '#a78bfa' },
    { label: 'Tiempo resp. prom.', valor: '48s', color: '#f59e0b' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e2e2f0', marginBottom: 4 }}>Atención automática WhatsApp</h1>
        <p style={{ color: '#7070a0', fontSize: 14 }}>La IA responde, agenda citas y califica leads 24/7</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} className="card" style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.valor}</div>
            <div style={{ fontSize: 12, color: '#7070a0' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chat UI */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, height: 520 }}>
        {/* Lista conversaciones */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #1e1e38', fontSize: 13, fontWeight: 600, color: '#9090b0' }}>
            Conversaciones
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {conversaciones.map(c => (
              <div key={c.id} onClick={() => setSeleccionada(c)} style={{
                padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #1e1e38',
                background: seleccionada.id === c.id ? 'rgba(108,99,255,0.1)' : 'transparent',
                borderLeft: seleccionada.id === c.id ? '2px solid #6c63ff' : '2px solid transparent'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e2f0' }}>{c.nombre}</span>
                  <span style={{ fontSize: 11, color: '#7070a0' }}>{c.hora}</span>
                </div>
                <div style={{ fontSize: 12, color: '#7070a0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Bot size={11} color="#6c63ff" />
                  <span style={{ color: '#6c63ff' }}>IA activa</span>
                  {c.resuelta && <span className="badge badge-success" style={{ fontSize: 10, padding: '1px 6px', marginLeft: 4 }}>resuelta</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ventana de chat */}
        <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{
            padding: '14px 20px', borderBottom: '1px solid #1e1e38',
            display: 'flex', alignItems: 'center', gap: 12
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(108,99,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <User size={18} color="#a78bfa" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{seleccionada.nombre}</div>
              <div style={{ fontSize: 12, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                IA respondiendo
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)',
                borderRadius: 6, color: '#a78bfa', fontSize: 12, cursor: 'pointer'
              }}>
                <Calendar size={12} /> Ver cita
              </button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {seleccionada.mensajes.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.de === 'cliente' ? 'flex-start' : 'flex-end' }}>
                <div style={{
                  maxWidth: '70%', padding: '10px 14px', borderRadius: m.de === 'cliente' ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
                  background: m.de === 'cliente' ? '#1e1e38' : 'rgba(108,99,255,0.2)',
                  border: m.de === 'ia' ? '1px solid rgba(108,99,255,0.3)' : 'none'
                }}>
                  {m.de === 'ia' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6, fontSize: 11, color: '#a78bfa' }}>
                      <Bot size={11} /> IA · ALQ Media
                    </div>
                  )}
                  <div style={{ fontSize: 13, color: '#e2e2f0', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{m.texto}</div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4, marginTop: 6 }}>
                    <span style={{ fontSize: 10, color: '#7070a0' }}>{m.hora}</span>
                    {m.de === 'ia' && <CheckCheck size={12} color="#6c63ff" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '12px 16px', borderTop: '1px solid #1e1e38', display: 'flex', gap: 10 }}>
            <input
              placeholder="Escribir mensaje..."
              style={{
                flex: 1, background: '#1e1e38', border: '1px solid #2a2a4a',
                borderRadius: 8, padding: '10px 14px', color: '#e2e2f0', fontSize: 14, outline: 'none'
              }}
            />
            <button style={{
              width: 40, height: 40, borderRadius: 8, background: '#6c63ff',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}>
              <Send size={16} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
