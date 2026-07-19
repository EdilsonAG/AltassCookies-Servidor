import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck, ShieldCheck, Cookie } from 'lucide-react'
import { produtoService } from '../services/api'
import type { Produto, ProdutoServidor } from '../types'
import ProdutoCard from '../components/ProdutoCard'
import './Home.css'
import { useCart } from '../context/CartContext'

export default function Home() {
  const {recarregar} = useCart();
  const [produtos, setProdutos] = useState<ProdutoServidor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    recarregar()
    produtoService.listar()
      .then(data => setProdutos(data.slice(0, 4))) // exibe só os 4 primeiros na home
      .catch(() => setProdutos([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      {/*  Hero  */}
      <section className="hero">
        <div className="hero__bg-circles" aria-hidden />
        <div className="container hero__inner">
          <div className="hero__text fade-up">
            <span className="hero__eyebrow">🍪 Cookies Artesanais</span>
            <h1 className="hero__title">
              O sabor que faz<br/>
              <em>você voltar</em>
            </h1>
            <p className="hero__desc">
              Cookies gourmet feitos com ingredientes selecionados,
              receitas exclusivas e muito amor. Cada mordida é uma experiência.
            </p>
            <div className="hero__ctas">
              <Link to="/produtos" className="btn-primary">
                Ver produtos <ArrowRight size={18} />
              </Link>
              <Link to="/sobre" className="btn-outline">
                Conheça a gente
              </Link>
            </div>
          </div>
          <div className="hero__visual fade-up">
            <div className="hero__cookie-wrap">
              <Cookie size={180} className="hero__cookie-icon" />
              <div className="hero__float-badge hero__float-badge--1">
                <Star size={14} fill="currentColor" /> 5.0
              </div>
              <div className="hero__float-badge hero__float-badge--2">
                🍫 Ingredientes premium
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Diferenciais  */}
      <section className="features container">
        {[
          { icon: <Cookie size={28}/>, title: 'Receita artesanal', desc: 'Cada cookie feito à mão com carinho.' },
          { icon: <Truck size={28}/>, title: 'Entrega rápida', desc: 'Fresquinho até a sua porta.' },
          { icon: <ShieldCheck size={28}/>, title: 'Qualidade garantida', desc: 'Ingredientes naturais e selecionados.' },
        ].map(f => (
          <div key={f.title} className="feature-card">
            <div className="feature-card__icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      {/*  Produtos em destaque  */}
      <section className="section-produtos container">
        <header className="section-header">
          <h2>Destaques</h2>
          <Link to="/produtos" className="section-header__link">
            Ver todos <ArrowRight size={16} />
          </Link>
        </header>

        {loading ? (
          <div className="produtos-grid">
            {[1, 2, 3, 4].map(n => <div key={n} className="skeleton-card" />)}
          </div>
        ) : produtos.length === 0 ? (
          <p className="empty-state">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="produtos-grid">
            {produtos.map(p => <ProdutoCard key={p._id} produto={p} />)}
          </div>
        )}
      </section>

      {/*  CTA banner  */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <h2>Pronto para se apaixonar?</h2>
          <p>Faça seu pedido agora e receba no conforto da sua casa.</p>
          <Link to="/cadastro" className="btn-primary">
            Criar conta grátis <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
