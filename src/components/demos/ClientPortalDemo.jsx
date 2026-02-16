import { useState } from 'react'

const PROJECTS = [
  {
    id: 1,
    name: 'Rediseño Web Corporativa',
    status: 'En progreso',
    progress: 68,
    color: 'bg-blue-500',
    dates: '15 Ene – 30 Mar',
    milestones: [
      { name: 'Diseño UX/UI', done: true },
      { name: 'Maquetación frontend', done: true },
      { name: 'Integración CMS', done: false, current: true },
      { name: 'Testing & QA', done: false },
    ],
    updates: [
      { date: '14 Feb', text: 'Header y footer completados', author: 'María G.' },
      { date: '10 Feb', text: 'Aprobado diseño de la home', author: 'Carlos R.' },
    ],
  },
  {
    id: 2,
    name: 'App de Gestión Interna',
    status: 'En revisión',
    progress: 85,
    color: 'bg-purple-500',
    dates: '01 Dic – 28 Feb',
    milestones: [
      { name: 'Desarrollo backend', done: true },
      { name: 'Desarrollo frontend', done: true },
      { name: 'Testing & QA', done: false, current: true },
      { name: 'Entrega final', done: false },
    ],
    updates: [
      { date: '13 Feb', text: 'Sprint review aprobado', author: 'Ana P.' },
      { date: '08 Feb', text: 'API REST completada', author: 'Luis M.' },
    ],
  },
  {
    id: 3,
    name: 'Integración ERP-CRM',
    status: 'Planificado',
    progress: 15,
    color: 'bg-amber-500',
    dates: '01 Mar – 30 Jun',
    milestones: [
      { name: 'Kick-off & scoping', done: true },
      { name: 'Mapeo de datos', done: false, current: true },
      { name: 'Desarrollo middleware', done: false },
      { name: 'Go-live', done: false },
    ],
    updates: [
      { date: '12 Feb', text: 'Kick-off completado', author: 'Pedro S.' },
    ],
  },
]

const USER = { name: 'Elena Martínez', company: 'Acme Corp', avatar: 'E' }

const ClientPortalDemo = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [loginStep, setLoginStep] = useState('form')

  const handleLogin = (e) => {
    e.preventDefault()
    setLoginStep('loading')
    setTimeout(() => {
      setLoggedIn(true)
      setLoginStep('form')
    }, 800)
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setSelectedProject(null)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] relative text-agency-dark h-full flex flex-col border border-slate-200">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200 shrink-0">
        <span className="material-symbols-outlined text-agency-dark text-base">shield_person</span>
        <span className="text-xs font-bold text-agency-dark">Portal de Clientes</span>
        {loggedIn && (
          <button
            onClick={handleLogout}
            className="ml-auto text-[10px] text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>logout</span>
            Salir
          </button>
        )}
        {!loggedIn && (
          <div className="flex gap-1.5 ml-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 overflow-y-auto min-h-0 demo-scroll">
        <style>{`
          .demo-scroll::-webkit-scrollbar { width: 4px; }
          .demo-scroll::-webkit-scrollbar-track { background: transparent; }
          .demo-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.3); border-radius: 9999px; }
          .demo-scroll::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,0.5); }
          .demo-scroll { scrollbar-width: thin; scrollbar-color: rgba(148,163,184,0.3) transparent; }
        `}</style>

        {/* Login Screen */}
        {!loggedIn && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-agency-dark text-xl">lock</span>
            </div>
            <h3 className="text-sm font-bold text-agency-dark mb-0.5">Área Privada</h3>
            <p className="text-[10px] text-slate-400 mb-3">Accede al seguimiento de tus proyectos</p>

            {loginStep === 'form' ? (
              <form onSubmit={handleLogin} className="w-full max-w-[200px] space-y-2">
                <input
                  type="text"
                  defaultValue="elena@acme.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-agency-dark focus:outline-none focus:border-primary/50"
                  readOnly
                />
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-agency-dark focus:outline-none focus:border-primary/50"
                  readOnly
                />
                <button
                  type="submit"
                  className="w-full bg-agency-dark hover:bg-agency-dark/90 text-white text-xs font-bold py-1.5 rounded transition-colors"
                >
                  Iniciar Sesión
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-agency-dark">
                <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                <span className="text-xs">Verificando...</span>
              </div>
            )}
          </div>
        )}

        {/* Dashboard */}
        {loggedIn && !selectedProject && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <div className="w-7 h-7 rounded-full bg-agency-dark flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                {USER.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-agency-dark">{USER.name}</div>
                <div className="text-[10px] text-slate-400">{USER.company}</div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400">Tus proyectos activos:</p>

            {PROJECTS.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="w-full text-left bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="text-xs font-medium text-agency-dark group-hover:text-agency-dark/80 transition-colors truncate">
                    {project.name}
                  </div>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full shrink-0 border ${
                    project.status === 'En progreso' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                    project.status === 'En revisión' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                    'bg-amber-50 text-amber-600 border-amber-200'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${project.color} transition-all duration-500`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-agency-dark tabular-nums w-7 text-right">
                    {project.progress}%
                  </span>
                </div>
                <div className="text-[9px] text-slate-400 mt-1">{project.dates}</div>
              </button>
            ))}
          </div>
        )}

        {/* Project Detail */}
        {loggedIn && selectedProject && (
          <div className="space-y-2">
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-agency-dark transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>arrow_back</span>
              Volver
            </button>

            <div>
              <h4 className="text-xs font-bold text-agency-dark">{selectedProject.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${selectedProject.color}`}
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-agency-dark">{selectedProject.progress}%</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Hitos</div>
              <div className="space-y-1">
                {selectedProject.milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`material-symbols-outlined ${
                      m.done ? 'text-green-500' : m.current ? 'text-agency-dark' : 'text-slate-300'
                    }`} style={{ fontSize: '14px' }}>
                      {m.done ? 'task_alt' : m.current ? 'pending' : 'radio_button_unchecked'}
                    </span>
                    <span className={`text-[11px] ${
                      m.done ? 'text-slate-400 line-through' : m.current ? 'text-agency-dark font-medium' : 'text-slate-400'
                    }`}>
                      {m.name}
                    </span>
                    {m.current && (
                      <span className="text-[9px] bg-primary/20 text-agency-dark px-1.5 py-0.5 rounded-full ml-auto font-medium">
                        Actual
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Actualizaciones</div>
              <div className="space-y-1.5">
                {selectedProject.updates.map((u, i) => (
                  <div key={i} className="flex gap-1.5">
                    <div className="w-0.5 rounded-full bg-primary shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-600">{u.text}</div>
                      <div className="text-[9px] text-slate-400">{u.author} · {u.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientPortalDemo
