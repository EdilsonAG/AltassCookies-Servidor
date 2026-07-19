import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { produtoService } from '../services/api'
import type { ProdutoServidor } from '../types'
import ProdutoCard from '../components/ProdutoCard'
import './Produtos.css'

export default function Produtos() {
  const [todos, setTodos] = useState<ProdutoServidor[]>([])
  const [filtrado, setFiltrado] = useState<ProdutoServidor[]>([])
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL)
    produtoService.listar()
      .then(data => { setTodos(data); setFiltrado(data) })
      .catch(() => { setTodos([]); setFiltrado([]) })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const lower = busca.toLowerCase()
    setFiltrado(todos.filter(p => p.nome.toLowerCase().includes(lower)))
  }, [busca, todos])

  return (
    <main className="page-produtos">
      <div className="container">
        {/* Header */}
        <header className="page-header">
          <h1>Nossos Produtos</h1>
          <p>Escolha seu cookie favorito e adicione ao carrinho</p>
        </header>

        {/* Busca */}
        <div className="search-bar">
          <Search size={18} className="search-bar__icon" />
          <input
            type="search"
            placeholder="Buscar produto..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="search-bar__input"
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="produtos-grid">
            {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="skeleton-card" />)}
          </div>
        ) : filtrado.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum produto encontrado{busca ? ` para "${busca}"` : ''}.</p>
          </div>
        ) : (
          <div className="produtos-grid">
            {filtrado.map(p => <ProdutoCard key={p._id} produto={p} />)}
          </div>
        )}
      </div>
    </main>
  )
}
