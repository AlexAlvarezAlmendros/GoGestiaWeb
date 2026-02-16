import { useState } from 'react'

const INITIAL_PRODUCTS = [
  { id: 1, name: 'MacBook Pro 16"', sku: 'MBP-16-2026', category: 'Portátiles', stock: 12, min: 5, price: 2499 },
  { id: 2, name: 'Monitor Dell 27" 4K', sku: 'MON-D27-4K', category: 'Monitores', stock: 3, min: 5, price: 449 },
  { id: 3, name: 'Teclado Mecánico MX', sku: 'TEC-MX-01', category: 'Periféricos', stock: 45, min: 10, price: 159 },
  { id: 4, name: 'Ratón Ergonómico Pro', sku: 'RAT-ERG-P', category: 'Periféricos', stock: 0, min: 8, price: 89 },
  { id: 5, name: 'Docking Station USB-C', sku: 'DOC-USC-01', category: 'Accesorios', stock: 7, min: 5, price: 199 },
  { id: 6, name: 'iPad Air M3', sku: 'IPA-M3-11', category: 'Tablets', stock: 2, min: 5, price: 699 },
]

const getStockStatus = (stock, min) => {
  if (stock === 0) return { label: 'Sin stock', color: 'text-red-600', bg: 'bg-red-50 border-red-200', icon: 'error' }
  if (stock < min) return { label: 'Stock bajo', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: 'warning' }
  return { label: 'En stock', color: 'text-green-600', bg: 'bg-green-50 border-green-200', icon: 'check_circle' }
}

const StockControlDemo = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [filter, setFilter] = useState('all')
  const [notification, setNotification] = useState(null)

  const lowStock = products.filter((p) => p.stock > 0 && p.stock < p.min).length
  const outOfStock = products.filter((p) => p.stock === 0).length
  const totalValue = products.reduce((acc, p) => acc + p.stock * p.price, 0)

  const filteredProducts = products.filter((p) => {
    if (filter === 'low') return p.stock > 0 && p.stock < p.min
    if (filter === 'out') return p.stock === 0
    return true
  })

  const adjustStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const newStock = Math.max(0, p.stock + delta)
        if (delta > 0 && p.stock === 0) showNotification(`✓ Stock repuesto: ${p.name}`, 'success')
        if (newStock === 0 && p.stock > 0) showNotification(`⚠ Sin stock: ${p.name}`, 'warning')
        return { ...p, stock: newStock }
      })
    )
  }

  const showNotification = (msg, type) => {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 2000)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] relative text-agency-dark h-full flex flex-col border border-slate-200">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-200 shrink-0">
        <span className="material-symbols-outlined text-agency-dark text-lg">inventory_2</span>
        <span className="text-sm font-bold text-agency-dark">Control de Stock</span>
        <div className="flex gap-1.5 ml-auto">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`mx-5 mt-3 px-3 py-2 rounded-lg text-xs font-medium animate-[fadeIn_0.2s_ease] border ${
            notification.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
        >
          {notification.msg}
        </div>
      )}

      <div className="flex-1 p-5 overflow-y-auto demo-scroll">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-center">
            <div className="text-lg font-bold text-agency-dark">{products.length}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Productos</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-center">
            <div className="text-lg font-bold text-amber-500">{lowStock + outOfStock}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Alertas</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-center">
            <div className="text-lg font-bold text-agency-dark">{(totalValue / 1000).toFixed(0)}k€</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Valor</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 mb-4">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'low', label: `Bajo (${lowStock})` },
            { id: 'out', label: `Sin stock (${outOfStock})` },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                filter === f.id
                  ? 'bg-primary/20 text-agency-dark border-primary/40'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product list */}
        <div className="space-y-2">
          {filteredProducts.map((product) => {
            const status = getStockStatus(product.stock, product.min)
            return (
              <div
                key={product.id}
                className="bg-slate-50 rounded-lg p-3 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-agency-dark truncate">{product.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{product.sku}</div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${status.bg} ${status.color}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>{status.icon}</span>
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => adjustStock(product.id, -1)}
                      className="w-6 h-6 rounded bg-white border border-slate-200 hover:bg-red-50 hover:border-red-300 flex items-center justify-center transition-colors"
                      disabled={product.stock === 0}
                    >
                      <span className="material-symbols-outlined text-sm text-slate-500">remove</span>
                    </button>
                    <span className="text-base font-bold text-agency-dark w-8 text-center tabular-nums">
                      {product.stock}
                    </span>
                    <button
                      onClick={() => adjustStock(product.id, 1)}
                      className="w-6 h-6 rounded bg-white border border-slate-200 hover:bg-green-50 hover:border-green-300 flex items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm text-slate-500">add</span>
                    </button>
                    <span className="text-[10px] text-slate-400 ml-1">min: {product.min}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{product.price} €/ud</span>
                </div>

                <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      product.stock === 0 ? 'bg-red-400' : product.stock < product.min ? 'bg-amber-400' : 'bg-green-400'
                    }`}
                    style={{ width: `${Math.min(100, (product.stock / (product.min * 3)) * 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .demo-scroll::-webkit-scrollbar { width: 4px; }
        .demo-scroll::-webkit-scrollbar-track { background: transparent; }
        .demo-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.3); border-radius: 9999px; }
        .demo-scroll::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,0.5); }
        .demo-scroll { scrollbar-width: thin; scrollbar-color: rgba(148,163,184,0.3) transparent; }
      `}</style>
    </div>
  )
}

export default StockControlDemo
