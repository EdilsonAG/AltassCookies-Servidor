import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

import './Navbar.css'

export default function Navbar() {
  const { totalItens } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { user, logado } = useAuth()

  const links = [
    { label: 'Início', to: '/' },
    { label: 'Produtos', to: '/produtos' },
    { label: 'Sobre', to: '/sobre' },
    { label: 'Contato', to: '/contato' },
  ]

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-text">Altass Cookies</span>
          <span className="navbar__logo-sub">Gourmet</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links desktop-only">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <Link to="/carrinho" className="navbar__cart" aria-label="Carrinho">
            <ShoppingCart size={22} />
            {totalItens > 0 && (
              <span className="navbar__cart-badge">{totalItens}</span>
            )}
          </Link>

          {/* substitui o <Link to="/login" ...> */}
          {!user && !logado && (
            <Link to="/login" className="btn-outline navbar__btn-login desktop-only">
              Entrar
            </Link>
          )}

          <button
            className="navbar__hamburger mobile-only"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="navbar__mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!user && (
            <Link to="/login" className="btn-primary" onClick={() => setMobileOpen(false)}>
              Entrar
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
