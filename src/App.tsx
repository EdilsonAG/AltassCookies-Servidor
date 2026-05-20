import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Pedidos from './pages/Pedidos'
import './styles/global.css'
import Callback from './pages/Callback'
import { AuthProvider } from './context/AuthContext'


export default function App() {
  return (
<BrowserRouter>
      <AuthProvider >
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/callback" element={<Callback />} />
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/pedidos" element={<Pedidos />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
