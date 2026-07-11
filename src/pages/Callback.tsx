import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Callback() {
    const navigate = useNavigate()
    const executado = useRef(false)
      const { login } = useAuth()




     useEffect(() => {
        console.log("CHEGOU AQUI")
        if (executado.current) return
        executado.current = true
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const codeVerifier = sessionStorage.getItem('code_verifier')

        // http://localhost:8080/auth/callback
           fetch('https://oracle.bytefire.com.br/auth/callback', {
            method: 'POST',
            credentials: 'include',   
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code: code!,
                codeVerifier: codeVerifier!
            })
        })
            .then(res => {
                if (!res.ok) throw new Error()
                //localStorage.setItem("", res.arrayBuffer);
                sessionStorage.removeItem('code_verifier')
                 login({ nome: 'usuario' })  
                navigate('/')
            })
            
            .catch(() => navigate('/'))  
    }, [navigate])

    return <p style={{ padding: '2rem' }}>Autenticando...</p>
    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search)
    //     const code = params.get('code')

    //     if (!code) {
    //         navigate('/login')
    //         return
    //     }

    //     // Troca o code pelo cookie de sessão
    //     fetch('http://localhost:8080/oauth2/token', {
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': 'Basic ' + btoa('web:web1234'),
    //         },
    //         body: new URLSearchParams({
    //             grant_type: 'authorization_code',
    //             code,
    //             redirect_uri: 'http://localhost:5173/callback',
    //             code_verifier: localStorage.getItem('codeVerifier') || '',
    //         }),
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('resposta do token ', data)
    //             if (data.access_token) {
    //                 localStorage.setItem('access_token', data.access_token)
    //                 localStorage.removeItem('codeVerifier')
    //                 localStorage.removeItem('oauth_state')
    //                 navigate('/')
    //             } else {
    //                 console.log('token não veio ', data)
    //                 navigate('/login')
    //             }
    //         })
    //         .catch((err) => {
    //             console.error('Erro ao trocar token:', err)
    //             navigate('/login')
    //         })

    // }, [navigate])

}