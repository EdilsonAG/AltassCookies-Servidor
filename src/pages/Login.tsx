// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import './Auth.css'

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [senha, setSenha] = useState('')


//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault()

//     const codeVerifier = generateCodeVerifier()
//     sessionStorage.setItem('code_verifier', codeVerifier)

//     const codeChallenge = await generateCodeChallenge(codeVerifier)

//     window.location.href =
//       `http://localhost:8080/oauth2/authorize` +
//       `?response_type=code` +
//       `&client_id=web` +
//       `&redirect_uri=http://localhost:5173/callback` +
//       `&scope=write` +
//       `&code_challenge=${codeChallenge}` +
//       `&code_challenge_method=S256`
//   }

//   function generateCodeVerifier(): string {
//     const array = new Uint8Array(32)
//     crypto.getRandomValues(array)
//     return btoa(String.fromCharCode(...array))
//       .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
//   }

//   async function generateCodeChallenge(verifier: string): Promise<string> {
//     const data = new TextEncoder().encode(verifier)
//     const hash = await crypto.subtle.digest('SHA-256', data)
//     return btoa(String.fromCharCode(...new Uint8Array(hash)))
//       .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
//   }


//   return (
//     <main className="auth-page">
//       <div className="auth-card">
//         <div className="auth-card__logo">🍪</div>
//         <h1>Bem-vindo de volta!</h1>
//         <p className="auth-card__sub">Entre na sua conta para continuar</p>

//         <form onSubmit={handleLogin} className="auth-form">
//           <div className="auth-form__field">
//             <label htmlFor="email">E-mail</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="seu@email.com"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="auth-form__field">
//             <label htmlFor="senha">Senha</label>
//             <input
//               id="senha"
//               type="password"
//               placeholder="••••••••"
//               value={senha}
//               onChange={e => setSenha(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn-primary auth-btn">Entrar</button>
//         </form>

//         <p className="auth-card__footer">
//           Não tem conta? <Link to="/cadastro">Criar conta</Link>
//         </p>
//       </div>
//     </main>
//   )

// }





// 2.0

// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import './Auth.css'

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [senha, setSenha] = useState('')
//   const [erro, setErro] = useState('')
//   const [authorizeUrl, setAuthorizeUrl] = useState('')

//   // Gera PKCE ao montar a página
//   useEffect(() => {
//     const init = async () => {
//       const verifier = generateCodeVerifier()
//       sessionStorage.setItem('code_verifier', verifier)
//       const challenge = await generateCodeChallenge(verifier)

//       const url =
//         `http://localhost:8080/oauth2/authorize` +
//         `?response_type=code&client_id=web` +
//         `&redirect_uri=http://localhost:5173/callback` +
//         `&scope=write` +
//         `&code_challenge=${challenge}` +
//         `&code_challenge_method=S256`

//       setAuthorizeUrl(url)
//     }
//     init()
//   }, [])

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault()

//     const verifier = generateCodeVerifier()
//     sessionStorage.setItem('code_verifier', verifier)
//     const challenge = await generateCodeChallenge(verifier)

//     // Só redireciona — Spring mostra a tela de login dele e cuida do resto
//     window.location.href =
//       `http://localhost:8080/oauth2/authorize` +
//       `?response_type=code&client_id=web` +
//       `&redirect_uri=http://localhost:5173/callback` +
//       `&scope=write` +
//       `&code_challenge=${challenge}` +
//       `&code_challenge_method=S256`
//   }

//   // async function handleLogin(e: React.FormEvent) {
//   //   e.preventDefault()
//   //   setErro('')

//   //   const res2 = await fetch('http://localhost:8080/oauth2/token', {
//   //     method: 'POST',
//   //     credentials: 'include',
//   //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//   //     body: new URLSearchParams({ username: email, password: senha }),
//   //     redirect: 'manual', // não se
//   //   })
//   //   // 1. Faz login no Spring com email/senha
//   //   const res = await fetch('http://localhost:8080/login', {
//   //     method: 'POST',
//   //     credentials: 'include',
//   //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//   //     body: new URLSearchParams({ username: email, password: senha }),
//   //     redirect: 'manual', // não segue o redirect automaticamente
//   //   })

//   //   // Spring retorna 302 no sucesso — opaqueredirect significa que funcionou
//   //   if (res.ok || res.type === 'opaqueredirect' || res.status === 302) {
//   //     window.location.href = authorizeUrl // redireciona com a sessão já criada
//   //   } else {
//   //     setErro('Email ou senha incorretos')
//   //   }
//   // }

//   function generateCodeVerifier(): string {
//     const array = new Uint8Array(32)
//     crypto.getRandomValues(array)
//     return btoa(String.fromCharCode(...array))
//       .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
//   }

//   async function generateCodeChallenge(verifier: string): Promise<string> {
//     const data = new TextEncoder().encode(verifier)
//     const hash = await crypto.subtle.digest('SHA-256', data)
//     return btoa(String.fromCharCode(...new Uint8Array(hash)))
//       .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
//   }

//   return (
//     <main className="auth-page">
//       <div className="auth-card">
//         <div className="auth-card__logo">🍪</div>
//         <h1>Bem-vindo de volta!</h1>
//         <p className="auth-card__sub">Entre na sua conta para continuar</p>

//         {erro && <p style={{ color: 'red' }}>{erro}</p>}

//         <form onSubmit={handleLogin} className="auth-form">
//           <div className="auth-form__field">
//             <label htmlFor="email">E-mail</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="seu@email.com"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="auth-form__field">
//             <label htmlFor="senha">Senha</label>
//             <input
//               id="senha"
//               type="password"
//               placeholder="••••••••"
//               value={senha}
//               onChange={e => setSenha(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn-primary auth-btn">Entrar</button>
//         </form>

//         <p className="auth-card__footer">
//           Não tem conta? <Link to="/cadastro">Criar conta</Link>
//         </p>
//       </div>
//     </main>
//   )
// }



import { useState } from 'react'
import { Link } from 'react-router-dom'
import { clienteService } from '../services/api'
import './Auth.css'
//import { useAuth } from '../context/AuthContext'



export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)


  function generateCodeVerifier(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode(...array))
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  async function generateCodeChallenge(verifier: string): Promise<string> {
    const data = new TextEncoder().encode(verifier)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setLoading(true)


    try {
       await clienteService.login(email,password)
      // http://localhost:8080/auth/login
      //  const res = await fetch('https://api.bytefire.com.br/auth/login', {
      
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: { 'Content-Type': 'application/json' },  
      //   body: JSON.stringify({ email: email, password: password }),
      // //  redirect: 'manual', // n segue o redirect do Spring
      // })

      // if (res) {
        //login({nome: "asdf"})
        
         const verifier = generateCodeVerifier()
        sessionStorage.setItem('code_verifier', verifier)
        const challenge = await generateCodeChallenge(verifier)

         // Spring já sabe que está logado pelo cookie de sessão

        //  window.location.href =
        //   `http://localhost:8080/oauth2/authorize` +
        //   `?response_type=code&client_id=web` +
        //   `&redirect_uri=http://localhost:5173/AltassCookies/callback` +
        //   `&scope=write` +
        //   `&code_challenge=${challenge}` +
         // `&code_challenge_method=S256`

        window.location.href =
          `https://oracle.bytefire.com.br/oauth2/authorize` +
          `?response_type=code&client_id=web` +
          `&redirect_uri=http://localhost:5173/callback` +
          `&scope=write` +
          `&code_challenge=${challenge}` +
          `&code_challenge_method=S256`
     // } else {
     //   setErro('Email ou senha incorretos')
     // }
    } catch {
      setErro('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">🍪</div>
        <h1>Bem-vindo de volta!</h1>
        <p className="auth-card__sub">Entre na sua conta para continuar</p>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-form__field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-form__field">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-card__footer">
          Não tem conta? <Link to="/cadastro">Criar conta</Link>
        </p>
      </div>
    </main>
  )
}