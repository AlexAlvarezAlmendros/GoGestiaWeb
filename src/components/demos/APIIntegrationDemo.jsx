import { useState, useRef, useEffect } from 'react'

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/v1/clientes',
    description: 'Listar clientes',
    methodColor: 'text-green-700 bg-green-50 border-green-200',
    response: {
      status: 200,
      time: '45ms',
      body: {
        success: true,
        total: 3,
        data: [
          { id: 1, nombre: 'Acme Corp', plan: 'Enterprise', activo: true },
          { id: 2, nombre: 'Tech Solutions', plan: 'Business', activo: true },
          { id: 3, nombre: 'StartUp Lab', plan: 'Starter', activo: false },
        ],
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/clientes',
    description: 'Crear cliente',
    methodColor: 'text-blue-700 bg-blue-50 border-blue-200',
    requestBody: {
      nombre: 'Nueva Empresa S.L.',
      email: 'info@nuevaempresa.com',
      plan: 'Business',
    },
    response: {
      status: 201,
      time: '82ms',
      body: {
        success: true,
        message: 'Cliente creado correctamente',
        data: {
          id: 4,
          nombre: 'Nueva Empresa S.L.',
          email: 'info@nuevaempresa.com',
          plan: 'Business',
          activo: true,
          createdAt: '2026-02-16T10:30:00Z',
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/clientes/1',
    description: 'Actualizar cliente',
    methodColor: 'text-amber-700 bg-amber-50 border-amber-200',
    requestBody: {
      nombre: 'Acme Corp International',
      plan: 'Enterprise Plus',
    },
    response: {
      status: 200,
      time: '63ms',
      body: {
        success: true,
        message: 'Cliente actualizado',
        data: {
          id: 1,
          nombre: 'Acme Corp International',
          plan: 'Enterprise Plus',
          activo: true,
          updatedAt: '2026-02-16T10:31:00Z',
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/v1/clientes/3',
    description: 'Eliminar cliente',
    methodColor: 'text-red-700 bg-red-50 border-red-200',
    response: {
      status: 200,
      time: '38ms',
      body: {
        success: true,
        message: 'Cliente eliminado correctamente',
        deletedId: 3,
      },
    },
  },
]

const APIIntegrationDemo = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(null)
  const [state, setState] = useState('idle')
  const [showResponse, setShowResponse] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleSend = (endpoint) => {
    setSelectedEndpoint(endpoint)
    setState('sending')
    setShowResponse(false)
    timeoutRef.current = setTimeout(() => {
      setState('done')
      setShowResponse(true)
    }, 900)
  }

  const handleReset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setState('idle')
    setSelectedEndpoint(null)
    setShowResponse(false)
  }

  const formatJson = (obj) => JSON.stringify(obj, null, 2)

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] relative text-agency-dark h-full flex flex-col border border-slate-200">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-200 shrink-0">
        <span className="material-symbols-outlined text-agency-dark text-lg">api</span>
        <span className="text-sm font-bold text-agency-dark">API Explorer</span>
        {state !== 'idle' ? (
          <button
            onClick={handleReset}
            className="ml-auto text-xs text-slate-400 hover:text-agency-dark transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Reset
          </button>
        ) : (
          <div className="flex gap-1.5 ml-auto">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        )}
      </div>

      <div className="flex-1 p-5 overflow-y-auto demo-scroll">
        {state === 'idle' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-slate-400">Base URL:</span>
              <code className="text-xs text-agency-dark font-mono bg-primary/20 px-2 py-0.5 rounded">
                https://api.gogestia.com
              </code>
            </div>

            <p className="text-xs text-slate-500">Selecciona un endpoint para probar:</p>

            <div className="space-y-2">
              {ENDPOINTS.map((ep, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(ep)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50 hover:bg-primary/5 border border-slate-200 hover:border-primary/50 transition-all group text-left"
                >
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono border ${ep.methodColor}`}>
                    {ep.method}
                  </span>
                  <code className="text-xs text-slate-600 font-mono flex-1 truncate">{ep.path}</code>
                  <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-agency-dark transition-colors">
                    play_arrow
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {state === 'sending' && selectedEndpoint && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono border ${selectedEndpoint.methodColor}`}>
                  {selectedEndpoint.method}
                </span>
                <code className="text-xs text-slate-600 font-mono">{selectedEndpoint.path}</code>
              </div>
              {selectedEndpoint.requestBody && (
                <div className="mt-2">
                  <div className="text-[10px] text-slate-400 uppercase mb-1">Request Body</div>
                  <pre className="text-[11px] text-slate-600 font-mono bg-white rounded p-2 overflow-x-auto border border-slate-100">
                    {formatJson(selectedEndpoint.requestBody)}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 py-6">
              <span className="material-symbols-outlined text-agency-dark animate-spin">progress_activity</span>
              <span className="text-sm text-slate-500">Enviando petición...</span>
            </div>

            <div className="flex items-center justify-center gap-2 px-4">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-slate-400">computer</span>
              </div>
              <div className="flex-1 h-0.5 bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-8 bg-primary rounded-full animate-[slide_0.8s_ease-in-out_infinite]" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-slate-400">dns</span>
              </div>
            </div>
          </div>
        )}

        {state === 'done' && selectedEndpoint && showResponse && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono border ${selectedEndpoint.methodColor}`}>
                  {selectedEndpoint.method}
                </span>
                <code className="text-xs text-slate-600 font-mono">{selectedEndpoint.path}</code>
              </div>
              {selectedEndpoint.requestBody && (
                <div className="mt-2">
                  <div className="text-[10px] text-slate-400 uppercase mb-1">Request Body</div>
                  <pre className="text-[11px] text-slate-600 font-mono bg-white rounded p-2 overflow-x-auto border border-slate-100">
                    {formatJson(selectedEndpoint.requestBody)}
                  </pre>
                </div>
              )}
            </div>

            <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                  <span className="text-xs font-medium text-slate-600">Respuesta</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-green-600">
                    {selectedEndpoint.response.status} {selectedEndpoint.response.status === 201 ? 'Created' : 'OK'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedEndpoint.response.time}
                  </span>
                </div>
              </div>
              <pre className="text-[11px] text-slate-600 font-mono p-3 overflow-x-auto leading-relaxed max-h-48 overflow-y-auto">
                {formatJson(selectedEndpoint.response.body)}
              </pre>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-[10px] text-slate-400 uppercase mb-2">Headers</div>
              <div className="space-y-1 text-[11px] font-mono">
                <div className="flex gap-2">
                  <span className="text-slate-400">Content-Type:</span>
                  <span className="text-slate-600">application/json</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-400">X-Request-Id:</span>
                  <span className="text-slate-600">req_a7f2k9x3m1</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-400">X-Rate-Limit:</span>
                  <span className="text-slate-600">1000/hora</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide { 0% { left: -2rem; } 100% { left: calc(100% + 2rem); } }
        .demo-scroll::-webkit-scrollbar { width: 4px; }
        .demo-scroll::-webkit-scrollbar-track { background: transparent; }
        .demo-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.3); border-radius: 9999px; }
        .demo-scroll::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,0.5); }
        .demo-scroll { scrollbar-width: thin; scrollbar-color: rgba(148,163,184,0.3) transparent; }
      `}</style>
    </div>
  )
}

export default APIIntegrationDemo
