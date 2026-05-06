import { useState, useEffect, useRef } from 'react'

const HARDWARE_SPECS = [
  { label: 'GPU', value: 'NVIDIA RTX 4090', icon: 'memory', meter: 'gpu' },
  { label: 'RAM', value: '64 GB DDR5', icon: 'developer_board', meter: 'ram' },
  { label: 'CPU', value: 'AMD Ryzen 9 7950X', icon: 'memory_alt', meter: 'cpu' },
  { label: 'Almacenamiento', value: '2 TB NVMe', icon: 'storage', meter: 'disk' },
]

const SERVICES = [
  { name: 'Ollama Runtime', status: 'online', port: ':11434' },
  { name: 'API Gateway', status: 'online', port: ':8080' },
  { name: 'Vector DB (Qdrant)', status: 'online', port: ':6333' },
  { name: 'Agente RAG interno', status: 'online', port: 'workers' },
]

const MODELS = [
  { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', size: '40 GB', context: '128K' },
  { id: 'mistral-large', name: 'Mistral Large', size: '24 GB', context: '32K' },
  { id: 'qwen-2.5-coder', name: 'Qwen 2.5 Coder', size: '18 GB', context: '128K' },
]

const SAMPLE_QUERIES = [
  '¿Cuánto facturó cliente Tech Solutions el último trimestre?',
  'Resume las cláusulas críticas del contrato 2026-0847.',
  'Genera un informe de stock crítico para almacén central.',
]

const RESPONSES = {
  '¿Cuánto facturó cliente Tech Solutions el último trimestre?':
    'Tech Solutions S.L. facturó 47.250 € en Q1 2026, un 12% más que Q4 2025. Pico en febrero con la factura FAC-2026-0847.',
  'Resume las cláusulas críticas del contrato 2026-0847.':
    '3 cláusulas críticas: (1) penalización por retraso del 0,5% diario, (2) propiedad intelectual exclusiva del cliente, (3) renovación automática anual con preaviso de 60 días.',
  'Genera un informe de stock crítico para almacén central.':
    '12 SKUs bajo umbral mínimo. Más urgentes: Ref. A-1042 (3 unidades), B-2017 (1 unidad), C-3389 (rotura). Generadas órdenes de reposición sugeridas.',
}

const LocalAIAgentDemo = () => {
  const [metrics, setMetrics] = useState({ gpu: 28, ram: 41, cpu: 17, disk: 62 })
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id)
  const [requestCount, setRequestCount] = useState(1284)
  const [query, setQuery] = useState(null)
  const [phase, setPhase] = useState('idle')
  const [response, setResponse] = useState('')
  const timeoutsRef = useRef([])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        gpu: clamp(prev.gpu + rand(-6, 8), 12, 92),
        ram: clamp(prev.ram + rand(-3, 4), 30, 78),
        cpu: clamp(prev.cpu + rand(-5, 7), 8, 65),
        disk: clamp(prev.disk + rand(-1, 1), 60, 70),
      }))
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
    }
  }, [])

  const handleQuery = (q) => {
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
    setQuery(q)
    setResponse('')
    setPhase('processing')
    setMetrics((prev) => ({ ...prev, gpu: clamp(prev.gpu + 35, 0, 95), cpu: clamp(prev.cpu + 20, 0, 90) }))

    const finalText = RESPONSES[q]
    timeoutsRef.current.push(
      setTimeout(() => {
        setPhase('streaming')
        let i = 0
        const stream = () => {
          if (i <= finalText.length) {
            setResponse(finalText.slice(0, i))
            i += 3
            timeoutsRef.current.push(setTimeout(stream, 25))
          } else {
            setResponse(finalText)
            setPhase('done')
            setRequestCount((c) => c + 1)
          }
        }
        stream()
      }, 900)
    )
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] relative text-agency-dark h-full flex flex-col border border-slate-200">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-200 shrink-0">
        <span className="material-symbols-outlined text-agency-dark text-lg">dns</span>
        <span className="text-sm font-bold text-agency-dark">Servidor IA Local · GoGestia Edge</span>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">100% Offline</span>
        </div>
      </div>

      <div className="flex-1 p-5 overflow-y-auto demo-scroll grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Columna izquierda: Hardware + Servicios */}
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-slate-400 uppercase">Hardware</div>
              <div className="text-[10px] text-slate-400">en tiempo real</div>
            </div>
            <div className="space-y-2.5">
              {HARDWARE_SPECS.map((hw) => (
                <div key={hw.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="material-symbols-outlined text-sm text-slate-400">{hw.icon}</span>
                      <span>{hw.label}</span>
                    </div>
                    <span className="text-agency-dark font-mono text-[10px]">{metrics[hw.meter]}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${metrics[hw.meter]}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{hw.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Servicios</div>
            <div className="space-y-1.5">
              {SERVICES.map((svc) => (
                <div key={svc.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>{svc.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">{svc.port}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha: Modelo + Inferencia */}
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Modelo activo</div>
            <div className="space-y-1.5">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-md border text-left transition-all ${
                    selectedModel === m.id
                      ? 'bg-primary/15 border-primary/50'
                      : 'bg-white border-slate-200 hover:border-primary/30'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-agency-dark">{m.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{m.size} · ctx {m.context}</div>
                  </div>
                  {selectedModel === m.id && (
                    <span className="material-symbols-outlined text-sm text-agency-dark">check_circle</span>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[10px] text-slate-400">
              <span>Inferencias hoy</span>
              <span className="font-mono text-agency-dark font-bold">{requestCount.toLocaleString('es')}</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Probar agente local</div>
            {phase === 'idle' && (
              <div className="space-y-1.5">
                {SAMPLE_QUERIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuery(q)}
                    className="w-full text-left text-[11px] px-2.5 py-2 rounded-md bg-white border border-slate-200 hover:border-primary/50 hover:bg-primary/5 text-slate-600 hover:text-agency-dark transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {phase !== 'idle' && (
              <div className="space-y-2">
                <div className="text-[11px] text-slate-500 italic line-clamp-2">"{query}"</div>
                <div className="bg-white rounded-md p-2.5 border border-slate-200 min-h-[80px]">
                  {phase === 'processing' && (
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                      <span>Inferencia local en curso...</span>
                    </div>
                  )}
                  {(phase === 'streaming' || phase === 'done') && (
                    <p className="text-[11px] leading-relaxed text-slate-700">
                      {response}
                      {phase === 'streaming' && <span className="inline-block w-1 h-3 bg-agency-dark ml-0.5 animate-pulse" />}
                    </p>
                  )}
                </div>
                {phase === 'done' && (
                  <button
                    onClick={() => {
                      setPhase('idle')
                      setQuery(null)
                      setResponse('')
                    }}
                    className="text-[10px] text-slate-400 hover:text-agency-dark transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-xs">refresh</span> Otra consulta
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer status bar */}
      <div className="flex items-center justify-between px-5 py-2 bg-slate-50 border-t border-slate-200 text-[10px] font-mono text-slate-400 shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">lock</span>
            Datos sin salir de la red local
          </span>
        </div>
        <span>uptime 99.97%</span>
      </div>

      <style>{`
        .demo-scroll::-webkit-scrollbar { width: 4px; }
        .demo-scroll::-webkit-scrollbar-track { background: transparent; }
        .demo-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.3); border-radius: 9999px; }
        .demo-scroll::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,0.5); }
        .demo-scroll { scrollbar-width: thin; scrollbar-color: rgba(148,163,184,0.3) transparent; }
      `}</style>
    </div>
  )
}

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

export default LocalAIAgentDemo
