import { useState, useEffect, useRef } from 'react'

const SAMPLE_DOCS = [
  { name: 'factura_2026.pdf', type: 'Factura', icon: 'description' },
  { name: 'contrato_servicios.docx', type: 'Contrato', icon: 'gavel' },
  { name: 'informe_trimestral.pdf', type: 'Informe', icon: 'analytics' },
]

const PROCESSING_STEPS = [
  { label: 'Escaneando documento...', icon: 'document_scanner', duration: 800 },
  { label: 'Extrayendo texto con OCR...', icon: 'text_fields', duration: 1000 },
  { label: 'Clasificando tipo de documento...', icon: 'category', duration: 700 },
  { label: 'Extrayendo entidades clave...', icon: 'psychology', duration: 1200 },
  { label: 'Generando resumen con IA...', icon: 'auto_awesome', duration: 900 },
]

const RESULTS = {
  Factura: {
    clasificacion: 'Factura Comercial',
    confianza: '98.5%',
    entidades: [
      { label: 'Emisor', value: 'Tech Solutions S.L.' },
      { label: 'CIF', value: 'B-12345678' },
      { label: 'Importe', value: '4.250,00 €' },
      { label: 'Fecha', value: '15/02/2026' },
      { label: 'Nº Factura', value: 'FAC-2026-0847' },
    ],
    resumen: 'Factura por servicios de consultoría tecnológica correspondiente al mes de febrero 2026.',
  },
  Contrato: {
    clasificacion: 'Contrato de Servicios',
    confianza: '96.2%',
    entidades: [
      { label: 'Partes', value: 'GoGestia ↔ Cliente Corp.' },
      { label: 'Duración', value: '12 meses' },
      { label: 'Valor', value: '36.000,00 €' },
      { label: 'Inicio', value: '01/03/2026' },
      { label: 'Cláusulas', value: '24 identificadas' },
    ],
    resumen: 'Contrato de prestación de servicios de desarrollo de software a medida con soporte técnico incluido.',
  },
  Informe: {
    clasificacion: 'Informe Financiero',
    confianza: '97.8%',
    entidades: [
      { label: 'Periodo', value: 'Q4 2025' },
      { label: 'Ingresos', value: '1.2M €' },
      { label: 'Margen', value: '34.5%' },
      { label: 'Empleados', value: '87' },
      { label: 'KPIs', value: '12 métricas' },
    ],
    resumen: 'Informe trimestral con análisis de rendimiento financiero, métricas operativas y proyecciones para Q1 2026.',
  },
}

const DocumentProcessorDemo = () => {
  const [state, setState] = useState('idle')
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState([])
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleSelectDoc = (doc) => {
    setSelectedDoc(doc)
    setState('uploading')
    setCurrentStep(-1)
    setCompletedSteps([])
    timeoutRef.current = setTimeout(() => {
      setState('processing')
      runProcessing(0)
    }, 600)
  }

  const runProcessing = (stepIdx) => {
    if (stepIdx >= PROCESSING_STEPS.length) {
      setState('done')
      return
    }
    setCurrentStep(stepIdx)
    timeoutRef.current = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, stepIdx])
      runProcessing(stepIdx + 1)
    }, PROCESSING_STEPS[stepIdx].duration)
  }

  const handleReset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setState('idle')
    setSelectedDoc(null)
    setCurrentStep(-1)
    setCompletedSteps([])
  }

  const result = selectedDoc ? RESULTS[selectedDoc.type] : null

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] relative text-agency-dark h-full flex flex-col border border-slate-200">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-200 shrink-0">
        <span className="material-symbols-outlined text-agency-dark text-lg">smart_toy</span>
        <span className="text-sm font-bold text-agency-dark">Procesador de Documentos IA</span>
        <div className="flex gap-1.5 ml-auto">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
      </div>

      <div className="flex-1 p-5 overflow-y-auto demo-scroll">
        {state === 'idle' && (
          <div className="space-y-4">
            <p className="text-slate-500 text-sm">Selecciona un documento para procesar automáticamente:</p>
            <div className="space-y-2">
              {SAMPLE_DOCS.map((doc) => (
                <button
                  key={doc.name}
                  onClick={() => handleSelectDoc(doc)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-primary/10 border border-slate-200 hover:border-primary/50 transition-all group text-left"
                >
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-agency-dark transition-colors">
                    {doc.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-agency-dark truncate">{doc.name}</div>
                    <div className="text-xs text-slate-400">{doc.type}</div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-agency-dark transition-colors">
                    upload_file
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {state === 'uploading' && (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-agency-dark text-2xl">cloud_upload</span>
            </div>
            <p className="text-slate-500 text-sm">Subiendo {selectedDoc?.name}...</p>
            <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-[loading_0.6s_ease-in-out_forwards]" />
            </div>
          </div>
        )}

        {state === 'processing' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="material-symbols-outlined text-sm text-agency-dark">{selectedDoc?.icon}</span>
              <span className="text-sm font-medium text-agency-dark">{selectedDoc?.name}</span>
            </div>
            {PROCESSING_STEPS.map((step, idx) => {
              const isCompleted = completedSteps.includes(idx)
              const isCurrent = currentStep === idx && !isCompleted
              const isPending = idx > currentStep
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isCurrent ? 'bg-primary/10 border border-primary/40' : isCompleted ? 'bg-green-50 border border-green-200' : 'opacity-40 border border-transparent'
                  }`}
                >
                  {isCompleted && <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>}
                  {isCurrent && <span className="material-symbols-outlined text-agency-dark text-lg animate-spin">progress_activity</span>}
                  {isPending && <span className="material-symbols-outlined text-slate-300 text-lg">radio_button_unchecked</span>}
                  <span className={`text-sm ${isCurrent ? 'text-agency-dark font-medium' : isCompleted ? 'text-green-700' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {state === 'done' && result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500">verified</span>
                <span className="text-sm font-bold text-green-600">Procesado correctamente</span>
              </div>
              <button onClick={handleReset} className="text-xs text-slate-400 hover:text-agency-dark transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">refresh</span> Nuevo
              </button>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-400 mb-1">Clasificación</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-agency-dark">{result.clasificacion}</span>
                <span className="text-xs font-mono text-agency-dark bg-primary/30 px-2 py-0.5 rounded">{result.confianza}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-400 mb-2">Entidades extraídas</div>
              <div className="space-y-1.5">
                {result.entidades.map((ent, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{ent.label}</span>
                    <span className="text-agency-dark font-medium font-mono">{ent.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-400 mb-1">Resumen IA</div>
              <p className="text-sm text-slate-600 leading-relaxed">{result.resumen}</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes loading { from { width: 0%; } to { width: 100%; } }
        .demo-scroll::-webkit-scrollbar { width: 4px; }
        .demo-scroll::-webkit-scrollbar-track { background: transparent; }
        .demo-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.3); border-radius: 9999px; }
        .demo-scroll::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,0.5); }
        .demo-scroll { scrollbar-width: thin; scrollbar-color: rgba(148,163,184,0.3) transparent; }
      `}</style>
    </div>
  )
}

export default DocumentProcessorDemo
