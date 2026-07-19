import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { CarrinhoResponse, CarrinhoResponseServidor, ItemCarrinhoResponse, ItemCarrinhoResponseServidor } from '../types'
import { carrinhoService } from '../services/api'
import { useAuth } from './AuthContext'

interface CartContextValue {
  carrinho: CarrinhoResponseServidor | null
  itens: ItemCarrinhoResponseServidor[]
  totalItens: number
  totalPreco: number
  loading: boolean
  adicionarItem: (produtoId: number, quantidade?: number) => Promise<void>
  removerItem: (idProduto: number) => Promise<void>
  editarQuantidade: (idItemCarrinho: number, quantidade: number) => Promise<void>
  recarregar: () => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<CarrinhoResponseServidor | null>(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth();

  const recarregar = useCallback(async () => {
    try {
      setLoading(true)
      const data = await carrinhoService.buscar()
      setCarrinho(data)

    } catch {
       setCarrinho(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    recarregar()
  }, [recarregar, user])

  const adicionarItem = async (produtoId: number, quantidade = 1) => {
    await carrinhoService.adicionar(produtoId, quantidade)
    await recarregar()
  }

  const removerItem = async (idProduto: number) => {
    await carrinhoService.remover(idProduto)
    await recarregar()
  }



  const editarQuantidade = async (idItemCarrinho: number, quantidade: number) => {
    const snapshot = carrinho

    setCarrinho(prev => {
      if (!prev) return prev
      return {
        ...prev,
        itemCarrinho: prev._itensCarrinho.map(item =>
          item._produto._id === idItemCarrinho
            ? { ...item, quantidade }
            : item
        ),
      }
    })

    try {
      await carrinhoService.editarItem(idItemCarrinho, quantidade)
    } catch (err) {
      setCarrinho(snapshot)
      console.error('Falha ao editar quantidade:', err)
    }
  }

  //if(carrinho[0] === null){}
  const itens = carrinho?._itensCarrinho ?? []
   const totalItens = itens.reduce((acc, item) => acc + item._quantidade, 0)
  const totalPreco = itens.reduce(
    (acc, item) => acc + (item._produto._preco ?? 0) * item._quantidade,
    0
  )

  return (
    <CartContext.Provider
      value={{
        carrinho,
        itens,
        totalItens,
        totalPreco,
        loading,
        adicionarItem,
        removerItem,
        editarQuantidade,
        recarregar,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider')
  return ctx
}
