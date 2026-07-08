import { useState } from 'react'
import { Link } from 'react-router-dom'
import { clienteService } from '../services/api'
import './Auth.css'

export default function Cadastro() {
  const [form, setForm] = useState({ name: '', email: '', pass: ''})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await clienteService.cadastrar(form)
      setSuccess(true)
    } catch {
      alert('Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-card__logo">🎉</div>
          <h1>Conta criada!</h1>
          <p className="auth-card__sub">Sua conta foi criada com sucesso.</p>
          <Link to="/login" className="btn-primary auth-btn" style={{ textAlign: 'center' }}>
            Fazer login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">🍪</div>
        <h1>Criar conta</h1>
        <p className="auth-card__sub">É rápido e gratuito!</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form__field">
            <label htmlFor="nome">Nome completo</label>
            <input id="nome" name="nome" type="text" placeholder="Seu nome" value={form.name} onChange={handleChange} required />
          </div>
          <div className="auth-form__field">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="auth-form__field">
            <label htmlFor="senha">Senha</label>
            <input id="senha" name="senha" type="password" placeholder="Mínimo 8 caracteres" value={form.pass} onChange={handleChange} required minLength={8} />
          </div>
          {/* <div className="auth-form__field">
            <label htmlFor="tipoNotificacao">Notificações por</label>
            <select id="tipoNotificacao" name="tipoNotificacao" value={form.tipoNotificacao} onChange={handleChange}>
              <option value="EMAIL">E-mail</option>
              <option value="SMS">SMS</option>
              <option value="NENHUM">Nenhum</option>
            </select>
          </div> */}
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="auth-card__footer">
          Já tem conta? <Link to="/login">Fazer login</Link>
        </p>
      </div>
    </main>
  )
}
